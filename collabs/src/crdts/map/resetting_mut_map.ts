import { DefaultSerializer, Serializer } from "../../util";
import { Collab, InitToken, Pre } from "../../core";
import { Resettable } from "../abilities";
import { ResettingMutCSet } from "../set";
import { LwwCMap } from "./lww_map";
import { MutCMapFromSet } from "./mut_map_from_set";

export class ResettingMutCMap<
    K,
    C extends Collab & Resettable,
    SetArgs extends unknown[]
  >
  extends MutCMapFromSet<
    K,
    C,
    SetArgs,
    ResettingMutCSet<C, [K, SetArgs]>,
    LwwCMap<K, C>
  >
  implements Resettable
{
  constructor(
    initToken: InitToken,
    valueConstructor: (
      valueInitToken: InitToken,
      key: K,
      ...args: SetArgs
    ) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(
      initToken.runtime
    ),
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      Pre(ResettingMutCSet),
      Pre(LwwCMap),
      valueConstructor,
      keySerializer,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    return this.valueSet.owns(value);
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.map.reset();
    this.valueSet.reset();
  }

  /**
   * Returns the unique key associated to a value owned
   * by this map, regardless of whether it is present. If
   * the value is not owned by this map, returns undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    if (!this.owns(searchElement)) {
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
   * @throws if this.owns(value) is false
   */
  getArgsByValue(value: C): SetArgs {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    return this.valueSet.getArgs(value)[1];
  }
}
