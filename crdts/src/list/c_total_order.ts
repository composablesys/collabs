import {
  CPrimitive,
  InitToken,
  nonNull,
  Position,
  protobufHas,
  UpdateMeta,
} from "@collabs/core";
import {
  ITotalOrderCreateMessage,
  TotalOrderCreateMessage,
  TotalOrderSave,
} from "../../generated/proto_compiled";

const RADIX = 36;

/**
 * A waypoint in the tree of positions. See
 * [[CTotalOrder]] for a description of the tree.
 *
 * Each waypoint is identified by its pair ([[senderID]], [[counter]]).
 */
export class Waypoint {
  constructor(
    /**
     * The waypoint sender's replicaID, or
     * "" for the root waypoint.
     */
    readonly senderID: string,
    /**
     * A counter for waypoints sent by [[senderID]].
     * Starts at 0 and increases contiguously.
     */
    readonly counter: number,
    /**
     * The waypoint for this waypoint's parent position,
     * or null if this is the root waypoint.
     */
    readonly parentWaypoint: Waypoint | null,
    /**
     * The valueIndex for this waypoint's parent position.
     *
     * Unspecified for the root waypoint.
     */
    readonly parentValueIndex: number,
    /**
     * This waypoint's side: a right (true) or left (false) child of
     * the parent position.
     */
    readonly isRight: boolean
  ) {}

  /**
   * This waypoint's child waypoints in sort order: left children
   * by valueIndex, then right children by reverse valueIndex,
   * with ties broken by senderID.
   *
   * Only [[CTotalOrder]] may mutate this array.
   */
  readonly children: Waypoint[] = [];
}

/**
 * A collaborative abstract total order on [[Position]]s.
 *
 * This is a low-level API intended for internal use by list CRDT implementations.
 * In most apps, you are better off using [[CValueList]] or [[CList]].
 *
 * A CTotalOrder represents the core of a list CRDT: a collaborative
 * list of Positions
 * that can be expanded over time, but without any associated values.
 * Instead, you use a [[LocalList]] to map a subset of Positions to
 * values, in list order with indexed access.
 * Note that LocalList is a local (non-collaborative) data structure, i.e.,
 * its value assignments are not automatically replicated.
 *
 * ### Waypoints
 *
 * Internally, CTotalOrder stores an append-only log of [[Waypoint]]s.
 * The allowed [[Position]]s correspond to pairs (waypoint, valueIndex)
 * where waypoint is an existing Waypoint and
 * valueIndex is a nonnegative number. Methods [[decode]],
 * [[encode]], and [[encodeAll]] convert between the two representations.
 *
 * Note that waypoints and positions are only created, never destroyed.
 * To create new positions (creating a new waypoint if needed),
 * call [[createPositions]].
 *
 * ### List Order
 *
 * The positions are ordered using a tree.
 * Each waypoint's positions form a descending, left-to-right branch
 * in the tree rooted at the position with valueIndex 0.
 * The position with valueIndex 0 is a child of the waypoint's
 * parent position, on the side given by [[Waypoint.isRight]].
 *
 * The position order is then an in-order traversal of this tree:
 * we traverse a position's left children, then visit
 * the position, then traverse its right children.
 * Same-side siblings are ordered by the tiebreakers:
 * - A position belonging to the same waypoint as the parent
 * (just with valueIndex + 1) is to the left of any other siblings.
 * - Other siblings (each belonging to different waypoints and with
 * valueIndex 0) are sorted lexicographically by their waypoints'
 * [[Waypoint.senderID]]s. We call these *waypoint children*.
 *
 * Note that positions belonging to the same waypoint are contiguous
 * when first created. Later, (left-side) waypoint children may
 * appear between them.
 */
export class CTotalOrder extends CPrimitive {
  /**
   * Map key is waypoint.senderID, index in the array is waypoint.counter.
   */
  private readonly waypointsByID = new Map<string, Waypoint[]>();
  /**
   * The root waypoint.
   *
   * The special position (rootWaypoint, 0) is the root of the tree of
   * positions. It technically appears first in the total order
   * but is usually not used.
   */
  readonly rootWaypoint: Waypoint;

  /**
   * Tracks waypoints created by this specific object (i.e., the current
   * replica & session). These are the only waypoints that we can
   * extend, to prevent multiple users from extending a waypoint
   * concurrently (giving non-unique positions).
   *
   * Each waypoint maps to the next valueIndex to create for that waypoint.
   *
   * This state is ephemeral (not saved), since a future loader will
   * be in a different session.
   */
  private ourWaypoints = new Map<Waypoint, number>();

  /**
   * Constructs a CTotalOrder.
   */
  constructor(init: InitToken) {
    super(init);

    this.rootWaypoint = new Waypoint("", 0, null, 0, true);
    this.waypointsByID.set("", [this.rootWaypoint]);
  }

  /**
   * Creates `count` new positions between prevPosition and nextPosition.
   * The positions are created collaboratively
   * (replicated on all devices).
   *
   * If !(prevPosition < nextPosition), behavior is undefined.
   *
   * Note that this might not actually send a message.
   *
   * @param prevPosition The previous position, or null to
   * create positions at the beginning of the list.
   * @param nextPosition The next position, or null to
   * create positions at the end of the list.
   * @param count The number of positions to create.
   * @returns The created [[Position]]s, in list order.
   * Internally, they use the same waypoint with contiguously
   * increasing valueIndex.
   * @throws If count <= 0.
   */
  createPositions(
    prevPosition: Position | null,
    nextPosition: Position | null,
    count: number
  ): Position[] {
    if (prevPosition !== null && prevPosition === nextPosition) {
      throw new Error("prevPosition == nextPosition");
    }
    if (count <= 0) throw new Error(`count is <= 0: ${count}`);

    const [prevWaypoint, prevValueIndex] =
      prevPosition === null
        ? [this.rootWaypoint, 0]
        : this.decode(prevPosition);

    // If nextPosition is a (right) descendant of prevPosition,
    // create a new left descendant of nextPosition.
    if (nextPosition !== null) {
      const [nextWaypoint, nextValueIndex] = this.decode(nextPosition);
      if (
        this.isDescendant(
          nextWaypoint,
          nextValueIndex,
          prevWaypoint,
          prevValueIndex
        )
      ) {
        // Create a new left descendant of nextPosition.
        // We don't create always create a left child of nextPosition because
        // there could be left child tombstones already.
        // Instead, create a new left child of its leftmost descendant.
        const [parentWaypoint, parentValueIndex] = this.leftmostDescendant(
          nextWaypoint,
          nextValueIndex
        );
        return this.createChildren(
          parentWaypoint,
          parentValueIndex,
          false,
          count
        );
      }
    }

    // Else we can go anywhere in prevPosition's right subtree.

    // First see if we can extend prevWaypoint.
    const extendValueIndex = this.ourWaypoints.get(prevWaypoint);
    if (extendValueIndex !== undefined) {
      // It's our waypoint, so we can extend it.
      this.ourWaypoints.set(prevWaypoint, extendValueIndex + count);
      return this.encodeAll(prevWaypoint, extendValueIndex, count);
    }

    // Next, see if we can create a new right child of prevPosition.
    // However, we won't do this if there is already a (tombstone) right child
    // of prevPosition.
    const existingRight = this.firstRightChild(prevWaypoint, prevValueIndex);
    if (existingRight === null) {
      // Create a new right child of prevPosition.
      // This is better than creating a left child of
      // [prevWaypoint, prevValueIndex + 1] because it will be ordered after
      // concurrently-created extensions of prevWaypoint (same-author priority).
      return this.createChildren(prevWaypoint, prevValueIndex, true, count);
    } else {
      // Treat (child, 0) like nextPosition. Since it's a descendant of
      // prevPosition, we create a new left descendant of child.
      const parentWaypoint = this.leftmostDescendant0(existingRight);
      return this.createChildren(parentWaypoint, 0, false, count);
    }
  }

  /**
   * Returns whether [aWaypoint, aValueIndex] is a descendant of [bWaypoint, bValueIndex].
   * This includes valueIndex descendant relationships.
   */
  private isDescendant(
    aWaypoint: Waypoint,
    aValueIndex: number,
    bWaypoint: Waypoint,
    bValueIndex: number
  ): boolean {
    if (aWaypoint === bWaypoint) return aValueIndex >= bValueIndex;

    // Walk up the waypoint tree from a until we reach either a child of
    // bWaypoint or the root.
    let current = aWaypoint;
    while (current.parentWaypoint !== bWaypoint) {
      if (current.parentWaypoint === null) {
        // We've reached current == root without encountering bWaypoint;
        // it's not a descendant.
        return false;
      }
      current = current.parentWaypoint;
    }

    // Now current's parent's waypoint is bWaypoint.
    // See if current's parent is [bWaypoint, >= bValueIndex].
    if (current.parentValueIndex > bValueIndex) return true;
    else if (current.parentValueIndex === bValueIndex) return current.isRight;
    else return false;
  }

  /**
   * Returns the (waypoint', valueIndex') for the leftmost
   * descendant of (waypoint, valueIndex).
   */
  private leftmostDescendant(
    waypoint: Waypoint,
    valueIndex: number
  ): [Waypoint, number] {
    for (const child of waypoint.children) {
      if (!child.isRight && child.parentValueIndex === valueIndex) {
        // Found the first left child of the input.
        return [this.leftmostDescendant0(child), 0];
      } else if (child.isRight || child.parentValueIndex > valueIndex) {
        // We're past where a left child of the input would be
        // without finding one.
        break;
      }
    }
    // The input has no left children, hence is its own
    // leftmost descendant.
    return [waypoint, valueIndex];
  }

  /**
   * Returns the waypoint for the leftmost descendant of
   * (waypoint, 0). The leftmost descendant
   * is (returned waypoint, 0).
   */
  private leftmostDescendant0(waypoint: Waypoint): Waypoint {
    // The leftmost child of a waypoint is always a child of
    // its valueIndex 0.
    let current = waypoint;
    while (current.children.length > 0) {
      const firstChild = current.children[0];
      if (firstChild.parentValueIndex === 0 && !firstChild.isRight) {
        current = firstChild;
      } else break;
    }
    return current;
  }

  /**
   * Returns the waypoint of the first right child of [waypoint, valueIndex],
   * or null if it has no right children.
   */
  private firstRightChild(
    waypoint: Waypoint,
    valueIndex: number
  ): Waypoint | null {
    for (const child of waypoint.children) {
      if (child.parentValueIndex === valueIndex && child.isRight) return child;
    }
    return null;
  }

  private createChildren(
    parentWaypoint: Waypoint,
    parentValueIndex: number,
    isRight: boolean,
    count: number
  ): Position[] {
    const message: ITotalOrderCreateMessage = {
      parentWaypointSenderID:
        parentWaypoint.senderID === this.runtime.replicaID
          ? undefined
          : parentWaypoint.senderID,
      parentWaypointCounterAndSide: this.valueAndSideEncode(
        parentWaypoint.counter,
        isRight
      ),
      parentValueIndex,
    };
    this.sendPrimitive(TotalOrderCreateMessage.encode(message).finish());

    // Our new waypoint is last in our waypointsByID array.
    const ourArray = nonNull(this.waypointsByID.get(this.runtime.replicaID));
    const newWaypoint = ourArray[ourArray.length - 1];

    // Record created positions in ourWaypoints.
    this.ourWaypoints.set(newWaypoint, count);

    // Return created positions.
    return this.encodeAll(newWaypoint, 0, count);
  }

  private valueAndSideEncode(value: number, isRight: boolean): number {
    return isRight ? value : ~value;
  }

  private valueAndSideDecode(
    valueAndSide: number
  ): [value: number, isRight: boolean] {
    const isRight = valueAndSide >= 0;
    const value = isRight ? valueAndSide : ~valueAndSide;
    return [value, isRight];
  }

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: UpdateMeta
  ): void {
    const decoded = TotalOrderCreateMessage.decode(<Uint8Array>message);

    // Get parentWaypoint.
    const parentWaypointSender = protobufHas(decoded, "parentWaypointSenderID")
      ? nonNull(decoded.parentWaypointSenderID)
      : meta.senderID;
    const [parentWaypointCounter, isRight] = this.valueAndSideDecode(
      decoded.parentWaypointCounterAndSide
    );
    const parentWaypoint = this.getWaypoint(
      parentWaypointSender,
      parentWaypointCounter
    );

    let senderWaypoints = this.waypointsByID.get(meta.senderID);
    if (senderWaypoints === undefined) {
      senderWaypoints = [];
      this.waypointsByID.set(meta.senderID, senderWaypoints);
    }
    const waypoint = new Waypoint(
      meta.senderID,
      senderWaypoints.length,
      parentWaypoint,
      decoded.parentValueIndex,
      isRight
    );
    // Store the waypoint.
    senderWaypoints.push(waypoint);
    this.addToChildren(waypoint);
  }

  /**
   * Adds newWaypoint to parentWaypoint.childWaypoints
   * in the proper order.
   */
  private addToChildren(newWaypoint: Waypoint): void {
    // Recall child waypoints' sort order: left children
    // by valueIndex, then right children by reverse valueIndex.
    const children = nonNull(newWaypoint.parentWaypoint).children;
    // Find i, the index of the first entry after newWaypoint.
    // OPT: If children is large, use binary search.
    let i = 0;
    for (; i < children.length; i++) {
      if (this.isSiblingLess(newWaypoint, children[i])) break;
    }
    children.splice(i, 0, newWaypoint);
  }

  /**
   * Returns true if sibling1 < sibling2 in the sibling order.
   */
  private isSiblingLess(sibling1: Waypoint, sibling2: Waypoint) {
    // Recall child order: left children ordered by
    // valueIndex, then right children ordered by
    // reverse valueIndex. senderID tiebreaker.
    if (sibling1.isRight === sibling2.isRight) {
      if (sibling1.parentValueIndex === sibling2.parentValueIndex) {
        // senderID order. Identical senderIDs are impossible.
        return sibling1.senderID < sibling2.senderID;
      } else {
        // isRight: reverse valueIndex order;
        // isLeft: valueIndex order.
        // Use === as XNOR.
        return (
          sibling1.isRight ===
          sibling1.parentValueIndex > sibling2.parentValueIndex
        );
      }
    } else return sibling2.isRight;
  }

  /**
   * Returns the waypoint with the given senderID and counter,
   * throwing an error if it does not exist.
   */
  getWaypoint(senderID: string, counter: number): Waypoint {
    const bySender = this.waypointsByID.get(senderID);
    if (bySender === undefined) {
      throw new Error("Invalid position: unknown senderID");
    }

    if (counter < 0) {
      throw new Error("Invalid position: counter < 0");
    }
    if (counter >= bySender.length) {
      throw new Error("Invalid position: unknown counter");
    }
    return bySender[counter];
  }

  /**
   * Returns the [[Position]] representation of (waypoint, valueIndex).
   *
   * Invert with [[decode]].
   */
  encode(waypoint: Waypoint, valueIndex: number): Position {
    // OPT: more efficient number encodings?
    return `${waypoint.counter.toString(RADIX)}.${valueIndex.toString(RADIX)},${
      waypoint.senderID
    }`;
  }

  /**
   * Returns the positions representing (waypoint, valueIndex + i)
   * for i in range [0, count).
   */
  encodeAll(waypoint: Waypoint, valueIndex: number, count: number): Position[] {
    const ans = new Array<Position>(count);
    for (let i = 0; i < count; i++) {
      ans[i] = this.encode(waypoint, valueIndex + i);
    }
    return ans;
  }

  /**
   * Returns the pair (waypoint, valueIndex) encoded by `position`,
   * throwing an error if the position is invalid.
   *
   * Invert with [[encode]].
   */
  decode(position: Position): [waypoint: Waypoint, valueIndex: number] {
    const dot = position.indexOf(".");
    const comma = position.indexOf(",", dot);

    const counter = Number.parseInt(position.slice(0, dot), RADIX);
    const valueIndex = Number.parseInt(position.slice(dot + 1, comma), RADIX);
    const senderID = position.slice(comma + 1);
    if (dot === -1 || comma === -1 || isNaN(counter) || isNaN(valueIndex)) {
      throw new Error(`Not a Position: ${position}`);
    }

    const waypoint = this.getWaypoint(senderID, counter);

    if (valueIndex < 0) {
      throw new Error(`Invalid valueIndex < 0: ${valueIndex}`);
    }
    return [waypoint, valueIndex];
  }

  protected savePrimitive(): Uint8Array {
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
    const parentValueIndexAndSides: number[] = [];
    for (const waypoints of this.waypointsByID.values()) {
      for (const waypoint of waypoints) {
        if (waypoint !== this.rootWaypoint) {
          const parentWaypoint = nonNull(waypoint.parentWaypoint);
          if (parentWaypoint === this.rootWaypoint) {
            parentWaypoints.push(0);
          } else {
            parentWaypoints.push(
              1 +
                nonNull(startIndices.get(parentWaypoint.senderID)) +
                parentWaypoint.counter
            );
          }
          parentValueIndexAndSides.push(
            this.valueAndSideEncode(waypoint.parentValueIndex, waypoint.isRight)
          );
        }
      }
    }

    const message = TotalOrderSave.create({
      replicaIDs,
      replicaCounts,
      parentWaypoints,
      parentValueIndexAndSides,
    });
    return TotalOrderSave.encode(message).finish();
  }

  protected loadPrimitive(
    savedState: Uint8Array | null,
    _meta: UpdateMeta
  ): void {
    if (savedState === null) return;

    const decoded = TotalOrderSave.decode(savedState);

    // Create new waypoints, merging the saved state into ours.

    // For replicaID's in order, the first new counter value.
    const counterStarts: number[] = [];
    // All of the savedState's waypoints in the order that decoded.parentWaypoints
    // indexes into: root, then same order as parentWaypoints.
    const statesWaypoints: Waypoint[] = [this.rootWaypoint];

    // replicaID's first index into decoded.parentWaypoints.
    let replicaStartIndex = 0;
    for (let i = 0; i < decoded.replicaIDs.length; i++) {
      const replicaID = decoded.replicaIDs[i];
      const replicaCount = decoded.replicaCounts[i];

      let byID = this.waypointsByID.get(replicaID);
      if (byID === undefined) {
        byID = [];
        this.waypointsByID.set(replicaID, byID);
      }
      // Counter values [byID.length, replicaCount) are new.
      counterStarts.push(byID.length);
      for (let j = byID.length; j < replicaCount; j++) {
        // Index into decoded.parentWaypoints.
        const index = replicaStartIndex + j;
        const newWaypoint = new Waypoint(
          replicaID,
          j,
          // Temporarily null in case the parent doesn't exist yet.
          // This is not externally visible.
          null,
          ...this.valueAndSideDecode(decoded.parentValueIndexAndSides[index])
        );
        byID.push(newWaypoint);
      }

      // Counter values [0, replicaCount) are known to savedState.
      for (let j = 0; j < replicaCount; j++) statesWaypoints.push(byID[j]);

      replicaStartIndex += replicaCount;
    }

    // Now that all waypoints are created, for each new waypoint,
    // fill in its parentWaypoint and add it to parentWaypoint.childWaypoints.

    replicaStartIndex = 0;
    for (let i = 0; i < decoded.replicaIDs.length; i++) {
      const replicaID = decoded.replicaIDs[i];
      const replicaCount = decoded.replicaCounts[i];
      const counterStart = counterStarts[i];

      const byID = nonNull(this.waypointsByID.get(replicaID));
      // Counter values [counterStart, replicaCount) are new.
      for (let j = counterStart; j < replicaCount; j++) {
        // Index into decoded.parentWaypoints.
        const index = replicaStartIndex + j;
        const newWaypoint = byID[j];
        // @ts-expect-error Override readonly parentWaypoint.
        newWaypoint.parentWaypoint =
          statesWaypoints[decoded.parentWaypoints[index]];
        this.addToChildren(newWaypoint);
      }

      replicaStartIndex += replicaCount;
    }
  }
}
