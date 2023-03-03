import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  UpdateMeta,
} from "@collabs/core";
import { WaypointStoreCreateMessage } from "../../../generated/proto_compiled";

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
          parentWaypointCounterAndSide: isRight
            ? parentWaypoint.counter
            : ~parentWaypoint.counter,
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
      const isRight = parentWaypointCounterAndSide >= 0;
      const parentWaypointCounter = isRight
        ? parentWaypointCounterAndSide
        : ~parentWaypointCounterAndSide;
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
      this.addToChildren(waypoint, parentWaypoint);

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
   * Adds newWaypoint to parentWaypoint.children
   * in the proper order.
   */
  private addToChildren(newWaypoint: Waypoint, parentWaypoint: Waypoint): void {
    // Recall child waypoints' sort order: left children
    // by valueIndex, then right children by reverse valueIndex.
    const children = parentWaypoint.childWaypoints;
    // Find i, the index of the first entry after newWaypoint.
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
    throw new Error("Method not implemented.");
  }

  protected loadPrimitive(savedState: Uint8Array, meta: UpdateMeta): void {
    throw new Error("Method not implemented.");
    // TODO: fill children
  }
}
