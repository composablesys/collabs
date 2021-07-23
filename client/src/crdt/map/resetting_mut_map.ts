export class ExplicitCrdtMap<K, C extends Crdt> extends AbstractCrdtMap<K, C> {
  protected readonly implicitMap: ImplicitCrdtMap<K, C>;
  protected readonly keySet: PlainSet<K>;
  protected readonly includeImplicit: boolean;

  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySet: PlainSet<K>,
    settings: { includeImplicit: boolean },
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.implicitMap = this.addChild(
      "",
      new ImplicitCrdtMap(valueCrdtConstructor, keySerializer)
    );
    this.keySet = this.addChild("0", keySet);
    this.includeImplicit = settings.includeImplicit;

    // Events
    // TODO: optimize to reduce closures?
    this.implicitMap.on("ValueInit", (event) => {
      if (this.includeImplicit) {
        event.value.on("Change", (event2) => {
          if (this.has(event.key)) {
            this.emit("KeyAdd", {
              key: event.key,
              timestamp: event2.timestamp,
            });
          } else {
            this.emit("KeyDelete", {
              key: event.key,
              timestamp: event2.timestamp,
            });
          }
        });
      }
      this.emit("ValueInit", event);
    });
    this.keySet.on("Add", (event) =>
      this.emit("KeyAdd", { key: event.value, timestamp: event.timestamp })
    );
    this.keySet.on("Delete", (event) => {
      // We should check it's really deleted, if includeImplicit
      // is true.
      if (!this.includeImplicit || !this.has(event.value)) {
        this.emit("KeyDelete", {
          key: event.value,
          timestamp: event.timestamp,
        });
      }
    });
  }

  clear(): void {
    this.keySet.clear();
  }

  delete(key: K): boolean {
    const had = this.has(key);
    this.keySet.delete(key);
    return had;
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.implicitMap.get(key);
    else return undefined;
  }

  owns(valueCrdt: C): boolean {
    return this.implicitMap.owns(valueCrdt);
  }

  has(key: K): boolean {
    return (
      this.keySet.has(key) ||
      (this.includeImplicit && this.implicitMap.has(key))
    );
  }

  addKey(key: K): this {
    this.keySet.add(key);
    return this;
  }

  keyOf(valueCrdt: C): K {
    return this.implicitMap.keyOf(valueCrdt);
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *entries(): IterableIterator<[K, C]> {
    // TODO: can we make the order EC?
    for (let key of this.keySet) yield [key, this.implicitMap.get(key)];
    if (this.includeImplicit) {
      // TODO: this might get weird if there are
      // concurrent mutations.
      for (let [key, valueCrdt] of this.implicitMap) {
        // Only yield it if it has not been yielded already.
        if (!this.keySet.has(key)) yield [key, valueCrdt];
      }
    }
  }

  /**
   * TODO: doesn't reset values, so canGc might be false afterwards
   */
  reset(): void {
    this.keySet.reset();
  }
}

export class ResettingCrdtMap<
  K,
  C extends Crdt & Resettable
> extends DecoratedCrdtMap<K, C> {
  constructor(map: CrdtMap<K, C>) {
    super(map);
  }

  delete(key: K): boolean {
    const had = this.has(key);
    // TODO: avoid creating the CRDT for implicit map?
    const valueCrdt = this.map.get(key);
    if (valueCrdt !== undefined) valueCrdt.reset();
    super.delete(key);
    return had;
  }

  clear(): void {
    // TODO: inefficient for implicit map because this
    // might create valueCrdts that are explicitly
    // present but not implicitly present, just
    // to reset them.  Probably not worth breaking
    // the decorator abstract to optimize, though,
    // especially since such reset calls are no-ops,
    // it is just the cost of creating trivial valueCrdts.
    // Likewise for reset() below.
    for (let valueCrdt of this.values()) valueCrdt.reset();
    super.clear();
  }

  reset(): void {
    for (let valueCrdt of this.values()) valueCrdt.reset();
    super.reset();
  }
}

// TODO: better name?
// TODO: indicate that this is the default for CrdtMaps
export class RiakCrdtMap<
  K,
  C extends Crdt & Resettable
> extends ResettingCrdtMap<K, C> {
  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(
      new ExplicitCrdtMap(
        valueCrdtConstructor,
        new AddWinsPlainSet(keySerializer),
        {
          includeImplicit: true,
        },
        keySerializer
      )
    );
  }
}

// TODO: note which methods will throw errors
// (due to errors from GPlainSet).
export class GCrdtMap<K, C extends Crdt> extends ExplicitCrdtMap<K, C> {
  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(
      valueCrdtConstructor,
      new GPlainSet(keySerializer),
      {
        includeImplicit: false,
      },
      keySerializer
    );
  }
}
