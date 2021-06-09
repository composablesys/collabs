import cryptoRandomString from "crypto-random-string";
import { RuntimeMessage } from "../../../generated/proto_compiled";
import {
  BroadcastNetwork,
  CausalBroadcastNetwork,
  CausalTimestamp,
  DefaultCausalBroadcastNetwork,
  isCausalBroadcastNetwork,
} from "../../net";
import { arrayAsString, EventEmitter, stringAsArray } from "../../util";
import { CompositeCrdt } from "./composite_crdt";
import { Crdt, CrdtEventsRecord } from "./crdt";
import { CrdtParent } from "./interfaces";

class RootCrdt extends CompositeCrdt {
  private readonly runtimeRoot: Runtime;
  constructor(runtime: Runtime) {
    super();
    this.runtimeRoot = runtime;
    this.afterInit = true;
  }

  /**
   * Exposes CompositeCrdt.addChild publicly for use by
   * Runtime.
   */
  public addChild<D extends Crdt>(name: string, child: D): D {
    return super.addChild(name, child);
  }

  get runtime(): Runtime {
    return this.runtimeRoot;
  }

  pathToRoot() {
    return [];
  }

  canGc(): boolean {
    return false;
  }

  // Crdt methods that don't make sense because we don't
  // have a parent.

  get parent(): CrdtParent {
    throw new Error("RootCrdt has no parent");
  }

  get name(): string {
    throw new Error("RootCrdt has no name");
  }

  init(_name: string, _parent: CrdtParent) {
    throw new Error("RootCrdt has no parent and cannot be initialized");
  }
}

// TODO: conventions: set listener var instead of this.network.register;
// onEtc method names instead of receive

// Note that pointers stored in pointerByCrdt and messages
// are one greater than the corresponding index in
// pointers; 0 denotes the group parent, which is not stored in
// pointers.
/**
 * Note that pointers stored in pointerByCrdt and messages
 * are one greater than the corresponding index in
 * pointers; 0 denotes the root, which is not stored in
 * pointers.
 */
interface BatchInfo {
  pointers: { parent: number; name: Uint8Array }[];
  pointerByCrdt: Map<Crdt, number>;
  messages: { sender: number; innerMessage: Uint8Array }[];
  firstTimestamp: CausalTimestamp;
  previousTimestamp: CausalTimestamp;
}

const REPLICA_ID_LENGTH = 11;
const REPLICA_ID_CHARS = (function () {
  let arr = new Array<number>(128);
  for (let i = 0; i < 128; i++) arr[i] = i;
  return String.fromCharCode(...arr);
})();

/**
 * TODO: usage
 */
export class Runtime extends EventEmitter<CrdtEventsRecord> {
  private readonly batchType: "immediate" | "manual" | "periodic";
  private readonly batchingPeriodMs: number | undefined;
  private readonly network: CausalBroadcastNetwork;
  readonly replicaId: string;

  private readonly rootCrdt: RootCrdt;
  private pendingBatch: BatchInfo | null = null;

  /**
   * TODO.
   * @param readonlynetwork [description]
   * @param batchOptions    [description]
   * @param debugReplicaId  Set a replicaId explicitly.
   * Debug use only (e.g., ensuring determinism in tests).
   */
  constructor(
    network: BroadcastNetwork | CausalBroadcastNetwork,
    batchOptions: "immediate" | "manual" | { periodMs: number } = {
      periodMs: 0,
    },
    debugReplicaId: string | undefined = undefined
  ) {
    super();
    // Set this.replicaId
    if (debugReplicaId) this.replicaId = debugReplicaId;
    else {
      this.replicaId = cryptoRandomString({
        length: REPLICA_ID_LENGTH,
        characters: REPLICA_ID_CHARS,
      });
    }
    // Set this.network
    if (isCausalBroadcastNetwork(network)) {
      this.network = network;
    } else {
      this.network = new DefaultCausalBroadcastNetwork(network);
    }
    this.network.register(this);
    // Create this.rootCrdt
    this.rootCrdt = new RootCrdt(this);
    // Process batchOptions
    if (typeof batchOptions === "object") {
      this.batchType = "periodic";
      this.batchingPeriodMs = batchOptions.periodMs;
    } else {
      this.batchType = batchOptions;
      this.batchingPeriodMs = undefined;
    }
  }

  /**
   * TODO
   * @param
   * @return
   */
  registerCrdt<D extends Crdt>(name: string, child: D): D {
    return this.rootCrdt.addChild(name, child);
  }

  /**
   * TODO.  Used internally by PrimitiveCrdt, that's about it.
   * @param  sender  [description]
   * @param  message [description]
   * @return         [description]
   */
  send(sender: Crdt, message: Uint8Array) {
    if (sender.runtime !== this) {
      throw new Error("Runtime.send called on wrong Runtime");
    }
    let pathToRoot = sender.pathToRoot();

    // TODO: reuse batchInfo, to avoid object creation?
    let timestamp: CausalTimestamp;
    let newBatch: boolean;
    if (this.pendingBatch === null) {
      newBatch = true;
      timestamp = this.network.beginBatch();
      this.pendingBatch = {
        pointers: [],
        pointerByCrdt: new Map(),
        messages: [],
        firstTimestamp: timestamp,
        previousTimestamp: timestamp,
      };
    } else {
      newBatch = false;
      timestamp = this.network.nextTimestamp(
        this.pendingBatch.previousTimestamp
      );
    }

    // Deliver to self, synchronously
    // TODO: error handling
    this.rootCrdt.receive(pathToRoot.slice(), timestamp, message);

    // Add to the pending batch
    let pointer = this.getOrCreatePointer(sender);
    this.pendingBatch.messages.push({
      sender: pointer,
      innerMessage: message,
    });
    this.pendingBatch.previousTimestamp = timestamp;

    if (this.batchType === "immediate") {
      // Send immediately
      this.commitBatch();
    } else if (newBatch && this.batchType === "periodic") {
      setTimeout(() => this.commitBatch(), this.batchingPeriodMs!);
    }
  }

  private getOrCreatePointer(to: Crdt | RootCrdt): number {
    // Base case: root
    if (to === this.rootCrdt) return 0;
    else if (to instanceof RootCrdt) {
      throw new Error(
        "Runtime.send called on wrong Runtime (getOrCreatePointer)"
      );
    }

    // Check if it already exists in pointers
    let existing = this.pendingBatch!.pointerByCrdt.get(to);
    if (existing !== undefined) return existing;

    // Add it the pointers list.  First need to make
    // sure its parent is added.
    let parentPointer = this.getOrCreatePointer(to.parent);
    let newPointer = this.pendingBatch!.pointers.length + 1;
    this.pendingBatch!.pointers.push({
      parent: parentPointer,
      name: stringAsArray(to.name),
    });
    this.pendingBatch!.pointerByCrdt.set(to, newPointer);
    return newPointer;
  }

  /**
   * TODO.  Mostly for manual batching, but can be
   * called whenever if you want immediate sending.
   * @return [description]
   */
  commitBatch() {
    if (this.pendingBatch === null) return;
    const batch = this.pendingBatch;
    // Clear this.pendingBatch now so that this.network is
    // free to deliver messages (e.g. queued ones) during
    // this.network.commitBatch at the end of this method.
    this.pendingBatch = null;

    // Serialize the batch and send it over this.network
    let runtimeMessage = RuntimeMessage.create({
      pointerParents: batch.pointers.map((pointer) => pointer.parent),
      pointerNames: batch.pointers.map((pointer) => pointer.name),
      messageSenders: batch.messages.map((message) => message.sender),
      innerMessages: batch.messages.map((message) => message.innerMessage),
    });
    let buffer = RuntimeMessage.encode(runtimeMessage).finish();
    this.network.commitBatch(
      buffer,
      batch.firstTimestamp,
      batch.previousTimestamp
    );
  }

  /**
   * Callback for CausalBroadcastNetwork.
   *
   * Returns the CausalTimestamp of the last message processed.
   */
  receive(
    message: Uint8Array,
    firstTimestamp: CausalTimestamp
  ): CausalTimestamp {
    if (this.pendingBatch) {
      // TODO: instead, push the pending batch (if options allow)
      throw new Error(
        "Runtime.receive called, but there is a pending send batch"
      );
    }
    // TODO: error handling
    let decoded = RuntimeMessage.decode(message);

    // Build up the map from pointers to pathToRoot's.
    // Index 0 is for the rootCrdt, whose pathToRoot
    // is [].
    let pathToRoots: string[][] = [[]];
    for (let i = 0; i < decoded.pointerParents.length; i++) {
      pathToRoots.push([
        arrayAsString(decoded.pointerNames[i]),
        ...pathToRoots[decoded.pointerParents[i]],
      ]);
    }

    // Deliver messages
    let timestamp = firstTimestamp;
    for (let i = 0; i < decoded.messageSenders.length; i++) {
      if (i !== 0) timestamp = this.network.nextTimestamp(timestamp);
      try {
        let pathToRoot = pathToRoots[decoded.messageSenders[i]];
        this.rootCrdt.receive(
          pathToRoot.slice(),
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

  /**
   * TODO
   * @param  pathToRoot [description]
   * @return            [description]
   */
  getCrdtByReference(pathToRoot: string[]): Crdt {
    return this.rootCrdt.getDescendant(pathToRoot.slice());
  }

  private idCounter = 0;
  /**
   * @return A unique string that will only appear once
   * across all replicas, obtained by concatenating our
   * replica id with a counter.
   */
  getUniqueString() {
    // TODO: shorten?  (base64 instead of base10)
    return this.getReplicaUniqueNumber() + " " + this.replicaId;
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
