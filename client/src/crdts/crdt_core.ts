import { CausalBroadcastNetwork, CausalTimestamp } from "../network";
import { CrdtRuntimeMessage } from "../../generated/proto_compiled";
import { EventEmitter } from "../utils/EventEmitter";

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

export abstract class Crdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends EventEmitter<Events> {
  readonly parent: CrdtParent<this>;
  readonly runtime: CrdtRuntime;
  readonly name: string;
  /**
   * The names of this crdt and all of its ancestors in order
   * from this crdt on up.
   */
  readonly pathToRoot: string[];
  /**
   * @param parentOrRuntime A parent for this Crdt, either another
   * Crdt, or the CrdtRuntime if this has no Crdt parent.
   * Typically parent will be the Crdt containing this
   * as an instance variable, or the CrdtRuntime if there is
   * no such Crdt.  Crdts with the same parent share a common
   * namespace and causal consistency group, and the default
   * reset() behavior is to call reset() on each child.
   * Different replicas of a Crdt must be assigned parents
   * which are also replicas of each other.
   * @param id      An id for this Crdt.  All Crdts with the
   * same parent must have distinct ids, and the ids must
   * be the same for all replicas of a given CRDT, in order
   * for the CrdtRuntime to route messages to them properly.
   */
  constructor(parent: CrdtParent<this>, name: string) {
    super();
    this.parent = parent;
    this.name = name;
    this.parent.registerChild(this);
    this.runtime = this.parent.runtime;
    this.pathToRoot = [name, ...this.parent.pathToRoot];
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
}

/**
 * TODO
 */
export interface CrdtParent<F extends Crdt> {
  readonly runtime: CrdtRuntime;
  readonly pathToRoot: string[];
  registerChild(child: F): void;
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
export interface StatefulCrdt<S extends Object> extends Crdt {
  readonly state: S;
}

// TODO: abilities via children
export class CompositeCrdt<Events extends CrdtEventsRecord = CrdtEventsRecord>
  extends Crdt<Events>
  implements CrdtParent<Crdt> {
  /**
   * TODO
   *
   * TODO: way to "lock" adding children?
   */
  readonly children: Map<string, Crdt> = new Map();
  public registerChild(child: Crdt) {
    this.children.set(child.name, child);
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

  getDescendant(targetPath: string[]): Crdt<CrdtEventsRecord> {
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
}

export abstract class PrimitiveCrdt<
    S extends Object,
    Events extends CrdtEventsRecord = CrdtEventsRecord
  >
  extends Crdt<Events>
  implements StatefulCrdt<S> {
  readonly state: S;

  constructor(parent: CrdtParent<this>, name: string, state: S) {
    super(parent, name);
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
      throw new Error("TODO");
    }
    this.receive(timestamp, message);

    // TODO: generic change events from return values
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

// TODO in other files: SemidirectProduct<S> implements CrdtParent<StatefulCrdt<S>>, StatefulCrdt<SemidirectState<S>>,
// GMap<F> implements CrdtParent<Crdt & F> (F for abilities?)

class CrdtRoot implements CrdtParent<Crdt> {
  pathToRoot = [];
  constructor(readonly runtime: CrdtRuntime) {}
  registerChild(_child: Crdt<CrdtEventsRecord>): void {}
}

// TODO: conventions: set listener var instead of this.network.register;
// onEtc method names instead of receive

// TODO: docs in this file

export class CrdtRuntime {
  readonly crdtRoot: CrdtRoot;
  readonly groupParents = new Map<string, CompositeCrdt>();

  constructor(readonly network: CausalBroadcastNetwork) {
    this.network.register(this);
    this.crdtRoot = new CrdtRoot(this);
  }

  groupParent(group: string): CrdtParent<Crdt> {
    let groupParent = this.groupParents.get(group);
    if (groupParent === undefined) {
      // Joining group for the first time
      this.network.joinGroup(group);
      groupParent = new CompositeCrdt(this.crdtRoot, group);
      this.groupParents.set(group, groupParent);
    }
    return groupParent;
  }

  send(sender: Crdt, message: Uint8Array) {
    let group = sender.pathToRoot[sender.pathToRoot.length - 1];
    let timestamp = this.network.getNextTimestamp(group);
    // Deliver to self, synchronously
    // TODO: error handling
    this.groupParents
      .get(group)!
      .receiveGeneral(
        sender.pathToRoot.slice(0, sender.pathToRoot.length - 1),
        timestamp,
        message
      );
    let runtimeMessage = CrdtRuntimeMessage.create({
      innerMessage: message,
      pathToGroup: sender.pathToRoot.slice(0, sender.pathToRoot.length - 1),
    });
    let buffer = CrdtRuntimeMessage.encode(runtimeMessage).finish();
    this.network.send(group, buffer, timestamp);
  }

  /**
   * Callback for CrdtNetwork.
   */
  receive(group: string, message: Uint8Array, timestamp: CausalTimestamp) {
    try {
      let decoded = CrdtRuntimeMessage.decode(message);
      this.groupParents
        .get(group)!
        .receiveGeneral(decoded.pathToGroup, timestamp, decoded.innerMessage);
    } catch (e) {
      // TODO
      console.log("Decoding error: " + e);
    }
  }

  getReplicaId(): string {
    return this.network.getReplicaId();
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
   * in this CrdtRuntime, obtained by concatenating our
   * replica id with a counter.
   */
  getUid() {
    return this.idCounter++ + " " + this.getReplicaId();
  }
}
