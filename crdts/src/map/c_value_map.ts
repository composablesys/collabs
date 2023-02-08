import { InitToken, Serializer } from "@collabs/core";
import { CAggregateValueMap } from "./c_aggregate_value_map";
import { MultiValueMapItem } from "./c_multi_value_map";

function firstItem<V>(items: MultiValueMapItem<V>[]): V {
  return items[0].value;
}

export class CValueMap<K, V> extends CAggregateValueMap<K, V> {
  constructor(
    init: InitToken,
    options: {
      keySerializer?: Serializer<K>;
      valueSerializer?: Serializer<V>;
    } = {}
  ) {
    super(init, firstItem, { wallClockTime: true, ...options });
  }
}
