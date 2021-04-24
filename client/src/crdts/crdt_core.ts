import { CausalBroadcastNetwork, CausalTimestamp } from "../network";
import { CrdtRuntimeMessage } from "../../generated/proto_compiled";
import { EventEmitter } from "../utils/EventEmitter";
import cryptoRandomString from "crypto-random-string";
import { arrayAsString, stringAsArray } from "./utils";

/**
 * An event issued when a CRDT is changed by another replica.
 * Crdt's should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed by a remote message (i.e., in a
 * remote method when remoteCaller is false).
 */
export interface CrdtEvent {
  /** The Crdt instance that was changed. */
  readonly caller: Crdt;

  /**
   * The causal timestamp of the change. Note that
   * because several CRDTs can share the same runtime, timestamps
   * may not be continguous (e.g., entries in their vector clocks
   * might skip numbers).  However, causally ordered delivery is
   * still guaranteed.
   * */
  readonly timestamp: CausalTimestamp;
}

export interface CrdtEventsRecord {
  Change: CrdtEvent;
}

/**
 * TODO.  Should only be implemented by Crdt's
 * (except for the internal CrdtRoot).
 */
export interface CrdtParent {
  readonly runtime: CrdtRuntime;
  pathToRoot(): string[];
  /**
   * Callback called by a child at the end of init when this is passed
   * to init as parent.  It should throw an error if this is not the
   * object calling init.
   * @param child the child Crdt on which init was called with this as parent
   */
  onChildInit(child: Crdt): void;
}

export abstract class Crdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends EventEmitter<Events> {
  private static readonly notYetInitMessage =
    "this value is not available until after Crdt.init() " +
    "(consider overriding init() and doing this after super.init())";
  protected afterInit = false;

  private runtimePrivate?: CrdtRuntime;
  get runtime(): CrdtRuntime {
    if (this.runtimePrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.runtimePrivate;
  }

  private parentPrivate?: CrdtParent;
  get parent(): CrdtParent {
    if (this.parentPrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.parentPrivate;
  }

  private namePrivate?: string;
  get name(): string {
    if (this.namePrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.namePrivate;
  }

  pathToRoot(): string[] {
    return [this.name, ...this.parent.pathToRoot()];
  }

  /**
   * TODO: this should only be called by parent.  Rename to reflect that,
   * and update error message above.
   * @param parentOrRuntime A parent for this Crdt, either another
   * Crdt, or the CrdtRuntime if this has no Crdt parent.
   * Typically parent will be the Crdt containing this
   * as an instance variable, or the CrdtRuntime if there is
   * no such Crdt.  Crdts with the same parent share a common
   * namespace and causal consistency group, and the default
   * reset() behavior is to call reset() on each child.
   * Different replicas of a Crdt must be assigned parents
   * which are also replicas of each other.
   * @param name      A name for this Crdt.  All Crdts with the
   * same parent must have distinct names, and the names must
   * be the same for all replicas of a given CRDT, in order
   * for the CrdtRuntime to route messages to them properly.
   */
  init(name: string, parent: CrdtParent) {
    if (this.runtimePrivate !== undefined) {
      throw new Error(
        "init() has already been called" +
          " (did you try to give this Crdt two parents?)"
      );
    }
    this.runtimePrivate = parent.runtime;
    this.parentPrivate = parent;
    this.namePrivate = name;
    this.afterInit = true;
  }

  /**
   * Callback used by this Crdt's CrdtParent to deliver
   * a message, possibly for one of this Crdt's descendants.
   * This method calls receiveInternal and
   * then dispatches a "Change" event.
   *
   * Final method (do not override).
   * @targetPath: the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * excluding the current Crdt.  TODO: warning: mutated
   * @param timestamp The timestamp of the received message
   * @param message   The received message
   */
  receive(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receiveInternal(targetPath, timestamp, message);
    this.emit("Change", { caller: this, timestamp: timestamp });
  }

  /**
   * Core method used to receive messages, possibly for
   * one of this Crdt's descendants.  See
   * receive.
   * @targetPath: the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * excluding the current Crdt.
   * @param timestamp The timestamp of the received message
   * @param message   The received message
   */
  protected abstract receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void;
  // TODO: use (homebrew?) iterator for targetPath.
  // Make it easy to copy for multiple uses (copying
  // index but not the underlying array).

  abstract getDescendant(targetPath: string[]): Crdt;

  /**
   * If this Crdt is in its initial, post-constructor state, then
   * this method may (but is not required to) return true.  Users of
   * this Crdt may then delete it from memory ("garbage collection"),
   * recreating it using the
   * same constructor arguments if needed later.  That reduces
   * the state space of some Crdt's, such as LazyMap.
   *
   * The default implementation always returns false, which is safe but
   * may unnecessarily increase the state size of Crdt's using this
   * Crdt (in particular LazyMap).
   */
  canGC(): boolean {
    return false;
  }
}

/**
 * Interface describing a Crdt which stores all of its mutable state
 * in a single readonly variable state of type S.
 * Such a Crdt must continue
 * to function after state is mutated or even replaced (ignoring state's
 * readonly property) as if it had changed state itself.
 *
 * This interace is used by SemidirectProduct, which composes two
 * StatefulCrdt's of the same type, unifying their states by setting
 * both state variables equal to the same value.
 *
 * @param S the type of state
 */
export interface StatefulCrdt<
  S extends Object,
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends Crdt<Events> {
  /**
   * Not for external use, except by SemidirectProduct.
   */
  readonly state: S;
}

export abstract class PrimitiveCrdt<
    S extends Object,
    Events extends CrdtEventsRecord = CrdtEventsRecord
  >
  extends Crdt<Events>
  implements StatefulCrdt<S, Events> {
  readonly state: S;

  constructor(state: S) {
    super();
    this.state = state;
  }

  protected send(message: Uint8Array) {
    this.runtime.send(this, message);
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // TODO: use (homebrew?) iterator for targetPath.
    // Make it easy to copy for multiple uses (copying
    // index but not the underlying array).
    if (targetPath.length !== 0) {
      // We are not the target
      throw new Error("PrimitiveCrdt received message for child");
    }
    this.receivePrimitive(timestamp, message);
  }

  /**
   * Receives messages sent by send
   * on replicas of this crdt (including those sent
   * locally).
   * @param  timestamp  [description]
   * @param  message    [description]
   */
  protected abstract receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void;

  getDescendant(targetPath: string[]) {
    if (targetPath.length === 0) return this;
    else {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: [] (PrimitiveCrdt)"
      );
    }
  }
}

export class CompositeCrdt<
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    C extends Crdt = Crdt
  >
  extends Crdt<Events>
  implements CrdtParent {
  private readonly children: Map<string, C> = new Map();

  /**
   * TODO.  child returned to allow writing e.g.
   * this.foo = this.addChild("foo", new Counter());
   *
   * TODO: pass constructor and params instead, to enforce that the Crdt
   * is fresh and that we will call init?
   *
   * TODO: instead of passing name, just use 0, 1, 2, ...?
   */
  protected addChild<D extends C>(name: string, child: D): D {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    this.children.set(name, child);
    if (this.afterInit) this.initChild(name, child);
    return child;
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    // Init children added before init was called
    for (let entry of this.children.entries()) {
      this.initChild(entry[0], entry[1]);
    }
  }

  private initChild(name: string, child: C) {
    this.childBeingAdded = child;
    child.init(name, this);
    this.childBeingAdded = undefined;
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.addChild instead)"
      );
    }
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      // We are the target
      throw new Error("TODO");
    }

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      // TODO: deliver error somewhere reasonable
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    targetPath.length--;
    child.receive(targetPath, timestamp, message);
  }

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    targetPath.length--;
    return child.getDescendant(targetPath);
  }

  canGC(): boolean {
    for (let child of this.children.values()) {
      if (!child.canGC()) return false;
    }
    return true;
  }
}

class CrdtRoot implements CrdtParent {
  constructor(readonly runtime: CrdtRuntime) {}
  pathToRoot() {
    return [];
  }
  // Since this is private in CrdtRuntime, we don't have to worry about
  // this being passed to Crdt.init outside of our control.
  onChildInit(_child: Crdt): void {}
}

// TODO: conventions: set listener var instead of this.network.register;
// onEtc method names instead of receive

// TODO: docs in this file

// Note that pointers stored in pointerByCrdt and messages
// are one greater than the corresponding index in
// pointers; 0 denotes the group parent, which is not stored in
// pointers.
interface BatchInfo {
  pointers: { parent: number; name: Uint8Array }[];
  pointerByCrdt: Map<Crdt, number>;
  messages: { sender: number; innerMessage: Uint8Array }[];
  firstTimestamp: CausalTimestamp;
  previousTimestamp: CausalTimestamp;
}

const REPLICA_ID_LENGTH = 11;
const REPLICA_ID_CHARS = allAscii();
function allAscii() {
  let arr = new Array<number>(128);
  for (let i = 0; i < 128; i++) arr[i] = i;
  return String.fromCharCode(...arr);
}

export class CrdtRuntime {
  private readonly replicaId: string;
  private readonly crdtRoot: CrdtRoot;
  private readonly groupParents = new Map<string, GroupParent>();
  private readonly pendingBatches = new Map<string, BatchInfo>();
  private readonly batchType: "immediate" | "manual" | "periodic";
  private readonly batchingPeriodMs: number | undefined;

  /**
   * @param readonlynetwork [description]
   * @param batchOptions    [description]
   * @param debugReplicaId  Set a replicaId explicitly.
   * Debug use only (e.g. ensuring determinism in tests).
   */
  constructor(
    readonly network: CausalBroadcastNetwork,
    batchOptions: "immediate" | "manual" | { periodMs: number } = "immediate",
    debugReplicaId: string | undefined = undefined
  ) {
    if (debugReplicaId) this.replicaId = debugReplicaId;
    else {
      this.replicaId = cryptoRandomString({
        length: REPLICA_ID_LENGTH,
        characters: REPLICA_ID_CHARS,
      });
    }
    this.network.register(this);
    this.crdtRoot = new CrdtRoot(this);
    if (typeof batchOptions === "object") {
      this.batchType = "periodic";
      this.batchingPeriodMs = batchOptions.periodMs;
    } else {
      this.batchType = batchOptions;
      this.batchingPeriodMs = undefined;
    }
  }

  // TODO: rename this to group, group to groupName?
  groupParent(group: string): GroupParent {
    let groupParent = this.groupParents.get(group);
    if (groupParent === undefined) {
      // Joining group for the first time
      this.network.joinGroup(group);
      groupParent = new GroupParent();
      groupParent.init(group, this.crdtRoot);
      this.groupParents.set(group, groupParent);
    }
    return groupParent;
  }

  send(sender: Crdt, message: Uint8Array) {
    let pathToRoot = sender.pathToRoot();
    let group = pathToRoot[pathToRoot.length - 1];

    // TODO: reuse batchInfo's, to avoid object creation, since set
    // of groups should remain constant.
    let batchInfo = this.pendingBatches.get(group);
    let timestamp: CausalTimestamp;
    let newBatch = false;
    if (batchInfo === undefined) {
      timestamp = this.network.beginBatch(group);
      batchInfo = {
        pointers: [],
        pointerByCrdt: new Map(),
        messages: [],
        firstTimestamp: timestamp,
        previousTimestamp: timestamp,
      };
      this.pendingBatches.set(group, batchInfo);
      newBatch = true;
    } else {
      timestamp = this.network.nextTimestamp(batchInfo.previousTimestamp);
    }

    // Deliver to self, synchronously
    // TODO: error handling
    let groupParent = this.groupParents.get(group)!;
    groupParent.receive(
      pathToRoot.slice(0, pathToRoot.length - 1),
      timestamp,
      message
    );

    // Add to the pending batch
    let pointer = this.getPointer(batchInfo, sender, groupParent);
    batchInfo.messages.push({
      sender: pointer,
      innerMessage: message,
    });
    batchInfo.previousTimestamp = timestamp;

    if (this.batchType === "immediate") {
      // Send immediately
      this.commitBatch(group);
    } else if (newBatch && this.batchType === "periodic") {
      setTimeout(() => this.commitBatch(group), this.batchingPeriodMs!);
    }
  }

  private getPointer(
    batchInfo: BatchInfo,
    to: Crdt,
    groupParent: GroupParent
  ): number {
    // Base case: group parent
    if (to === groupParent) return 0;

    // Check if it already exists in pointers
    let toCrdt = to as Crdt;
    let existing = batchInfo.pointerByCrdt.get(toCrdt);
    if (existing !== undefined) return existing;

    // Add it the pointers list.  First need to make
    // sure its parent is added.
    let parentPointer = this.getPointer(
      batchInfo,
      (toCrdt.parent as unknown) as Crdt,
      groupParent
    );
    let newPointer = batchInfo.pointers.length + 1;
    batchInfo.pointers.push({
      parent: parentPointer,
      name: stringAsArray(toCrdt.name),
    });
    batchInfo.pointerByCrdt.set(toCrdt, newPointer);
    return newPointer;
  }

  commitBatch(group: string) {
    let batchInfo = this.pendingBatches.get(group);
    if (batchInfo === undefined) return;
    this.pendingBatches.delete(group);

    // Serialize the batch and send it over this.network
    let runtimeMessage = CrdtRuntimeMessage.create({
      pointerParents: batchInfo.pointers.map((pointer) => pointer.parent),
      pointerNames: batchInfo.pointers.map((pointer) => pointer.name),
      messageSenders: batchInfo.messages.map((message) => message.sender),
      innerMessages: batchInfo.messages.map((message) => message.innerMessage),
    });
    let buffer = CrdtRuntimeMessage.encode(runtimeMessage).finish();
    this.network.commitBatch(
      group,
      buffer,
      batchInfo.firstTimestamp,
      batchInfo.previousTimestamp
    );
  }

  commitAll() {
    for (let group of this.pendingBatches.keys()) this.commitBatch(group);
  }

  /**
   * Callback for CausalBroadcastNetwork.
   *
   * Returns the CausalTimestamp of the last message processed.
   */
  receive(
    group: string,
    message: Uint8Array,
    firstTimestamp: CausalTimestamp
  ): CausalTimestamp {
    if (this.pendingBatches.has(group)) {
      throw new Error(
        'CrdtRuntime.receive called, but group "' +
          group +
          '" has a pending send batch'
      );
    }
    // TODO: error handling
    let decoded = CrdtRuntimeMessage.decode(message);

    // Build up the map from pointers to pathToGroup's.
    // Index 0 is for the groupParent, whose pathToGroup
    // is [].
    let pathToGroups: string[][] = [[]];
    for (let i = 0; i < decoded.pointerParents.length; i++) {
      pathToGroups.push([
        arrayAsString(decoded.pointerNames[i]),
        ...pathToGroups[decoded.pointerParents[i]],
      ]);
    }

    // Deliver messages
    let groupParent = this.groupParents.get(group)!;
    let timestamp = firstTimestamp;
    for (let i = 0; i < decoded.messageSenders.length; i++) {
      if (i !== 0) timestamp = this.network.nextTimestamp(timestamp);
      try {
        groupParent.receive(
          pathToGroups[decoded.messageSenders[i]].slice(),
          timestamp,
          decoded.innerMessages[i]
        );
      } catch (e) {
        // TODO: handle gracefully
        throw e;
      }
    }
    return timestamp;
  }

  getReplicaId(): string {
    return this.replicaId;
  }

  // TODO: warning: pathToRoot is mutated!  (Change this?)
  getCrdtByReference(pathToRoot: string[]): Crdt {
    // TODO: optimize?
    let groupParent = this.groupParents.get(pathToRoot[pathToRoot.length - 1]);
    if (groupParent === undefined) {
      throw new Error("Unknown group: " + pathToRoot[pathToRoot.length - 1]);
    }
    pathToRoot.length--;
    return groupParent.getDescendant(pathToRoot);
  }

  private idCounter = 0;
  /**
   * @return A unique string that will only appear once
   * across all replicas, obtained by concatenating our
   * replica id with a counter.
   */
  getUniqueString() {
    // TODO: shorten?  (base64 instead of base10)
    return this.getReplicaUniqueNumber() + " " + this.getReplicaId();
  }

  /**
   * @return A unique number that will only be
   * associated with this runtime's replica id
   * once, obtained using a counter.
   */
  getReplicaUniqueNumber() {
    return this.idCounter++;
  }
}
