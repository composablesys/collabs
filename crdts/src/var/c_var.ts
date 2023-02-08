import {
  CObject,
  CVarEventsRecord,
  InitToken,
  IVar,
  Serializer,
  TrivialSerializer,
} from "@collabs/core";
// Import from exact file to avoid circular dependencies with ../map/index.ts.
import { CMultiValueMap, MultiValueMapItem } from "../map/c_multi_value_map";

const nullSerializer = new TrivialSerializer(null);

/**
 * Default aggregate function.
 */
function firstItem<V>(items: MultiValueMapItem<V>[]): V {
  return items[0].value;
}

/**
 * A collaborative variable of type T.
 *
 * TODO: individual values immutable (pointer to immutable T);
 * causal register with arbitrary winner (technically, first replicaID);
 * tweak with CAggregateVar; advice for mutable-value var?
 */
export class CVar<T> extends CObject<CVarEventsRecord<T>> implements IVar<T> {
  private readonly mvMap: CMultiValueMap<null, T>;
  private _value: T;

  /**
   * aggregate isn't called on [], that's just initialValue.
   *
   * aggregate: values given in order by sender (eventually consistent).
   */
  constructor(
    init: InitToken,
    initialValue: T,
    options: {
      valueSerializer?: Serializer<T>;
      aggregate?: (items: MultiValueMapItem<T>[]) => T;
      wallClockTime?: boolean;
    } = {}
  ) {
    super(init);

    const aggregate = options.aggregate ?? firstItem;

    this.mvMap = super.addChild(
      "",
      (init) =>
        new CMultiValueMap(init, {
          keySerializer: nullSerializer,
          valueSerializer: options.valueSerializer,
          wallClockTime: options.wallClockTime,
        })
    );
    this.mvMap.on("Any", (e) => {
      const previousValue = this._value;
      const items = this.mvMap.get(null);
      this._value = items === undefined ? initialValue : aggregate(items);
      if (this._value !== previousValue) {
        this.emit("Set", { value: this._value, previousValue, meta: e.meta });
      }
    });

    this._value = initialValue;
  }

  set(value: T): T {
    this.mvMap.set(null, value);
    return this._value;
  }

  set value(value: T) {
    this.set(value);
  }

  get value(): T {
    return this._value;
  }

  conflicts(): T[] {
    return (this.mvMap.get(null) ?? []).map((item) => item.value);
  }

  /**
   * Observed-reset. Similar to setting to initial value, but also allows GC.
   */
  clear() {
    this.mvMap.delete(null);
  }
}
