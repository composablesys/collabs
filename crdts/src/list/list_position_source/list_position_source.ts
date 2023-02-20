import { int64AsNumber } from "@collabs/core";
import {
  ListPositionSourceMetadataMessage,
  ListPositionSourceSave,
} from "../../../generated/proto_compiled";

export type ListPosition = [
  sender: string,
  counter: number,
  valueIndex: number
];

/**
 * Manages "items" (contiguous blocks of values) for a ListPositionSource.
 *
 * Implementation advice:
 * - Okay to modify input items directly and return them so long as the
 * ListPositionSource's user doesn't
 * keep references outside that might be affected (including args before and
 * after a method call).
 *
 * @type I The "Item" type, which holds a range of values (e.g., string, array,
 * number indicating number of values).
 */
export interface ListItemManager<I> {
  /**
   * Return item's length.
   */
  length(item: I): number;

  /**
   * Return a singleton item containing just the value at the given index in
   * item.
   */
  get(item: I, index: number): I;

  /**
   * Return an item containing the contents of a followed by the contents
   * of b.
   */
  merge(a: I, b: I): I;

  /**
   * Return an item containing the contents of a followed by b and then c.
   * Can assume b is a singleton.
   */
  merge3(a: I, b: I, c: I): I;

  /**
   * Split item at index, returning items representing values:
   * - left: item[:index]
   * - right: item[index:]
   */
  split(item: I, index: number): [left: I, right: I];

  /**
   * Split item at index and also delete the value at index,
   * returning items representing values:
   * - left: item[:index]
   * - right: item[index + 1:]
   */
  splitDelete(item: I, index: number): [left: I, right: I];

  /**
   * Return item with its first value trimmed, i.e., item[1:].
   */
  trimFirst(item: I): I;

  /**
   * Return item with its last value trimmed, i.e., item[:length-1].
   */
  trimLast(item: I): I;
}

/**
 * Every non-root waypoint must have at least one value (possibly deleted).
 */
class Waypoint<I> {
  constructor(
    /**
     * "" for the root.
     */
    readonly sender: string,
    /**
     * Nonnegative, increases monotonically (so you can
     * store value arrays in an array.).
     */
    readonly counter: number,
    /**
     * null only for the root.
     *
     * Treat as readonly, except we don't set it right away during loading.
     */
    public parentWaypoint: Waypoint<I> | null,
    /**
     * The valueIndex of our true parent (a value within
     * parentWaypoint).
     *
     * Unspecified for the root.
     */
    readonly parentValueIndex: number
  ) {}

  /**
   * The number of present values at this waypoint or its
   * descendants.
   */
  totalPresentValues = 0;
  /**
   * The children (both left + right) in LtR order.
   *
   * A child is one of:
   * - A child waypoint, i.e., a waypoint that is a true
   * child of one of this waypoint's values.
   * - An item of type I, containing a contiguous sequence of present values.
   * - A negative number, indicating a number of unpresent values
   * equal to its absolute value.
   *
   * Since every waypoint must have at least one value (including the root's
   * fake value), this has at least non-waypoint (item or negative number).
   */
  children: (Waypoint<I> | I | number)[] = [];
}

function isWaypoint<I>(child: Waypoint<I> | I | number): child is Waypoint<I> {
  return typeof child === "object" && (<object>child).constructor === Waypoint;
}

function isItem<I>(child: I | number): child is I {
  return !(typeof child === "number" && child < 0);
}

function isDeletedValue<I>(child: Waypoint<I> | I | number) {
  return typeof child === "number" && child < 0;
}

/**
 * @return 1 for item, -1 for deleted values (negative number), 0 for waypoint.
 */
function signOf<I>(child: Waypoint<I> | I | number): 1 | -1 | 0 {
  if (isWaypoint(child)) return 0;
  else if (isDeletedValue(child)) return -1;
  else return 1;
}

/**
 * @type I The "Item" type, which holds a range of values (e.g., string, array,
 * number indicating number of values). For implementation reasons,
 * items must NOT be negative numbers or null.
 */
export class ListPositionSource<I> {
  /**
   * Map key is waypoint.sender, index in the array is waypoint.counter.
   */
  private readonly waypointsByID = new Map<string, Waypoint<I>[]>();
  /**
   * Root waypoint.
   */
  private readonly rootWaypoint: Waypoint<I>;

  /**
   * Used for assigning unique counters to our Waypoints.
   *
   * >= 0.
   */
  private nextCounter = 0;

  /**
   * [constructor description]
   * @param replicaID A unique ID for the local replica.
   * Must not be "".
   * @param initialItem An item consistent of the initial
   * values in the list, i.e., values that are present
   * at the list's creation before any operations are
   * performed, or undefined if there are no such values.
   * The initial values are assigned the positions
   * ["", 0, i] for i in [1, itemManager.length(initialItem)],
   * i.e., you should store them keyed by those positions.
   * (Note 1-indexed, not 0-indexed.)
   */
  constructor(
    readonly replicaID: string,
    private readonly itemManager: ListItemManager<I>,
    options: { initialItem?: I } = {}
  ) {
    if (replicaID === "") {
      throw new Error('replicaID must not be ""');
    }
    this.rootWaypoint = new Waypoint("", 0, null, 0);
    this.waypointsByID.set("", [this.rootWaypoint]);
    // Fake leftmost value, marked as unpresent.
    this.rootWaypoint.children.push(-1);
    const initialItem = options.initialItem;
    if (
      initialItem !== undefined &&
      this.itemManager.length(initialItem) !== 0
    ) {
      // Initial values.
      this.rootWaypoint.children.push(initialItem);
      this.rootWaypoint.totalPresentValues =
        this.itemManager.length(initialItem);
    }
  }

  private valueChildLength(valueChild: number | I): number {
    return typeof valueChild === "number" && valueChild < 0
      ? -valueChild
      : this.itemManager.length(<I>valueChild);
  }

  /**
   * Includes error checking.
   */
  private getWaypoint(sender: string, counter: number): Waypoint<I> {
    const bySender = this.waypointsByID.get(sender);
    if (bySender === undefined) {
      throw new Error(
        "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: sender)"
      );
    }

    if (counter < 0) {
      throw new Error("Invalid position: counter < 0");
    }
    if (counter >= bySender.length) {
      throw new Error(
        "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: counter)"
      );
    }
    return bySender[counter];
  }

  // OPT: Go back to allowing negative valueIndex? See how well it helps
  // performance (e.g. by reducing waypoints and tree depth).
  // Should be fine now that we are storing values for the user
  // (and they can use a map or two arrays to DIY).

  // OPT: opt getting valueIndex in case where startPos comes from get().
  /**
   * [createPositions description]
   * @param  prevPos position to the left of where you want to insert, or
   * null for the beginning of the list.
   * @return          [description]
   */
  createPositions(
    prevPos: ListPosition | null
  ): [counter: number, startValueIndex: number, metadata: Uint8Array | null] {
    // Find the position to the left of our insertion point
    // ("leftNeighbor") - prevPos if non-null, else the fake leftmost value.
    // Present unless it's the fake leftmost value.
    // Specifically, we represent leftNeighbor as the value
    // at leftOffset within the number
    // leftWaypoint.children[leftChildIndex]
    const leftWaypoint =
      prevPos === null
        ? this.rootWaypoint
        : this.getWaypoint(prevPos[0], prevPos[1]);
    let leftChildIndex: number;
    let leftOffset: number;
    let leftValueIndex: number;
    if (prevPos === null) {
      leftChildIndex = 0;
      leftOffset = 0;
      leftValueIndex = 0;
    } else {
      if (prevPos[2] < 0) {
        throw new Error("Invalid prevPos: valueIndex is < 0");
      }
      leftOffset = prevPos[2];
      for (
        leftChildIndex = 0;
        leftChildIndex < leftWaypoint.children.length;
        leftChildIndex++
      ) {
        const child = leftWaypoint.children[leftChildIndex];
        if (isDeletedValue(child)) {
          const count = -child;
          if (leftOffset < count) break;
          leftOffset -= count;
        } else if (!isWaypoint(child)) {
          // Item case.
          const count = this.itemManager.length(<I>child);
          if (leftOffset < count) break;
          leftOffset -= count;
        }
      }
      if (leftChildIndex === leftWaypoint.children.length) {
        throw new Error("Invalid prevPos: valueIndex is not known");
      }
      leftValueIndex = prevPos[2];
    }

    const leftChild = <number | I>leftWaypoint.children[leftChildIndex];
    const leftChildCount = this.valueChildLength(leftChild);

    // The created position will be a new true right child
    // of left neighbor, unless left neighbor already has a
    // right child. In that case, we will instead be a new
    // true left child of rightNeighbor, which we define to
    // be the next (possibly unpresent) value to the right of
    // left neighbor.
    //
    // (Since we count unpresent values in the definition of rightNeighbor, it is impossible for left neighbor
    // to have a right child and rightNeighbor to have
    // a left child: they would end up being desendants
    // of each other. Thus our created position always has
    // no existing same-side true siblings.)

    // See if leftWaypoint has no values after leftNeighbor.
    let isLastValue = true;
    if (leftOffset !== leftChildCount - 1) {
      isLastValue = false;
    } else {
      for (let i = leftWaypoint.children.length - 1; i > leftChildIndex; i--) {
        if (!isWaypoint(leftWaypoint.children[i])) {
          isLastValue = false;
          break;
        }
      }
    }
    if (isLastValue) {
      // leftWaypoint has no values after leftNeighbor.
      // However, it is possible that the next leftWaypoint
      // child is a true right child of leftNeighbor.
      if (leftChildIndex + 1 < leftWaypoint.children.length) {
        const nextChild = <Waypoint<I>>(
          leftWaypoint.children[leftChildIndex + 1]
        );
        if (nextChild.parentValueIndex === leftValueIndex) {
          // Become the new leftmost descendant of nextChild.
          return this.createLeftmostDescendant(nextChild);
        }
      }
      // If we get here, then leftNeighbor has no true right
      // children; become its right child.
      if (leftWaypoint.sender === this.replicaID) {
        // Reuse leftWaypoint.
        return [leftWaypoint.counter, leftValueIndex + 1, null];
      } else {
        return this.createNewWaypoint(leftWaypoint, leftValueIndex, "right");
      }
    }

    // If we get here, then leftNeighbor already has a right
    // child; find rightNeighbor and become its new
    // leftmost descendant.
    if (leftOffset === leftChildCount - 1) {
      // rightNeighbor comes from the next child.
      const nextChild = leftWaypoint.children[leftChildIndex + 1];
      if (isWaypoint(nextChild)) {
        // Become the new leftmost descendant of nextChild.
        return this.createLeftmostDescendant(nextChild);
      }
    }
    // If we get here, then rightNeighbor is the next of
    // leftWaypoint's values.
    return this.createNewWaypoint(leftWaypoint, leftValueIndex + 1, "left");
  }

  private createLeftmostDescendant(
    waypoint: Waypoint<I>
  ): [counter: number, startValueIndex: number, metadata: Uint8Array | null] {
    let curWaypoint = waypoint;
    for (;;) {
      const firstChild = curWaypoint.children[0];
      if (isWaypoint(firstChild)) {
        // firstChild is a waypoint; "recurse".
        curWaypoint = firstChild;
      } else {
        // The leftmost child of curWaypoint is a value.
        // That is necessarily the leftmost descendant of
        // waypoint.
        // Note because we are a left child, there is no
        // chance to reuse curWaypoint, even if we sent it.
        return this.createNewWaypoint(curWaypoint, 0, "left");
      }
    }
  }

  private createNewWaypoint(
    parentWaypoint: Waypoint<I>,
    parentValueIndex: number,
    childSide: "left" | "right"
  ): [counter: number, startValueIndex: number, metadata: Uint8Array | null] {
    const message = ListPositionSourceMetadataMessage.create({
      parentWaypointSender:
        parentWaypoint.sender === this.replicaID
          ? undefined
          : parentWaypoint.sender,
      parentWaypointCounterAndSide:
        childSide === "right"
          ? parentWaypoint.counter
          : ~parentWaypoint.counter,
      parentValueIndex,
    });
    const metadata = ListPositionSourceMetadataMessage.encode(message).finish();
    return [this.nextCounter, 0, metadata];
  }

  // OPT: in receivePositions and add/delete, optimize the (common) case where
  // the user calls find right afterward? Can try to avoid looping over
  // waypoint children twice. (Perhaps that is what makes our sendTime
  // twice as slow as receiveTime, unlike in Yjs.)

  receivePositions(
    startPos: ListPosition,
    count: number,
    metadata: Uint8Array | null
  ): void {
    this.receivePositionsInternal(startPos, count, metadata, -1);
  }

  receiveAndAddPositions(
    startPos: ListPosition,
    item: I,
    metadata: Uint8Array | null
  ): void {
    this.receivePositionsInternal(
      startPos,
      this.itemManager.length(item),
      metadata,
      1,
      item
    );
  }

  /**
   * [receivePositionsInternal description]
   * @param startPos [description]
   * @param count    [description]
   * @param metadata [description]
   * @param sign     [description]
   * @param item     Only present for additions (sign = 1).
   */
  private receivePositionsInternal(
    startPos: ListPosition,
    count: number,
    metadata: Uint8Array | null,
    sign: 1 | -1,
    item?: I
  ): void {
    if (startPos[0] === "") {
      throw new Error('Invalid startPos: sender is ""');
    }
    if (startPos[2] < 0) {
      throw new Error("Invalid startPos: valueIndex is < 0");
    }

    if (metadata === null) {
      // The new positions are just new values appended to the last value
      // child in startPos's waypoint (which necessarily already exists).
      const waypoint = this.getWaypoint(startPos[0], startPos[1]);
      for (
        let childIndex = waypoint.children.length - 1;
        childIndex >= 0;
        childIndex--
      ) {
        const child = waypoint.children[childIndex];
        if (!isWaypoint(child)) {
          // Found the last value child.
          if (sign === 1) {
            if (isItem(child)) {
              // Merge.
              waypoint.children[childIndex] = this.itemManager.merge(
                child,
                item!
              );
            } else {
              // Insert new item.
              waypoint.children.splice(childIndex + 1, 0, item!);
            }
          } else {
            if (isItem(child)) {
              // Insert new deleted values.
              waypoint.children.splice(childIndex + 1, 0, -count);
            } else {
              // Merge.
              waypoint.children[childIndex] = child - count;
            }
          }
          break;
        }
      }
      if (sign === 1) this.updateTotalPresentValues(waypoint, count);
    } else {
      const decoded = ListPositionSourceMetadataMessage.decode(metadata);

      // Get parentWaypoint.
      const parentWaypointSender = Object.prototype.hasOwnProperty.call(
        decoded,
        "parentWaypointSender"
      )
        ? decoded.parentWaypointSender
        : startPos[0];
      const parentWaypointCounterAndSide = int64AsNumber(
        decoded.parentWaypointCounterAndSide
      );
      let parentWaypointCounter: number;
      let side: "left" | "right";
      if (parentWaypointCounterAndSide >= 0) {
        parentWaypointCounter = parentWaypointCounterAndSide;
        side = "right";
      } else {
        parentWaypointCounter = ~parentWaypointCounterAndSide;
        side = "left";
      }
      const parentWaypoint = this.getWaypoint(
        parentWaypointSender,
        parentWaypointCounter
      );

      // Create a new waypoint based on startPos.
      if (startPos[1] < 0) {
        throw new Error("Invalid startPos: counter is < 0");
      }
      const newWaypoint = new Waypoint(
        startPos[0],
        startPos[1],
        parentWaypoint,
        decoded.parentValueIndex
      );
      newWaypoint.children.push(sign === 1 ? item! : -count);
      if (startPos[0] === this.replicaID) this.nextCounter++;

      // Store newWaypoint in this.waypoints.
      if (newWaypoint.sender === "") {
        throw new Error(
          'Invalid call to receivePositions: startPos\'s sender is "", which is a reserved replicaID'
        );
      }
      if (newWaypoint.counter === 0) {
        // New sender.
        if (this.waypointsByID.has(newWaypoint.sender)) {
          throw new Error(
            `Invalid call to receivePositions: counter is not the next counter from sender (counter = ${
              newWaypoint.counter
            }, should be ${this.waypointsByID.get(newWaypoint.sender)!.length})`
          );
        }
        this.waypointsByID.set(newWaypoint.sender, [newWaypoint]);
      } else {
        const bySender = this.waypointsByID.get(newWaypoint.sender);
        if (bySender === undefined || newWaypoint.counter !== bySender.length) {
          throw new Error(
            `Invalid call to receivePositions: counter is not the next counter from sender (counter = ${
              newWaypoint.counter
            }, should be ${bySender === undefined ? 0 : bySender.length})`
          );
        }
        bySender.push(newWaypoint);
      }

      // Store newWaypoint in parentWaypoint.children.
      if (side === "right") {
        if (newWaypoint.sender === parentWaypoint.sender) {
          throw new Error(
            "Invalid call to receivePositions: startPos does not correspond to metadata (right side same senders)"
          );
        }
        // Regardless of newWaypoint.parentValueIndex, it
        // goes to the right of all values: any values that
        // are not causally to its left are sibling insertions
        // by parentWaypoint.sender, which we arbitrarily
        // sort on the left.
        // Remains to sort newWaypoint
        // among any waypoint children at the end, in order:
        // reverse parentValueIndex, then sender.
        let childIndex: number;
        for (
          childIndex = parentWaypoint.children.length - 1;
          childIndex >= 0;
          childIndex--
        ) {
          const child = parentWaypoint.children[childIndex];
          if (
            !isWaypoint(child) ||
            child.parentValueIndex > newWaypoint.parentValueIndex ||
            (child.parentValueIndex === newWaypoint.parentValueIndex &&
              child.sender < newWaypoint.sender)
          ) {
            // child is lesser; insert after.
            break;
          }
        }
        parentWaypoint.children.splice(childIndex + 1, 0, newWaypoint);
      } else {
        // side === "left"
        if (newWaypoint.parentValueIndex === 0) {
          // newWaypoint goes before all values.
          // Remains to sort newWaypoint among any
          // waypoint siblings, in order by sender.
          this.insertLeftChild(parentWaypoint, newWaypoint, 0);
        } else {
          // First find valueIndex - 1 (which is to our left)
          // within children.
          // remaining counts the number of values to pass over.
          let remaining = newWaypoint.parentValueIndex;
          let childIndex: number;
          let childCount!: number;
          for (
            childIndex = 0;
            childIndex < parentWaypoint.children.length;
            childIndex++
          ) {
            const child = parentWaypoint.children[childIndex];
            if (!isWaypoint(child)) {
              childCount = this.valueChildLength(child);
              if (remaining <= childCount) break;
              else remaining -= childCount;
            }
          }
          if (childIndex === parentWaypoint.children.length) {
            throw new Error(
              "Invalid call to receivePositions: the parent valueIndex is not known"
            );
          }
          if (remaining < childCount) {
            // Need to split child.
            const child = <number | I>parentWaypoint.children[childIndex];
            if (isItem(child)) {
              const [left, right] = this.itemManager.split(child, remaining);
              parentWaypoint.children.splice(
                childIndex,
                1,
                left,
                newWaypoint,
                right
              );
            } else {
              parentWaypoint.children.splice(
                childIndex,
                1,
                -remaining,
                newWaypoint,
                -(childCount - remaining)
              );
            }
          } else {
            // newWaypoint goes after child.
            // Remains to sort newWaypoint among any
            // waypoint siblings, in order by sender.
            this.insertLeftChild(parentWaypoint, newWaypoint, childIndex + 1);
          }
        }
      }

      if (sign === 1) this.updateTotalPresentValues(newWaypoint, count);
    }
  }

  /**
   * Inserts newWaypoint into parentWaypoint as a left
   * child of some value, sorting it among its siblings.
   * searchStart is the first place to search (LtR), i.e.,
   * the childIndex after (true parent value - 1).
   * This method sorts newWaypoint among any siblings
   * that appear from searchStart until the next value
   * (or the end), in order by sender.
   */
  private insertLeftChild(
    parentWaypoint: Waypoint<I>,
    newWaypoint: Waypoint<I>,
    searchStart: number
  ) {
    for (
      let nextChildIndex = searchStart;
      nextChildIndex < parentWaypoint.children.length;
      nextChildIndex++
    ) {
      const nextChild = parentWaypoint.children[nextChildIndex];
      // Note nextChild could be a true right child
      // of newWaypoint.parentValueIndex - 1; we
      // are greater than those.
      if (
        !isWaypoint(nextChild) ||
        (nextChild.parentValueIndex === newWaypoint.parentValueIndex &&
          nextChild.sender > newWaypoint.sender)
      ) {
        // nextChild is greater; insert before.
        parentWaypoint.children.splice(nextChildIndex, 0, newWaypoint);
        return;
      }
    }
    // Impossible to get here since children must include a value.
    throw new Error("Internal error: insertLeftChild found no value");
  }

  /**
   * [add description]
   *
   * Note: does nothing if pos is already present (doesn't replace the
   * existing value).
   *
   * @param  pos [description]
   * @param singletonItem An item containing just the added value.
   * @return     Whether pos was actually added, i.e., it
   * was previously not present.
   * @throws If singletonItem's length is not 1.
   */
  add(pos: ListPosition, singletonItem: I): boolean {
    if (this.itemManager.length(singletonItem) !== 1) {
      throw new Error("add only supports singleton items (length 1)");
    }
    return this.addOrDelete(pos, 1, singletonItem) !== null;
  }

  // OPT: how to do optimized delete range?
  // (Finding first and last indices, then looping over
  // them and deleting some but not all.)

  /**
   * [delete description]
   * @param  pos [description]
   * @return     A singleton item containing the deleted value, or null
   * if nothing happened (pos was already not present).
   */
  delete(pos: ListPosition): I | null {
    return this.addOrDelete(pos, -1);
  }

  /**
   * [addOrDelete description]
   * @param  pos  [description]
   * @param  sign [description]
   * @param  item [description]
   * @return A singleton item containing the added/deleted value, or undefined
   * if nothing changed (pos's presence already matched sign).
   */
  private addOrDelete(pos: ListPosition, sign: 1 | -1, item?: I): I | null {
    // Find waypoint.
    const bySender = this.waypointsByID.get(pos[0]);
    if (bySender === undefined) {
      throw new Error(
        "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: sender)"
      );
    }

    if (pos[1] < 0) {
      throw new Error("Invalid position: counter < 0");
    }
    if (pos[1] >= bySender.length) {
      throw new Error(
        "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: counter)"
      );
    }
    const waypoint = bySender[pos[1]];

    // Find valueIndex in waypoint.children.
    if (pos[2] < 0) {
      throw new Error("Invalid position: valueIndex < 0");
    }
    let remaining = pos[2];
    let childIndex: number;
    let childCount!: number;
    for (childIndex = 0; childIndex < waypoint.children.length; childIndex++) {
      const child = waypoint.children[childIndex];
      if (!isWaypoint(child)) {
        childCount = this.valueChildLength(child);
        if (remaining < childCount) break;
        remaining -= childCount;
      }
    }
    if (childIndex === waypoint.children.length) {
      throw new Error(
        "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: valueIndex)"
      );
    }
    const child = <number | I>waypoint.children[childIndex];

    // Add it if needed.
    const childSign = isItem(child) ? 1 : -1;
    if (childSign === sign) return null;

    const mergePrev =
      remaining === 0 &&
      childIndex - 1 >= 0 &&
      signOf(waypoint.children[childIndex - 1]) === sign;
    const mergeNext =
      remaining === childCount - 1 &&
      childIndex + 1 < waypoint.children.length &&
      signOf(waypoint.children[childIndex + 1]) === sign;

    const toReturn =
      sign === 1 ? item! : this.itemManager.get(<I>child, remaining);

    // TODO: test every case
    if (remaining === 0 && childCount === 1) {
      if (mergePrev && mergeNext) {
        const newChild =
          sign === 1
            ? this.itemManager.merge3(
                <I>waypoint.children[childIndex - 1],
                item!,
                <I>waypoint.children[childIndex + 1]
              )
            : <number>waypoint.children[childIndex - 1] +
              -1 +
              <number>waypoint.children[childIndex + 1];
        waypoint.children.splice(childIndex - 1, 3, newChild);
      } else if (mergePrev) {
        const newChild =
          sign === 1
            ? this.itemManager.merge(
                <I>waypoint.children[childIndex - 1],
                item!
              )
            : <number>waypoint.children[childIndex - 1] - 1;
        waypoint.children.splice(childIndex - 1, 2, newChild);
      } else if (mergeNext) {
        const newChild =
          sign === 1
            ? this.itemManager.merge(
                item!,
                <I>waypoint.children[childIndex + 1]
              )
            : -1 + <number>waypoint.children[childIndex + 1];
        waypoint.children.splice(childIndex, 2, newChild);
      } else {
        waypoint.children[childIndex] = sign === 1 ? item! : -1;
      }
    } else if (remaining === 0) {
      if (mergePrev) {
        if (sign === 1) {
          waypoint.children[childIndex - 1] = this.itemManager.merge(
            <I>waypoint.children[childIndex - 1],
            item!
          );
          (<number>waypoint.children[childIndex]) += 1; // -(-1)
        } else {
          (<number>waypoint.children[childIndex - 1]) -= 1; // -(+1)
          waypoint.children[childIndex] = this.itemManager.trimFirst(<I>child);
        }
      } else {
        if (sign === 1) {
          // Subtract 1 length from child (a deleted value) by adding 1 = -(-1).
          waypoint.children.splice(childIndex, 1, item!, <number>child + 1);
        } else {
          waypoint.children.splice(
            childIndex,
            1,
            -1,
            this.itemManager.trimFirst(<I>child)
          );
        }
      }
    } else if (remaining === childCount - 1) {
      if (mergeNext) {
        if (sign === 1) {
          (<number>waypoint.children[childIndex]) += 1; // -(-1)
          waypoint.children[childIndex + 1] = this.itemManager.merge(
            item!,
            <I>waypoint.children[childIndex + 1]
          );
        } else {
          waypoint.children[childIndex] = this.itemManager.trimLast(<I>child);
          (<number>waypoint.children[childIndex + 1]) -= 1; // -(+1)
        }
      } else {
        if (sign === 1) {
          // Subtract 1 length from child (a deleted value) by adding 1 = -(-1).
          waypoint.children.splice(childIndex, 1, <number>child + 1, item!);
        } else {
          waypoint.children.splice(
            childIndex,
            1,
            this.itemManager.trimLast(<I>child),
            -1
          );
        }
      }
    } else {
      // Split child.
      if (sign === 1) {
        waypoint.children.splice(
          childIndex,
          1,
          -remaining,
          item!,
          -(childCount - remaining - 1)
        );
      } else {
        const [left, right] = this.itemManager.splitDelete(<I>child, remaining);
        waypoint.children.splice(childIndex, 1, left, -1, right);
      }
    }

    this.updateTotalPresentValues(waypoint, sign);

    return toReturn;
  }

  /**
   * Updates totalPresentValues on waypoint and its ancestors, adding delta.
   */
  private updateTotalPresentValues(
    startWaypoint: Waypoint<I>,
    delta: number
  ): void {
    for (
      let curWaypoint: Waypoint<I> | null = startWaypoint;
      curWaypoint !== null;
      curWaypoint = curWaypoint.parentWaypoint
    ) {
      curWaypoint.totalPresentValues += delta;
    }
  }

  hasPosition(pos: ListPosition): boolean {
    const waypoint = this.getWaypoint(pos[0], pos[1]);

    // Find valueIndex in waypoint.children.
    if (pos[2] < 0) {
      throw new Error("Invalid position: valueIndex < 0");
    }
    let remaining = pos[2];
    let childIndex: number;
    for (childIndex = 0; childIndex < waypoint.children.length; childIndex++) {
      const child = waypoint.children[childIndex];
      if (!isWaypoint(child)) {
        const count = this.valueChildLength(child);
        if (remaining < count) {
          // pos is within child.
          return child > 0;
        }
        remaining -= count;
      }
    }
    throw new Error(
      "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: valueIndex)"
    );
  }

  getPosition(index: number): ListPosition {
    if (index < 0 || index >= this.length) {
      throw new Error(`index out of bounds: ${index} (length: ${this.length})`);
    }

    const [waypoint, childIndex, , offset] = this.getInternal(index);
    const valueIndex = this.getValueIndex(waypoint, childIndex, offset);
    return [waypoint.sender, waypoint.counter, valueIndex];
  }

  getItem(index: number): [item: I, offset: number] {
    const [, , child, offset] = this.getInternal(index);
    return [child, offset];
  }

  // OPT: optimize forward/backwards loop access

  /**
   * index must be valid; else may infinite loop.
   *
   * The indicated child will always be a positive number, since
   * we only consider present values.
   */
  private getInternal(
    index: number
  ): [waypoint: Waypoint<I>, childIndex: number, child: I, offset: number] {
    // Tree walk.
    let remaining = index;
    let curWaypoint = this.rootWaypoint;
    for (;;) {
      // Walk the children of curWaypoint.
      child_loop: {
        for (
          let childIndex = 0;
          childIndex < curWaypoint.children.length;
          childIndex++
        ) {
          const child = curWaypoint.children[childIndex];
          if (isWaypoint(child)) {
            if (remaining < child.totalPresentValues) {
              // child contains the value, "recurse" by
              // going to the next outer loop iteration.
              curWaypoint = child;
              break child_loop;
            }
            remaining -= child.totalPresentValues;
          } else if (isItem(child)) {
            const count = this.itemManager.length(child);
            if (remaining < count) {
              // Found the value; return.
              return [curWaypoint, childIndex, child, remaining];
            }
            remaining -= count;
          } // else unpresent values; skip over.
        }
        // End of for loop, but didn't find index among children.
        throw new Error("Internal error: failed to find valid index");
      }
    }
  }

  private getValueIndex(
    waypoint: Waypoint<I>,
    childIndex: number,
    offset: number
  ) {
    let subtotal = 0;
    for (let i = 0; i < childIndex; i++) {
      const child = waypoint.children[i];
      if (!isWaypoint(child)) subtotal += this.valueChildLength(child);
    }
    return subtotal + offset;
  }

  get length(): number {
    return this.rootWaypoint.totalPresentValues;
  }

  indexOfPosition(
    pos: ListPosition,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    const waypoint = this.getWaypoint(pos[0], pos[1]);

    // geIndex within waypoint's subtree.
    let [geIndex, isPresent] = this.findWithinSubtree(waypoint, pos[2]);

    // Now account for present values to the left of
    // waypoint's subtree.
    let curWaypoint = waypoint;
    let curParent = curWaypoint.parentWaypoint;
    while (curParent !== null) {
      // Loop through curParent's children until we find
      // curWaypoint, adding up their indices.
      for (const child of curParent.children) {
        if (isWaypoint(child)) {
          if (child === curWaypoint) {
            // Done looping over children.
            break;
          } else {
            geIndex += child.totalPresentValues;
          }
        } else if (isItem(child)) {
          geIndex += this.itemManager.length(child);
        }
      }

      // Now find where curParent is within its own parent.
      curWaypoint = curParent;
      curParent = curWaypoint.parentWaypoint;
    }

    if (isPresent) return geIndex;
    else {
      switch (searchDir) {
        case "none":
          return -1;
        case "left":
          return geIndex - 1;
        case "right":
          return geIndex;
      }
    }
  }

  /**
   * @return [the geIndex of the given valueIndex within
   * waypoint's subtree, whether it is present]
   */
  private findWithinSubtree(
    waypoint: Waypoint<I>,
    valueIndex: number
  ): [geIndex: number, isPresent: boolean] {
    if (valueIndex < 0) {
      throw new Error("Invalid position: valueIndex < 0");
    }

    let geIndex = 0;
    let remaining = valueIndex;
    for (const child of waypoint.children) {
      if (isWaypoint(child)) {
        geIndex += child.totalPresentValues;
      } else if (isItem(child)) {
        const count = this.itemManager.length(child);
        if (remaining < count) {
          // Found valueIndex.
          return [geIndex + remaining, true];
        } else {
          remaining -= count;
          geIndex += count;
        }
      } else {
        const count = -child;
        if (remaining < count) {
          // Found valueIndex.
          return [geIndex, false];
        } else {
          remaining -= count;
        }
      }
    }

    // If we get to here, we didn't find valueIndex.
    throw new Error(
      "Unknown position, did you forget to receivePositions/receiveAndAddPositions? (reason: valueIndex)"
    );
  }

  /**
   * Mutating the ListPositionSource while iterating is unsafe.
   */
  *positions(): IterableIterator<ListPosition> {
    for (const [
      waypoint,
      ,
      startValueIndex,
      count,
    ] of this.itemPositionsInternal()) {
      for (let i = 0; i < count; i++) {
        yield [waypoint.sender, waypoint.counter, startValueIndex + i];
      }
    }
  }

  /**
   * Mutating the ListPositionSource while iterating is unsafe.
   */
  *items(): IterableIterator<I> {
    for (const [, , , , item] of this.itemPositionsInternal()) {
      yield item;
    }
  }

  *itemsAndPositions(): IterableIterator<
    [startPos: ListPosition, length: number, item: I]
  > {
    for (const [
      waypoint,
      ,
      startValueIndex,
      count,
      item,
    ] of this.itemPositionsInternal()) {
      yield [[waypoint.sender, waypoint.counter, startValueIndex], count, item];
    }
  }

  /**
   * Mutating the ListPositionSource while iterating is unsafe, except for
   * directly replacing waypoint children (i.e., setting an index).
   *
   * @param inLoad Set to true during load(), when the items are actually
   * replaced with their lengths (as positive numbers).
   */
  private *itemPositionsInternal(
    inLoad = false
  ): IterableIterator<
    [
      waypoint: Waypoint<I>,
      childIndex: number,
      startValueIndex: number,
      count: number,
      item: I
    ]
  > {
    // Walk the tree.
    const stack: [
      waypoint: Waypoint<I>,
      childIndex: number,
      valueIndex: number
    ][] = [];
    let waypoint = this.rootWaypoint;
    let childIndex = 0;
    let valueIndex = 0;
    for (;;) {
      if (childIndex === waypoint.children.length) {
        // Done with this waypoint; pop the stack.
        if (stack.length === 0) {
          // Completely done.
          return;
        }
        [waypoint, childIndex, valueIndex] = stack.pop()!;
        childIndex++;
        continue;
      }

      const child = waypoint.children[childIndex];
      if (isWaypoint(child)) {
        // Recurse if nonempty, else skip.
        if (child.totalPresentValues > 0) {
          stack.push([waypoint, childIndex, valueIndex]);
          waypoint = child;
          childIndex = 0;
          valueIndex = 0;
          continue;
        }
      } else if (isItem(child)) {
        // Yield child.
        const count = inLoad
          ? <number>(<unknown>child)
          : this.itemManager.length(child);
        yield [waypoint, childIndex, valueIndex, count, child];
        valueIndex += count;
      } else {
        // Deleted values; skip.
        valueIndex += -child;
      }

      // Move to the next child.
      childIndex++;
    }
  }

  // // For debugging.
  // printTreeWalk() {
  //   let numNodes = 1;
  //   let maxDepth = 1;
  //   // Walk the tree.
  //   console.log("Tree walk by " + this.replicaID);
  //   const stack: [waypoint: Waypoint<I>, childIndex: number][] = [];
  //   let waypoint = this.rootWaypoint;
  //   let childIndex = 0;
  //   console.log(`Root (${waypoint.totalPresentValues}):`);
  //   process.stdout.write("  ");
  //   for (;;) {
  //     if (childIndex === waypoint.children.length) {
  //       // Done with this waypoint; pop the stack.
  //       console.log("");
  //       if (stack.length === 0) {
  //         // Completely done.
  //         console.log(`Nodes: ${numNodes}`);
  //         console.log(`Depth: ${maxDepth}`);
  //         return;
  //       }
  //       [waypoint, childIndex] = stack.pop()!;
  //       childIndex++;
  //       for (let i = 0; i < stack.length + 1; i++) {
  //         process.stdout.write("  ");
  //       }
  //       continue;
  //     }
  //
  //     const child = waypoint.children[childIndex];
  //     if (isWaypoint(child)) {
  //       // Waypoint child. Recurse.
  //       process.stdout.write("\n");
  //       for (let i = 0; i < stack.length + 1; i++) {
  //         process.stdout.write("  ");
  //       }
  //       stack.push([waypoint, childIndex]);
  //       waypoint = child;
  //       childIndex = 0;
  //       process.stdout.write(
  //         `[${waypoint.sender}, ${waypoint.counter}] (${waypoint.totalPresentValues}):\n`
  //       );
  //       for (let i = 0; i < stack.length + 1; i++) {
  //         process.stdout.write("  ");
  //       }
  //       numNodes++;
  //       maxDepth = Math.max(maxDepth, stack.length + 1);
  //       continue;
  //     } else if (isItem(child)) {
  //       process.stdout.write(`${this.itemManager.length(child)}, `);
  //     } else {
  //       process.stdout.write(`${child}, `);
  //     }
  //
  //     // Move to the next child.
  //     childIndex++;
  //   }
  // }

  /**
   * Useful during loading.
   *
   * @return The number of valid counters for sender, equivalently,
   * 1 plus sender's max counter so far.
   */
  countersFor(sender: string): number {
    return this.waypointsByID.get(sender)?.length ?? 0;
  }

  /**
   * This only saves the positions; you must save values separately.
   * It's easiest to do that by extracting the (non-CRDT) array of values
   * and saving that directly; you'll need that for load anyway.
   */
  save(): Uint8Array {
    const replicaIDs: string[] = [];
    const replicaCounts: number[] = [];
    // Maps replicaIDs to the first index corresponding
    // to that replicaID in parentWaypoints.
    const startIndices = new Map<string, number>();
    let index = 0;
    for (const [replicaID, waypoints] of this.waypointsByID) {
      if (replicaID === "") continue;
      replicaIDs.push(replicaID);
      replicaCounts.push(waypoints.length);
      startIndices.set(replicaID, index);
      index += waypoints.length;
    }

    const parentWaypoints: number[] = [];
    const parentValueIndices: number[] = [];
    const totalPresentValuess: number[] = [];
    const children: number[] = [];
    const childTypes: number[] = [];
    for (const waypoints of this.waypointsByID.values()) {
      for (const waypoint of waypoints) {
        if (waypoint !== this.rootWaypoint) {
          const parentWaypoint = waypoint.parentWaypoint!;
          if (parentWaypoint === this.rootWaypoint) {
            parentWaypoints.push(0);
          } else {
            parentWaypoints.push(
              1 +
                startIndices.get(parentWaypoint.sender)! +
                parentWaypoint.counter
            );
          }
          parentValueIndices.push(waypoint.parentValueIndex);
        }
        // We are guaranteed rootWaypoint is first since
        // it is in the first entry in waypointsByID.
        totalPresentValuess.push(waypoint.totalPresentValues);
        for (
          let childIndex = 0;
          childIndex < waypoint.children.length;
          childIndex++
        ) {
          const startTag = childIndex === waypoint.children.length - 1 ? 4 : 0;
          const child = waypoint.children[childIndex];
          if (isWaypoint(child)) {
            children.push(startIndices.get(child.sender)! + child.counter);
            childTypes.push(2 + startTag);
          } else if (isItem(child)) {
            children.push(this.itemManager.length(child));
            childTypes.push(0 + startTag);
          } else {
            children.push(-child);
            childTypes.push(1 + startTag);
          }
        }
      }
    }

    const message = ListPositionSourceSave.create({
      oldReplicaID: this.replicaID,
      oldNextCounter: this.nextCounter,
      replicaIDs,
      replicaCounts,
      parentWaypoints,
      parentValueIndices,
      totalPresentValuess,
      children,
      childTypes,
    });
    return ListPositionSourceSave.encode(message).finish();
  }

  /**
   * [load description]
   * @param savedState [description]
   * @param nextItem A function that returns an item containing the
   * `count` next values when called repeatedly.
   * This must only be null if you are using NumberItemManager
   * (when it's null, we skip a step that is redundant for NumberItemManager).
   */
  load(
    savedState: Uint8Array,
    nextItem: ((count: number, startPos: ListPosition) => I) | null
  ): void {
    const decoded = ListPositionSourceSave.decode(savedState);

    if (decoded.oldReplicaID === this.replicaID) {
      this.nextCounter = decoded.oldNextCounter;
    }

    // All waypoints, in order [root, then same order
    // as parentWaypoints].
    // I.e., indices = values in parentWaypoints.
    const allWaypoints: Waypoint<I>[] = [this.rootWaypoint];

    // Fill in this.waypointsByID and allWaypoints.
    let i = 0; // Index into parentWaypoints.
    for (
      let replicaIDIndex = 0;
      replicaIDIndex < decoded.replicaIDs.length;
      replicaIDIndex++
    ) {
      const replicaID = decoded.replicaIDs[replicaIDIndex];
      const bySender: Waypoint<I>[] = [];
      this.waypointsByID.set(replicaID, bySender);

      for (
        let counter = 0;
        counter < decoded.replicaCounts[replicaIDIndex];
        counter++
      ) {
        const waypoint = new Waypoint<I>(
          replicaID,
          counter,
          null, // parentWaypoint is set later.
          decoded.parentValueIndices[i]
        );
        bySender.push(waypoint);
        allWaypoints.push(waypoint);
        i++;
      }
    }

    // Set waypoint parentWaypoints. Note we skip rootWaypoint.
    for (let j = 1; j < allWaypoints.length; j++) {
      allWaypoints[j].parentWaypoint =
        allWaypoints[decoded.parentWaypoints[j - 1]];
    }

    // Set waypoint children.
    // At first, we leave out items, instead putting their length in their
    // place (as if this.itemManager was NumberItemManager). We fill in items
    // in the next loop below.

    // For root, we have to remove its initial children first.
    this.rootWaypoint.children.splice(0);

    let childrenIndex = 0;
    for (let j = 0; j < allWaypoints.length; j++) {
      const waypoint = allWaypoints[j];
      waypoint.totalPresentValues = int64AsNumber(
        decoded.totalPresentValuess[j]
      );
      for (;;) {
        const child = decoded.children[childrenIndex];
        const childType = decoded.childTypes[childrenIndex];
        childrenIndex++;
        switch (childType & 3) {
          case 0: // Positive number (length of the actual item).
            waypoint.children.push(child);
            break;
          case 1: // Negative number.
            waypoint.children.push(-child);
            break;
          case 2: // Waypoint.
            waypoint.children.push(allWaypoints[child + 1]);
            break;
        }
        if ((childType & 4) === 4) break;
      }
    }

    // Replace the item placeholders (their lengths) with the actual items,
    // by looping over both the values and positions in order.
    if (nextItem !== null) {
      for (const [
        waypoint,
        childIndex,
        startValueIndex,
        count,
      ] of this.itemPositionsInternal(true)) {
        waypoint.children[childIndex] = nextItem(count, [
          waypoint.sender,
          waypoint.counter,
          startValueIndex,
        ]);
      }
    }
  }
}
