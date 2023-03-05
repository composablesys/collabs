import { CWaypointStore, Waypoint } from "./c_waypoint_store";

const RADIX = 36;

// TODO: use this in IList instead of string;
// move position docs from IList to its header;
// reference [[Position]] instead of position in IList/CList
// function headers?
export type Position = string;

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
   * Always fills the whole waypoint.valueCount.
   */
  items: (T[] | number)[];
}

/**
 * Non-collaborative (local data structure).
 *
 * Ordered map from [[Position]]s (opaque strings) to values.
 */
export class ListView<T> {
  /**
   * Missing entry = all deleted values for that waypoint
   * and its descendants, equiv,
   * total = 0.
   */
  private valuesByWaypoint = new Map<Waypoint, WaypointValues<T>>();

  constructor(readonly waypointStore: CWaypointStore) {
    this.waypointStore.on("Create", (e) => {
      const values = this.valuesByWaypoint.get(e.waypoint);
      if (values !== undefined) {
        const items = values.items;
        // Append e.count deleted values to items.
        if (typeof items[items.length - 1] === "number") {
          (items[items.length - 1] as number) += e.count;
        } else {
          items.push(e.count);
        }
      }
      // Else leave it as all-deleted (= not present in valuesByWaypoint).
    });
  }

  private positionEncode(waypoint: Waypoint, valueIndex: number): Position {
    // OPT: more efficient number encodings?
    return `${waypoint.counter.toString(RADIX)}.${valueIndex.toString(RADIX)},${
      waypoint.senderID
    }`;
  }

  /**
   * Also bounds-checks valueIndex.
   * @param position
   */
  private positionDecode(
    position: Position
  ): [waypoint: Waypoint, valueIndex: number] {
    // TODO: error checking
    const dot = position.indexOf(".");
    const comma = position.indexOf(",", dot);

    const counter = Number.parseInt(position.slice(0, dot), RADIX);
    const valueIndex = Number.parseInt(position.slice(dot + 1, comma), RADIX);
    const senderID = position.slice(comma + 1);

    const waypoint = this.waypointStore.getWaypoint(senderID, counter);

    if (valueIndex >= waypoint.valueCount) {
      throw new Error("Unknown position (valueIndex out of range)");
    }
    return [waypoint, valueIndex];
  }

  // TODO: bulk versions of set/delete, at least for Create events.
  set(position: Position, value: T): void {
    const [waypoint, valueIndex] = this.positionDecode(position);
    const values = this.valuesByWaypoint.get(waypoint);
    if (values === undefined) {
      // Waypoint has no values currently; set them to
      // [valueIndex, [value], valueCount - valueIndex - 1].
      // Except, omit 0s.
      const newItems: (T[] | number)[] = [[value]];
      if (valueIndex !== 0) {
        newItems.unshift(valueIndex);
      }
      if (waypoint.valueCount - valueIndex - 1 !== 0) {
        newItems.push(waypoint.valueCount - valueIndex - 1);
      }
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
    const [waypoint, valueIndex] = this.positionDecode(position);
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
    return this.locate(...this.positionDecode(position))[0];
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
    if (remaining === 0) {
      // Special case: valueIndex is waypoint.valueCount.
      return [undefined, false, waypointValuesBefore];
    }
    throw new Error("Internal error (locate failed to find valid valueIndex)");
  }

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: Position): boolean {
    return this.locate(...this.positionDecode(position))[1];
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
    position: string,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    const [waypoint, valueIndex] = this.positionDecode(position);
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
      for (const child of waypoint.parentWaypoint.childWaypoints) {
        if (child.isRight || child.parentValueIndex > waypoint.parentValueIndex)
          break;
        valuesBefore += this.valuesByWaypoint.get(child)?.total ?? 0;
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
      for (const child of current.parentWaypoint.childWaypoints) {
        if (this.waypointStore.isChildLess(current, child)) break;
        valuesBefore += this.valuesByWaypoint.get(child)?.total ?? 0;
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
    let waypoint = this.waypointStore.rootWaypoint;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (const stuff of this.waypointStuffs(waypoint)) {
        if (stuff.isSubItem) {
          const length = stuff.end - stuff.start;
          if (remaining < length) {
            // Answer is subItem[remaining].
            return this.positionEncode(waypoint, stuff.valueIndex + remaining);
          } else remaining -= length;
        } else {
          if (remaining < stuff.total) {
            // Recurse into child.
            waypoint = stuff.child;
            break;
          } else remaining -= stuff.total;
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
    return (
      this.valuesByWaypoint.get(this.waypointStore.rootWaypoint)?.total ?? 0
    );
  }

  /** Returns an iterator for values in the list, in list order. */
  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  /**
   * Returns an iterator of [index, position, value] tuples for every
   * value in the list, in list order.
   */
  *entries(): IterableIterator<[index: number, position: Position, value: T]> {
    let index = 0;
    let waypoint: Waypoint | null = this.waypointStore.rootWaypoint;
    const stack: IterableIterator<WaypointStuff<T>>[] = [
      this.waypointStuffs(this.waypointStore.rootWaypoint),
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
              this.positionEncode(waypoint, value.valueIndex + i),
              value.item[i],
            ];
            index++;
          }
        } else {
          waypoint = value.child;
          stack.push(this.waypointStuffs(waypoint));
        }
      }
    }
  }

  private *waypointStuffs(
    waypoint: Waypoint
  ): IterableIterator<WaypointStuff<T>> {
    const items = this.valuesByWaypoint.get(waypoint)!.items;
    const children = waypoint.childWaypoints;
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
    // Visit right children.
    for (; childIndex < children.length; childIndex++) {
      const child = children[childIndex];
      const total = this.total(child);
      if (this.total(waypoint) !== 0) {
        yield { isSubItem: false, child, total };
      }
    }
  }

  // TODO: use in existing places
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

  // TODO: utility accessors, positionOf?, clear?
}

// TODO: rename (& method), move up top
type WaypointStuff<T> =
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
