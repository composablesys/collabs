import {
  IRuntimeOneSave,
  RuntimeMessage,
  RuntimeSave,
} from "../../generated/proto_compiled";
import {
  arrayAsString,
  ElementSerializer,
  EventEmitter,
  stringAsArray,
} from "../util";
import { Crdt, CrdtEvent, CrdtEventsRecord, CrdtInitToken, Pre } from "./crdt";
import {
  CausalBroadcastNetwork,
  CausalTimestamp,
  isCausalBroadcastNetwork,
} from "./causal_broadcast_network";
import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CompositeCrdt } from "../constructions";
import {
  BatchingStrategy,
  ImmediateBatchingStrategy,
} from "./batching_strategy";

class RootCrdt extends CompositeCrdt {
  /**
   * Exposes super.addChild publicly so Runtime can call it.
   */
  public addChild<C extends Crdt>(name: string, preChild: Pre<C>): C {
    return super.addChild(name, preChild);
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
  /**
   * Only contains entries for Crdts that have not yet
   * finished loadDescendants (possibly waiting until
   * delayedLoadDescendants).
   */
  childrenById: Map<number, Map<string, number>> = new Map();
  /**
   * Only contains entries for Crdts that have been
   * loaded but have not yet
   * finished loadDescendants (possibly waiting until
   * delayedLoadDescendants).
   */
  idsByCrdt: Map<Crdt, number> = new Map();
  /**
   * Stores Crdts that have been loaded and which returned
   * false from load,
   * indicating that we should skip loadDescendants during
   * initial loading, and that have not yet had
   * delayedLoadDescendants called.
   * Such crdts can be loaded
   * later on request, by calling Runtime.delayedLoadDescendants(crdt).
   */
  delayedLoadPending: Set<Crdt> = new Set();
}

const REPLICA_ID_LENGTH = 11;
// TODO: put somewhere reasonable
function randomReplicaId(): string {
  // Here we exploit the fact that 128 divides 256.
  // This would be biased if that were not the case.
  const arr = new Array<number>(REPLICA_ID_LENGTH);
  let randomValues = new Uint8Array(REPLICA_ID_LENGTH);
  if (typeof window === "undefined") {
    // Use Node crypto library.
    // We use eval("require") to prevent Webpack from attempting
    // to bundle the crypto module and complaining.
    // In theory we should also be able to do this by
    // adding "browser": {"crypto": false} to package.json,
    // but that is not working, and besides, every user
    // of this package would have to remember to do so.
    // See https://github.com/webpack/webpack/issues/8826
    const crypto = eval("require")("crypto");
    const randomBuffer = crypto.randomBytes(REPLICA_ID_LENGTH);
    randomValues = new Uint8Array(randomBuffer);
  } else {
    // Use browser crypto library
    window.crypto.getRandomValues(randomValues);
  }
  for (let i = 0; i < REPLICA_ID_LENGTH; i++) {
    arr[i] = randomValues[i] % 128;
  }
  return String.fromCharCode(...arr);
}

export interface RuntimeEvent {
  /**
   * Whether the event is due to local operations,
   * i.e., Crdt method calls on this replica.
   */
  isLocal: boolean;
}

export interface RuntimeEventsRecord extends CrdtEventsRecord {
  /**
   * Emitted every time the Runtime receives a single Crdt message
   * (including messages sent by this replica),
   * at the end of message processing.
   *
   * This event should generally not be listened on.
   * Logical operations may be composed of multiple messages,
   * each of which emits a Message event, so when early
   * Message events are emitted, the Runtime's Crdts may be in
   * a nonsensical, transient state.  Instead,
   * listen on Change events or Crdt-specific events.
   *
   * Note that actual
   * messages received from the network may be batches of
   * multiple Crdt messages.  In that case, one Message event
   * is emitted for each of the Crdt messages.
   */
  Message: CrdtEvent;
  /**
   * Emitted after the Runtime's Crdts are changed by an
   * operation or series of operations happening in the same
   * thread.  An easy way to keep a view in sync with the
   * Crdt state (model) is to refresh the view each time
   * this event is emitted.
   *
   * Unlike Message events, Change events are only dispatched
   * after a sequence of messages that were sent in the same thread
   * of execution (either locally or on another replica).
   * This means that Crdts will be in proper, usable states,
   * not in nonsensical, transient states like with Message events.
   *
   * It is not guaranteed that Change events will be emitted
   * once per thread of execution; they may be emitted less
   * often.  There are two distinct causes of this:
   * - On the sending replica, Runtime cannot detect the
   * end of an execution thread directly; instead, when the
   * first message is sent, Runtime creates a Promise
   * microtask to emit the event.  Other Promise microtasks
   * might occur first and perform more operations before
   * this microtask resolves.
   * - On receiving replicas, each batch received on the
   * network emits one Change event, even if the batch contains
   * messages from multiple threads of execution.
   */
  Change: RuntimeEvent;
  /**
   * Emitted after a batch of messages is sent or
   * received.  Each such batch corresponds to one
   * CausalBroadcastNetwork message.
   */
  Batch: RuntimeEvent;
  /**
   * Emitted when a received message is ready for processing
   * but blocked by our pending send batch.  It will be
   * processed after the next call to commitBatch().
   */
  ReceiveBlocked: {};
}

/**
 * TODO: usage
 */
export class Runtime extends EventEmitter<RuntimeEventsRecord> {
  readonly isRuntime = true;

  private readonly network: CausalBroadcastNetwork;
  readonly replicaId: string;

  private batchingStrategy: BatchingStrategy;
  private changeEventPending = false;

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
    batchingStrategy: BatchingStrategy = new ImmediateBatchingStrategy(),
    debugReplicaId: string | undefined = undefined
  ) {
    super();
    // Set this.replicaId
    if (debugReplicaId) this.replicaId = debugReplicaId;
    else {
      this.replicaId = randomReplicaId();
    }
    // Set this.network
    if (isCausalBroadcastNetwork(network)) {
      this.network = network;
    } else {
      this.network = new DefaultCausalBroadcastNetwork(network);
    }
    this.network.registerRuntime(this, this.receive.bind(this), () =>
      this.emit("ReceiveBlocked", {})
    );
    // Create this.rootCrdt
    this.rootCrdt = new RootCrdt(new CrdtInitToken("", this));
    // Process batchingStrategy
    this.batchingStrategy = batchingStrategy;
    this.batchingStrategy.start(this);
  }

  /**
   * TODO
   * @param
   * @return
   */
  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C {
    return this.rootCrdt.addChild(name, preCrdt);
  }

  private currentlyProcessedTimestamp: CausalTimestamp | undefined = undefined;

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

    if (this.inRunLocally) {
      // Deliver immediately back to ourselves
      this.rootCrdt.receive(
        sender.pathToRoot(),
        this.currentlyProcessedTimestamp!,
        message
      );
      return;
    }

    if (this.currentlyProcessedTimestamp !== undefined) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "Runtime.send called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }

    // TODO: reuse batchInfo, to avoid object creation?
    let timestamp: CausalTimestamp;
    if (this.pendingBatch === null) {
      timestamp = this.network.beginBatch();
      this.pendingBatch = {
        pointers: [],
        pointerByCrdt: new Map(),
        messages: [],
        firstTimestamp: timestamp,
        previousTimestamp: timestamp,
      };
    } else {
      timestamp = this.network.nextTimestamp(
        this.pendingBatch.previousTimestamp
      );
    }

    // Deliver to self, synchronously
    // TODO: error handling
    this.currentlyProcessedTimestamp = timestamp;
    this.rootCrdt.receive(sender.pathToRoot(), timestamp, message);
    this.currentlyProcessedTimestamp = undefined;

    // Add to the pending batch
    let pointer = this.getOrCreatePointer(sender);
    this.pendingBatch.messages.push({
      sender: pointer,
      innerMessage: message,
    });
    this.pendingBatch.previousTimestamp = timestamp;

    this.emit("Message", { timestamp });
    // Schedule a Change event as a microtask, if there
    // is not one pending already.
    if (!this.changeEventPending) {
      this.changeEventPending = true;
      Promise.resolve().then(() => {
        this.changeEventPending = false;
        this.emit("Change", { isLocal: true });
      });
    }
  }

  private getOrCreatePointer(to: Crdt): number {
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
    // Since it's not a RootCrdt, we know to.parent is a Crdt,
    // not a RootParent.
    let parentPointer = this.getOrCreatePointer(to.parent as Crdt);
    let newPointer = this.pendingBatch!.pointers.length + 1;
    this.pendingBatch!.pointers.push({
      parent: parentPointer,
      name: stringAsArray(to.name),
    });
    this.pendingBatch!.pointerByCrdt.set(to, newPointer);
    return newPointer;
  }

  setBatchingStrategy(batchingStrategy: BatchingStrategy) {
    this.batchingStrategy.stop();
    this.batchingStrategy = batchingStrategy;
    this.batchingStrategy.start(this);
  }

  /**
   * TODO.  Mostly for BatchingStrategy, but can be
   * called whenever if you want immediate sending.
   * Don't call it in the middle of a multi-message Crdt
   * operation though.
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
    this.emit("Batch", { isLocal: true });
  }

  /**
   * Callback for CausalBroadcastNetwork.
   *
   * Returns the CausalTimestamp of the last message processed.
   */
  private receive(
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
        this.currentlyProcessedTimestamp = timestamp;
        let pathToRoot = pathToRoots[decoded.messageSenders[i]];
        this.rootCrdt.receive(
          pathToRoot.slice(),
          timestamp,
          decoded.innerMessages[i]
        );
        this.emit("Message", { timestamp });
      } catch (e) {
        // TODO: handle gracefully
        throw e;
      } finally {
        this.currentlyProcessedTimestamp = undefined;
      }
    }

    this.emit("Change", { isLocal: false });
    this.emit("Batch", { isLocal: false });
    return timestamp;
  }

  /**
   * TODO
   * @param  pathToRoot [description]
   * @return            [description]
   */
  getCrdtByReference(pathToRoot: string[], base: Crdt = this.rootCrdt): Crdt {
    let ensureLoaded = this.isInLoad;
    let currentCrdt = base;
    for (let i = pathToRoot.length - 1; i >= 0; i--) {
      if (ensureLoaded) {
        // Ensure currentCrdt is loaded before asking it
        // for a child.
        // In doing so, we are careful to avoid creating circular
        // dependencies, in which loading currentCrdt deserializes
        // a Crdt reference that loads a Crdt that deserializes
        // ... in a cycle.  To do so, we don't load Crdts
        // before returning them; we only load their
        // ancestors (necessary because loading is a
        // prerequisite to calling getChild).  This loading
        // is expected to construct, but not load, the
        // children.  Constructing these children may
        // require calling getCrdtByReference on other Crdts,
        // but only ones that existed causally prior to the
        // children's construction.  Thus loops are avoided
        // because the causal order has no loops.
        //
        // There is still the possibility of long
        // dependency chains, e.g., every character in a text
        // document causing this line of code to be reached
        // in reference to its previous character.  Such chains
        // could easily overflow the stack, which might support
        // only ~100,000 function calls.
        // To mitigate this, in classes like DeletingMutCSet that
        // construct many children during loading, we
        // deliberately construct the children in causal order,
        // so that any intra-set dependencies are resolved in
        // order (iterately instead of recursively).  Long
        // inter-Crdt dependency chains that circumvent this
        // strategy are possible but seem unlikely.
        this.loadOneIfNeeded(currentCrdt);
      }
      currentCrdt = currentCrdt.getChild(pathToRoot[i]);
      if (currentCrdt === this.delayedLoadCrdt) {
        // From now on, we will be asking for descendants
        // of the Crdt currently being loaded.  We need
        // to ensure they are loaded before proceeding.
        ensureLoaded = true;
      }
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

  /**
   * Defined so long as load() has been called,
   * but empties as it is used (possibly by delayed loads).
   */
  private loadHelper?: LoadHelper;
  private inLoad = false;

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
   * Note that events are generally not triggered during
   * loading, so if you usually rely on events to create
   * a view of the application state, you must manually
   * create that view once after load.
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
      this.inLoad = true;
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
      // Load the rest depth-first.  We assume rootCrdt load
      // returns true.
      this.loadDescendants(this.rootCrdt, 1);
      // TODO: clean up loadHelper state as we go, deleting
      // all but that needed for skipped Crdts.
    } finally {
      this.inLoad = false;
    }

    // TODO: in normal usage, check that loadHelper is now
    // completely empty.
  }

  get isInLoad(): boolean {
    return this.inLoad;
  }

  /**
   * Provide crdt's id if known (optimization; necessary for root),
   * else we will look it up for you.
   *
   * It is assumed that crdt.parent is already loaded.
   */
  private loadOneIfNeeded(crdt: Crdt, id?: number) {
    if (id === undefined) {
      // Look it up ourselves
      if (crdt === this.rootCrdt) id = 1;
      else {
        // We assume the parent is already loaded,
        // so parentId exists iff it has not finished
        // loadDescendants.  So if parentId doesn't
        // exist, then crdt must already be loaded.
        // Since it's not a RootCrdt, we know crdt.parent is a Crdt,
        // not a RootParent.
        const parentId = this.loadHelper!.idsByCrdt.get(crdt.parent as Crdt);
        if (parentId === undefined) return;
        // Also, since crdt is not already loaded, the call
        // to loadDescendants on its parent cannot have
        // finished, so parentChildren must still exist.
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
      this.loadHelper!.idsByCrdt.set(crdt, id);
      const shouldLoadDescendants = crdt.load(saveData);
      if (!shouldLoadDescendants) {
        this.loadHelper!.delayedLoadPending.add(crdt);
      }
    }
  }

  private loadDescendants(crdt: Crdt, id: number, postLoad = true) {
    if (!this.loadHelper!.delayedLoadPending.has(crdt)) {
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
      // No longer need these.
      this.loadHelper!.idsByCrdt.delete(crdt);
      this.loadHelper!.childrenById.delete(id);
      // TODO: would splitting the above into two loops be better?
      // (Depth-first search where you visit all of a node's
      // children before recursing.)
    }
    // Else skip loadDescendants for now.  They can be loaded
    // later on request, by calling this.delayedLoadDescendants(crdt).

    if (postLoad) {
      // Post load (signal that all descendants are loaded
      // or skipped).
      crdt.postLoad();
    }
  }

  private delayedLoadCrdt?: Crdt;
  /**
   * TODO: generally this will only be called by crdt
   * itself.
   *
   * Note that crdt.postLoad() is not called again
   * (it was called during the initial skipped loading);
   * instead do any post-loading after this method returns.
   *
   * @param  crdt [description]
   * @return      [description]
   */
  delayedLoadDescendants(crdt: Crdt) {
    if (crdt.runtime !== this) {
      throw new Error("Runtime.delayedLoadDescendants called on wrong Runtime");
    }
    if (this.loadHelper === undefined) {
      throw new Error("this.load has not yet been called");
    }
    const had = this.loadHelper.delayedLoadPending.delete(crdt);
    if (!had) {
      // TODO: error or just return?
      throw new Error("Already loaded");
    }

    try {
      this.delayedLoadCrdt = crdt;
      // crdt's id must still exist because crdt has not
      // finished loadDescendants yet.
      // false to skip postLoad, it was already called during the
      // normal loading sequence.
      this.loadDescendants(crdt, this.loadHelper!.idsByCrdt.get(crdt)!, false);
      // TODO: check loadHelper state has been properly cleaned up.
    } finally {
      delete this.delayedLoadCrdt;
    }
  }

  private inRunLocally = false;
  /**
   * TODOs: generally check this makes sense;
   * harden against repeated timestamps;
   * sample ops; currently not discoverable;
   *
   * timestamp is just here to force you to use
   * this only when processing a raw message.
   * It's only used for bug-catching (compared to
   * the real timestamp).
   */
  runLocally<T>(timestamp: CausalTimestamp, doPureOps: () => T): T {
    if (timestamp !== this.currentlyProcessedTimestamp) {
      throw new Error(
        "Wrong timestamp passed to runLocally;" +
          " it must be from a current receive... call"
      );
    }
    let oldInRunLocally = this.inRunLocally;
    this.inRunLocally = true;
    const toReturn = doPureOps();
    this.inRunLocally = oldInRunLocally;
    return toReturn;
  }

  get isInRunLocally(): boolean {
    return this.inRunLocally;
  }
}
