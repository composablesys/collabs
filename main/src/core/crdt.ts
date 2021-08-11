import { EventEmitter } from "../util";
import { CausalTimestamp } from "./causal_broadcast_network";
import { RootCrdt, Runtime } from "./runtime";

/**
 * A Crdt that can be a parent to other Crdts.
 *
 * In addition to implementing this interface,
 * Crdt parents are responsible for calling
 * Crdt.init(name, this) on each child Crdt immediately
 * after the child is constructed,
 * where name is the child Crdt's name.
 */
export interface CrdtParent extends Crdt {
  /**
   * Callback called by a child at the end of init when this is passed
   * to init as parent.  It should throw an error if this is not the
   * object calling init.
   * @param child the child Crdt on which init was called with this as parent
   */
  onChildInit(child: Crdt): void;
}

/**
 * An event issued when a Crdt is changed by either
 * a remote or local operation.
 *
 * TODO: on/emit/etc.
 *
 * Crdts should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed.
 *
 * General advice:
 * - Events should be sufficient to maintain a view of
 * the state.  But, it is recommended to omit info
 * that the user can get from the Crdt during the event
 * listener (e.g., in CMap, events provide key but not value,
 * since the listener can get the value themselves.)
 * - Give the previous value, if it cannot be determined
 * otherwise (e.g. from the remaining state).  That is useful
 * for some views that only account for part of the state,
 * e.g., the size of a CMap.
 * - Don't dispatch events redundantly if there is no way
 * to tell whether they are redundant.  E.g., in CSet, only
 * dispatch Add if the value went from (not present) to (present);
 * don't dispatch it if the value was already present.
 * That is useful
 * for some views that only account for part of the state,
 * e.g., the size of a CSet.
 */
export interface CrdtEvent {
  /**
   * The causal timestamp of the change.
   *
   * Note that
   * because several CRDTs can share the same runtime, timestamps
   * may not be continguous (i.e., entries in their vector clocks
   * might skip numbers).  However, causally ordered delivery is
   * still guaranteed.
   * */
  readonly timestamp: CausalTimestamp;
}

/**
 * A record of events for a Crdt, indexed by name.
 *
 * Crdt types should define an events record extending
 * this interface, adding a record for each possible change.
 * Each record's type should be a subinterface of
 * CrdtEvent.
 */
export interface CrdtEventsRecord {
  /**
   * Emitted every time a Crdt changes (or may have
   * changed).  Specifically, it is emitted every time
   * a Crdt receives a message, at the end of message processing.
   *
   * This event should generally not be listened on.
   * Logical operations may be composed of multiple messages,
   * each of which emits a Change event, so when early
   * Change events are emitted, the Crdt may be in
   * a nonsensical, transient internal state.
   */
  Change: CrdtEvent;
}

/**
 * The base class for all Crdts.
 *
 * Most Crdt types will not extend this class directly,
 * instead extending CompositeCrdt, PrimitiveCrdt, or
 * SemidirectProduct.
 */
export abstract class Crdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends EventEmitter<Events> {
  private static readonly notYetInitMessage =
    "this value is not available until after Crdt.init() " +
    "(consider overriding init() and doing this after super.init())";
  protected afterInit = false;

  private runtimePrivate?: Runtime;
  /** This Crdt's host Runtime. */
  get runtime(): Runtime {
    if (this.runtimePrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.runtimePrivate;
  }

  private parentPrivate?: CrdtParent;
  /** This Crdt's parent in the name hierarchy. */
  get parent(): CrdtParent {
    if (this.parentPrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.parentPrivate;
  }

  private namePrivate?: string;
  /** This Crdt's name in the name hierarchy. */
  get name(): string {
    if (this.namePrivate === undefined) {
      throw new Error(Crdt.notYetInitMessage);
    }
    return this.namePrivate;
  }

  /**
   * An array of names listing all names on this Crdt's
   * path to the RootCrdt, in order starting with this
   * Crdt's name.
   */
  pathToRoot(): string[] {
    let ans = [];
    for (
      let current: Crdt = this;
      (current as RootCrdt).isRootCrdt !== true;
      current = current.parent
    ) {
      ans.push(current.name);
    }
    return ans;
  }

  /**
   * Called by this Crdt's parent to set its name
   * and parent.
   *
   * This method must be called immediately after
   * this is constructed, before performing any operations
   * or receiving messages from remote replicas.
   */
  init(name: string, parent: CrdtParent) {
    if (this.runtimePrivate !== undefined) {
      throw new Error(
        "init() has already been called" +
          " (did you try to give this Crdt two parents?)"
      );
    }
    this.runtimePrivate = parent.runtime;
    this.parentPrivate = parent;
    this.namePrivate = name;
    this.afterInit = true;
  }

  // private needsSaving = false;
  /**
   * Callback used by this Crdt's CrdtParent to deliver
   * a message, possibly for one of this Crdt's descendants.
   * This method calls receiveInternal and
   * then dispatches a "Change" event.
   *
   * Do not override this method; instead, override
   * receiveInternal.
   *
   * @targetPath the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * stopping at this Crdt (exclusive).
   * TODO: warning: mutated
   * @param timestamp The timestamp of the received message
   * @param message   The received message
   */
  receive(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receiveInternal(targetPath, timestamp, message);
    // this.needsSaving = true;
    this.emit("Change", { timestamp: timestamp });
  }

  /**
   * Core method used to receive messages, possibly for
   * one of this Crdt's descendants.
   *
   * @targetPath the target Crdt's id followed by
   * the ids of its ancestors in ascending order,
   * stopping at this Crdt (exclusive).
   * @param timestamp The timestamp of the received message
   * @param message   The received message
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
   * Returns the given child of this Crdt.
   * Only for use by Runtime; all others use
   * Runtime.getCrdtByRer
   *
   * @param name the child's name
   */
  abstract getChild(name: string): Crdt;

  /**
   * If this Crdt is in its initial, post-constructor state, then
   * this method should (but is not required to) return true; otherwise, it must return false.
   *
   * When canGc() is true, users of this Crdt may
   * delete it from memory ("garbage collection"),
   * recreating it using the
   * same constructor arguments if needed later.  That reduces
   * the state space of many Crdt collections.
   */
  abstract canGc(): boolean;

  // /**
  //  * Only for use by Runtime.
  //  *
  //  * Returns whether this Crdt needs saving, specifically,
  //  * whether any messages have been received (including
  //  * for descendants) since the last call to this method.
  //  *
  //  * TODO: allow overriding if you know better?  Or, option
  //  * for save to return null for saveData if only children
  //  * need to be updated?  E.g. if you change a single attribute
  //  * in a YjsCrdtSet rich text.  Although usually you'd be
  //  * changing characters, so this is moot.
  //  */
  // getAndResetNeedsSaving(): boolean {
  //   const ans = this.needsSaving;
  //   this.needsSaving = false;
  //   return ans;
  // }

  /**
   * Only for use by Runtime.
   *
   * Must have no side-effects, and be able to be called
   * multiple times.
   *
   * saveData: a serialization of this Crdt's
   * own internal state that is not set in the
   * constructor, sufficient to reconstruct the
   * state after initializing this Crdt with the same
   * constructor arguments and then calling
   * this.load(saveData).  This should not include
   * saveData for children (their save methods will
   * be called separately), but should be sufficient
   * to initialize the children (i.e., construct them,
   * without loading them) in this.load(saveData).
   *
   * children: a map from name to child for this Crdt's
   * nontrivial children.  This must include all children
   * for which canGc() is false, and may safely contain
   * more.  These children will be saved recursively.
   */
  abstract save(): [saveData: Uint8Array, children: Map<string, Crdt>];

  /**
   * Only for use by Runtime.
   *
   * Reconstruct the saved state recorded in saveData,
   * which comes from an output of save().
   * This includes setting all non-child state not set in
   * the constructor, and initializing (constructing but
   * not loading)
   * all nontrivial children (it is also safe to constuct
   * trivial children).  The children will then be loaded
   * recursively.
   *
   * During loading, you must not reference the state
   * of any Crdt, although you may call
   * Runtime.getCrdtByReference (e.g., by deserializing
   * Crdt references).  This is because other Crdts may
   * not have been loaded before this one (however,
   * they are at least initialized (constructed) if
   * demanded by Runtime.getCrdtByReference).
   * If you depend on other Crdt's state to set your own
   * state, you must store it in your own saveData.  An
   * exception is your state that is a function of
   * descendants' state, which you can initialize in
   * postLoad().
   *
   * This instance is guaranteed to have been initialized identically
   * to the saved instance, i.e., they have the same
   * constructor args, but not otherwise modified before
   * load is called.  In particular, this instance may
   * have an initial value set in the constructor; make sure
   * you account for this (e.g., in a set with initial
   * elements, be careful not to duplicate those elements
   * during loading, if the saved state also contained those
   * elements).
   *
   * In general, load will be called on a replica with a
   * different replicaId than the saving replica.  Also,
   * the same state may be loaded by different replicas
   * concurrently.  So make sure to account for this.
   *
   * Events should not be dispatched, since there is no
   * associated timestamp.  An exception is events that are
   * already not associated with timestamps, like CrdtSet
   * ValueInit events.  This means that you cannot depend
   * on events from children to help initialize your own
   * state (e.g., to setup cached views of child state);
   * instead, you must set that state in postLoad or load.
   *
   * getChild may be called on this Crdt after it is loaded
   * but before its children are loaded.  If this.load might
   * cause this.getChild to be called (e.g., because you
   * deserialize a reference to one of your descendants),
   * you must ensure that this.getChild succeeds.  Typically,
   * you can accomplish this by initializing children in
   * the same order as they were initialized in the saved
   * state, since one child's constructor can only have
   * received references to prior children (see YjsCrdtSet
   * for an example).
   */
  abstract load(saveData: Uint8Array): void;

  /**
   * Only for use by Runtime.
   *
   * Override to initialize some state after load is called
   * on this and all of its descendants have
   * been loaded.  During this method, it is safe to
   * set your state that is a function of descendant's
   * state (e.g., a sorted view
   * of a descendant collection's values that you cache
   * for efficiency).  This method is provided as an
   * optimization; it is always safe to instead
   * store your state in saveData and load it in load().
   */
  postLoad(): void {}
}