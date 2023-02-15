import {
  CObject,
  CVarEventsRecord,
  InitToken,
  IVar,
  Serializer,
  TrivialSerializer,
} from "@collabs/core";
// Import from exact file to avoid circular dependencies with ../map/index.ts.
import { Aggregator, CMultiValueMap } from "../map/c_multi_value_map";

const nullSerializer = new TrivialSerializer(null);

/**
 * Default aggregator: return the first item (first replicaID wins)l
 */
const defaultAggregator: Aggregator<unknown> = {
  aggregate(items) {
    return items[0].value;
  },
} as const;

/**
 * A collaborative variable of type T.
 */
export class CVar<T> extends CObject<CVarEventsRecord<T>> implements IVar<T> {
  private readonly mvMap: CMultiValueMap<null, T>;
  private _value: T;

  /**
   * aggregate isn't called on [], that's just initialValue.
   *
   * aggregate: values are causally maximal sets (causal frontier),
   * given in order by sender (eventually consistent).
   * Default: first.
   */
  constructor(
    init: InitToken,
    initialValue: T,
    options: {
      valueSerializer?: Serializer<T>;
      aggregator?: Aggregator<T>;
    } = {}
  ) {
    super(init);

    const aggregator =
      options.aggregator ?? (defaultAggregator as Aggregator<T>);

    this.mvMap = super.addChild(
      "",
      (init) =>
        new CMultiValueMap(init, {
          keySerializer: nullSerializer,
          valueSerializer: options.valueSerializer,
          aggregator: options.aggregator,
        })
    );
    this.mvMap.on("Any", (e) => {
      const previousValue = this._value;
      const items = this.mvMap.get(null);
      this._value =
        items === undefined ? initialValue : aggregator.aggregate(items);
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

  toString() {
    return `${this.value}`;
  }
}
