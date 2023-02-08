import { DefaultSerializer, InitToken, Serializer } from "@collabs/core";
import { MultiValueMapItem } from "../map";
import { AggregateCVar } from "./c_aggregate_var";

/**
 * Assumes items.length > 0, and that the input is eventually consistent
 * (so that its order can be used for breaking ties).
 */
export function lastWriter<T>(items: MultiValueMapItem<T>[]): T {
  if (items.length === 0) throw new Error("items.length must be > 0");

  let last = items[0];
  for (let i = 1; i < items.length; i++) {
    if (items[i].wallClockTime! > last.wallClockTime!) last = items[i];
  }
  return last.value;
}

export class LWWCVar<T> extends AggregateCVar<T> {
  constructor(
    init: InitToken,
    initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(
      init,
      (items) => (items.length === 0 ? initialValue : lastWriter(items)),
      true,
      valueSerializer
    );
  }
}
