import { CausalTimestamp } from "../../net";
import { ElementSerializer } from "../../util";
import { Runtime } from "../core";

// TODO: stuff for cursors (exposing raw locs)

/**
 * Ops can assume causal order.
 *
 * L for "location", abbr. "loc".
 *
 * Methods should throw errors on out-of-bounds
 * index accesses.
 */
export interface DenseLocalList<L, T> extends ElementSerializer<L> {
  /**
   * Needs to called exactly once, before using.
   * Can we move this to the constructor instead?
   * deserialize will use this Runtime automatically,
   * ignoring its argument.
   */
  setRuntime(runtime: Runtime): void;

  /**
   * Return a message describing count new locs, inserted
   * starting at index, without the modifying the list's
   * externally visible state
   * (but you may modify internal state, e.g., to make sure
   * the locs are not created again later).  The message
   * will be input to receiveNewLocs on all replicas,
   * immediately on this replica.  The new locations must
   * be unique, even in comparison to deleted values, because
   * those deleted values may be reused.
   *
   * @param  index [description]
   * @param  count [description]
   * @return       [description]
   */
  prepareNewLocs(index: number, count: number): Uint8Array;

  /**
   * Receive a message from prepareNewLocs, inserting the locs
   * specified in the call to prepareNewLocs with the given
   * values.  timestamp is provided so you can use it
   * to assign metadata (e.g., sender, senderCounter)
   * without needing to duplicate it in message (although
   * note that senderCounter cannot be used to guarantee
   * uniqueness).  If the message
   * was from this replica, it will have just been created,
   * without any intervening operations.
   *
   * @param  message   [description]
   * @param  timestamp [description]
   * @param  values    [description]
   * @return           the index of the first value
   */
  receiveNewLocs(
    message: Uint8Array,
    timestamp: CausalTimestamp,
    values: ArrayLike<T>
  ): [index: number, locs: L[]];

  /**
   * Create and return count new locs, inserted starting
   * at index, without modifying the list's externally
   * visible state
   * (but you may modify internal state, e.g., to make sure
   * the locs are not created again later).  These locs
   * will later be sent to all replicas (including this
   * one) by the caller and then passed to this.set,
   * instead of using prepareNewLocs / receiveNewLocs.
   * The new locations must
   * be unique, even in comparison to deleted values, because
   * those deleted values may be reused.
   *
   * @param  index [description]
   * @param  count [description]
   * @return       [description]
   */
  createNewLocs(index: number, count: number): L[];

  /**
   * Set the value at loc.  loc may be new (received
   * from another replica), it may already be present,
   * or it may have previously been present but been
   * deleted.  The value associated to loc will always
   * be the same (up to replacement after GC), so if loc
   * is already present, it is safe to do nothing.
   *
   * @return the index of loc at the end of the method
   */
  set(loc: L, value: T): number;

  /**
   * loc might already be deleted.
   *
   * @param  loc [description]
   * @return    [previous index of deleted value,
   * deleted value],
   * or undefined if loc was not present
   */
  delete(loc: L): [index: number, deletedValue: T] | undefined;

  get(index: number): T;

  getLoc(index: number): L;

  readonly length: number;

  indexOf(loc: L): number | undefined;

  values(): IterableIterator<T>;

  locs(): IterableIterator<L>;

  /**
   * This should be guarded against mutation
   * @return [description]
   */
  valuesArray(): T[];

  /**
   * uniqueNumber must be an int.  Ideally nonnegative
   * (and then change PrimitiveList's protobuf encoding
   * from sint to uint),
   * but for now we don't require this because
   * Treedoc can give negative values.
   *
   * Must work on (just) deleted locs.
   * @param  loc [description]
   * @return     [description]
   */
  idOf(loc: L): [sender: string, uniqueNumber: number];

  canGc(): boolean;

  /**
   * Save the locs only in a format suitable for saveData.
   * The values will be saved separately (as an array in
   * order) by the caller.
   */
  saveLocs(): Uint8Array;

  /**
   * Load the locs specified by saveData (from saveLocs)
   * and the values specified by the values callback,
   * which represents an array of the same length as the
   * saved loc array.
   */
  loadLocs(saveData: Uint8Array, values: (index: number) => T): void;

  // TODO: refactor together with Cursor.
  // Perhaps just leftIndexOf, rightIndexOf, going
  // along with indexOf?
  // Also: leftIndex is wrong name because it is only the
  // left index once you take Cursor's subtraction into
  // account (perhaps subtract one in the answer and add one
  // in Cursor?).
  leftIndex(loc: L): number;
  rightIndex(loc: L): number;
}
