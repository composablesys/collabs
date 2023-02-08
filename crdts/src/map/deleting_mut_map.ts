import {
  Collab,
  CollabID,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/core";
import { DeletingMutCSet } from "../set";
import { LWWCMap } from "./c_value_map";
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
    init: InitToken,
    valueConstructor: (
      valueInitToken: InitToken,
      key: K,
      ...args: SetArgs
    ) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      init,
      (setInit, setValueConstructor, setArgsSerializer) =>
        new DeletingMutCSet(
          setInit,
          setValueConstructor,
          undefined,
          setArgsSerializer
        ),
      (mapInit) => new LWWCMap(mapInit),
      valueConstructor,
      keySerializer,
      argsSerializer
    );
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
}
