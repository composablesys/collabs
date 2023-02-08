import { DefaultSerializer, InitToken, Serializer } from "@collabs/core";
import { CAggregateVar } from "./c_aggregate_var";

/**
 * A collaborative variable of type T.
 *
 * TODO: individual values immutable (pointer to immutable T);
 * causal register with arbitrary winner (technically, first replicaID);
 * tweak with CAggregateVar; advice for mutable-value var?
 */
export class CVar<T> extends CAggregateVar<T> {
  constructor(
    init: InitToken,
    initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(
      init,
      (items) => (items.length === 0 ? initialValue : items[0].value),
      {
        valueSerializer,
      }
    );
  }
}
