import { CausalBroadcastNetwork, CausalTimestamp } from "../network";
import { CrdtRuntimeMessage } from "../../generated/proto_compiled";
import { EventEmitter } from "../utils/EventEmitter";
import uuid from "uuid";

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
 * TODO
 */
export interface CrdtParent {
  readonly runtime: CrdtRuntime;
  readonly pathToRoot: readonly string[];
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

  private pathToRootPrivate?: readonly string[];
  /**
   * The names of this crdt and all of its ancestors in order
   * from this crdt on up.
   */
  get pathToRoot(): readonly string[] {
    if (this.pathToRootPrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.pathToRootPrivate;
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
    this.pathToRootPrivate = Object.freeze([name, ...parent.pathToRoot]);
    this.afterInit = true;
  }

  /**
   * Callback used by CrdtRuntime or a parent Crdt.
   * @targetPath: the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * excluding the current Crdt.  TODO: warning: mutated
   * @param timestamp The timestamp of the received message
   * @param message   The received message
   */
  abstract receiveGeneral(
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

  // TODO: receive: use "final" hack? https://github.com/microsoft/TypeScript/issues/33446#issuecomment-692928123
  receiveGeneral(
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
    this.receive(timestamp, message);

    // TODO: do this in Crdt instead
    this.emit("Change", { caller: this, timestamp });
  }

  /**
   * Receives messages sent by send
   * on replicas of this crdt (including those sent
   * locally).
   * @param  timestamp  [description]
   * @param  message    [description]
   */
  protected abstract receive(
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

  receiveGeneral(
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
    child.receiveGeneral(targetPath, timestamp, message);

    // Dispatch a generic Change event
    this.emit("Change", {
      caller: this,
      timestamp: timestamp,
    });
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

export class GroupParent extends CompositeCrdt {
  // Expose publicly
  public addChild<D extends Crdt>(name: string, child: D): D {
    return super.addChild(name, child);
  }

  canGC(): boolean {
    return false;
  }
}

// TODO in other files: SemidirectProduct<S> implements CrdtParent<StatefulCrdt<S>>, StatefulCrdt<SemidirectState<S>>,
// GMap<F> implements CrdtParent<Crdt & F> (F for abilities?)

class CrdtRoot implements CrdtParent {
  readonly pathToRoot = Object.freeze([] as string[]);
  constructor(readonly runtime: CrdtRuntime) {}
  // Since this is private in CrdtRuntime, we don't have to worry about
  // this being passed to Crdt.init outside of our control.
  onChildInit(_child: Crdt): void {}
}

// TODO: conventions: set listener var instead of this.network.register;
// onEtc method names instead of receive

// TODO: docs in this file

interface BatchInfo {
  messages: [innerMessage: Uint8Array, pathToGroup: string[]][];
  firstTimestamp: CausalTimestamp;
  previousTimestamp: CausalTimestamp;
}

export class CrdtRuntime {
  private readonly replicaId: string;
  private readonly crdtRoot: CrdtRoot;
  private readonly groupParents = new Map<string, GroupParent>();
  private readonly pendingBatches = new Map<string, BatchInfo>();
  private readonly batchType: "immediate" | "manual" | "periodic";
  private readonly batchingPeriodMs: number | undefined;

  constructor(
    readonly network: CausalBroadcastNetwork,
    batchOptions: "immediate" | "manual" | { periodMs: number } = "immediate"
  ) {
    this.replicaId = uuid();
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
    let group = sender.pathToRoot[sender.pathToRoot.length - 1];

    // TODO: reuse batchInfo's, to avoid object creation, since set
    // of groups should remain constant.
    let batchInfo = this.pendingBatches.get(group);
    let timestamp: CausalTimestamp;
    let newBatch = false;
    if (batchInfo === undefined) {
      timestamp = this.network.beginBatch(group);
      batchInfo = {
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
    this.groupParents
      .get(group)!
      .receiveGeneral(
        sender.pathToRoot.slice(0, sender.pathToRoot.length - 1),
        timestamp,
        message
      );

    // Add to the pending batch
    batchInfo.messages.push([
      message,
      sender.pathToRoot.slice(0, sender.pathToRoot.length - 1),
    ]);
    batchInfo.previousTimestamp = timestamp;

    if (this.batchType === "immediate") {
      // Send immediately
      this.commitBatch(group);
    } else if (newBatch && this.batchType === "periodic") {
      setTimeout(() => this.commitBatch(group), this.batchingPeriodMs!);
    }
  }

  commitBatch(group: string) {
    let batchInfo = this.pendingBatches.get(group);
    if (batchInfo === undefined) return;
    this.pendingBatches.delete(group);

    // Serialize the batch and send it over this.network
    let runtimeMessage = CrdtRuntimeMessage.create({
      messages: batchInfo.messages.map((value) => {
        return {
          innerMessage: value[0],
          pathToGroup: value[1],
        };
      }),
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
    let timestamp = firstTimestamp;
    let first = true;
    for (let oneMessage of decoded.messages) {
      if (first) first = false;
      else timestamp = this.network.nextTimestamp(timestamp);
      try {
        this.groupParents
          .get(group)!
          .receiveGeneral(
            oneMessage.pathToGroup!,
            timestamp,
            oneMessage.innerMessage
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
