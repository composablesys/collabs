import { CrdtParent } from "./crdt_parent";
import { EventEmitter } from "./event_emitter";
import { MessageMeta } from "./message_meta";
import { isRuntime, Runtime } from "./runtime";

/**
 * Used to initialize a Crdt.  A token {name, parent} must
 * **only** be created and used by parent itself, to construct
 * a Crdt that it is adding as a child.
 */
export class InitToken {
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
 * their own [[InitToken]].  Typically `C` extends [[Crdt]].
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
export function Pre<C, Args extends any[]>(
  Class: new (initToken: InitToken, ...args: Args) => C
): (...args: Args) => Pre<C> {
  return (...args: Args) =>
    (initToken: InitToken) =>
      new Class(initToken, ...args);
}

/**
 * Supertype for events emitted by Crdts.
 *
 * Such events are (typically) emitted after the Crdt processes a local
 * or remote operation.
 *
 * TODO: Some special events (e.g. in
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
  readonly meta: MessageMeta;
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
 * See [Events](../events.md) for advice on what events to
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
   *
   * TODO: change to "Event"
   */
  Change: CrdtEvent;
}

/**
 * @typeParam M the type of MessageMeta required for [[receive]]
 * and from the ambient [[Runtime]].
 * @typeParam Events TODO
 */
export abstract class Crdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends EventEmitter<Events> {
  /**
   * The ambient [[Runtime]].
   */
  readonly runtime: Runtime;
  /**
   * The Crdt's parent in the tree of Crdts.
   */
  readonly parent: CrdtParent;
  /**
   * The Crdt's name, which distinguishes it among its siblings
   * in the tree of Crdts.
   */
  readonly name: string;

  /**
   * Uses the given [[InitToken]] to register this Crdt
   * with its parent, thus attaching it to the tree of Crdts.
   * @param initToken A [[InitToken]] given by
   * `initToken.parent` for use in constructing this Crdt.
   */
  constructor(initToken: InitToken) {
    super();
    // TODO: enforce the type here directly? Tricky because
    // the parent might not require as strict of MessageMeta.
    // For now, we enforce it when parent accepts the child:
    // it must check that child is a subtype of Crdt<runtime's
    // provided MessageMeta>.
    this.runtime = initToken.runtime;
    this.parent = initToken.parent;
    this.name = initToken.name;
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
   * See [Events](../../events.md) for advice on what events to emit.
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

  protected send(messagePath: (Uint8Array | string)[]) {
    this.parent.childSend(this, messagePath);
  }

  /**
   * Callback used by this Crdt's parent to deliver
   * a message, possibly for one of this Crdt's descendants.
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
    // event or marking the Crdt as needing saving.
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
   * TODO: params
   */
  protected abstract receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void;

  abstract load(saveData: Uint8Array | null): Promise<void>;
  abstract save(): Promise<Uint8Array>;

  getNamePath(descendant: Crdt): string[] {
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
   * TODO: needs to work even in the middle of load
   * (so need to lazily load children before calling
   * getDescendant on them, if the namePath goes farther).
   * Can we implement this functionality once in an abstract
   * ParentCrdt class?
   *
   * TODO: error behavior (bad namePath vs no longer exists
   * (DeletingMutCSet case)).
   *
   * @param  namePath [description]
   * @return          [description]
   */
  abstract getDescendant(namePath: string[]): Crdt;

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
}
