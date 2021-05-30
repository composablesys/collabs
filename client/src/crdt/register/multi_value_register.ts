// TODO: export this in opts (normal users should use
// LwwRegister conflicts())

// TODO: just an interface/plain objects
export class MvrEntry<T> {
  constructor(
    readonly value: T,
    readonly sender: string,
    readonly counter: number
  ) {}
}

export interface MvrEvent<T> extends CrdtEvent {
  readonly valueAdded: T;
  readonly valuesRemoved: Set<T>;
}

export interface MvrEventsRecord<T> extends CrdtEventsRecord {
  Mvr: MvrEvent<T>;
  Reset: CrdtEvent;
}

// TODO: initial values?  Or just wait for generic way (runLocally)?
// TODO: strong reset
export class MultiValueRegister<T> extends PrimitiveCrdt<
  Set<MvrEntry<T>>,
  MvrEventsRecord<T>
> {
  /**
   * Multi-value register of type T.
   *
   * The default serializer behaves as follows.  string, number,
   * undefined, and null types are stored
   * by-value, as in ordinary JS Set's, so that different
   * instances of the same value are identified
   * (even if they are added by different
   * replicas).  Crdt types are stored
   * by-reference, as they would be in ordinary JS set's,
   * with replicas of the same Crdt being identified
   * (even if they are added by different replicas).
   * Other types are serialized using BSON (via
   * https://github.com/mongodb/js-bson).  Note this means
   * that they will effectively be sent by-value to other
   * replicas, but on each replica, they are treated by reference,
   * following JS's usual set semantics.
   */
  constructor(
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(new Set<MvrEntry<T>>());
  }

  // TODO: change; auto-generates value getter,
  // which we don't want
  set value(value: T) {
    let message = MvrMessage.create({
      value: this.valueSerializer.serialize(value),
    });
    let buffer = MvrMessage.encode(message).finish();
    super.send(buffer);
  }

  reset() {
    // Only reset if needed
    if (!this.canGC()) {
      let message = MvrMessage.create({
        reset: true,
      }); // no value
      let buffer = MvrMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): boolean {
    let decoded = MvrMessage.decode(message);
    let removed = new Set<T>();
    let vc = timestamp.asVectorClock();
    for (let entry of this.state) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry !== undefined && vcEntry >= entry.counter) {
        this.state.delete(entry);
        removed.add(entry.value);
      }
    }
    switch (decoded.data) {
      case "value":
        // Add the new entry
        let value = this.valueSerializer.deserialize(
          decoded.value,
          this.runtime
        );
        this.state.add(
          new MvrEntry(
            value,
            timestamp.getSender(),
            timestamp.getSenderCounter()
          )
        );
        if (removed.size === 1 && removed.entries().next().value === value) {
          return false; // no change to actual value
        } else {
          this.emit("Mvr", {
            caller: this,
            timestamp,
            valueAdded: value,
            valuesRemoved: removed,
          });
          return true;
        }
      case "reset":
        this.emit("Reset", { caller: this, timestamp });
        return removed.size === 0;
      // TODO: also do normal Mvr event?  Would need to make valueAdded
      // optional.
      default:
        throw new Error(
          "MultiValueRegister: Bad decoded.data: " + decoded.data
        );
    }
  }

  /**
   * Return the current set of values, i.e., the
   * set of non-overwritten values.  This may have
   * more than one element due to concurrent writes,
   * or it may have zero elements because the register is
   * newly initialized or has been reset.
   */
  get valueSet(): Set<T> {
    // TODO: cache?
    let values = new Set<T>();
    for (let entry of this.state) values.add(entry.value);
    return values;
  }

  get valueSetWithSenders(): Set<[value: T, sender: string]> {
    let values = new Set<[T, string]>();
    for (let entry of this.state) values.add([entry.value, entry.sender]);
    return values;
  }

  canGC() {
    return this.state.size === 0;
  }
}
