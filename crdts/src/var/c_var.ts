import {
  CObject,
  InitToken,
  IVar,
  Serializer,
  TrivialSerializer,
  VarEventsRecord,
} from "@collabs/core";
import { Aggregator, CMultiValueMap } from "../map";

const nullSerializer = new TrivialSerializer(null);

/**
 * Default aggregator: return the first item (first replicaID wins).
 */
const defaultAggregator: Aggregator<unknown> = {
  aggregate(items) {
    return items[0].value;
  },
} as const;

/**
 * A collaborative variable of type T.
 */
export class CVar<T> extends CObject<VarEventsRecord<T>> implements IVar<T> {
  private readonly mvMap: CMultiValueMap<null, T>;
  private readonly aggregator: Aggregator<T>;
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
    private readonly initialValue: T,
    options: {
      valueSerializer?: Serializer<T>;
      aggregator?: Aggregator<T>;
    } = {}
  ) {
    super(init);

    this.aggregator =
      options.aggregator ?? (defaultAggregator as Aggregator<T>);

    this.mvMap = super.registerCollab(
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
      this.invalidate();
      if (this._value !== previousValue) {
        this.emit("Set", { value: this._value, previousValue, meta: e.meta });
      }
    });

    this._value = initialValue;
  }

  private invalidate() {
    const items = this.mvMap.get(null);
    this._value =
      items === undefined
        ? this.initialValue
        : this.aggregator.aggregate(items);
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

  protected loadObject(): void {
    this.invalidate();
  }
}
