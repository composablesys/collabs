import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Register, LwwRegister } from "../register";
import { AbstractPlainMap } from "./abstract_maps";
import { ImplicitCrdtMap } from "./riak_crdt_maps";

export class RegisterPlainMap<K, V> extends AbstractPlainMap<K, V> {
  private readonly internalMap: ImplicitCrdtMap<K, Register<V>>;

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
      new ImplicitCrdtMap(registerConstructor, keySerializer)
    );
  }

  delete(key: K): boolean {
    const valueCrdt = this.internalMap.getIfPresent(key);
    if (valueCrdt !== undefined) {
      valueCrdt.reset();
      return true;
    } else return false;
  }

  get(key: K): V | undefined {
    if (this.has(key)) {
      return this.internalMap.get(key).value;
    } else return undefined;
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  set(key: K, value: V): this {
    this.internalMap.get(key).value = value;
    return this;
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [key, valueCrdt] of this.internalMap) {
      yield [key, valueCrdt.value];
    }
  }

  reset(): void {
    // TODO: optimize
    for (let valueCrdt of this.internalMap.values()) {
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
