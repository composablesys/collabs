import { CausalTimestamp } from "../../net";
import { ElementSerializer } from "../../util";
import { Runtime } from "../core";

// TODO: stuff for cursors (exposing raw locs)

// TODO: perhaps instead of trying to optimize each function
// that iterates over a portion of the list, we can
// optimize get() for sequential accesses, by caching a
// tree iterator for the previous access, and using it
// if the next access is +/-1 from the previous one,
// to get access in O(1) time instead of O(log n).
// Although, really this shouldn't be a problem in general
// because even though it is O(log n), the constant factor
// is small: it is just an int comparison, not a full loc
// comparison.

/**
 * TODO: ops can assume causal order.
 *
 * L for "location", abbr. "loc".  TODO: pos?  Sounds more
 * standard but the plural is awkward.
 */
export interface DenseLocalList<L, T> extends ElementSerializer<L> {
  /**
   * TODO: needs to called exactly once, before using.
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
   * immediately on this replica.
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
  ): number;

  /**
   * Create and return count new locs, inserted starting
   * at index, without modifying the list's externally
   * visible state
   * (but you may modify internal state, e.g., to make sure
   * the locs are not created again later).  These locs
   * will later be sent to all replicas (including this
   * one) by the caller and then passed to this.set,
   * instead of using prepareNewLocs / receiveNewLocs.
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
   * be the same, so if loc is already present, it is
   * safe to do nothing.
   *
   * @return the index of loc at the end of the method
   */
  set(loc: L, value: T): number;

  /**
   * TODO: loc might already be deleted.
   *
   * @param  loc [description]
   * @return    [previous index of deleted value, deleted
   * value] or undefined if loc was not present  (TODO: is value needed?)
   */
  delete(loc: L): [index: number, value: T] | undefined;

  /**
   * Delete all locs in the range [startLoc, endLoc] that are causally
   * <= timestamp.  Note that startLoc and endLoc may have been deleted
   * already.
   * @param  startLoc  [description]
   * @param  endLoc    [description]
   * @param  timestamp [description]
   * @param  ondelete  called with the deletion index each time an index
   * is deleted
   * @return           [description]
   */
  deleteRange(
    startLoc: L,
    endLoc: L,
    timestamp: CausalTimestamp,
    ondelete: (index: number) => void
  ): void;

  // TODO: causal bulk-delete ability
  // TODO: sending shorter locs on deletion
  // TODO: in MutCList's, make sure storing a bunch
  // of locs in our own data structure doesn't increase
  // memory usage too much.  (Might end up doing this as
  // well in PrimitiveCList, so that we can store a map
  // from ids to locs, for delete messages).

  get(index: number): T;

  getLoc(index: number): L;

  readonly length: number;

  // indexOf(loc: L): number;

  values(): IterableIterator<T>;

  valuesArray(): T[];

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
   * saved loc array.  TODO: ArrayLike instead of values
   * (equally flexible and accomodates strings)?
   * Or, explicit undefined option for all-undefined
   * values?
   */
  loadLocs(saveData: Uint8Array, values: (index: number) => T): void;
}
