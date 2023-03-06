import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  Position,
  UpdateMeta,
} from "@collabs/core";
import {
  WaypointStoreCreateMessage,
  WaypointStoreSave,
} from "../../generated/proto_compiled";

const RADIX = 36;

/**
 * Emitted when new positions are created.
 */
export interface PositionSourceEvent extends CollabEvent {
  /**
   * The created positions, in order. They are contiguous.
   */
  positions: Position[];
  /**
   * The info argument to [[CWaypointStore.createPositions]].
   *
   * This property is always undefined for events emitted during
   * loading, even if it was defined for the original operation.
   * You will need to manually save and load any info carried by
   * this field.
   */
  info: Uint8Array | undefined;
}

export interface PositionSourceEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when new positions are created.
   */
  Create: PositionSourceEvent;
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
  private ourCreatedPositions?: Position[] = undefined;

  /**
   *
   * @param prevPosition
   * @param count
   * @param info
   * @returns Created positions, in order.
   */
  createPositions(
    /** null to create at beginning. */
    prevPosition: Position | null,
    count: number,
    info?: Uint8Array
  ): Position[] {
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

    let message: WaypointStoreCreateMessage;
    if (
      isRight &&
      parentWaypoint.senderID === this.runtime.replicaID &&
      parentValueIndex === parentWaypoint.valueCount - 1
    ) {
      // Append values to parentWaypoint instead of creating a new one.
      message = WaypointStoreCreateMessage.create({
        extend: { counter: parentWaypoint.counter },
        count: count === 1 ? undefined : count,
        info,
      });
    } else {
      message = WaypointStoreCreateMessage.create({
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
        info,
      });
    }

    this.inCreatePositions = true;
    this.sendPrimitive(WaypointStoreCreateMessage.encode(message).finish());
    const created = this.ourCreatedPositions!;
    this.ourCreatedPositions = undefined;
    this.inCreatePositions = false;
    return created;
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
    const decoded = WaypointStoreCreateMessage.decode(<Uint8Array>message);
    const info = Object.prototype.hasOwnProperty.call(decoded, "info")
      ? decoded.info
      : undefined;

    if (decoded.type === "extend") {
      // Extend an existing waypoint from the receiver
      // by decoded.count values.
      const waypoint = this.getWaypoint(meta.senderID, decoded.extend!.counter);
      const valueIndex = waypoint.valueCount;
      waypoint.valueCount += decoded.count;

      const event = this.newEvent(
        waypoint,
        valueIndex,
        decoded.count,
        info,
        meta
      );
      if (this.inCreatePositions) {
        this.ourCreatedPositions = event.positions;
      }
      this.emit("Create", event);
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

      const event = this.newEvent(waypoint, 0, decoded.count, info, meta);
      if (this.inCreatePositions) {
        this.ourCreatedPositions = event.positions;
      }
      this.emit("Create", event);
    }
  }

  private newEvent(
    waypoint: Waypoint,
    valueIndex: number,
    count: number,
    info: Uint8Array | undefined,
    meta: UpdateMeta
  ): PositionSourceEvent {
    const positions = new Array<Position>(count);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = this.encode(waypoint, valueIndex + i);
    }
    return { positions, info, meta };
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
    children.splice(i - 1, 0, newWaypoint);
  }

  /**
   * Internal ([[LocalList]]) use only.
   *
   * Returns true if sibling1 < sibling2 in the sibling order.
   */
  isSiblingLess(sibling1: Waypoint, sibling2: Waypoint) {
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

    const message = WaypointStoreSave.create({
      replicaIDs,
      replicaCounts,
      parentWaypoints,
      parentValueIndexAndSides,
      valueCounts,
    });
    return WaypointStoreSave.encode(message).finish();
  }

  protected loadPrimitive(savedState: Uint8Array, meta: UpdateMeta): void {
    const decoded = WaypointStoreSave.decode(savedState);

    // Starts with root, then same order as parentWaypoints.
    // OPT: avoid making this whole array?
    const waypoints: Waypoint[] = [this.rootWaypoint];
    // Indices into waypoints.
    const newWaypointIndices: number[] = [];
    const events: PositionSourceEvent[] = [];

    // 1. Loop over the loaded waypoints and add them (if new)
    // or take the max of their valueCount (if old).
    if (decoded.valueCounts[0] > this.rootWaypoint.valueCount) {
      events.push(
        this.newEvent(
          this.rootWaypoint,
          this.rootWaypoint.valueCount,
          decoded.valueCounts[0] - this.rootWaypoint.valueCount,
          undefined,
          meta
        )
      );
      this.rootWaypoint.valueCount = decoded.valueCounts[0];
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

        events.push(this.newEvent(waypoint, 0, valueCount, undefined, meta));
      } else {
        // Existing waypoint.
        waypoints.push(existing);
        if (valueCount > existing.valueCount) {
          events.push(
            this.newEvent(
              existing,
              existing.valueCount,
              valueCount - existing.valueCount,
              undefined,
              meta
            )
          );
          existing.valueCount = valueCount;
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

    // TODO: doc that events are behind;
    // also, might get child before its parent.
    for (const event of events) {
      this.emit("Create", event);
    }
  }
}
