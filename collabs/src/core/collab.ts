import { CollabParent } from "./collab_parent";
import { EventEmitter } from "./event_emitter";
import { MessageMeta } from "./message_meta";
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
  constructor(readonly name: string, readonly parent: CollabParent) {}

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
 * `Pre<C>`s are passed to methods like [[Runtime.registerCollab]]
 * or [[CObject.addChild]] that construct a new [[Collab]] using
 * their own [[InitToken]].  Typically `C` extends [[Collab]].
 *
 * You can use the [[Pre]] function to easily construct
 * `Pre<C>`s based on `C`'s constructor.  See
 * [Initialization](../initialization.md) for examples.
 *
 * Calling a callback a `Pre<C>`` indicates that it is one-use.
 * Multi-use callbacks should instead have their types written
 * out explicitly (as a function).
 *
 * @typeParam C The type of the object to be constructed.
 */
export type Pre<C> = (initToken: InitToken) => C;

/**
 * Given a class, outputs a function that acts like the
 * class's constructor, except that the function outputs a
 * `[[Pre]]<C>` instead of requiring a [[InitToken]]
 * as its first parameter.
 *
 * In other words, `Pre` curries the constructor, shifting
 * the first argument to instead be the input of a second
 * function.
 *
 * Typical usage looks like `Pre(Class name)<generic types>(constructor arguments omitting the first)`,
 * where `Class`'s constructor takes a [[InitToken]]
 * as its first argument.  See [Initialization](../initialization.md) for explicit
 * examples and use cases.
 *
 * @param Class
 * @return A function that is like `Class`'s constructor,
 * except that the function outputs a
 * `[[Pre]]<C>` instead of requiring a [[InitToken]]
 * as its first parameter.
 */
export function Pre<C, Args extends unknown[]>(
  Class: new (initToken: InitToken, ...args: Args) => C
): (...args: Args) => Pre<C> {
  return (...args: Args) =>
    (initToken: InitToken) =>
      new Class(initToken, ...args);
}

/**
 * Supertype for events emitted by Collabs.
 *
 * Such events are typically emitted after the Collab processes a local
 * or remote message.
 *
 * TODO: Some special events (e.g. in
 * [[CMountPoint]]) are only associated to a local operation instead
 * of a replicated one; in that case, they should still
 * extend CollabEvent, and they should always set
 * `meta: `[[CollabEventMeta]]`.local(runtime)`.
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
   * event, except restricted to the scope of this [[Collab]] and
   * its descendants.
   */
  Any: CollabEvent;
}

/**
 * TODO
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
   * with its parent, thus attaching it to the tree of Collabs.
   * @param initToken A [[InitToken]] given by
   * `initToken.parent` for use in constructing this Collab.
   */
  constructor(initToken: InitToken) {
    super();
    this.runtime = initToken.runtime;
    this.parent = initToken.parent;
    this.name = initToken.name;
  }

  /**
   * Returns context for the given key as supplied by
   * some ancestor, or undefined if not supplied.
   *
   * Keys are queried by [[Collab.getContext]] in
   * a call chain (like in object inheritance): first, the [[Collab]]
   * calls `getAddedContext(key)` on the parent;
   * if that returns undefined, it calls on the grandparent,
   * etc., ending with the [[Runtime]].
   *
   * As in object inheritance, a key present in one [[Collab]]
   * overshadows its ancestors' values for that key,
   * but that [[Collab]] may choose to consult the next
   * higher up value, accessed through its own [[Collab.getContext]]
   * method.
   *
   * The returned context may be a value or a function.
   * The value case is analogous to a property,
   * while the function case is analogous to a method.
   *
   * Typically, context values are local to this replica
   * and should not be consulted when receiving messages.
   * Otherwise, the received message
   * may be processed inconsistently on different replicas.
   * Context necessary for a message should instead be included
   * in that message, either directly or as a field on its
   * [[MessageMeta]].
   */
  getContext(key: symbol): unknown {
    let current: CollabParent = this.parent;
    for (;;) {
      const currentAttempt = current.getAddedContext(key);
      if (currentAttempt !== undefined) return currentAttempt;
      if (isRuntime(current)) return undefined;
      current = current.parent;
    }
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
   * @param  messagePath [description] TODO: will be modified
   */
  protected send(messagePath: (Uint8Array | string)[]): void {
    this.parent.childSend(this, messagePath);
  }

  /**
   * Callback used by this Collab's parent to deliver
   * a message, possibly for one of this Collab's descendants.
   *
   * For implementers: do not override this method; instead, override
   * [[receiveInternal]], which is called by this method.
   *
   * TODO: params
   *
   * TODO: warning: messagePath may be modified (length decreased);
   * copy before use.
   */
  receive(messagePath: (Uint8Array | string)[], meta: MessageMeta) {
    this.receiveInternal(messagePath, meta);
    // While we do nothing here currently, we reserve the ability
    // to do per-message processing in the future, e.g., dispatching an
    // event or marking the Collab as needing saving.
  }

  /**
   * Core method used to receive messages, possibly for
   * one of this Collab's descendants.
   *
   * TODO: params
   *
   * TODO: sample desc from CPrimitive:
   * Receives messages sent by [[send]]
   * on local and replica replicas of this [[CPrimitive]].
   */
  protected abstract receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void;

  abstract save(): Uint8Array;
  abstract load(saveData: Uint8Array | null): void;

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
    return namePath;
  }

  /**
   * Returns the  descendant of this Collab at the
   * given `namePath`.
   *
   * TODO: inclusive of this.
   *
   * TODO: needs to work even in the middle of load
   * (so need to lazily load children before calling
   * getDescendant on them, if the namePath goes farther).
   * Can we implement this functionality once in an abstract
   * ParentCollab class? Also, in general, you're guaranteed load
   * has already been called if namePath.length > 0, but not
   * otherwise ("this" case).
   *
   * TODO: error behavior (bad namePath vs no longer exists
   * (DeletingMutCSet case)).
   *
   * @param  namePath [description]
   * @return          [description]
   */
  abstract getDescendant(namePath: string[]): Collab;

  /**
   * If this Collab is in its initial, post-constructor state, then
   * this method may (but is not required to) return true; otherwise, it returns false.
   *
   * When canGC() is true, users of this Collab may safely
   * delete it from memory ("garbage collection"),
   * recreating it using the
   * same constructor arguments if needed later.  That reduces
   * the state space of some Collab collections
   * (e.g., [[GrowOnlyImplicitMutCMap]]).
   */
  abstract canGC(): boolean;
}
