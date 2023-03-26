import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  Position,
  UpdateMeta,
} from "@collabs/core";
import {
  PositionSourceCreateMessage,
  PositionSourceSave,
} from "../../generated/proto_compiled";

const RADIX = 36;

// TODO: Create event just for completeness of events?

// TODO: rewrite to use Waypoint/valueIndex interface? Expectation
// is that PositionSource uses those so you can communicate with
// LocalList in optimized way, but LocalList only uses Positions,
// except for optimized versions of other methods.

/**
 * Emitted by a [[PositionSource]] at the end of [[PositionSource.load]].
 */
export class PositionSourceLoadEvent implements CollabEvent {
  constructor(
    private readonly source: CPositionSource,
    // TODO: use this instead of functions in LocalList.loadObject
    readonly waypointDiffs: Map<Waypoint, { local: number; remote: number }>,
    readonly meta: UpdateMeta
  ) {}

  isNewLocally(position: Position): boolean {
    const [waypoint, valueIndex] = this.source.decode(position);
    const diff = this.waypointDiffs.get(waypoint);
    if (diff === undefined) return false;
    return valueIndex > diff.local;
  }

  isNewRemotely(position: Position): boolean {
    const [waypoint, valueIndex] = this.source.decode(position);
    const diff = this.waypointDiffs.get(waypoint);
    if (diff === undefined) return false;
    return valueIndex > diff.remote;
  }
}

/**
 * Events record for [[PositionSource]].
 */
export interface PositionSourceEventsRecord extends CollabEventsRecord {
  /**
   * Emitted at the end of [[PositionSource.load]].
   */
  Load: PositionSourceLoadEvent;
}

// TODO: doc tree structure

/**
 * Internal ([[CPositionSource]] and [[LocalList]]) use only.
 *
 * A waypoint in the tree of positions. See the comments above
 * [[CPositionSource]] for a description of the overall algorithm.
 */
export class Waypoint {
  constructor(
    /**
     * "" for the root.
     */
    readonly senderID: string,
    /**
     * Nonnegative, increases monotonically (so you can
     * store value arrays in an array.).
     */
    readonly counter: number,
    /**
     * null only for the root.
     */
    readonly parentWaypoint: Waypoint | null,
    /**
     * The valueIndex of our true parent (a value within
     * parentWaypoint).
     *
     * Unspecified for the root.
     */
    readonly parentValueIndex: number,
    /**
     * Our side: right (true) or left (false) child of parent.
     */
    readonly isRight: boolean,
    /**
     * The number of values (present or not) at this waypoint,
     * i.e., the number of valid valueIndex's.
     *
     * Always positive.
     */
    public valueCount: number
  ) {}

  /**
   * Child waypoints in sort order: left children
   * by valueIndex, then right children by reverse valueIndex.
   * Ties broken by senderID.
   */
  readonly children: Waypoint[] = [];
}

// TODO: all names, docs

/**
 * Generates positions for use in a collaborative list.
 *
 * This is a low-level API intended for internal use by list CRDT implementations.
 * In most apps, you are better off using [[CValueList]] or [[CList]].
 *
 * The set of allowed positions and their sort order is collaborative
 * (replicated on all devices). You can then use a [[LocalList]] to assign
 * values to those positions and to convert between indices, positions,
 * and values.
 * Note that LocalList is a local (non-collaborative) data structure, i.e.,
 * the value assignments are not automatically replicated.
 */
export class CPositionSource extends CPrimitive<PositionSourceEventsRecord> {
  /**
   * Map key is waypoint.senderID, index in the array is waypoint.counter.
   */
  private readonly waypointsByID = new Map<string, Waypoint[]>();
  /**
   * Internal ([[LocalList]]) use only.
   *
   * The root waypoint.
   */
  readonly rootWaypoint: Waypoint;

  constructor(init: InitToken) {
    super(init);

    this.rootWaypoint = new Waypoint("", 0, null, 0, true, 1);
    this.waypointsByID.set("", [this.rootWaypoint]);
  }

  // Vars used to return the newly-created position in createPositions().
  private inCreatePositions = false;
  private createPositionsRet?: [waypoint: Waypoint, valueIndex: number] =
    undefined;

  /**
   *
   * @param prevPosition
   * @param count
   * @returns First created position, use encodeAll to get actual
   * positions. (TODO: undo? Less necessary b/c only encode on sender
   * side, not all receivers. Also doesn't match prevPosition arg.)
   */
  createPositions(
    /** null to create at beginning. */
    prevPosition: Position | null,
    count: number
  ): [waypoint: Waypoint, valueIndex: number] {
    const [prevWaypoint, prevValueIndex] =
      prevPosition === null
        ? [this.rootWaypoint, 0]
        : this.decode(prevPosition);

    let parentWaypoint: Waypoint;
    let parentValueIndex: number;
    let isRight: boolean;
    if (prevWaypoint.valueCount === prevValueIndex + 1) {
      // prev is the last value in prevWaypoint.
      // Check if it already has a right child (necessarily
      // the first right-child waypoint).
      const firstRight = this.firstRightWaypoint(prevWaypoint);
      if (firstRight?.parentValueIndex === prevValueIndex) {
        // firstRight is the first right child of prev.
        // Our new position is a left child of its
        // leftmost descendant.
        parentWaypoint = this.leftmostDescendant0(firstRight);
        parentValueIndex = 0;
        isRight = false;
      } else {
        // prev has no right children.
        // Our new position is a right child of prev.
        parentWaypoint = prevWaypoint;
        parentValueIndex = prevValueIndex;
        isRight = true;
      }
    } else {
      // (prevWaypoint, prevValueIndex + 1) is a right child of prev.
      // Since valueIndex children always sort before waypoint
      // children, it's the first right child.
      // Our new position is a left child of its
      // leftmost descendant.
      [parentWaypoint, parentValueIndex] = this.leftmostDescendant(
        prevWaypoint,
        prevValueIndex + 1
      );
      isRight = false;
    }

    let message: PositionSourceCreateMessage;
    if (
      isRight &&
      parentWaypoint.senderID === this.runtime.replicaID &&
      parentValueIndex === parentWaypoint.valueCount - 1
    ) {
      // Append values to parentWaypoint instead of creating a new one.
      message = PositionSourceCreateMessage.create({
        extend: { counter: parentWaypoint.counter },
        count: count === 1 ? undefined : count,
      });
    } else {
      message = PositionSourceCreateMessage.create({
        waypoint: {
          parentWaypointSenderID:
            parentWaypoint.senderID === this.runtime.replicaID
              ? undefined
              : parentWaypoint.senderID,
          parentWaypointCounterAndSide: this.valueAndSideEncode(
            parentWaypoint.counter,
            isRight
          ),
          parentValueIndex,
        },
        count: count === 1 ? undefined : count,
      });
    }

    this.inCreatePositions = true;
    this.sendPrimitive(PositionSourceCreateMessage.encode(message).finish());
    this.inCreatePositions = false;

    const ret = this.createPositionsRet!;
    this.createPositionsRet = undefined;
    return ret;
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

  /**
   * Returns the first right-side waypoint child of parent.
   */
  private firstRightWaypoint(parent: Waypoint): Waypoint | null {
    for (const child of parent.children) {
      if (child.isRight) return child;
    }
    return null;
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

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: UpdateMeta
  ): void {
    const decoded = PositionSourceCreateMessage.decode(<Uint8Array>message);

    if (decoded.type === "extend") {
      // Extend an existing waypoint from the receiver
      // by decoded.count values.
      const waypoint = this.getWaypoint(meta.senderID, decoded.extend!.counter);
      const valueIndex = waypoint.valueCount;
      waypoint.valueCount += decoded.count;

      if (this.inCreatePositions) {
        this.createPositionsRet = [waypoint, valueIndex];
      }
    } else {
      // "waypoint" (new Waypoint).
      // Get parentWaypoint.
      const parentWaypointSender = Object.prototype.hasOwnProperty.call(
        decoded.waypoint!,
        "parentWaypointSenderID"
      )
        ? decoded.waypoint!.parentWaypointSenderID!
        : meta.senderID;
      const [parentWaypointCounter, isRight] = this.valueAndSideDecode(
        decoded.waypoint!.parentWaypointCounterAndSide
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
        decoded.waypoint!.parentValueIndex,
        isRight,
        decoded.count
      );
      // Store the waypoint.
      senderWaypoints.push(waypoint);
      this.addToChildren(waypoint);

      if (this.inCreatePositions) {
        this.createPositionsRet = [waypoint, 0];
      }
    }
  }

  /**
   * Adds newWaypoint to parentWaypoint.childWaypoints
   * in the proper order.
   */
  private addToChildren(newWaypoint: Waypoint): void {
    // Recall child waypoints' sort order: left children
    // by valueIndex, then right children by reverse valueIndex.
    const children = newWaypoint.parentWaypoint!.children;
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
   * Internal ([[LocalList]]) use only.
   *
   * Returns the waypoint identified by (senderID, counter),
   * throwing an error if it does not exist.
   */
  getWaypoint(senderID: string, counter: number): Waypoint {
    const bySender = this.waypointsByID.get(senderID);
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

  /**
   * Internal ([[LocalList]]) use only.
   *
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

  // TODO: remove "Internal use only" stuff.

  encodeAll(waypoint: Waypoint, valueIndex: number, count: number): Position[] {
    const ans = new Array<Position>(count);
    for (let i = 0; i < count; i++) {
      ans[i] = this.encode(waypoint, valueIndex + i);
    }
    return ans;
  }

  /**
   * Internal ([[LocalList]]) use only.
   *
   * Returns the pair (waypoint, valueIndex) encoded by `position`,
   * throwing an error if the position is invalid.
   *
   * Invert with [[encode]].
   */
  decode(position: Position): [waypoint: Waypoint, valueIndex: number] {
    // TODO: error checking
    const dot = position.indexOf(".");
    const comma = position.indexOf(",", dot);

    const counter = Number.parseInt(position.slice(0, dot), RADIX);
    const valueIndex = Number.parseInt(position.slice(dot + 1, comma), RADIX);
    const senderID = position.slice(comma + 1);

    const waypoint = this.getWaypoint(senderID, counter);

    if (valueIndex >= waypoint.valueCount) {
      throw new Error("Unknown position (valueIndex out of range)");
    }
    return [waypoint, valueIndex];
  }

  protected savePrimitive(): Uint8Array | null {
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
    const valueCounts: number[] = [];
    for (const waypoints of this.waypointsByID.values()) {
      for (const waypoint of waypoints) {
        valueCounts.push(waypoint.valueCount);
        if (waypoint !== this.rootWaypoint) {
          const parentWaypoint = waypoint.parentWaypoint!;
          if (parentWaypoint === this.rootWaypoint) {
            parentWaypoints.push(0);
          } else {
            parentWaypoints.push(
              1 +
                startIndices.get(parentWaypoint.senderID)! +
                parentWaypoint.counter
            );
          }
          parentValueIndexAndSides.push(
            this.valueAndSideEncode(waypoint.parentValueIndex, waypoint.isRight)
          );
        }
      }
    }

    const message = PositionSourceSave.create({
      replicaIDs,
      replicaCounts,
      parentWaypoints,
      parentValueIndexAndSides,
      valueCounts,
    });
    return PositionSourceSave.encode(message).finish();
  }

  protected loadPrimitive(savedState: Uint8Array, meta: UpdateMeta): void {
    const decoded = PositionSourceSave.decode(savedState);

    // Starts with root, then same order as parentWaypoints.
    // OPT: avoid making this whole array?
    const waypoints: Waypoint[] = [this.rootWaypoint];
    // Indices into waypoints.
    const newWaypointIndices: number[] = [];
    // For each waypoint with a different valueCount in savedState vs
    // locally before loading, stores both counts.
    const waypointDiffs = new Map<
      Waypoint,
      { local: number; remote: number }
    >();

    // 1. Loop over the loaded waypoints and add them (if new)
    // or take the max of their valueCount (if old).
    if (decoded.valueCounts[0] != this.rootWaypoint.valueCount) {
      waypointDiffs.set(this.rootWaypoint, {
        local: this.rootWaypoint.valueCount,
        remote: decoded.valueCounts[0],
      });
      this.rootWaypoint.valueCount = Math.max(
        this.rootWaypoint.valueCount,
        decoded.valueCounts[0]
      );
    }

    let replicaIDIndex = 0;
    let replicaCounter = 0;
    for (let i = 0; i < decoded.parentWaypoints.length; i++) {
      if (replicaCounter === decoded.replicaCounts[replicaIDIndex]) {
        replicaIDIndex++;
        replicaCounter = 0;
      }
      const replicaID = decoded.replicaIDs[replicaIDIndex];
      const valueCount = decoded.valueCounts[i + 1];
      const existing = this.getWaypoint(replicaID, replicaCounter);
      if (existing === undefined) {
        // New waypoint.
        const [parentValueIndex, isRight] = this.valueAndSideDecode(
          decoded.parentValueIndexAndSides[i]
        );
        const waypoint = new Waypoint(
          replicaID,
          replicaCounter,
          // Temporarily null in case it will be created later.
          // This is not externally visible because we wait to emit
          // events.
          null,
          parentValueIndex,
          isRight,
          valueCount
        );
        waypoints.push(waypoint);
        newWaypointIndices.push(i + 1);
        // Store the waypoint.
        let senderWaypoints = this.waypointsByID.get(replicaID);
        if (senderWaypoints === undefined) {
          senderWaypoints = [];
          this.waypointsByID.set(replicaID, senderWaypoints);
        }
        senderWaypoints.push(waypoint);

        waypointDiffs.set(waypoint, { local: 0, remote: valueCount });
      } else {
        // Existing waypoint.
        waypoints.push(existing);
        if (valueCount != existing.valueCount) {
          waypointDiffs.set(existing, {
            local: existing.valueCount,
            remote: valueCount,
          });
          existing.valueCount = Math.max(existing.valueCount, valueCount);
        }
      }

      replicaCounter++;
    }

    // 2. Now that all waypoints are created, for each new waypoint,
    // fill in its parentWaypoint and add it to parentWaypoint.childWaypoints.
    for (const i of newWaypointIndices) {
      const newWaypoint = waypoints[i];
      // @ts-expect-error Override readonly parentWaypoint.
      newWaypoint.parentWaypoint = waypoints[decoded.parentWaypoints[i]];
      this.addToChildren(newWaypoint);
    }

    // Emit event.
    this.emit("Load", new PositionSourceLoadEvent(this, waypointDiffs, meta));
  }
}
