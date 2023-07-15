import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  nonNull,
  Position,
  protobufHas,
  UpdateMeta,
} from "@collabs/core";
import {
  IPositionSourceCreateMessage,
  PositionSourceCreateMessage,
  PositionSourceSave,
} from "../../generated/proto_compiled";

const RADIX = 36;

/**
 * Event emitted when a [[CPositionSource.create]] message is received.
 *
 * This event is *not* emitted during loading;
 * [[PositionSourceLoadEvent]] is emitted instead.
 */
export interface PositionSourceCreateEvent extends CollabEvent {
  /**
   * The created positions, in list order.
   *
   * Internally, they are ([[waypoint]], [[valueIndex]] + i)
   * for i in range [0, [[count]]).
   */
  readonly positions: Position[];
  /**
   * The positions' waypoint.
   */
  readonly waypoint: Waypoint;
  /**
   * The first position's valueIndex. Further positions are in
   * a sequence with increasing valueIndex.
   */
  readonly valueIndex: number;
  /**
   * The number of created positions.
   */
  readonly count: number;
  /**
   * The optional `info` argument to [[CPositionSource.create]].
   */
  readonly info?: Uint8Array;
}

/**
 * Event emitted by a [[CPositionSource]] at the end of [[CPositionSource.load]].
 */
export class PositionSourceLoadEvent implements CollabEvent {
  /**
   * Diff between [[Waypoint.valueCount]] values in the local state
   * (prior to loading) and the remoted state (the `savedState`
   * passed to `load`).
   */
  readonly waypointDiffs: Map<Waypoint, { local: number; remote: number }>;

  /**
   * Internal (CPositionSource) use only.
   */
  constructor(
    private readonly source: CPositionSource,
    waypointDiffs: Map<Waypoint, { local: number; remote: number }>,
    readonly meta: UpdateMeta
  ) {
    this.waypointDiffs = waypointDiffs;
  }

  /**
   * Returns whether was position is new relative to the local
   * state, i.e., it was not present locally before
   * `load` was called.
   */
  isNewLocally(position: Position): boolean {
    const [waypoint, valueIndex] = this.source.decode(position);
    const diff = this.waypointDiffs.get(waypoint);
    if (diff === undefined) return false;
    // >=, because == valueCount is not a valid valueIndex.
    return valueIndex >= diff.local;
  }

  /**
   * Returns whether position is new relative to the remote
   * state, i.e., it was not present in `savedState`.
   */
  isNewRemotely(position: Position): boolean {
    const [waypoint, valueIndex] = this.source.decode(position);
    const diff = this.waypointDiffs.get(waypoint);
    if (diff === undefined) return false;
    return valueIndex >= diff.remote;
  }
}

/**
 * Events record for [[CPositionSource]].
 */
export interface PositionSourceEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when a [[CPositionSource.create]] message is received.
   */
  Create: PositionSourceCreateEvent;
  /**
   * Emitted at the end of [[CPositionSource.load]].
   */
  Load: PositionSourceLoadEvent;
}

/**
 * A waypoint in the tree of positions. See
 * [[CPositionSource]] for a description of the tree.
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
     * A counter for waypoints send by [[senderID]].
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
    readonly isRight: boolean,
    /**
     * The number of values (present or not) at this waypoint,
     * i.e., the number of valid valueIndex's. Always positive.
     *
     * Only [[CPositionSource]] may mutate this value.
     */
    public valueCount: number
  ) {}

  /**
   * This waypoint's child waypoints in sort order: left children
   * by valueIndex, then right children by reverse valueIndex,
   * with ties broken by senderID.
   *
   * Only [[CPositionSource]] may mutate this array.
   */
  readonly children: Waypoint[] = [];
}

/**
 * A source of [[Position]]s for use in a collaborative list.
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
 *
 * ### Waypoints
 *
 * Internally, each [[Position]] is represented as a pair
 * (waypoint, valueIndex), where waypoint is a [[Waypoint]]
 * and valueIndex is a nonnegative
 * integer that increases monotonically. Methods [[decode]],
 * [[encode]], and [[encodeAll]] convert between the two representations.
 *
 * Optimizing users may prefer the internal
 * representation, e.g., storing a map from waypoints to value
 * arrays instead of a map from Positions to values.
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
export class CPositionSource extends CPrimitive<PositionSourceEventsRecord> {
  /**
   * Map key is waypoint.senderID, index in the array is waypoint.counter.
   */
  private readonly waypointsByID = new Map<string, Waypoint[]>();
  /**
   * The root waypoint.
   *
   * The special position (rootWaypoint, 0) is the root of the tree of
   * positions. It technically appears first in the list of positions
   * but is usually not used.
   */
  readonly rootWaypoint: Waypoint;

  /**
   * Constructs a CPositionSource.
   */
  constructor(init: InitToken) {
    super(init);

    this.rootWaypoint = new Waypoint("", 0, null, 0, true, 1);
    this.waypointsByID.set("", [this.rootWaypoint]);
  }

  // Vars used to return the newly-created position in createPositions().
  private inCreatePositions = false;
  private createPositionsRet?: Position[] = undefined;

  /**
   * Creates `count` new positions just after prevPosition,
   * i.e., between prevPosition and the next position in the
   * list order. The positions are created collaboratively
   * (replicated on all devices).
   *
   * @param prevPosition The previous position, or null to
   * create `position` at the beginning of the list.
   * @returns The created positions, in list order.
   * Internally, they use the same waypoint with contiguously
   * increasing valueIndex.
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

    let message: IPositionSourceCreateMessage;
    if (
      isRight &&
      parentWaypoint.senderID === this.runtime.replicaID &&
      parentValueIndex === parentWaypoint.valueCount - 1
    ) {
      // Append values to parentWaypoint instead of creating a new one.
      message = {
        extend: { counter: parentWaypoint.counter },
      };
    } else {
      message = {
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
      };
    }
    message.count = count === 1 ? undefined : count;
    message.info = info;

    this.inCreatePositions = true;
    this.sendPrimitive(PositionSourceCreateMessage.encode(message).finish());
    this.inCreatePositions = false;

    const ret = nonNull(this.createPositionsRet);
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

    let waypoint: Waypoint;
    let valueIndex: number;
    if (decoded.type === "extend") {
      // Extend an existing waypoint from the receiver
      // by decoded.count values.
      waypoint = this.getWaypoint(
        meta.senderID,
        nonNull(decoded.extend).counter
      );
      valueIndex = waypoint.valueCount;
      waypoint.valueCount += decoded.count;
    } else {
      // "waypoint" (new Waypoint).
      // Get parentWaypoint.
      const decodedWaypoint = nonNull(decoded.waypoint);
      const parentWaypointSender = protobufHas(
        decodedWaypoint,
        "parentWaypointSenderID"
      )
        ? nonNull(decodedWaypoint.parentWaypointSenderID)
        : meta.senderID;
      const [parentWaypointCounter, isRight] = this.valueAndSideDecode(
        decodedWaypoint.parentWaypointCounterAndSide
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
      waypoint = new Waypoint(
        meta.senderID,
        senderWaypoints.length,
        parentWaypoint,
        decodedWaypoint.parentValueIndex,
        isRight,
        decoded.count
      );
      valueIndex = 0;
      // Store the waypoint.
      senderWaypoints.push(waypoint);
      this.addToChildren(waypoint);
    }

    const positions = this.encodeAll(waypoint, valueIndex, decoded.count);
    if (this.inCreatePositions) {
      this.createPositionsRet = positions;
    }
    this.emit("Create", {
      waypoint,
      valueIndex,
      count: decoded.count,
      positions,
      info: protobufHas(decoded, "info") ? decoded.info : undefined,
      meta,
    });
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
    if (valueIndex >= waypoint.valueCount) {
      throw new Error("Unknown position (valueIndex out of range)");
    }
    return [waypoint, valueIndex];
  }

  /**
   * Returns an iterable for waypoints in this CPositionSource, in arbitrary
   * order.
   *
   * Waypoints created while the iterator is running may or may not be
   * included.
   */
  *waypoints(): IterableIterator<Waypoint> {
    yield this.rootWaypoint;
    for (const senderWaypoints of this.waypointsByID.values()) {
      yield* senderWaypoints;
    }
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
    const valueCounts: number[] = [];
    for (const waypoints of this.waypointsByID.values()) {
      for (const waypoint of waypoints) {
        valueCounts.push(waypoint.valueCount);
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

    const message = PositionSourceSave.create({
      replicaIDs,
      replicaCounts,
      parentWaypoints,
      parentValueIndexAndSides,
      valueCounts,
    });
    return PositionSourceSave.encode(message).finish();
  }

  protected loadPrimitive(
    savedState: Uint8Array | null,
    meta: UpdateMeta
  ): void {
    if (savedState === null) return;

    const decoded = PositionSourceSave.decode(savedState);

    // Starts with root, then same order as decoded.parentWaypoints.
    // OPT: avoid making this whole array?
    const waypoints: Waypoint[] = [this.rootWaypoint];
    // Indices into decoded.parentWaypoints, which is one less than
    // the index into waypoints.
    const newWaypointIndices: number[] = [];
    // For each waypoint with a different valueCount in savedState vs
    // locally before loading, stores both counts.
    const waypointDiffs = new Map<
      Waypoint,
      { local: number; remote: number }
    >();

    // 1. Fill in waypointDiffs with waypoints that are present locally but
    // not remotely.
    const replicaIDsInv = new Map<string, number>();
    for (let i = 0; i < decoded.replicaIDs.length; i++) {
      replicaIDsInv.set(decoded.replicaIDs[i], i);
    }
    for (const [replicaID, waypoints] of this.waypointsByID) {
      if (replicaID === "") continue;
      const index = replicaIDsInv.get(replicaID);
      const replicaCount =
        index === undefined ? 0 : decoded.replicaCounts[index];
      // All of replicaID's waypoints with index >= replicaCount are present
      // locally but not remotely.
      // OPT: avoid this loop, just store the length diff.
      for (let j = replicaCount; j < waypoints.length; j++) {
        waypointDiffs.set(waypoints[j], {
          local: waypoints[j].valueCount,
          remote: 0,
        });
      }
    }

    // 2. Loop over the loaded waypoints and add them (if new)
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
      const existing = this.waypointsByID.get(replicaID)?.[replicaCounter];
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
        newWaypointIndices.push(i);
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

    // 3. Now that all waypoints are created, for each new waypoint,
    // fill in its parentWaypoint and add it to parentWaypoint.childWaypoints.
    for (const i of newWaypointIndices) {
      const newWaypoint = waypoints[i + 1];
      // @ts-expect-error Override readonly parentWaypoint.
      newWaypoint.parentWaypoint = waypoints[decoded.parentWaypoints[i]];
      this.addToChildren(newWaypoint);
    }

    // Emit event.
    this.emit("Load", new PositionSourceLoadEvent(this, waypointDiffs, meta));
  }
}
