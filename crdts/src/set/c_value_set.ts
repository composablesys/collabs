import {
  AbstractSet_CObject,
  InitToken,
  Serializer,
  TrivialSerializer,
} from "@collabs/core";
import { CMultiValueMap } from "../map";

const trueSerializer = new TrivialSerializer<true>(true);

export class CValueSet<T> extends AbstractSet_CObject<T, [T]> {
  /**
   * Maps from set values to true. A value is present in this set
   * iff it is present as a map key. This essentially implements
   * the classic add-wins/observed-remove set: a set containing one
   * (value, causal dot) entry per add operation.
   */
  private readonly mvMap: CMultiValueMap<T, true>;

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

    this.mvMap.on("Delete", (e) => {
      this.emit("Delete", {
        value: e.key,
        meta: e.meta,
      });
    });
    this.mvMap.on("Set", (e) => {
      // Ensure the value actually went from not-present to present.
      if (e.previousValue.isPresent) return;
      this.emit("Add", {
        value: e.key,
        meta: e.meta,
      });
    });
  }

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
