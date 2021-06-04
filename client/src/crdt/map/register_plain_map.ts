import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { LazyCrdtMap } from "../composers/lazy_crdt_map";
import { LwwRegister } from "../register/aggregate_register";
import { Register } from "../register/interfaces";
import { AbstractPlainMap } from "./abstract_maps";

export class RegisterPlainMap<K, V> extends AbstractPlainMap<K, V> {
  private readonly internalMap: LazyCrdtMap<K, Register<V>>;

  /**
   * TODO: key presence is determined by value
   * triviality (canGc).  Delete calls reset.
   * So make sure these behave normally on Register!
   * (Should we add a more general implementation that uses
   * an arbitrary PlainSet for key presence?  Or a version
   * that uses set-to-undefined for key deletion, in case you
   * want Lww deletion semantics?  I guess the user can do
   * that themselves though.)
   *
   * TODO: the initial value of the register will never
   * be inspected, so feel free to use undefined, even
   * if it is not of type V, with an unsafe type cast,
   * to avoid the trouble of obtain a fake value
   * of type V.
   */
  constructor(
    registerConstructor: (key: K) => Register<V>,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.internalMap = this.addChild(
      "internalMap",
      new LazyCrdtMap(registerConstructor, keySerializer)
    );
  }

  delete(key: K): boolean {
    // TODO: is this really an "optimization", due to
    // the extra cost of serialization?
    // Perhaps add a nontrivialGet method to LazyCrdtMap,
    // to combine the has-get check.
    if (this.has(key)) {
      this.internalMap.get(key).reset();
      return true;
    } else return false;
  }

  get(key: K): V | undefined {
    if (this.has(key)) {
      return this.internalMap.get(key).value;
    } else return undefined;
  }

  has(key: K): boolean {
    return this.internalMap.nontrivialHas(key);
  }

  set(key: K, value: V): this {
    this.internalMap.get(key).value = value;
    return this;
  }

  get size(): number {
    return this.internalMap.nontrivialSize;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [key, valueCrdt] of this.internalMap.nontrivialEntries()) {
      yield [key, valueCrdt.value];
    }
  }

  reset(): void {
    // TODO: optimize
    for (let valueCrdt of this.internalMap.nontrivialValues()) {
      valueCrdt.reset();
    }
  }
}

export class LwwPlainMap<K, V> extends RegisterPlainMap<K, V> {
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(
      () => new LwwRegister(undefined as unknown as V, valueSerializer),
      keySerializer
    );
  }
}
