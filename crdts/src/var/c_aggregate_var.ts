import {
  CObject,
  CVarEventsRecord,
  DefaultSerializer,
  InitToken,
  IVar,
  Serializer,
  TrivialSerializer,
} from "@collabs/core";
// Import from exact file to avoid circular dependencies with ../map/index.ts.
import { MultiValueMap, MultiValueMapItem } from "../map/multi_value_map";

const nullSerializer = new TrivialSerializer(null);

// OPT: allow specifying an arg to pass to aggregate. This lets impls get away with
// a single function instead of a bind. Or, call aggregate function with "this"?

export class AggregateCVar<T>
  extends CObject<CVarEventsRecord<T>>
  implements IVar<T>
{
  private readonly mvMap: MultiValueMap<null, T>;
  private _value: T;

  /**
   * aggregate: values given in order by sender (eventually consistent).
   */
  constructor(
    init: InitToken,
    aggregate: (items: MultiValueMapItem<T>[]) => T,
    wallClockTime = false,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.mvMap = super.addChild(
      "",
      (init) =>
        new MultiValueMap(init, wallClockTime, nullSerializer, valueSerializer)
    );
    this.mvMap.on("Any", (e) => {
      const previousValue = this._value;
      this._value = aggregate(this.mvMap.get(null) ?? []);
      this.emit("Set", { value: this._value, previousValue, meta: e.meta });
    });

    this._value = aggregate([]);
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
