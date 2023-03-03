import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  UpdateMeta,
} from "@collabs/core";
import {
  WaypointStoreCreateMessage,
  WaypointStoreSave,
} from "../../../generated/proto_compiled";

/**
 * Emitted when new positions are created.
 */
export interface WaypointStoreEvent extends CollabEvent {
  /**
   * The positions' waypoint.
   */
  waypoint: Waypoint;
  /**
   * The first position's valueIndex. The rest follow sequentially.
   *
   * 0 iff the waypoint is new.
   */
  valueIndex: number;
  /**
   * The number of created positions.
   *
   * Always positive.
   */
  count: number;
}

export interface WaypointStoreEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when new positions are created.
   */
  Create: WaypointStoreEvent;
}

// TODO: doc tree structure

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
     * null only for the root. Also temporarily null
     * during loading (otherwise readonly).
     */
    public parentWaypoint: Waypoint | null,
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
  readonly childWaypoints: Waypoint[] = [];
}

// TODO: all names, docs

export class CWaypointStore extends CPrimitive<WaypointStoreEventsRecord> {
  /**
   * Map key is waypoint.senderID, index in the array is waypoint.counter.
   */
  private readonly waypointsByID = new Map<string, Waypoint[]>();
  /**
   * Root waypoint.
   */
  private readonly rootWaypoint: Waypoint;

  constructor(init: InitToken) {
    super(init);

    this.rootWaypoint = new Waypoint("", 0, null, 0, true, 1);
    this.waypointsByID.set("", [this.rootWaypoint]);
  }

  // Vars used to return the newly-created position in add().
  private inCreate = false;
  private ourCreatedPosition?: [waypoint: Waypoint, valueIndex: number] =
    undefined;

  // OPT: broadcast values in same message
  /**
   *
   * @param prevWaypoint
   * @param prevValueIndex
   * @param count
   * @returns First created position. New waypoint iff
   * valueIndex is 0.
   */
  createPositions(
    prevWaypoint: Waypoint,
    prevValueIndex: number,
    count: number
  ): [waypoint: Waypoint, valueIndex: number] {
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
      });
    }

    this.inCreate = true;
    this.sendPrimitive(WaypointStoreCreateMessage.encode(message).finish());
    const created = this.ourCreatedPosition!;
    this.ourCreatedPosition = undefined;
    this.inCreate = false;
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
    for (const child of parent.childWaypoints) {
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
    for (const child of waypoint.childWaypoints) {
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
    while (current.childWaypoints.length > 0) {
      const firstChild = current.childWaypoints[0];
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

    if (decoded.type === "extend") {
      // Extend an existing waypoint from the receiver
      // by decoded.count values.
      const waypoint = this.getWaypoint(meta.senderID, decoded.extend!.counter);
      const valueIndex = waypoint.valueCount;
      waypoint.valueCount += decoded.count;

      if (this.inCreate) {
        this.ourCreatedPosition = [waypoint, valueIndex];
      }
      this.emit("Create", {
        waypoint,
        valueIndex,
        count: decoded.count,
        meta,
      });
    } else {
      // "waypoint" (new Waypoint).
      // Get parentWaypoint.
      const parentWaypointSender = Object.prototype.hasOwnProperty.call(
        decoded.waypoint!,
        "parentWaypointSenderID"
      )
        ? decoded.waypoint!.parentWaypointSenderID!
        : meta.senderID;
      const parentWaypointCounterAndSide =
        decoded.waypoint!.parentWaypointCounterAndSide;
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

      if (this.inCreate) {
        this.ourCreatedPosition = [waypoint, 0];
      }
      this.emit("Create", {
        waypoint,
        valueIndex: 0,
        count: decoded.count,
        meta,
      });
    }
  }

  /**
   * Adds newWaypoint to parentWaypoint.childWaypoints
   * in the proper order.
   */
  private addToChildren(newWaypoint: Waypoint): void {
    // Recall child waypoints' sort order: left children
    // by valueIndex, then right children by reverse valueIndex.
    const children = newWaypoint.parentWaypoint!.childWaypoints;
    // Find i, the index of the first entry after newWaypoint.
    // OPT: If children is large, use binary search.
    let i = 0;
    for (; i < children.length; i++) {
      if (this.isChildLess(newWaypoint, children[i])) break;
    }
    children.splice(i - 1, 0, newWaypoint);
  }

  /**
   * Returns true if child1 < child2 in their parent's
   * children order.
   */
  private isChildLess(child1: Waypoint, child2: Waypoint) {
    // Recall child order: left children ordered by
    // valueIndex, then right children ordered by
    // reverse valueIndex. senderID tiebreaker.
    if (child1.isRight === child2.isRight) {
      if (child1.parentValueIndex === child2.parentValueIndex) {
        // senderID order. Identical senderIDs are impossible.
        return child1.senderID < child2.senderID;
      } else {
        // isRight: reverse valueIndex order;
        // isLeft: valueIndex order.
        // Use === as XNOR.
        return (
          child1.isRight === child1.parentValueIndex > child2.parentValueIndex
        );
      }
    } else return child2.isRight;
  }

  /**
   * Includes error checking.
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
    const events: WaypointStoreEvent[] = [];

    // 1. Loop over the loaded waypoints and add them (if new)
    // or take the max of their valueCount (if old).
    if (decoded.valueCounts[0] > this.rootWaypoint.valueCount) {
      events.push({
        waypoint: this.rootWaypoint,
        valueIndex: this.rootWaypoint.valueCount,
        count: decoded.valueCounts[0] - this.rootWaypoint.valueCount,
        meta,
      });
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

        events.push({ waypoint, valueIndex: 0, count: valueCount, meta });
      } else {
        // Existing waypoint.
        waypoints.push(existing);
        if (valueCount > existing.valueCount) {
          events.push({
            waypoint: existing,
            valueIndex: existing.valueCount,
            count: valueCount - existing.valueCount,
            meta,
          });
          existing.valueCount = valueCount;
        }
      }

      replicaCounter++;
    }

    // 2. Now that all waypoints are created, for each new waypoint,
    // fill in its parentWaypoint and add it to parentWaypoint.childWaypoints.
    for (const i of newWaypointIndices) {
      const newWaypoint = waypoints[i];
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
