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
}
