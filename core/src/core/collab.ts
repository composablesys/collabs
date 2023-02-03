import { CollabParent } from "./collab_parent";
import { EventEmitter } from "./event_emitter";
import { Message, MessageMeta, MetaRequest } from "./message";
import { isRuntime, Runtime } from "./runtime";

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

  constructor(readonly name: string, readonly parent: CollabParent) {}
}

/**
 * Supertype for events emitted by Collabs.
 *
 * Such events are typically emitted after the Collab processes a local
 * or remote message.
 *
 * See [[CollabEventsRecord]].
 */
export interface CollabEvent {
  /**
   * Metadata for this event.
   *
   * Typically, this is the [[MessageMeta]] passed along
   * with the message that triggered this event.
   */
  readonly meta: MessageMeta;
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
   * For Collabs that emit an event after each user-facing change,
   * this is effectively the same as [[Runtime]]'s "Change"
   * event (TODO: removed), except restricted to the scope of this [[Collab]] and
   * its descendants.
   */
  Any: CollabEvent;
}

// TODO: revise all docstrings
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
 * typically in the form of a specific [[Runtime]] or
 * ancestor `Collab`s; users are then expected to meet
 * these requirements when using the Collab.
 *
 * # Use Cases
 *
 * Potential use cases for `Collab` subclasses include operation-based CRDTs,
 * state-based CRDTs, Operational Transformation types,
 * and strongly consistent types with server-serialized messages.
 * However, by default, the library only includes operation-based
 * CRDTs, together with a [[CRDTRuntime]] needed to
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
 * collections of `Collab`s (e.g., [[DeletingMutCSet]]),
 * and `Collab`s that provide a specific
 * environment to their children (e.g., [[CRDTMetaLayer]]).
 *
 * `Collab`s that can be a parent to other `Collab`s must
 * implement [[ICollabParent]], so that their type is
 * assignable to [[CollabParent]].
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
 * rooted at the [[Runtime]].
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
   * The ambient [[Runtime]].
   */
  readonly runtime: Runtime;
  /**
   * The Collab's parent in the tree of Collabs.
   */
  readonly parent: CollabParent;
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
   * Sends the given message.
   *
   * In general, `messagePath` will be then be delivered
   * to [[Collab.receive]] on each replica of this. However,
   * ancestors may choose to modify the message before delivery,
   * including possibly delivering extra messages or none at all.
   *
   * @param  messagePath An array of messages to be
   * delivered to replicas' [[receive]] method.
   * Typically this takes the form of a child `Collab`'s
   * sent `messagePath`, with an extra message sent by this
   * `Collab` appended to the end. Note that the array may
   * be modified in-place by ancestors.
   * @param metaRequests need not align with messagePath
   */
  protected send(messagePath: Message[], metaRequests: MetaRequest[]): void {
    this.parent.childSend(this, messagePath, metaRequests);
  }

  /**
   * Callback used by this Collab's parent to deliver
   * a message, possibly for one of this Collab's descendants.
   *
   * @param messagePath A messagePath sent by a local or
   * remote replica
   * using [[send]], possibly modified by ancestor
   * `Collab`s. This may be modified in-place. A common pattern
   * is to read the last message, decrement the length,
   * and then deliver it to a child `Collab`.
   * @param meta Metadata attached to this message by
   * ancestor `Collab`s.
   */
  abstract receive(messagePath: Message[], meta: MessageMeta): void;

  // TODO: give context/meta? Take meta requests? I guess in worst case,
  // you could ask Runtime.
  /**
   * Returns save data describing the current state of this
   * `Collab` and its descendants, sufficient to restore the
   * state on a new replica by calling [[load]]`(`[[Optional.of]]`(saveData))`.
   *
   * The usage pattern of `save` and [[load]] is:
   * 1. `save` is called on one replica, returning save data.
   * 2. A new replica of this `Collab` is created using the
   * same class and same constructor arguments
   * (the usual [Initialization](../../initialization.md) requirements for replicas).
   * 3. [[load]]`(saveData)` is called on that replica. This
   * is expected to give an identical state to that when
   * `save` was called, except that replica is different
   * (in particular, [[Runtime.replicaID]] is different).
   * 4. The replica proceeds normally, receiving any messages
   * that had not yet been received before the `save` call.
   *
   * Before [[load]] is called, this `Collab` and its descendants
   * must not be used to perform operations or receive messages.
   * Behavior is undefined if that condition is violated.
   *
   * A special case of the usage pattern is when an app
   * is created without any prior save data. In that case,
   * [[load]]`(`[[Optional.empty]]`())` is called instead,
   * to indicate that loading has been skipped and that the
   * `Collab` can start being used.
   *
   * `save` may be called multiple times throughout an app's
   * lifecycle, and it should not affect the user-visible state.
   * `save` may **not** be called in the middle of an operation or transaction
   * (either being sent or received), to ensure that this
   * `Collab` is in a reasonable, stable, user-facing state.
   *
   * @return save data
   */
  abstract save(): Uint8Array;

  // OPT: tree-aware format (e.g. map plus this-data), like send/receive.
  abstract load(saveData: Uint8Array, meta: MessageMeta): void;

  /**
   * Returns the "name path" from `descendant` to `this`,
   * i.e., the list of names on that path in the tree of
   * `Collab`s.
   *
   * I.e., it is `[descendent.name, descendant.parent.name,
   * descendant.parent.parent.name, ...]` continuing
   * until `this` is reached, excluding `this.name`.
   *
   * [[getDescendant]] does the reverse procedure.
   * [[getNamePath]] and [[getDescendant]] together allow
   * one to make a serializable reference to a `Collab` that
   * is comprehensible across replicas.
   *
   * See also: [[CollabID]].
   *
   * @param  descendant A `Collab` that is a descendant
   * of `this`.
   * @throws if `descendant` is not a descendant of `this`
   * in the tree of `Collab`s.
   */
  getNamePath(descendant: Collab): string[] {
    let current = descendant;
    const namePath = [];
    while (current !== this) {
      namePath.push(current.name);
      if (isRuntime(current.parent)) {
        throw new Error("getNamePath called on non-descendant");
      }
      current = current.parent;
    }
    namePath.reverse();
    return namePath;
  }

  /**
   * Returns the descendant of this Collab at the
   * given name path, or `undefined`
   * if it no longer exists.
   *
   * If `namePath` is `[]`, `this` is returned.
   *
   * See also: [[CollabID]].
   *
   * @param  namePath A name path referencing a descendant
   * of this `Collab` (inclusive), as returned by [[getNamePath]].
   * It is iterated, consuming the iterator.
   * @return The descendant at the given name path, or `undefined`
   * if it no longer exists.
   * @throws If no descendant with the given `namePath` could possibly
   * exist, e.g., this has a fixed set of children and the child name
   * is not one of them.
   */
  abstract getDescendant(namePath: Iterator<string>): Collab | undefined;

  /**
   * If this Collab is in its initial, post-constructor state, then
   * this method may (but is not required to) return true; otherwise, it returns false.
   *
   * When canGC() is true and there are no non-weak
   * references to this Collab, users of this Collab may safely
   * delete it from memory ("garbage collection"),
   * recreating it using the
   * same constructor arguments if needed later.  That reduces
   * the state space of some Collab collections
   * (in particular, [[LazyMutCMap]]).
   */
  abstract canGC(): boolean;
}
