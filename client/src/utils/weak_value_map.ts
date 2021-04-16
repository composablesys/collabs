export class WeakValueMap<K, V extends Object> {
  private readonly internalMap = new Map<K, WeakRef<V>>();
  private readonly registry: FinalizationRegistry;

  constructor() {
    this.registry = new FinalizationRegistry((key) => this.checkKey(key));
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

  delete(key: K) {
    this.internalMap.delete(key);
  }

  entries() {
    let ans: [key: K, value: V][] = [];
    for (let entry of this.internalMap.entries()) {
      let valueDeref = entry[1].deref();
      if (valueDeref !== undefined) ans.push([entry[0], valueDeref]);
    }
    return ans;
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
