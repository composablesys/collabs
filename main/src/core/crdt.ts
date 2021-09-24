import { EventEmitter } from "../util";
import { CausalTimestamp } from "./causal_broadcast_network";
import { isRuntime } from "./is_runtime";
import { Runtime } from "./runtime";

/**
 * A parent of a Crdt.
 *
 * Only the root Crdt (which you will never
 * encounter directly) has the [[Runtime]] as its
 * parent; the rest have another Crdt as their parent.
 */
export type CrdtParent = Crdt | Runtime;

/**
 * Used to initialize a Crdt.  A token {name, parent} must
 * **only** be created and used by parent itself, to construct
 * a Crdt that it is adding as a child.
 */
export class CrdtInitToken {
  /**
   * Must **only** be called and used by parent itself, to construct
   * a Crdt that it is adding as a child.
   */
  constructor(readonly name: string, readonly parent: CrdtParent) {}

  /**
   * @return `parent`'s [[Runtime]].
   */
  get runtime(): Runtime {
    if (isRuntime(this.parent)) return this.parent;
    else return this.parent.runtime;
  }
}

/**
 * A callback used to construct a `C`, i.e., a "Pre-`C`".
 *
 * `Pre<C>`s are passed to methods like [[Runtime.registerCrdt]]
 * or [[CObject.addChild]] that construct a new [[Crdt]] using
 * their own [[CrdtInitToken]].  Typically `C` extends [[Crdt]].
 *
 * You can use the [[Pre]] function to easily construct
 * `Pre<C>`s based on `C`'s constructor.  See
 * [Initialization](../initialization.html) for examples.
 *
 * Calling a callback a `Pre<C>`` indicates that it is one-use.
 * Multi-use callbacks should instead have their types written
 * out explicitly (as a function).
 *
 * @typeParam C The type of the object to be constructed.
 */
export type Pre<C> = (initToken: CrdtInitToken) => C;

/**
 * Given a class, outputs a function that acts like the
 * class's constructor, except that the function outputs a
 * `[[Pre]]<C>` instead of requiring a [[CrdtInitToken]]
 * as its first parameter.
 *
 * In other words, `Pre` curries the constructor, shifting
 * the first argument to instead be the input of a second
 * function.
 *
 * Typical usage looks like `Pre(Class name)<generic types>(constructor arguments omitting the first)`,
 * where `Class`'s constructor takes a [[CrdtInitToken]]
 * as its first argument.  See [Initialization](../initialization.html) for explicit
 * examples and use cases.
 *
 * @param Class
 * @return A function that is like `Class`'s constructor,
 * except that the function outputs a
 * `[[Pre]]<C>` instead of requiring a [[CrdtInitToken]]
 * as its first parameter.
 */
export function Pre<C, Args extends any[]>(
  Class: new (initToken: CrdtInitToken, ...args: Args) => C
): (...args: Args) => Pre<C> {
  return (...args: Args) =>
    (initToken: CrdtInitToken) =>
      new Class(initToken, ...args);
}

/**
 * Metadata for a [[CrdtEvent]].
 */
export interface CrdtEventMeta {
  /**
   * The replicaId of the replica that initiated the operation
   * described by this event.
   */
  readonly sender: string;
  /**
   * Whether the operation was initiated locally.
   *
   * Equivalent to this.sender === (ambient Runtime).replicaId.
   */
  readonly isLocal: boolean;
}

/**
 * A collection of utility functions for constructing
 * [[CrdtEventMeta]]s.
 */
export const CrdtEventMeta = {
  /**
   * Returns a [[CrdtEventMeta]] for an event
   * caused by an operation/message with the given timestamp.
   *
   * @param  timestamp [description]
   * @return           [description]
   */
  fromTimestamp(timestamp: CausalTimestamp): CrdtEventMeta {
    return { sender: timestamp.getSender(), isLocal: timestamp.isLocal() };
  },

  /**
   * Returns a [[CrdtEventMeta]] for an event
   * caused by an operation/message with the given sender.
   *
   * @param  sender  [description]
   * @param  runtime The ambient [[Runtime]], used to get
   * our own `replicaId`.
   * @return         [description]
   */
  fromSender(sender: string, runtime: Runtime): CrdtEventMeta {
    return { sender, isLocal: sender === runtime.replicaId };
  },

  /**
   * Returns a [[CrdtEventMeta]] for an event
   * caused by a local operation.
   *
   * @param  runtime The ambient [[Runtime]], used to get
   * our own `replicaId`.
   * @return         [description]
   */
  local(runtime: Runtime): CrdtEventMeta {
    return { sender: runtime.replicaId, isLocal: true };
  },
};

/**
 * Supertype for events emitted by Crdts.
 *
 * Such events are (typically) emitted after the Crdt processes a local
 * or remote operation.
 *
 * Some special events (e.g. in
 * [[CMountPoint]]) are only associated to a local operation instead
 * of a replicated one; in that case, they should still
 * extend CrdtEvent, and they should always set
 * `meta: `[[CrdtEventMeta]]`.local(runtime)`.
 *
 * See [[CrdtEventsRecord]].
 */
export interface CrdtEvent {
  /**
   * Metadata for this event.
   */
  readonly meta: CrdtEventMeta;
}

/**
 * A record of events for a Crdt, indexed by name.
 *
 * Crdt subclasses generally should define an events record extending
 * this interface, adding a record for each possible change.
 * Each record has the form `eventName: EventType`, where eventName
 * is a string and `EventType` is a type implementing [[CrdtEvent]].
 * The Crdt should then emit appropriate events each time its
 * state changes due to a local or remote operation.
 * See [Events](../events.html) for advice on what events to
 * include.
 *
 * TypeScript won't directly enforce the condition that each `EventType`
 * implements [[CrdtEvent]], so we instead
 * enforce this indirectly by making [[Crdt.emit]] only accept
 * events extending [[CrdtEvent]].
 */
export interface CrdtEventsRecord {
  /**
   * Emitted right after any other event is emitted.
   *
   * Listen on this if you want to know each time the [[Crdt]]
   * is changed (e.g., so you can refresh a display based on
   * its state) without having to listen on each
   * individual event type.
   */
  Change: CrdtEvent;
}

/**
 * The base class for all collaborative data structures.
 *
 * Most Crdts will not extend this class directly,
 * instead extending an existing construction like
 * [[CObject]], [[CPrimitive]], or [[SemidirectProduct]].
 * See [Custom Types](../../custom_types.html).
 *
 * @typeParam Events The events for this Crdt.
 */
export abstract class Crdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends EventEmitter<Events> {
  /**
   * The ambient [[Runtime]], responsible for sending
   * and receiving this Crdt's messages.
   */
  readonly runtime: Runtime;
  /**
   * The Crdt's parent in the tree of Crdts.
   */
  readonly parent: CrdtParent;
  /**
   * The Crdt's name, which distinguishes it among its siblings
   * in tree of Crdts.
   */
  readonly name: string;

  /**
   * Uses the given [[CrdtInitToken]] to register this Crdt
   * with its parent, thus attaching it to the tree of Crdts.
   * @param initToken A [[CrdtInitToken]] given by
   * `initToken.parent` for use in constructing this Crdt.
   */
  constructor(initToken: CrdtInitToken) {
    super();
    this.runtime = initToken.runtime;
    this.parent = initToken.parent;
    this.name = initToken.name;
  }

  /**
   * Returns an array listing all names on this Crdt's
   * path to the root Crdt, in order starting with this
   * Crdt's name.  If this is the root Crdt, returns `[]`.
   */
  pathToRoot(): string[] {
    let ans = [];
    for (
      let current: Crdt = this;
      !isRuntime(current.parent);
      current = current.parent
    ) {
      ans.push(current.name);
    }
    return ans;
  }

  /**
   * Emits an event, which notifies all registered event handlers.
   * After emitting event, a "Change" event with the same
   * event.meta is emitted, unless it is already a "Change" event.  (Usually, Crdts should not emit a "Change" event
   * directly, instead emitting a more specific, custom event.)
   *
   * `event` is forced to implement [[CrdtEvent]], to indirectly
   * express the requirement that all event types in
   * the [[CrdtEventsRecord]] implement [[CrdtEvent]].
   *
   * See [Events](../../events.html) for advice on what events to emit.
   *
   * @typeParam `eventName` as a string literal type.
   * @param eventName Name of the event.
   * @param event Event object to pass to the event handlers.
   */
  protected emit<K extends keyof Events>(
    eventName: K,
    event: Events[K] & CrdtEvent
  ): void {
    super.emit(eventName, event);
    if (eventName !== "Change") {
      super.emit("Change", { meta: event.meta });
    }
  }

  /**
   * Callback used by this Crdt's CrdtParent to deliver
   * a message, possibly for one of this Crdt's descendants.
   *
   * For implementers: do not override this method; instead, override
   * [[receiveInternal]], which is called by this method.
   *
   * @param targetPath The target Crdt's name followed by
   * the names of its ancestors in ascending order,
   * stopping at this Crdt (exclusive).  `targetPath` is mutated
   * and should not be reused.
   * @param timestamp The timestamp of the received message.
   * @param message   The received message.
   */
  receive(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receiveInternal(targetPath, timestamp, message);
    // While we do nothing here currently, we reserve the ability
    // to do per-message processing in the future, e.g., dispatching a
    // "Message" event or marking the Crdt as needing saving.
  }

  /**
   * Core method used to receive messages, possibly for
   * one of this Crdt's descendants.
   *
   * For implementers: although `receiveInternal` may modify messages intended for its
   * descendants (so long as eventual consistency is ensured),
   * local messages (sent by the local replica) must be delivered
   * unchanged.  The only exception is if you are explicitly not
   * allowing messages from that descendant
   * (e.g., messages from deleted values in
   * [[DeletingMutCSet]]); in that case, this method should throw
   * an error, preventing the offending operation.
   *
   * @param targetPath the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * stopping at this Crdt (exclusive).
   * @param timestamp The timestamp of the received message.
   * @param message   The received message.
   */
  protected abstract receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void;
  // TODO: use (homebrew?) iterator for targetPath.
  // Make it easy to copy for multiple uses (copying
  // index but not the underlying array).

  /**
   * Returns the child of this Crdt with the given name.
   *
   * Only [[Runtime]] should call this method; all others
   * should use [[Runtime.getCrdtByReference]].
   *
   * @param name
   */
  abstract getChild(name: string): Crdt;

  /**
   * If this Crdt is in its initial, post-constructor state, then
   * this method may (but is not required to) return true; otherwise, it returns false.
   *
   * When canGc() is true, users of this Crdt may safely
   * delete it from memory ("garbage collection"),
   * recreating it using the
   * same constructor arguments if needed later.  That reduces
   * the state space of many Crdt collections.
   */
  abstract canGc(): boolean;

  /**
   * Saves this Crdt's internal state in serialized form.
   * This method should only be called by [[Runtime.save]].
   *
   * The returned `saveData` (first return value) may later be passed to [[load]]
   * on a newly initialized instance of the same class,
   * constructed with the same constructor arguments.
   * The loaded instance must then have the same internal state,
   * capable of sending and receiving operations as usual
   * while ensuring eventual consistency.
   *
   * The returned `children` is a map from name to child for this Crdt's
   * nontrivial children.  [[Runtime.save]] will save those children recursively.
   *
   * TODO: move advice to guide (also load)?  Likewise for subclass versions?
   *
   * Advice for implementers:
   * - `saveData` should not encode child *states*, but it must
   * be sufficient to initialize all children (i.e., construct them, without loading their
   * own saved sate) in [[load]], if they were not already
   * initialized by the constructor.  Typically, this means
   * that you must save info about how to construct
   * dynamically-created children.
   * - `children` must include all children
   * for which canGc() is false, and may safely contain
   * more.
   * - Note that
   * [[load]] will be called on a replica
   * with a different replicaId than this one, and that
   * the save data may be loaded by multiple replicas concurrently.  Thus
   * the save data must be forkable without breaking eventual
   * consistency.
   */
  abstract save(): [saveData: Uint8Array, children: Map<string, Crdt>];

  /**
   * Loads the state from `saveData`.  See [[save]].  This method should
   * only be called by [[Runtime.load]].
   *
   * This must have been constructed with the same class and
   * constructor arguments as the saved instance, and it must
   * not have sent or received any messages yet.
   *
   * Events are not dispatched during loading.
   *
   * Advice for implementers:
   * - This method should not load child states; children will instead be
   * loaded recursively by [[Runtime.load]].
   * - However, this method should ensure that all nontrivial
   * children are initialized (constructed), if they are not already
   * initialized by the constructor.  Typically, this means
   * that you must construct any dynamically-created children
   * described by `saveData`.
   * - This method must not reference the state
   * of any other Crdt except this's ancestors.  An exception is
   * that it may call
   * [[Runtime.getCrdtByReference]] (e.g., by deserializing
   * Crdt references).  That is because other Crdts may
   * not have been loaded before this one; however,
   * they are at least initialized (constructed) if
   * demanded by [[Runtime.getCrdtByReference]].
   * Crdts that depend on other Crdt's state to set their own
   * state must instead store it in their own `saveData` or
   * load it during [[postLoad]].
   * - Do not dispatch events during loading.
   * - Do not depend on your children to dispatch events during
   * loading.  E.g., if you normally maintain a view
   * of one of your children's state using events, you will
   * instead need to either save and load the view explicitly
   * using your own `saveData`, or you will need to reconstruct
   * it during [[postLoad]].  See TODO (loading page section on views or vice-versa).
   * - [[getChild]] may be called on this Crdt after it is loaded
   * but before its children are loaded; you must ensure this
   * succeeds.  Also, if this method might
   * cause `this.getChild` to be called (e.g., because it
   * deserializes a reference to one of this's descendants),
   * you must ensure that the `getChild` call succeeds.  Typically,
   * you can accomplish that by initializing dynamically-created children in
   * the same order as they were originally created
   * (by operations), since one child's constructor can only have
   * received references to causally prior children in its constructor
   * arguments.  See [[DeletingMutCSet.load]]
   * for an example implementation that does so.
   *
   * @param saveData An output of [[save]] from a previous
   * instance of this class. Note that `saveData` will have been output
   * by a different replica (with a different [[Runtime.replicaId]]),
   * and the same `saveData` may be loaded on multiple
   * replicas, possibly concurrently.
   *
   * @return Whether the descendants should be loaded now.
   * This should be true unless you are doing some form of
   * lazy loading (e.g., [[CMountPoint]]).
   * If false, this Crdt can
   * later request that its descendants be loaded
   * by calling [[Runtime.delayedLoadDescendants]](this).
   */
  abstract load(saveData: Uint8Array): boolean;

  /**
   * Performs post-loading, setting internal state that is
   * a function of this's descendants' states.  This method should
   * only be called by [[Runtime.load]].
   *
   * During the loading sequence, this method is called after `load` is called
   * on this and all of its descendants.
   * Hence it is safe to
   * set state that is a function of this's descendant's
   * state (e.g., a sorted view
   * of a descendant collection's values that you cache
   * for efficiency).
   *
   * This method is provided as an
   * optimization; it is always safe for subclasses to instead
   * store their state in the `saveData` and load it in `load`.
   *
   * If load returns false, then postLoad() is called
   * immediately afterwards, even though descendants have
   * not been loaded.  It is not called again if
   * the descendants are later loaded by
   * [[Runtime.delayedLoadDescendants]](this).
   */
  postLoad(): void {}
}
