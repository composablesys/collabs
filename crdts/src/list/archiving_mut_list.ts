import {
  Collab,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/core";
import { ArchivingMutCSet } from "../set";
import { CVar } from "../var";
import { ListPosition } from "./list_position_source";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";

/**
 * A list of mutable values, each represented by a [[Collab]] of type `C`.
 *
 * Because the values are Collabs, you can't insert a new value by sending
 * it over the network directly. Instead, you supply arbitrary InsertArgs
 * to [[insert]], which sends those values over the network. Then all replicas
 * construct the actual value - replicas of a new Collab - by calling
 * the `valueConstructor` callback that you supply in the constructor.
 * See the constructor's docs for an example.
 *
 * When a value is deleted with [[delete]], it is archived and can still
 * be used, and it can be restored later with [[restore]]. Note this comes
 * at the cost of increased memory usage: since values are never deleted,
 * they will occupy memory forever once inserted.
 * See [[DeletingMutCList]] for an alternative semantics.
 */
export class ArchivingMutCList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  CVar<ListPosition>,
  ArchivingMutCSet<
    MovableMutCListEntry<C, CVar<ListPosition>>,
    [ListPosition, InsertArgs]
  >
> {
  /**
   * Constructs an [[ArchivingMutCList]] with the given valueConstructor and
   * optional arguments.
   *
   * The valueConstructor is a callback used to construct newly inserted
   * values. It takes (arbitrary) InsertArgs, plus an [[InitToken]], and returns
   * a new value replica. For example, with value type [[CCounter]],
   * and taking an initial value as
   * the InsertArgs (`InsertArgs = [initialValue: number]`):
   * ```
   * import * as collabs from "@collabs/collabs";
   * // ...
   *
   * function valueConstructor(valueInitToken: collabs.InitToken, initialValue: number) {
   *   return new collabs.CCounter(valueInitToken, initialValue);
   * }
   * // app is a CRDTApp or CRDTContainer
   * const list = app.registerCollab(
   *   "list",
   *   (init) => new collabs.ArchivingMutCList(init, valueConstructor)
   * );
   * ```
   * Then when any replica calls `list.insert(index, initialValue)`, e.g. in response to
   * a user button click, all replicas run `valueConstructor` to create
   * a new counter value. These values are all linked, i.e., they
   * start with the same value (`initialValue`) and replicate each other's operations.
   *
   * For more info, see the [Guide](../../../guide/initialization.html#dynamically-created-collabs).
   *
   * @param init         [description]
   * @param valueConstructor  [description]
   * @param initialValuesArgs = [] Optional, use this to specify InsertArgs for
   * initial values that are present when the list is created.
   * @param argsSerializer = DefaultSerializer.getInstance() Optional,
   * use this to specify a custom [[Serializer]] for InsertArgs.
   */
  constructor(
    init: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      init,
      (setInit, setValueConstuctor, setInitialValuesArgs, setArgsSerializer) =>
        new ArchivingMutCSet(
          setInit,
          setValueConstuctor,
          setInitialValuesArgs,
          setArgsSerializer
        ),
      (variableInit, initialValue, variableSerializer) =>
        new CVar(variableInit, initialValue, variableSerializer),
      valueConstructor,
      initialValuesArgs,
      argsSerializer
    );
  }

  // Override insertion methods to state that they definitely
  // return a value, since this is true of CSet.add.

  insert(index: number, ...args: InsertArgs): C {
    return super.insert(index, ...args)!;
  }

  push(...args: InsertArgs): C {
    // TODO: mixin issues confusing eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.push(...args)!;
  }

  unshift(...args: InsertArgs): C {
    // TODO: mixin issues confusing eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.unshift(...args)!;
  }

  /**
   * Note: event will show up as Insert (if it is indeed
   * inserted, i.e., the restore wasn't redundant).
   * @param value [description]
   */
  restore(value: C): void {
    this.set.restore(
      value.parent as MovableMutCListEntry<C, CVar<ListPosition>>
    );
  }
}
