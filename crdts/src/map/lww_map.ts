import { DefaultSerializer, InitToken, Serializer } from "@collabs/core";
import { lastWriter } from "../var/c_var";
import { AggregateCMap } from "./aggregate_map";

export class LWWCMap<K, V> extends AggregateCMap<K, V> {
  constructor(
    init: InitToken,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    valueSerializer: Serializer<V> = DefaultSerializer.getInstance()
  ) {
    super(init, lastWriter, true, keySerializer, valueSerializer);
  }
}
