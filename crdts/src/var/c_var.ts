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
 *
 * A `CVar<T>` represents an opaque value of type T. Set and get the value with [[value]]. If multiple users
 * set the value concurrently, one of them is picked
 * arbitrarily.
 *
 * Values must be internally immutable;
 * mutating [[value]] internally will not change it on
 * other replicas. To store (a reference to) a *mutable*
 * value of type T, use a `CVar<CollabID<C>>`, where
 * C is a Collab representing T (see [Data Modeling](../../../guide/data_modeling.html#minesweeper)).
 *
 * See also: [[CBoolean]].
 *
 * @typeParam T The variable type.
 */
export class CVar<T> extends CObject<VarEventsRecord<T>> implements IVar<T> {
  private readonly mvMap: CMultiValueMap<null, T>;
  private _value: T;

  /**
   * Constructs a CVar with the given `initialValue`.
   * The `initialValue` is used as the value before any
   * value is set or just after [[clear]] is called.
   *
   * @param options.valueSerializer Serializer for set
   * values. Defaults to [[DefaultSerializer]].
   * @param options.aggregator If provided, used
   * to "aggregate" concurrently-set values,
   * instead of picking one arbitrarily.
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
      const items = this.mvMap.get(null);
      this._value =
        items === undefined ? initialValue : aggregator.aggregate(items);
      if (this._value !== previousValue) {
        this.emit("Set", { value: this._value, previousValue, meta: e.meta });
      }
    });

    this._value = initialValue;
  }

  /**
   * Sets the current value. Equivalent to `this.value = value`.
   *
   * @returns `value`
   */
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

  /**
   * Returns all conflicting concurrently-set values.
   * Their order is arbitrary but consistent across replicas.
   *
   * If this CVar was just initialized or [[clear]]
   * was just called, this returns `[]`. Otherwise, its first
   * element is the set value.
   */
  conflicts(): T[] {
    return (this.mvMap.get(null) ?? []).map((item) => item.value);
  }

  /**
   * Resets this CVar to its initial state, so that its
   * value is the constructor's `initialValue`.
   *
   * Unlike directly setting the value to `initialValue`,
   * this operation clears the [[conflicts]] set, and
   * a concurrent set-[[value]] operation will always
   * win over this operation.
   *
   * A cleared CVar satisfies [[Collab.canGC]] and so can be
   * "garbage collected" by [[CLazyMap]].
   */
  clear() {
    this.mvMap.delete(null);
  }

  toString() {
    return `${this.value}`;
  }
}
