import {
  AbstractSet_CObject,
  InitToken,
  Serializer,
  TrivialSerializer,
} from "@collabs/core";
import { CMultiValueMap } from "../map";

const trueSerializer = new TrivialSerializer<true>(true);

/**
 * A collaborative set with values of type T.
 *
 * The API is compatible with `Set<T>` and can be used as a
 * drop-in collaborative replacement when T is internally immutable. If multiple users
 * add and delete the same value concurrently, the add "wins"
 * (the value is present).
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. If you need to mutate values internally,
 * instead use a [[CSet]].
 *
 * @typeParam T The value type.
 */
export class CValueSet<T> extends AbstractSet_CObject<T, [T]> {
  /**
   * Maps from set values to true. A value is present in this set
   * iff it is present as a map key. This essentially implements
   * the classic add-wins/observed-remove set: a set containing one
   * (value, causal dot) entry per add operation.
   */
  private readonly mvMap: CMultiValueMap<T, true>;

  /**
   * Constructs a CValueSet.
   *
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    options: { valueSerializer?: Serializer<T> } = {}
  ) {
    super(init);

    this.mvMap = super.registerCollab(
      "",
      (init) =>
        new CMultiValueMap(init, {
          keySerializer: options.valueSerializer,
          valueSerializer: trueSerializer,
        })
    );

    this.mvMap.on(
      "Delete",
      super.wrap((e) => {
        this.emit("Delete", {
          value: e.key,
          meta: e.meta,
        });
      })
    );
    this.mvMap.on(
      "Set",
      super.wrap((e) => {
        // Ensure the value actually went from not-present to present.
        if (e.previousValue.isPresent) return;
        this.emit("Add", {
          value: e.key,
          meta: e.meta,
        });
      })
    );
  }

  /**
   * Adds the value, making it present in this set.
   *
   * @return `value`.
   */
  add(value: T): T {
    this.mvMap.set(value, true);
    return value;
  }

  delete(value: T): void {
    this.mvMap.delete(value);
  }

  clear() {
    this.mvMap.clear();
  }

  has(value: T): boolean {
    return this.mvMap.has(value);
  }

  get size(): number {
    return this.mvMap.size;
  }

  values(): IterableIterator<T> {
    return this.mvMap.keys();
  }
}
