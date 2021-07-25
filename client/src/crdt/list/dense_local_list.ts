import { ElementSerializer } from "../../util";
import { Runtime } from "../core";

// TODO: more efficient serialization of delete messages?
// (Just send uid, not the whole seqId).

// TODO: range ops (send only one timestamp).

// TODO: stuff for cursors (exposing raw ids)

/**
 * TODO: ops can assume causal order.
 */
export interface DenseLocalList<I, T> extends ElementSerializer<I> {
  /**
   * TODO: needs to called exactly once, before using.
   * Can we move this to the constructor instead?
   * deserialize will use this Runtime automatically,
   * ignoring its argument.
   */
  setRuntime(runtime: Runtime): void;

  /**
   * TODO: index follows same rules as CList.insert.
   * This must be a pure function (don't change state),
   * just prepare an id for insertion on all nodes.
   */
  createAt(index: number): I;

  /**
   * TODO: value associated to id is always the same.
   * id might be already present, but it's safe to do nothing
   * in that case.  Also, id may have existed before and
   * been deleted (we're restoring it).
   *
   * @return the insertion index
   */
  insert(id: I, value: T): number;

  /**
   * TODO: id might already be deleted.
   *
   * @param  id [description]
   * @return    [previous index of deleted value, deleted
   * value] or undefined if id was not present
   */
  delete(id: I): [index: number, value: T] | undefined;

  get(index: number): T;

  indexOf(id: I): number;

  valuesArray(): T[];

  /**
   * Save the ids only in a format suitable for saveData.
   * The values will be saved separately (as an array in
   * order) by the caller.
   */
  saveIds(): Uint8Array;

  /**
   * Load the ids specified by saveData (from saveIds)
   * and the values specified by the values callback,
   * which represents an array of the same length as the
   * saved id array.
   */
  loadIds(saveData: Uint8Array, values: (index: number) => T): void;
}
