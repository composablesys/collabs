import { Position, Serializer } from "@collabs/core";
import { LocalListSave } from "../../generated/proto_compiled";
import { CPositionSource, Waypoint } from "./c_position_source";

// TODO: WaypointInfo instead?
interface WaypointValues<T> {
  /**
   * The total number of present values at this
   * waypoint and its descendants.
   */
  total: number;
  // OPT: also count total values before right child waypoints,
  // to easily skip to those?
  // OPT: don't store the last deleted values (redundant with
  // waypoint.valueCount)? Would need for merging though.
  /**
   * T[] for present values, positive number for count of deleted values. Always alternates.
   *
   * If the last item would be a number (deleted), it is omitted.
   */
  items: (T[] | number)[];
}

type SubItemOrChild<T> =
  | {
      /** Else child. */
      isSubItem: true;
      /** Use item.slice(start, end) */
      item: T[];
      start: number;
      end: number;
      /** valueIndex of first value */
      valueIndex: number;
    }
  | {
      isSubItem: false;
      child: Waypoint;
      total: number;
    };

/**
 * A local (non-collaborative) data structure mapping [[Position]]s to
 * values, in list order.
 *
 * You can use a LocalList to maintain a sorted, indexable view of a
 * [[CValueList]], [[CList]], or [[CText]]'s values.
 * For example, when using a [[CList]],
 * you could store its archived values in a LocalList.
 * That would let you iterate over the archived values in list order.
 * <!-- TODO: example in docs; or, provide convenience function to
 * return the archived LocalList? -->
 *
 * To construct a LocalList that uses an existing list's positions, use
 * that list's `newLocalList` function, e.g., [[CList.newLocalList]].
 *
 * @typeParam T The value type.
 */
export class LocalList<T> {
  /**
   * Only includes nontrivial entries (total > 0).
   */
  private valuesByWaypoint = new Map<Waypoint, WaypointValues<T>>();
  private _inInitialState = true;

  /**
   * Constructs a LocalList whose allowed [[Position]]s are given by
   * `source`.
   *
   * This is a low-level API intended for internal use by list CRDT implementations.
   * To construct a LocalList that uses an existing list's positions, use
   * that list's `newLocalList` function, e.g., [[CList.newLocalList]].
   *
   * Using positions that were not generated by `source` (or a replica of
   * `source`) will cause undefined behavior.
   *
   * @param source The source for positions that may be used with this
   * LocalList.
   */
  constructor(private readonly source: CPositionSource) {}

  // TODO: bulk version of set for Create events. Should be easy
  // - just appending (to) last item.
  // If so, omit positions from Create event (linear effort, usually
  // not needed).
  // TODO: check set/delete work when acting on positions outside
  // your current known range.

  /**
   * TODO. Must be same waypoint, new positions (specialized method).
   */
  setNewSequence(position: Position, values: T[]): Position[] {
    this._inInitialState = false;

    if (values.length === 1) {
      // Common case: single new value.
      this.set(position, values[0]);
      return [position];
    }

    const [waypoint, valueIndex] = this.source.decode(position);
    // OPT: use the fact that we're inserting all at the same item,
    // plus positions are all new.
    const positions = new Array<Position>(values.length);
    for (let i = 0; i < values.length; i++) {
      positions[i] = this.source.encode(waypoint, valueIndex + i);
      this.set(positions[i], values[i]);
    }
    return positions;
  }

  set(position: Position, value: T): void {
    this._inInitialState = false;

    const [waypoint, valueIndex] = this.source.decode(position);
    const values = this.valuesByWaypoint.get(waypoint);
    if (values === undefined) {
      // Waypoint has no values currently; set them to
      // [valueIndex, [value]].
      // Except, omit 0s.
      const newItems = valueIndex === 0 ? [[value]] : [valueIndex, [value]];
      this.valuesByWaypoint.set(waypoint, {
        total: 0,
        items: newItems,
      });
      this.updateTotals(waypoint, 1);
      return;
    }

    const items = values.items;
    let remaining = valueIndex;
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i];
      if (typeof curItem !== "number") {
        if (remaining < curItem.length) {
          // Already present. Replace the current value.
          curItem[remaining] = value;
          return;
        }
        remaining -= curItem.length;
      } else {
        if (remaining < curItem) {
          // Replace curItem with
          // [remaining, [value], curItem - remaining - 1].
          // Except, omit 0s and combine [value] with
          // neighboring arrays if needed.
          let startIndex = i;
          let deleteCount = 1;
          const newItems: (T[] | number)[] = [[value]];

          if (remaining !== 0) {
            newItems.unshift(remaining);
          } else if (i !== 0) {
            // Combine [value] with left neighbor.
            startIndex--;
            deleteCount++;
            (newItems[0] as T[]).unshift(...(items[i - 1] as T[]));
          }
          if (remaining !== curItem - 1) {
            newItems.push(curItem - remaining - 1);
          } else if (i !== items.length - 1) {
            // Combine [value] with right neighbor.
            deleteCount++;
            (newItems[newItems.length - 1] as T[]).push(
              ...(items[i + 1] as T[])
            );
          }

          items.splice(startIndex, deleteCount, ...newItems);
          this.updateTotals(waypoint, 1);
          return;
        }
        remaining -= curItem;
      }
    }
    throw new Error("Internal error (set failed to find valid valueIndex)");
  }

  delete(position: Position): void {
    this._inInitialState = false;

    const [waypoint, valueIndex] = this.source.decode(position);
    const values = this.valuesByWaypoint.get(waypoint);
    if (values === undefined) {
      // Already not present.
      return;
    }
    const items = values.items;
    let remaining = valueIndex;
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i];
      if (typeof curItem === "number") {
        if (remaining < curItem) {
          // Already not present.
          return;
        }
        remaining -= curItem;
      } else {
        if (remaining < curItem.length) {
          // Replace curItem[remaining] with
          // [curItem[:remaining], 1, curItem[remaining+1:]].
          // Except, omit empty slices and combine the 1 with
          // neighboring numbers if needed.
          let startIndex = i;
          let deleteCount = 1;
          const newItems: (T[] | number)[] = [1];

          if (remaining !== 0) {
            newItems.unshift(curItem.slice(0, remaining));
          } else if (i !== 0) {
            // Combine 1 with left neighbor.
            startIndex--;
            deleteCount++;
            (newItems[0] as number) += items[i - 1] as number;
          }
          if (remaining !== curItem.length - 1) {
            newItems.push(curItem.slice(remaining + 1));
          } else if (i !== items.length - 1) {
            // Combine 1 with right neighbor.
            deleteCount++;
            (newItems[newItems.length - 1] as number) += items[i + 1] as number;
          }

          items.splice(startIndex, deleteCount, ...newItems);
          // If the last item is a number (deleted), omit it.
          if (typeof items[items.length - 1] === "number") items.pop();

          this.updateTotals(waypoint, -1);
          return;
        }
        remaining -= curItem.length;
      }
    }
    throw new Error("Internal error (delete failed to find valid valueIndex)");
  }

  /**
   * Changes total by delta for waypoint and all of its ancestors.
   * Creates/deletes WaypointValues as needed to maintain
   * (present iff total = 0) invariant.
   */
  private updateTotals(waypoint: Waypoint, delta: number): void {
    for (
      let current: Waypoint | null = waypoint;
      current !== null;
      current = current.parentWaypoint
    ) {
      const values = this.valuesByWaypoint.get(current);
      if (values === undefined) {
        // Create WaypointValues.
        // TODO: assert delta > 0
        this.valuesByWaypoint.set(current, {
          total: delta,
          items: [current.valueCount],
        });
      } else {
        values.total += delta;
        if (values.total === 0) {
          // Delete WaypointValues.
          this.valuesByWaypoint.delete(current);
        }
      }
    }
  }

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: Position): T | undefined {
    return this.locate(...this.source.decode(position))[0];
  }

  /**
   * Okay if valueIndex is waypoint.valueCount - will return
   * [undefined, false, number of values within waypoint].
   *
   * @returns [waypoint, valueIndex, value at position,
   * whether position is present, number of values within waypoint
   * (not descendants) strictly prior to position]
   */
  private locate(
    waypoint: Waypoint,
    valueIndex: number
  ): [value: T | undefined, isPresent: boolean, waypointValuesBefore: number] {
    const values = this.valuesByWaypoint.get(waypoint);
    if (values === undefined) {
      // Special not-present case.
      return [undefined, false, 0];
    }
    let remaining = valueIndex;
    let waypointValuesBefore = 0;
    for (const item of values.items) {
      if (typeof item === "number") {
        if (remaining < item) {
          return [undefined, false, waypointValuesBefore];
        }
        remaining -= item;
      } else {
        if (remaining < item.length) {
          return [item[remaining], true, waypointValuesBefore + remaining];
        }
        remaining -= item.length;
        waypointValuesBefore += item.length;
      }
    }
    // If we get here, then the valueIndex is after all present values
    // (either within the omitted final number, or the special case
    // valueIndex === waypoint.valueCount).
    return [undefined, false, waypointValuesBefore];
  }

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: Position): boolean {
    return this.locate(...this.source.decode(position))[1];
  }

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list
   * ([[hasPosition]] returns false), then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the right of position,
   * returns [[length]].
   */
  indexOfPosition(
    position: Position,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    const [waypoint, valueIndex] = this.source.decode(position);
    const [, isPresent, waypointValuesBefore] = this.locate(
      waypoint,
      valueIndex
    );
    // Will be the total number of values prior to position.
    let valuesBefore = waypointValuesBefore;

    // Add totals for child waypoints that come before valueIndex.
    // These are precisely the left children with
    // parentValueIndex <= valueIndex.
    if (waypoint.parentWaypoint !== null) {
      for (const child of waypoint.parentWaypoint.children) {
        if (child.isRight || child.parentValueIndex > waypoint.parentValueIndex)
          break;
        valuesBefore += this.total(child);
      }
    }

    // Walk up the tree and add totals for sibling values & waypoints
    // that come before our ancestor.
    for (
      let current = waypoint;
      current.parentWaypoint !== null;
      current = current.parentWaypoint
    ) {
      // Sibling values that come before current.
      valuesBefore += this.locate(
        current,
        current.isRight
          ? current.parentValueIndex + 1
          : current.parentValueIndex
      )[2];
      // Sibling waypoints that come before current.
      for (const child of current.parentWaypoint.children) {
        if (this.source.isSiblingLess(current, child)) break;
        valuesBefore += this.total(child);
      }
    }

    if (isPresent) return valuesBefore + 1;
    else {
      switch (searchDir) {
        case "none":
          return -1;
        case "left":
          return valuesBefore;
        case "right":
          return valuesBefore + 1;
      }
    }
  }

  // OPT: combine with get in one function, for faster get.
  /**
   * Returns the position currently at index.
   */
  getPosition(index: number): Position {
    if (index < 0 || index >= this.length) {
      throw new Error(`index out of bounds: ${index}, length=${this.length}`);
    }
    let remaining = index;
    let waypoint = this.source.rootWaypoint;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (const next of this.subItemsAndChildren(waypoint)) {
        if (next.isSubItem) {
          const length = next.end - next.start;
          if (remaining < length) {
            // Answer is subItem[remaining].
            return this.source.encode(waypoint, next.valueIndex + remaining);
          } else remaining -= length;
        } else {
          if (remaining < next.total) {
            // Recurse into child.
            waypoint = next.child;
            break;
          } else remaining -= next.total;
        }
      }
    }
  }

  /**
   * Returns the value currently at index.
   *
   * @throws If index is not in `[0, this.length)`.
   * Note that this differs from an ordinary Array,
   * which would instead return undefined.
   */
  get(index: number): T {
    return this.getByPosition(this.getPosition(index))!;
  }

  get length() {
    return this.total(this.source.rootWaypoint);
  }

  /** Returns an iterator for values in the list, in list order. */
  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  /**
   * Returns an iterator of [index, position, value] tuples for every
   * value in the list, in list order.
   *
   * TODO (this and other iterators): will it work with concurrent modification?
   */
  *entries(): IterableIterator<[index: number, position: Position, value: T]> {
    let index = 0;
    let waypoint: Waypoint | null = this.source.rootWaypoint;
    const stack: IterableIterator<SubItemOrChild<T>>[] = [
      this.subItemsAndChildren(this.source.rootWaypoint),
    ];
    while (waypoint !== null) {
      const iter = stack[stack.length - 1];
      const next = iter.next();
      if (next.done) {
        stack.pop();
        waypoint = waypoint.parentWaypoint;
      } else {
        const value = next.value;
        if (value.isSubItem) {
          for (let i = value.start; i < value.end; i++) {
            yield [
              index,
              this.source.encode(waypoint, value.valueIndex + i),
              value.item[i],
            ];
            index++;
          }
        } else {
          waypoint = value.child;
          stack.push(this.subItemsAndChildren(waypoint));
        }
      }
    }
  }

  private *subItemsAndChildren(
    waypoint: Waypoint
  ): IterableIterator<SubItemOrChild<T>> {
    const items = this.valuesByWaypoint.get(waypoint)!.items;
    const children = waypoint.children;
    let childIndex = 0;
    let startValueIndex = 0;
    for (const item of items) {
      const itemSize = typeof item === "number" ? item : item.length;
      // After (next startValueIndex)
      const endValueIndex = startValueIndex + itemSize;
      // Next value to yield
      let valueIndex = startValueIndex;
      for (; childIndex < children.length; childIndex++) {
        const child = children[childIndex];
        const total = this.total(child);
        if (
          !child.isRight &&
          child.parentValueIndex < endValueIndex &&
          total !== 0
        ) {
          if (valueIndex < child.parentValueIndex) {
            if (typeof item !== "number") {
              yield {
                isSubItem: true,
                item,
                start: valueIndex - startValueIndex,
                end: child.parentValueIndex - startValueIndex,
                valueIndex,
              };
            }
            valueIndex = child.parentValueIndex;
          }
          yield { isSubItem: false, child, total };
        }
      }
      if (typeof item !== "number" && valueIndex < endValueIndex) {
        yield {
          isSubItem: true,
          item,
          start: valueIndex - startValueIndex,
          end: itemSize,
          valueIndex,
        };
      }
      startValueIndex = endValueIndex;
    }
    // Visit remaining children (left children among the omitted final number,
    // and right children).
    for (; childIndex < children.length; childIndex++) {
      const child = children[childIndex];
      const total = this.total(child);
      if (this.total(waypoint) !== 0) {
        yield { isSubItem: false, child, total };
      }
    }
  }

  private total(waypoint: Waypoint): number {
    return this.valuesByWaypoint.get(waypoint)?.total ?? 0;
  }

  /** Returns an iterator for values in the list, in list order. */
  *values(): IterableIterator<T> {
    // OPT: do own walk and yield* value items.
    for (const [, , value] of this.entries()) yield value;
  }

  /** Returns an iterator for present positions, in list order. */
  *positions(): IterableIterator<Position> {
    for (const [, position] of this.entries()) yield position;
  }

  slice(start?: number, end?: number): T[] {
    // Optimize common case (slice())
    if (start === undefined && end === undefined) {
      return [...this.values()];
    } else {
      // TODO: edge cases for slice()
      start = start ?? 0;
      end = end ?? this.length;
      // OPT: optimize.
      const ans = new Array<T>(end - start);
      for (let i = start; i < end; i++) {
        ans[i - start] = this.get(i);
      }
      return ans;
    }
  }

  get inInitialState(): boolean {
    return this._inInitialState;
  }

  // TODO: utility accessors, positionOf?, clear?

  save(valueArraySerializer: Serializer<T[]>): Uint8Array {
    const replicaIDs: string[] = [];
    const replicaIDsInv = new Map<string, number>();
    replicaIDsInv.set("", 0);
    const replicaIDIndices: number[] = [];
    const counters: number[] = [];
    const totals: number[] = [];
    const itemsLengths: number[] = [];
    const itemSizes: number[] = [];
    const values: T[] = [];

    for (const [waypoint, info] of this.valuesByWaypoint) {
      let replicaIDIndex = replicaIDsInv.get(waypoint.senderID);
      if (replicaIDIndex === undefined) {
        replicaIDs.push(waypoint.senderID);
        // 1-indexed
        replicaIDIndex = replicaIDs.length;
        replicaIDsInv.set(waypoint.senderID, replicaIDIndex);
      }
      replicaIDIndices.push(replicaIDIndex);

      counters.push(waypoint.counter);
      totals.push(info.total);
      itemsLengths.push(info.items.length);
      for (const item of info.items) {
        if (typeof item === "number") {
          itemSizes.push(-item);
        } else {
          itemSizes.push(item.length);
          values.push(...item);
        }
      }
    }

    const message = LocalListSave.create({
      replicaIDs,
      replicaIDIndices,
      counters,
      totals,
      itemsLengths,
      itemSizes,
      values: valueArraySerializer.serialize(values),
    });
    return LocalListSave.encode(message).finish();
  }

  // TODO: docs: only works in initial state.
  load(savedState: Uint8Array, valueArraySerializer: Serializer<T[]>): void {
    if (!this._inInitialState) {
      throw new Error("Can only call load in the initial state");
    }
    this._inInitialState = false;

    const decoded = LocalListSave.decode(savedState);
    const values = valueArraySerializer.deserialize(decoded.values);

    let sizesIndex = 0;
    let valuesIndex = 0;
    for (let i = 0; i < decoded.replicaIDIndices.length; i++) {
      const replicaIDIndex = decoded.replicaIDIndices[i];
      const replicaID =
        replicaIDIndex === 0 ? "" : decoded.replicaIDs[replicaIDIndex - 1];
      const waypoint = this.source.getWaypoint(replicaID, decoded.counters[i]);
      const info: WaypointValues<T> = {
        total: decoded.totals[i],
        items: new Array<T[] | number>(decoded.itemsLengths[i]),
      };
      for (let j = 0; j < decoded.itemsLengths[i]; j++) {
        const itemSize = decoded.itemSizes[sizesIndex];
        sizesIndex++;
        if (itemSize < 0) info.items[j] = -itemSize;
        else {
          info.items[j] = values.slice(valuesIndex, valuesIndex + itemSize);
          valuesIndex += itemSize;
        }
      }
      this.valuesByWaypoint.set(waypoint, info);
    }
  }
}