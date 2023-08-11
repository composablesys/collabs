import { EventEmitter } from "./event_emitter";
import { IRuntime, isRuntime } from "./iruntime";
import { Parent } from "./parent";
import {
  MessageMeta,
  MetaRequest,
  SavedStateMeta,
  SavedStateTree,
  UpdateMeta,
} from "./updates";

/**
 * Used to initialize a [[Collab]] with the given
 * [[name]] and [[parent]].
 *
 * An InitToken must
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
 * See [[CollabEventsRecord]].
 */
export interface CollabEvent {
  /**
   * Metadata for the update that caused this event.
   */
  readonly meta: UpdateMeta;
}

/**
 * A record of events emitted by a [[Collab]],
 * mapping from event name to event type.
 *
 * Typically, a Collab emits an event whenever its local state
 * changes. The event should use a Collab-specific name and
 * type to completely describe the change. Note that different
 * replicas may see different events: the events describe
 * the *local* view of the changes.
 *
 * Events records are only intended for type bookkeeping,
 * not for use by literal objects or classes.
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
   * multiple times in the middle of a transaction. You typically
   * want to wait to
   * refresh displays until the next [[DocEventsRecord.Change]] event, e.g.:
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
 * Base class for a collaborative data structure (abbreviated "Collab").
 *
 * A Collab is a data structure that is replicated across multiple
 * devices and stays in sync between them: when one device
 * changes a Collab, their changes show up for every other device.
 *
 * Like local (non-collaborative) data structures, library users interact
 * with Collabs through type-specific methods (both mutators and accessors).
 * In addition, a Collab emits events describe state changes, in the style of
 * reactive programming. This allows you to observe changes due to
 * remove operations, although local operations also cause events. See [[on]].
 *
 * This base class provides a framework for implementing and networking
 * Collabs. Most of its properties are not relevant to users of the Collab
 * but are public for technical reasons; these are marked "Internal use only".
 *
 * To implement a custom Collab, you will usually extend one of the following
 * classes instead of Collab itself:
 * - [[CObject]]: For object-oriented composition of existing Collabs.
 * - [[CPrimitive]]: For a "primitive" Collab that sends its own messages
 * over the network.
 * - [[PrimitiveCRDT]]: CRDT variant of CPrimitive that provides
 * CRDT-specific features.
 *
 * @typeParam Events Events record indicating the names and types of
 * events emitted by this Collab.
 */
export abstract class Collab<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends EventEmitter<Events> {
  /**
   * The ambient [[IRuntime]].
   *
   * Use this to access utilities like [[IRuntime.replicaID]].
   */
  readonly runtime: IRuntime;
  /**
   * Internal (this/parent) use only.
   *
   * This Collab's parent in the tree of Collabs.
   */
  readonly parent: Parent;
  /**
   * Internal (this/parent) use only.
   *
   * This Collab's name, which distinguishes it among its siblings
   * in the tree of Collabs.
   */
  readonly name: string;

  /**
   * Initializes this Collab with the given [[InitToken]].
   *
   * The InitToken must have provided by our parent explicitly for
   * this constructor call.
   *
   * Typically, a Collab subclass takes `init` as its first constructor
   * argument and calls `super(init)`.
   */
  constructor(init: InitToken) {
    super();
    this.runtime = isRuntime(init.parent) ? init.parent : init.parent.runtime;
    this.parent = init.parent;
    this.name = init.name;
  }

  /**
   * Emits an event, which triggers all the registered event handlers.
   *
   * See [[CollabEventsRecord]] for advice
   * on what events to emit.
   *
   * This is a wrapper around [[EventEmitter.emit]]
   * that forces events to extend [[CollabEvent]]
   * and also emits an "Any" event.
   *
   * @param options.skipAnyEvent Set to true
   * to skip emitting an "Any" event.
   */
  protected emit<K extends keyof Events>(
    eventName: K,
    event: Events[K] & CollabEvent,
    options?: { skipAnyEvent?: boolean }
  ): void {
    super.emit(eventName, event);
    if (!options?.skipAnyEvent && eventName !== "Any") {
      super.emit("Any", { meta: event.meta });
    }
  }

  /**
   * Broadcasts a message to other replicas of this Collab.
   * The message will be delivered to all replicas' [[receive]],
   * including locally.
   *
   * For convenience, the message may be expressed as a stack of
   * `(Uint8Array | string)`,
   * instead of just a single Uint8Array. This is
   * useful for parents sending messages on behalf of their children;
   * see the implementation of [[CObject]] for an example.
   *
   * @param messageStack The message to send, in the form of
   * a stack of Uint8Arrays. Note that this method
   * may mutate it in-place.
   * @param metaRequests A stack of metadata requests. The [[runtime]] will use
   * the union of these when creating the [[MessageMeta]] for [[receive]].
   * Note that the stack need not align with `messageStack`, and this method may mutate
   * it in place.
   */
  protected send(
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    this.parent.childSend(this, messageStack, metaRequests);
  }

  /**
   * Internal (parent) use only.
   *
   * Receives a message sent by [[send]]
   * on a local or remote replica of this Collab.
   *
   * This method processes the message, changes the
   * local state accordingly, and emits events describing the
   * local changes.
   *
   * This method should make assumptions and
   * ensure consistency guarantees
   * appropriate to its use case. For example, CRDTs may
   * assume eventual, exactly-once, causal-order message
   * delivery, and they must ensure strong eventual consistency.
   *
   * @param messageStack The message to receive, in the same format
   * as in [[send]]. This method may mutate `messageStack`
   * in-place (e.g., calling `pop`).
   * @param meta Metadata attached to this message by the [[runtime]].
   * It incorporates metadata requests made in [[send]]. Note that
   * `meta.updateType` is always `"message"`.
   */
  abstract receive(
    messageStack: (Uint8Array | string)[],
    meta: MessageMeta
  ): void;

  /**
   * Internal (parent) use only.
   *
   * Returns saved state describing the current state of this Collab.
   *
   * The saved state may later be passed to [[load]] on a replica of
   * this Collab, possibly in a different collaboration session,
   * with rules set by the [[runtime]]. For example, [[CRuntime]]
   * allows [[load]] at any time; it must then act as a merge operation
   * (like a state-based CRDT), applying all updates that the saved
   * replica had applied before saving, ignoring duplicates.
   *
   * `save` may be called at any time, possibly many times while an app
   * is running. Calling `save` should not affect this Collab's
   * user-visible state.
   *
   * For convenience, the saved state may be expressed as a tree of
   * Uint8Arrays instead of just a single Uint8Array; see
   * [[SaveStateTree]]'s docs.
   *
   * @return The saved state.
   */
  abstract save(): SavedStateTree;

  /**
   * Internal (parent) use only.
   *
   * Called by this Collab's parent to load saved state.
   * You may assume that the saved state was generated by
   * [[save]] on some replica of this Collab,
   * possibly in a different collaboration session,
   * with guarantees set by the [[runtime]].
   *
   * This method may also be called with `savedStateTree = null`;
   * you should ignore such calls (i.e., return immediately)
   * *unless* you override [[canGC]]. If you do override `canGC`,
   * see that method's docs for instructions.
   *
   * @param savedStateTree The saved state to load, in the same format as in [[save]],
   * or `null` as described above.
   * @param meta Metadata attached to this saved state by the runtime.
   * It incorporates all possible metadata requests. Note that
   * `meta.updateType` is always `"savedState"`.
   */
  abstract load(
    savedStateTree: SavedStateTree | null,
    meta: SavedStateMeta
  ): void;

  /**
   * Internal (parent) use only.
   *
   * If this Collab is in its initial, post-constructor state, then
   * this method may (but is not required to) return true; otherwise, it returns false.
   *
   * By default, this method always returns false; override to change.
   *
   * If this method returns true:
   * 1. The parent may choose to weakly reference this object to save memory
   * (e.g., [[CLazyMap]] does so). If this becomes garbage
   * collected, then is needed later, the parent will recreate it using the
   * same constructor call.
   * 2. The parent may skip calling [[save]] during saving. When loading
   * the resulting saved state, the parent will call `load(null, meta)`.
   * [[load]] should process this as if called with the output of [[save]]
   * from a garbage-collectable state. For a nontrivial example,
   * see [[CMultiValueMap.load]]'s implementation.
   */
  canGC(): boolean {
    return false;
  }

  /**
   * Internal (parent) use only.
   *
   * Called by this Collab's parent when it has been deleted from a
   * collection on the local
   * replica and can no longer be used (e.g., due to [[CSet.delete]] on this
   * or an ancestor). A Collab implementation can
   * implement this method to clean up
   * external resources, e.g., associated DOM elements.
   *
   * `finalize` has no relation to the JavaScript garbage collector or
   * [[canGC]].
   *
   * By default, this method does nothing.
   */
  finalize(): void {
    // Default: no-op.
  }
}
