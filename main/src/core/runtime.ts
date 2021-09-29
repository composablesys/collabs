import {
  IRuntimeOneSave,
  RuntimeMessage,
  RuntimeSave,
} from "../../generated/proto_compiled";
import { Crdt, CrdtEventMeta, CrdtInitToken, Pre } from "./crdt";
import {
  CausalBroadcastNetwork,
  CausalTimestamp,
  isCausalBroadcastNetwork,
} from "./causal_broadcast_network";
import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CObject } from "../constructions";
import {
  BatchingStrategy,
  ImmediateBatchingStrategy,
} from "./batching_strategy";
import { EventEmitter } from "./event_emitter";
import { ElementSerializer } from "./element_serializer";

class RootCrdt extends CObject {
  /**
   * Exposes super.addChild publicly so Runtime can call it.
   */
  public addChild<C extends Crdt>(name: string, preChild: Pre<C>): C {
    return super.addChild(name, preChild);
  }
}

// TODO: conventions: set listener var instead of this.network.register;
// onEtc method names instead of receive

/**
 * Info about a pending batch.
 *
 * Note that pointers stored in pointerByCrdt and messages
 * are one greater than the corresponding index in
 * pointers; 0 denotes the root, which is not stored in
 * pointers.
 */
interface BatchInfo {
  pointers: { parent: number; name: string }[];
  pointerByCrdt: Map<Crdt, number>;
  messages: { sender: number; innerMessage: Uint8Array }[];
  firstTimestamp: CausalTimestamp;
  previousTimestamp: CausalTimestamp;
}

/**
 * Stores deserialized, but not yet used, state during loading.
 *
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

/**
 * Each byte of the replicaId gives us 7 bits of entropy,
 * for a total of 77 bits.  This should give a quite low
 * probability that two replicas in the same conversation
 * will ever choose the same replicaId, even if we
 * consider the total probability across billions of
 * conversations.
 */
const REPLICA_ID_LENGTH = 11;

// TODO: put somewhere reasonable
/**
 * @return A random replicaId made of ASCII characters.
 * Such replicaId's can be safely treated as either
 * byte arrays or UTF-8 strings.
 */
function randomReplicaId(): string {
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
    // Here we exploit the fact that 128 divides 256.
    // This would be biased otherwise.
    arr[i] = randomValues[i] % 128;
  }
  return String.fromCharCode(...arr);
}

/**
 * Type for events emitted by [[Runtime]].
 */
export interface RuntimeEvent {
  /**
   * Metadata for this event.
   */
  readonly meta: CrdtEventMeta;
}

/**
 * Events record for [[Runtime]].
 */
export interface RuntimeEventsRecord {
  /**
   * Emitted as soon as possible after processing a [transaction](../../transactions.html).
   * An easy way to keep a view in sync with the
   * Crdt state (model) is to refresh the view each time
   * this event is emitted.
   *
   * More specifically, a Change event is emitted:
   * - After processing any local transaction, in a new microtask.  (If another
   * local transaction occurs before the microtask, only
   * one Change event is emitted for the two transactions.)
   * - After processing any remote batch, in the same thread.
   * (If the batch contains multiple transactions, only one
   * Change event is emitted for the whole batch.)
   *
   * So a Change event is emitted soon after each transaction
   * (in a new microtask, at the latest), but not necessarily
   * immediately, and not every transaction has its own
   * Change event.  Also, the relation between transactions
   * and Change events can differ across replicas.
   */
  Change: RuntimeEvent;
  /**
   * Emitted after a batch of messages is sent or
   * received.  Each such batch corresponds to one
   * [[CausalBroadcastNetwork]] message.
   *
   * Note that for local messages, the Batch event may occur
   * sometime after the corresponding operation, depending
   * on the [[BatchingStrategy]].  If you need to observe
   * local operations immediately, you should instead listen
   * on Change events.
   */
  Batch: RuntimeEvent;
  /**
   * Emitted when a received message is ready for processing
   * but blocked by our pending send batch.  It will be
   * processed after the next call to [[commitBatch]].
   *
   * This event is mostly useful for [[BatchingStrategy]]'s,
   * which may choose to call [[commitBatch]] immediately
   * in response to this event.
   */
  ReceiveBlocked: RuntimeEvent;
  /**
   * Emitted every time the Runtime receives a single Crdt message
   * (including messages sent by this replica),
   * at the end of message processing.
   *
   * This event should generally not be used except for testing.
   * It can be emitted in the middle of a transaction, at which
   * point collaborative type's states might not be usable.
   * Instead, listen on Change events or Crdt-specific events.
   *
   * Note that actual
   * messages received from the network may be batches of
   * multiple Crdt messages.  In that case, one Message event
   * is emitted for each of the Crdt messages.
   */
  Message: RuntimeEvent;
}

/**
 * The entry point for a Compoventuals app.
 *
 * Each Compoventuals app will typically have one `Runtime`,
 * created at the beginning of the app.  This `Runtime` manages
 * the collaborative data types, connects them to the network,
 * manages saving and loading, and offers various utilities.
 *
 * After creating a `Runtime`, use [[registerCrdt]] to
 * register your top-level (global variable) collaborative
 * data types.  Next, if you are loading a previously saved state,
 * call [[load]].  (Both of these steps must happen immediately
 * after creating the `Runtime`, before performing any operations
 * or receiving any network messages).  You are then ready
 * to collaborate - perform local operations, read the state,
 * and add event listeners so you are notified
 * when the state changes.
 *
 * See the [Getting Started Guide](../../getting_started_guide.html)
 * for an example app with a full walkthrough.
 */
export class Runtime extends EventEmitter<RuntimeEventsRecord> {
  /**
   * Type guard.
   */
  readonly isRuntime = true;

  private readonly network: CausalBroadcastNetwork;
  /**
   * An id for the local replica (user).  This is created
   * randomly during `Runtime`'s constructor, with enough
   * random bits that it is unlikely two replicas in the same
   * collaborative group will ever have the same `replicaId`.
   *
   * Note that one real-world user may have multiple `replicaId`s
   * over the course of a conversation; this is distinct from
   * a persistent id like a username.  Indeed, each time a user
   * refreshes their browser window, they get a new `replicaId`;
   * and if a user has an app open in multiple tabs or devices,
   * each of those gets its own `replicaId`.
   */
  readonly replicaId: string;

  private batchingStrategy: BatchingStrategy;
  private changeEventPending = false;

  private readonly rootCrdt: RootCrdt;
  private pendingBatch: BatchInfo | null = null;
  private loadAllowed = true;

  /**
   * Creates a new `Runtime`.  This is the starting point of
   * any Compoventuals app.
   *
   * @param network The network used to send messages between
   * collaborators.  Internally, `Runtime` uses a [[CausalBroadcastNetwork]];
   * if `network` is a [[BroadcastNetwork]], then
   * a [[DefaultCausalBroadcastNetwork]] is created with
   * `network` as its constructor argument.
   * @param batchingStrategy The initial [[BatchingStrategy]],
   * which controls how often messages are sent.  It can
   * be changed later using [[setBatchingStrategy]].
   * @param debugReplicaId  Sets [[replicaId]] explicitly.
   * For debug use only (e.g., ensuring determinism in tests).
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
    this.network.registerRuntime(this, this.receive.bind(this), (sender) =>
      this.emit("ReceiveBlocked", {
        meta: CrdtEventMeta.fromSender(sender, this),
      })
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

  private currentlyProcessedTimestamp?: CausalTimestamp = undefined;

  /**
   * Called by `sender` to send a message to all of its
   * replicas (including this one).
   *
   * Usually you will not call this method directly unless you
   * are writing a direct `Crdt` subclass.  [[CPrimitive]]
   * subclasses should instead call [[CPrimitive.send]].
   *
   * @param  sender  The `Crdt` sending this message, which must
   * also be the caller of this method.
   * @param  message The message to send.
   */
  send(sender: Crdt, message: Uint8Array): void {
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

    this.emit("Message", { meta: CrdtEventMeta.local(this) });
    // Schedule a Change event as a microtask, if there
    // is not one pending already.
    if (!this.changeEventPending) {
      this.changeEventPending = true;
      Promise.resolve().then(() => {
        this.changeEventPending = false;
        this.emit("Change", { meta: CrdtEventMeta.local(this) });
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
      name: to.name,
    });
    this.pendingBatch!.pointerByCrdt.set(to, newPointer);
    return newPointer;
  }

  /**
   * Sets the [[BatchingStrategy]], replacing the current one.
   */
  setBatchingStrategy(batchingStrategy: BatchingStrategy) {
    this.batchingStrategy.stop();
    this.batchingStrategy = batchingStrategy;
    this.batchingStrategy.start(this);
  }

  /**
   * Commits and sends all pending messages generated by
   * local operations (if any), combining them into a single
   * batch.  Like a transaction, these batched messages will
   * be applied atomically on each remote replica, i.e., all
   * in a row without interruption by other operations.
   *
   * Typically, only the set [[BatchingStrategy]] will call
   * this method.  However, you can also call it at any time
   * to commit the current batch early.
   */
  commitBatch(): void {
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
    this.emit("Batch", {
      meta: CrdtEventMeta.local(this),
    });
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
        decoded.pointerNames[i],
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
        this.emit("Message", { meta: CrdtEventMeta.fromTimestamp(timestamp) });
      } catch (e) {
        // TODO: handle gracefully
        throw e;
      } finally {
        this.currentlyProcessedTimestamp = undefined;
      }
    }

    this.emit("Change", {
      meta: CrdtEventMeta.fromSender(firstTimestamp.getSender(), this),
    });
    this.emit("Batch", {
      meta: CrdtEventMeta.fromSender(firstTimestamp.getSender(), this),
    });
    return timestamp;
  }

  /**
   * Returns the descendant of base with the given
   * `pathToBase`.  This method is primarily used by
   * serializers, like
   * [[DefaultElementSerializer]] and [[CrdtSerializer]],
   * to deserialize Crdt references, expressed as
   * paths in the tree of Crdts.
   *
   * It is safe to call this method during loading (e.g.
   * during a [[Crdt.load]] implementation), even if
   * the desired `Crdt` or its ancestors have not yet been
   * loaded.  In that case, the method will automatically
   * load `Crdt`s as needed.
   *
   * @param  pathToBase An array listing all names on
   * the path from the desired Crdt to `base`, in order
   * starting with the desired Crdt's name.
   * @param base An ancestor of the desired Crdt.  Defaults
   * to the root Crdt, in which case `pathToBase` is the
   * desired Crdt's [[Crdt.pathToRoot]].
   * @return            [description]
   */
  getCrdtByReference(pathToBase: string[], base: Crdt = this.rootCrdt): Crdt {
    let ensureLoaded = this.inLoad;
    let currentCrdt = base;
    for (let i = pathToBase.length - 1; i >= 0; i--) {
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
      currentCrdt = currentCrdt.getChild(pathToBase[i]);
      if (currentCrdt === this.delayedLoadCrdt) {
        // From now on, we will be asking for descendants
        // of the Crdt currently being loaded.  We need
        // to ensure they are loaded before proceeding.
        ensureLoaded = true;
      }
    }
    return currentCrdt;
  }

  /**
   * @return An [[ElementSerializer]] for the particular
   * [[CausalTimestamp]] implementation used by our
   * [[CausalBroadcastNetwork]].
   */
  get timestampSerializer(): ElementSerializer<CausalTimestamp> {
    return this.network;
  }

  private idCounter = 0;
  /**
   * @return A unique string that will only appear once
   * across all replicas.  It is obtained by concatenating
   * [[replicaId]] with a local counter.
   */
  getUniqueString() {
    // TODO: shorten?  (base64 instead of base10)
    return this.getReplicaUniqueNumber() + " " + this.replicaId;
  }

  /**
   * @return A unique number that will only be
   * associated with this runtime's [[replicaId]]
   * once.  It is obtained using a local counter.
   */
  getReplicaUniqueNumber(count = 1) {
    const ans = this.idCounter;
    this.idCounter += count;
    return ans;
  }

  // TODO: future work: thread friendly (option to sleep/yield
  // occasionally, blocking messages while doing so);
  // incremental saving (use the needsSaving flags to
  // only update saved parts in some big map, e.g.,
  // for local storage), if needed for large programs;
  // make more compatable with KV-store browser APIs;
  // add load/save strategies, like batching strategies or
  // Yjs storage providers;
  // integrate with lazy loading (need to be able to save
  // a lazy Crdt and reload it later).
  /**
   * Saves the entire collaborative state in serialized form,
   * including the runtime, all collaborative data types, and
   * the network state.
   *
   * The returned `saveData` may later be passed to [[load]]
   * on a different instance of `Runtime` for the same app
   * (specifically, same registered Crdts).
   * The loaded app will then same internal state,
   * capable of sending and receiving operations as usual
   * while ensuring eventual consistency.
   *
   * @return `saveData`
   */
  save(): Uint8Array {
    // Commit the current batch, so we don't have to
    // save batch-related state.  This also attempts
    // to push changes to other users, which is good
    // when saving happens just before exiting.
    // TODO: potential downside: network may follow up
    // the end of the batch by delivering queued messages,
    // causing the state to be not quite what the user
    // expected to save.  Also it may be unexpected that
    // we are sending messages right now.
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
    saves.push({ parentPointer, name, saveData });
    // Recurse
    for (let child of children.values()) {
      this.saveRecursive(child, crdtPointer, saves);
    }
  }

  /**
   * Defined so long as load() has been called,
   * but empties as it is used (possibly by delayed loads).
   */
  private loadHelper?: LoadHelper = undefined;
  private inLoad = false;

  // TODO: future work: thread friendly (option to sleep/yield
  // occasionally, blocking messages while doing so;
  // also tell caller not to read anything until done);
  // does incremental loading (only changed Crdts) make sense?
  /**
   * Loads the state from `saveData`.  See [[save]].
   *
   * `saveData` must have come from a `Runtime` for the same app
   * (specifically, same registered Crdts, i.e., calls to
   * [[registerCrdt]]).  This method must be called after
   * registering all Crdts and before performing any operations
   * or receiving any messages.
   *
   * Note that Crdt events are not emitted during
   * loading.  So if you usually rely on events to create
   * a view of the collaborative state, you must manually
   * create that view once after this method.
   *
   * @param  saveData An output of [[save]] from a previous
   * instance of this app.  It is okay if `saveData` is
   * used by multiple replicas within the same group,
   * even concurrently.  Furthermore, it is okay for
   * `saveData` to be arbitrarily old; the loaded replica
   * will still converge to a consistent state once it
   * receives all messages not causally prior to the original
   * save operation.
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
            .set(oneSave.name, id);
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

  private delayedLoadCrdt?: Crdt = undefined;
  /**
   * Loads the descendants of a Crdt that requested to
   * skip doing so during the initial call to [[load]],
   * by returning false from its [[Crdt.load]] method.
   * Typically this method will only be called by `crdt` itself,
   * in order to lazily load its descendants.
   *
   * `crdt`'s [[Crdt.postLoad]] method is not called again
   * (it was called during the initial skipped loading);
   * instead, `crdt` should do any post-loading after this method returns.
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
      this.delayedLoadCrdt = undefined;
    }
  }

  private inRunLocally = false;

  /**
   * **Experimental method.**  Track progress at [https://github.com/composablesys/compoventuals/issues/172](https://github.com/composablesys/compoventuals/issues/172).
   *
   * While processing a received message m (either local or remote),
   * this method can be called to run `doPureOps` as if
   * it had been called by m's sender, as part of the operation
   * that created m.  All operations performed in `doPureOps`
   * are run locally with m's timestamp in place of a timestamp
   * from the local user, and the resulting messages are not
   * sent on the network.
   *
   * `doPureOps` must only perform collaborative data type
   * operations.  Furthermore, it must be *pure* in the sense of Section 4 of
   * [http://arxiv.org/abs/1710.04469](http://arxiv.org/abs/1710.04469): the messages sent as a result of its
   * operations must not depend on the current state or
   * on properties of the local replica (e.g., its [[replicaId]]).
   * This ensures that the result is the same as if `doPureOps`
   * had been called by m's sender, resulting in messages
   * sent to us in the usual way.
   *
   * This method allows you to do "remote procedure calls (RPCs)"
   * for collaborative data type operations, in which one
   * replica instructs all others to perform certain operations,
   * without having to do the operations explicitly.  For
   * example, suppose you use a map from colors to pixels
   * to make a collaborative whiteboard data type.  To fill
   * a large rectangle, you could set each affected pixel,
   * but that would result in one operation per pixel - potentially
   * expensive on the network.  `runLocally` lets you instead
   * send a single message describing the rectangle.  All
   * recipient replicas then process the message by using
   * `runLocally` to do the original (per-pixel) operations.
   *
   * @param doPureOps The pure collaborative data type operations
   * to run locally.
   * @return `doPureOps`'s return value.
   */
  runLocally<T>(doPureOps: () => T): T {
    let oldInRunLocally = this.inRunLocally;
    this.inRunLocally = true;
    const toReturn = doPureOps();
    this.inRunLocally = oldInRunLocally;
    return toReturn;
  }

  /**
   * @return Whether this `Runtime` is currently in
   * a call to [[runLocally]].
   */
  get isInRunLocally(): boolean {
    return this.inRunLocally;
  }
}
