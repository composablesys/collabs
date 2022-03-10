import { CollabID, DefaultSerializer, Serializer } from "../../util";
import { Collab, InitToken, Pre } from "../../core";
import { DeletingMutCSet } from "../set";
import { LWWCMap } from "./lww_map";
import { MutCMapFromSet } from "./mut_map_from_set";

export class DeletingMutCMap<
  K,
  C extends Collab,
  SetArgs extends unknown[]
> extends MutCMapFromSet<
  K,
  C,
  SetArgs,
  DeletingMutCSet<C, [K, SetArgs]>,
  LWWCMap<K, CollabID<C>>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (
      valueInitToken: InitToken,
      key: K,
      ...args: SetArgs
    ) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (setValueConstructor, setArgsSerializer) =>
        Pre(DeletingMutCSet)(setValueConstructor, undefined, setArgsSerializer),
      Pre(LWWCMap),
      valueConstructor,
      keySerializer,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    return this.valueSet.owns(value);
  }

  /**
   * Returns the unique key associated to a value in this map
   * if the value is currently present or a conflict; else
   * returns undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    if (!this.valueSet.has(searchElement)) {
      return undefined;
    }
    return this.valueSet.getArgs(searchElement)[0];
  }

  getArgs(key: K): SetArgs | undefined {
    const value = this.get(key);
    if (value === undefined) return undefined;
    else return this.valueSet.getArgs(value)[1];
  }

  /**
   * [getArgs description]
   * @param  value [description]
   * @return the SetArgs used to set value
   * @throws if value is not a current value or conflict
   */
  getArgsByValue(value: C): SetArgs {
    if (!this.valueSet.has(value)) {
      throw new Error("value is not a current value or conflict");
    }
    return this.valueSet.getArgs(value)[1];
  }
}
