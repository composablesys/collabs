import { EventEmitter } from "./event_emitter";
import { IRuntime, isRuntime } from "./iruntime";
import { Parent } from "./parent";
import { MetaRequest, SavedStateTree, UpdateMeta } from "./updates";

/**
 * Used to initialize a [[Collab]] with the given
 * `name` and `parent.`
 *
 * A token `{name, parent}` must
 * **only** be created and used by `parent` itself, to construct
 * a Collab that it is adding as a child.
 */
export class InitToken {
  /**
   * Type guard, to prevent Collab from being an InitToken.
   */
  readonly isInitToken = true;

  constructor(readonly name: string, readonly parent: Parent) {}
}

/**
 * Supertype for events emitted by Collabs.
 *
 * Such events are typically emitted after the Collab processes an
 * update - either local or remote, and either a message or a saved state.
 *
 * See [[CollabEventsRecord]].
 */
export interface CollabEvent {
  /**
   * Metadata for the update that caused this event.
   */
  readonly meta: UpdateMeta;
}

/**
 * A record of events for a Collab, indexed by name.
 *
 * Collab subclasses generally should define an events record extending
 * this interface, adding a record for each possible change.
 * Each record has the form `eventName: EventType`, where eventName
 * is a string and `EventType` is a type implementing [[CollabEvent]].
 * The Collab should then emit appropriate events each time its
 * state changes due to a local or remote operation.
 * See [Events](../events.md) for advice on what events to
 * include.
 *
 * TypeScript can't directly enforce the condition that each `EventType`
 * implements [[CollabEvent]], so we instead
 * enforce this indirectly by making [[Collab.emit]] only accept
 * events extending [[CollabEvent]].
 */
export interface CollabEventsRecord {
  /**
   * Emitted right after any other event is emitted.
   *
   * Listen on this if you want to know each time the [[Collab]]
   * emits an event (e.g., so you can refresh a display based on
   * its state) without having to listen on each
   * individual event type.
   *
   * When using [[CRuntime]], note that this event may be emitted
   * in the middle of a transaction, and multiple times during a
   * transaction or synchronous series of transactions. You may wish to wait to
   * refresh displays until the next [[CRuntimeEventsRecord.Change]] event, e.g.:
   * ```ts
   * let isDirty = false;
   * collab.on("Any", () => { isDirty = true; });
   * runtime.on("Change", () => {
   *   if (isDirty) {
   *     refreshDisplay();
   *     isDirty = false;
   *   }
   * })
   * ```
   */
  Any: CollabEvent;
}

/**
 * The base class for collaborative data structures ("Collabs", for short).
 *
 * Typically, implementations will not extend this class
 * directly, instead extending an existing subclass;
 * see [Custom Collaborative Data Structures](../../custom_types.md).
 *
 * # Abstraction
 *
 * Fundamentally, `Collab` is an abstraction representing
 * a data structure that is replicated across multiple
 * replicas (i.e., a replicated data type),
 * with the replicas kept in sync by sending messages to each
 * other. The precise network model (causal broadcast,
 * server-serialized order, immediate local echo, etc.)
 * is left open, to let the library be as general as
 * possible. Instead, each Collab should specify its network requirements,
 * typically in the form of a specific [[IRuntime]] or
 * ancestor `Collab`s; users are then expected to meet
 * these requirements when using the Collab.
 *
 * # Use Cases
 *
 * Potential use cases for `Collab` subclasses include operation-based CRDTs,
 * state-based CRDTs, Operational Transformation types,
 * and strongly consistent types with server-serialized messages.
 * However, by default, the library only includes operation-based
 * CRDTs, together with a [[CRuntime]] needed to
 * use them. Nonetheless, many parts of the library
 * can be reused with more general collaborative data
 * structures (e.g., `CObject`). These can be determined
 * by viewing the source code: any classes in `src` and
 * outside of `src/crdts` should be suitable for general use,
 * while `src/crdts` includes the built-in CRDTs and CRDT-specific
 * helpers.
 *
 * # Composition
 *
 * `Collab` natively supports *composition*: nesting
 * `Collab`s inside of each other to form parent/child
 * relationships, while maintaining
 * replication in the obvious way (children of replicas
 * are themselves replicas).
 *
 * Supported kinds of composition include
 * ordinary object-oriented composition ([[CObject]]),
 * collections of `Collab`s (e.g., [[CSet]]),
 * and `Collab`s that provide a specific
 * environment to their children (e.g., [[CRDTMetaLayer]]).
 *
 * `Collab`s that can be a parent to other `Collab`s must
 * implement [[IParent]], so that their type is
 * assignable to [[Parent]].
 * Each parent `Collab` has full control over its children,
 * allowing a wide range of behavior to be implemented
 * using `Collab` ancestors (e.g., message batching
 * ([[BatchingLayer]]), causal ordering
 *  ([[CRDTMetaLayer]]), and lazy-loading (WIP)).
 *
 * Internally, each `Collab` has a [[parent]] and a [[name]];
 * the [[name]] uniquely identifies the `Collab` among its
 * siblings. They are assigned at construction time using
 * the [[InitToken]] constructor argument.
 * The parent relationships form a tree of `Collab`s,
 * rooted at the [[IRuntime]].
 *
 * Each `Collab` is responsible
 * for its subtree:
 * - Messages are sent up the tree
 * and delivered down the tree. Children call `parent.childSend`
 * (in [[send]]) to send a message, while parents call
 * `child.receive` to deliver a message. Ancestors may choose to
 * modify messages during either sending or receiving.
 * - [[save]] and [[load]] are
 * responsible for saving and loading a `Collab`'s entire
 * subtree. Typically, [[save]] will call [[save]] on each
 * child, then combine those saves with its own `Collab`s info
 * to get its own save data. [[load]] then reverses the process,
 * calling [[load]] on each child.
 *
 * Typically, [[receive]], [[load]], and [[save]] should
 * only be called by the parent.
 *
 * # Other Features
 *
 * ## Events
 *
 * See [Events](../../events.md) and the docs for
 * [[CollabEventsRecord]].
 *
 * ## Saving and Loading
 *
 * See [Saving and Loading](../../saving_and_loading.md) and the docs for
 * [[save]] and [[load]].
 */
export abstract class Collab<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends EventEmitter<Events> {
  /**
   * The ambient [[IRuntime]].
   */
  readonly runtime: IRuntime;
  /**
   * The Collab's parent in the tree of Collabs.
   */
  readonly parent: Parent;
  /**
   * The Collab's name, which distinguishes it among its siblings
   * in the tree of Collabs.
   */
  readonly name: string;

  /**
   * Uses the given [[InitToken]] to register this Collab
   * with its parent, attaching it to the tree of Collabs.
   * @param init A [[InitToken]] given by
   * `init.parent` for use in constructing this Collab.
   */
  constructor(init: InitToken) {
    super();
    this.runtime = isRuntime(init.parent) ? init.parent : init.parent.runtime;
    this.parent = init.parent;
    this.name = init.name;
  }

  /**
   * Emits an event, which notifies all registered event handlers.
   * After emitting event, an "Any" event with the same
   * event.meta is emitted, unless it is already an "Any" event.  (Usually, Collabs should not emit an "Any" event
   * directly, instead emitting a more specific, custom event.)
   *
   * `event` is forced to implement [[CollabEvent]], to indirectly
   * express the requirement that all event types in
   * the [[CollabEventsRecord]] implement [[CollabEvent]].
   *
   * See [Events](../../events.md) for advice on what events to emit.
   *
   * @typeParam `eventName` as a string literal type.
   * @param eventName Name of the event.
   * @param event Event object to pass to the event handlers.
   * @param emitAnyEvent = true if true (default) and the
   * event is not an "Any" event, an "Any" event is
   * emitted immediately after `event`.
   */
  protected emit<K extends keyof Events>(
    eventName: K,
    event: Events[K] & CollabEvent,
    emitAnyEvent = true
  ): void {
    super.emit(eventName, event);
    if (emitAnyEvent && eventName !== "Any") {
      super.emit("Any", { meta: event.meta });
    }
  }

  /**
   * Sends the given message. You may assume that it will be
   * delivered to [[Collab.receive]] on each replica of this
   * Collab, with guarantees set by the [[runtime]].
   *
   * For convenience, the message may be expressed as a stack of
   * `(Uint8Array | string)`,
   * instead of just a single Uint8Array. This is
   * useful for parents sending messages on behalf of their children;
   * see the implementations of [[CObject.childSend]] and
   * [[CObject.receive]] for an example.
   * Note that this method may mutate `messageStack` in-place.
   *
   * Technically, ancestors in the tree of Collabs may violate the
   * delivery assumption. For example, [[CSet]] does not
   * deliver messages to deleted set elements. Ancestors that do so
   * are responsible for ensuring consistency (etc.), so you usually do not
   * need to worry about such violations.
   *
   * @param messageStack The message to send, in the form of a stack
   * of Uint8Arrays.
   * @param metaRequests A stack of metadata requests. The IRuntime will use
   * the union of these when creating the [[UpdateMeta]] for [[receive]].
   * Note that the stack need not align with `messageStack`.
   */
  protected send(
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    this.parent.childSend(this, messageStack, metaRequests);
  }

  /**
   * Called by this Collab's parent to deliver
   * a message. You may assume that the message was sent by
   * [[send]] on some replica of this Collab (possibly `this`),
   * with guarantees set by the [[runtime]].
   *
   * @param messageStack The message to receive, in the same format
   * as in [[send]]. It is okay to mutate `messageStack` in-place,
   * e.g., calling `pop`.
   * @param meta Metadata attached to this message by the runtime.
   * It incorporates metadata requests made in [[send]]. Note that
   * `meta.updateType` is always `"message"`.
   */
  abstract receive(
    messageStack: (Uint8Array | string)[],
    meta: UpdateMeta
  ): void;

  /**
   * Called by this Collab's parent to obtain saved state. The saved
   * state describes the current state of this
   * `Collab` and its descendants.
   *
   * The saved state may later be passed to [[load]] on a replica of
   * this Collab, possibly in a different collaboration session,
   * with rules set by the [[runtime]]. For example, [[CRuntime]]
   * allows [[load]] to be called at any time; it must act as a "merge"
   * operation, applying all updates that the saved replica had applied
   * before saving, ignoring duplicates.
   *
   * `save` may be called at any time, possibly many times while an app
   * is running. Calling `save` should not affect this Collab's
   * user-visible state.
   *
   * For convenience, the saved state may be expressed as a tree of
   * Uint8Arrays instead of just a single Uint8Array; see
   * [[SaveStateTree]]'s docs. Also, this method may return `null` if
   * the saved state is trivial; replicas loading the whole document
   * will then skip calling [[load]] on this Collab's replica.
   *
   * @return The saved state, in the form of a [[SavedStateTree]], or null
   * if there is no state to save.
   */
  abstract save(): SavedStateTree | null;

  /**
   * Called by this Collab's parent to load some saved state.
   * You may assume that the saved state was generated by
   * [[save]] on some replica of this Collab (possibly `this`, although then
   * it's redundant),
   * with guarantees set by the [[runtime]].
   *
   * Note that when loading a whole document, this Collab's `load` is skipped
   * if its saved replica's [[save]] call returned `null`.
   *
   * @param savedStateTree The saved state to load, in the form of a
   * [[SavedStateTree].
   * @param meta Metadata attached to this saved state by the runtime.
   * It incorporates all possible metadata requests. Note that
   * `meta.updateType` is always `"savedState"`.
   */
  abstract load(savedStateTree: SavedStateTree, meta: UpdateMeta): void;

  /**
   * If this Collab is in its initial, post-constructor state, then
   * this method may (but is not required to) return true; otherwise, it returns false.
   * Returning true allows some collections to reduce memory usage
   * (in particular, [[CLazyMap]]).
   *
   * When canGC() is true and there are no other (non-weak)
   * references to this Collab, [[parent]] may choose to
   * delete it from memory, allowing garbage collection.
   * If this is needed later, [[parent]] will reconstruct an equivalent
   * object using the same constructor and constructor arguments.
   * See [[CLazyMap]]'s implementation for an example.
   *
   * By default, this method always returns false.
   */
  canGC(): boolean {
    return false;
  }

  /**
   * Called by this Collab's parent when it has been deleted from a
   * collection on the local
   * replica and can no longer be used. A Collab implementation can
   * implement this method to clean up
   * external resources, e.g., associated DOM elements.
   *
   * In particular, finalize is called at the end of receiving a [[CSet.delete]]
   * operation (just after the "Delete" event) for this Collab or its ancestor.
   * Implementing finalize may be more convenient than cleaning up during
   * the "Delete" event, especially if the CSet is wrapped by another Collab.
   *
   * finalize has no relation to [[canGC]] or to the JavaScript garbage
   * collector. In particular, it is not called when a local copy is deleted
   * from memory due to [[canGC]] but may be revived later.
   *
   * By default, this method does nothing.
   */
  finalize(): void {
    // Default: no-op.
  }
}
