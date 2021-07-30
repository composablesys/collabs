export class WeakValueMap<K, V extends Object> {
  private readonly internalMap = new Map<K, WeakRef<V>>();
  private readonly registry: FinalizationRegistry<K>;

  constructor() {
    this.registry = new FinalizationRegistry((key) => this.checkKey(key));
  }

  clear() {
    this.internalMap.clear();
  }

  delete(key: K) {
    this.internalMap.delete(key);
  }

  get(key: K): V | undefined {
    let value = this.internalMap.get(key);
    if (value === undefined) return undefined;
    let deref = value.deref();
    if (deref === undefined) this.internalMap.delete(key);
    return deref;
  }

  set(key: K, value: V) {
    this.internalMap.set(key, new WeakRef(value));
    this.registry.register(value, key);
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (let entry of this.internalMap.entries()) {
      let valueDeref = entry[1].deref();
      if (valueDeref !== undefined) yield [entry[0], valueDeref];
    }
  }

  /**
   * Check if the key's value no longer exists (has
   * been reclaimed), and if
   * so, delete the key.
   * @param  key [description]
   * @return     [description]
   */
  private checkKey(key: K) {
    let value = this.internalMap.get(key);
    if (value !== undefined) {
      if (value.deref() === undefined) {
        this.internalMap.delete(key);
      }
    }
  }
}
