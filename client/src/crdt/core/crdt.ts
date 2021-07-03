import { CausalTimestamp } from "../../net";
import { EventEmitter } from "../../util";
import { CrdtParent } from "./interfaces";
import { RootCrdt, Runtime } from "./runtime";

/**
 * An event issued when a Crdt is changed by either
 * a remote or local operation.
 *
 * TODO: on/emit/etc.
 *
 * Crdts should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed.
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

  private needsSaving = false;
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
    this.needsSaving = true;
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

  /**
   * Only for use by Runtime.
   *
   * Returns whether this Crdt needs saving, specifically,
   * whether any messages have been received (including
   * for descendants) since the last call to this method.
   */
  getAndResetNeedsSaving(): boolean {
    const ans = this.needsSaving;
    this.needsSaving = false;
    return ans;
  }

  /**
   * Only for use by Runtime.
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
   * more.  These children will be saved recursively
   * if needed (according to getAndResetNeedsSaving).
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
   * TODO: note why circular dependencies are impossible;
   * advice for long linear chains due to constructor
   * args as Crdt refs (try to init children in
   * receipt/causal order if this is possible).  Actually
   * that should be mandatory so that getChild calls
   * during load will always succeed (see comment in
   * YjsCrdtSet.load).
   *
   * TODO: note that your replicaId will be different
   * from the saver's.
   *
   * TODO: don't forget to setup any state needed for
   * future save() calls.
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
