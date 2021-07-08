import cryptoRandomString from "crypto-random-string";
import {
  IRuntimeOneSave,
  RuntimeMessage,
  RuntimeSave,
} from "../../../generated/proto_compiled";
import {
  BroadcastNetwork,
  CausalBroadcastNetwork,
  CausalTimestamp,
  DefaultCausalBroadcastNetwork,
  isCausalBroadcastNetwork,
} from "../../net";
import {
  arrayAsString,
  ElementSerializer,
  EventEmitter,
  stringAsArray,
} from "../../util";
import { CompositeCrdt } from "./composite_crdt";
import { Crdt, CrdtEventsRecord } from "./crdt";
import { CrdtParent } from "./interfaces";

export class RootCrdt extends CompositeCrdt {
  readonly isRootCrdt = true;
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

/**
 * Ids are as in the RuntimeOneSave message's parentPointer
 * field: 1 + the Crdt's index in RuntimeSave.saves.
 */
class LoadHelper {
  /**
   * Only contains saves for Crdts that have not yet been
   * loaded.  That way you can tell if a Crdt is
   * already loaded or not.
   *
   * Specifically, an entry is deleted in loadOneIfNeeded
   * just before calling crdt.load.
   */
  savesById: Map<number, Uint8Array> = new Map();
  childrenById: Map<number, Map<string, number>> = new Map();
  /**
   * Filled in only as Crdts are loaded (complement of savesById).
   */
  crdtsById: Map<number, Crdt> = new Map();
  /**
   * Filled in only as Crdts are loaded (complement of savesById).
   */
  idsByCrdt: Map<Crdt, number> = new Map();
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
  private loadAllowed = true;

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
    this.rootCrdt.on("Change", (event) => this.emit("Change", event));
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
    this.loadAllowed = false;

    if (sender.runtime !== this) {
      throw new Error("Runtime.send called on wrong Runtime");
    }

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
    this.rootCrdt.receive(sender.pathToRoot(), timestamp, message);

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
    this.loadAllowed = false;

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
    let currentCrdt: Crdt = this.rootCrdt;
    for (let i = pathToRoot.length - 1; i >= 0; i--) {
      if (this.loadHelper !== undefined) {
        // Ensure currentCrdt is loaded before asking it
        // for a child.
        this.loadOneIfNeeded(currentCrdt);
      }
      currentCrdt = currentCrdt.getChild(pathToRoot[i]);
    }
    return currentCrdt;
  }

  get timestampSerializer(): ElementSerializer<CausalTimestamp> {
    return this.network;
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
  getReplicaUniqueNumber(count = 1) {
    const ans = this.idCounter;
    this.idCounter += count;
    return ans;
  }

  /**
   * Save the entire runtime state in serialized form.
   * The saved state can then be passed to load on
   * a Runtime constructed in the same way, to load the
   * saved state.
   *
   * TODO: future work: thread friendly (option to sleep/yield
   * occasionally, blocking messages while doing so);
   * incremental saving (use the needsSaving flags to
   * only update saved parts in some big map, e.g.,
   * for local storage), if needed for large programs.
   * @return [description]
   */
  save(): Uint8Array {
    // Commit the current batch, so we don't have to
    // save batch-related state.  This also attempts
    // to push changes to other users, which is good
    // when saving happens just before exiting.
    // TODO: potential downside: network may follow up
    // the end of the batch by delivering queued messages,
    // causing the state to be not quite what the user
    // expected to save.
    this.commitBatch();

    const saves: IRuntimeOneSave[] = [];
    // Note this makes rootCrdt the first element in saves
    this.saveRecursive(this.rootCrdt, 0, saves);
    const message = RuntimeSave.create({
      saves,
      networkSave: this.network.save(),
    });
    return RuntimeSave.encode(message).finish();
  }

  /**
   * Save crdt and all of its descendants, appending the
   * results to saves.
   * @param  crdt  [description]
   * @param  saves [description]
   * @return       [description]
   */
  private saveRecursive(
    crdt: Crdt,
    parentPointer: number,
    saves: IRuntimeOneSave[]
  ) {
    const [saveData, children] = crdt.save();
    const crdtPointer = saves.length + 1;
    const name = crdt === this.rootCrdt ? "" : crdt.name;
    saves.push({ parentPointer, name: stringAsArray(name), saveData });
    // Recurse
    for (let child of children.values()) {
      this.saveRecursive(child, crdtPointer, saves);
    }
  }

  private loadHelper?: LoadHelper;

  /**
   * Load the saved state output from Runtime.save.
   *
   * The program must be initialized (i.e., registering top-level
   * Crdts) exactly as in the program that was saved, then
   * load must be called before you perform any operations
   * or receive any messages.  I.e., you should use the
   * same program to load as you used to save, and call
   * load between its setup and when anything happens.
   *
   * TODO: future work: thread friendly (option to sleep/yield
   * occasionally, blocking messages while doing so;
   * also tell caller not to read anything until done);
   * does incremental loading (only changed Crdts) make sense?
   * @param  saveData [description]
   */
  load(saveData: Uint8Array) {
    if (!this.loadAllowed) {
      throw new Error(
        "Cannot load: a message has already been sent or received"
      );
    }
    try {
      this.loadHelper = new LoadHelper();
      const message = RuntimeSave.decode(saveData);
      this.network.load(message.networkSave);
      // We need to pre-load enough info that getCrdtByReference
      // can load a Crdt before calling getChild on it, even if
      // that happens during loading of
      // another Crdt.
      for (let i = 0; i < message.saves.length; i++) {
        const oneSave = message.saves[i];
        const id = i + 1;
        this.loadHelper.savesById.set(id, oneSave.saveData);
        this.loadHelper.childrenById.set(id, new Map());
        if (i !== 0) {
          // It's not rootCrdt, hence has a parent
          this.loadHelper.childrenById
            .get(oneSave.parentPointer)!
            .set(arrayAsString(oneSave.name), id);
        }
      }
      // Load the root
      this.loadOneIfNeeded(this.rootCrdt, 1);
      // Load the rest depth-first
      this.loadDescendants(this.rootCrdt, 1);
    } finally {
      delete this.loadHelper;
    }
  }

  /**
   * Provide crdt's id if known (optimization; necessary for root),
   * else we will look it up for you.
   */
  private loadOneIfNeeded(crdt: Crdt, id?: number) {
    if (id === undefined) {
      // Look it up ourselves
      if (crdt === this.rootCrdt) id = 1;
      else {
        const parentId = this.loadHelper!.idsByCrdt.get(crdt.parent)!;
        const parentChildren = this.loadHelper!.childrenById.get(parentId)!;
        id = parentChildren.get(crdt.name)!;
      }
    }
    const saveData = this.loadHelper!.savesById.get(id);
    // Only load if needed
    if (saveData !== undefined) {
      // Mark it as already loaded/in-progress by deleting the save.
      // We do this before loading in case crdt.load causes
      // loadOneIfNeeded(crdt) to be called again, which can
      // happen if crdt's state contains a reference to one
      // of its descendants.  This way, the second call to
      // loadOneIfNeeded will do nothing.
      this.loadHelper!.savesById.delete(id);
      this.loadHelper!.crdtsById.set(id, crdt);
      this.loadHelper!.idsByCrdt.set(crdt, id);
      crdt.load(saveData);
    }
  }

  private loadDescendants(crdt: Crdt, id: number) {
    const children = this.loadHelper!.childrenById.get(id)!;
    // Load the children recursively
    for (const [name, childId] of children) {
      const child = crdt.getChild(name);
      this.loadOneIfNeeded(child, childId);
      // Note when getCrdtByReference loads a Crdt, it doesn't
      // also load all descendants, so we need to do this even
      // if child is already loaded.  It is safe if some
      // or all of them are loaded, though, due to the
      // "if needed" part of loadOneIfNeeded.
      // Because we need to recurse here even if child has
      // already been loaded, it would be incorrect for
      // loadOneIfNeeded to delete its crdt from the
      // parent's child list, since that would prevent
      // the crdt from being visited in this iterator.
      this.loadDescendants(child, childId);
    }
    // TODO: would splitting the above into two loops be better?
    // (Depth-first search where you visit all of a node's
    // children before recursing.)

    // Post load (signal that all descendants are loaded)
    crdt.postLoad();
  }
}
