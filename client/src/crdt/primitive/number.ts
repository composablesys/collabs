// TODO: trim/hide subpar classes;
// rename Counter to AddNumber or similar.

export class NumberState implements LocallyResettableState {
  readonly initialValue: number;
  constructor(public value: number) {
    this.initialValue = value;
  }
  resetLocalState(): void {
    this.value = this.initialValue;
  }
}

export interface AddEvent extends CrdtEvent {
  readonly valueAdded: number;
}

export interface CounterEventsRecord extends CrdtEventsRecord {
  Add: AddEvent;
}

export interface ICounter extends Crdt<CounterEventsRecord> {
  add(toAdd: number): void;
  /**
   *  Setting value performs an equivalent add.
   */
  value: number;
}

export class CounterPureBase
  extends PrimitiveCrdt<NumberState, CounterEventsRecord>
  implements ICounter
{
  constructor(initialValue: number = 0) {
    super(new NumberState(initialValue));
  }

  add(toAdd: number) {
    if (toAdd !== 0) {
      let message = CounterPureBaseMessage.create({ toAdd: toAdd });
      let buffer = CounterPureBaseMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = CounterPureBaseMessage.decode(message);
    this.state.value += decoded.toAdd;
    this.emit("Add", {
      caller: this,
      timestamp,
      valueAdded: decoded.toAdd,
    });
  }

  get value(): number {
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and will go away once we fix that.
    return this.state.value === -0 ? 0 : this.state.value;
  }
  /**
   * Performs an equivalent add.
   */
  set value(value: number) {
    this.add(value - this.value);
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }
}

const AddCounterEvents = makeEventAdder<CounterEventsRecord>();

// TODO: issue with makeEventsAdder: when you type .emit or .on, the new ones
// don't show up in the tooltip.  However they do compile.
// Should check whether Typedoc shows them correctly.

/**
 * TODO: Counter with pure operations.  Less efficient state size.
 */
export class CounterPure
  extends AddCounterEvents(ResetWrapClass(CounterPureBase, false, false))
  implements ICounter, Resettable
{
  constructor(initialValue = 0) {
    super(initialValue);
    this.original.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
  }
  add(toAdd: number): void {
    this.original.add(toAdd);
  }
  get value(): number {
    return this.original.value;
  }
  set value(value: number) {
    this.original.value = value;
  }
}
// TODO: StrongResettable

export class GCounterState {
  P = new Map<string, number>();
  N = new Map<string, number>();
  idCounter?: number;
}

export class GCounter
  extends PrimitiveCrdt<
    GCounterState,
    CounterEventsRecord & ResettableEventsRecord
  >
  implements Resettable
{
  constructor() {
    super(new GCounterState());
  }

  private keyString(sender: string, idCounter: number) {
    return idCounter + " " + sender;
  }

  add(toAdd: number) {
    if (toAdd < 0) {
      throw new Error(
        "GCounter.add: toAdd = " +
          toAdd +
          "; must be nonnegative (consider using Counter instead)"
      );
    }
    if (toAdd === 0) return;
    if (this.state.idCounter === undefined) {
      // TODO: do this in constructor once we get
      // access to this.runtime there
      this.state.idCounter = this.runtime.getReplicaUniqueNumber();
    }

    let prOld =
      this.state.P.get(
        this.keyString(this.runtime.getReplicaId(), this.state.idCounter!)
      ) ?? 0;
    let message = GCounterMessage.create({
      add: { prOld, prNew: prOld + toAdd, idCounter: this.state.idCounter! },
    });
    super.send(GCounterMessage.encode(message).finish());
  }

  reset() {
    const message = GCounterMessage.create({
      reset: {
        V: Object.fromEntries(this.state.P.entries()),
      },
    });
    super.send(GCounterMessage.encode(message).finish());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    let decoded = GCounterMessage.decode(message);
    switch (decoded.data) {
      case "add":
        let keyString = this.keyString(
          timestamp.getSender(),
          decoded.add!.idCounter
        );
        if (!this.state.P.has(keyString)) {
          this.state.N.set(keyString, decoded.add!.prOld);
        }
        this.state.P.set(keyString, decoded.add!.prNew);
        this.emit("Add", {
          valueAdded: decoded.add!.prNew - decoded.add!.prOld,
          caller: this,
          timestamp,
        });
        break;
      case "reset":
        for (let vEntry of Object.entries(decoded.reset!.V!)) {
          let nEntry = this.state.N.get(vEntry[0]);
          if (nEntry !== undefined) {
            this.state.N.set(vEntry[0], Math.max(nEntry, vEntry[1]));
            if (this.state.N.get(vEntry[0]) === this.state.P.get(vEntry[0])) {
              this.state.N.delete(vEntry[0]);
              this.state.P.delete(vEntry[0]);
            }
          }
        }
        this.emit("Reset", { caller: this, timestamp });
        break;
      default:
        throw new Error("Unknown decoded.data: " + decoded.data);
    }
  }

  get value(): number {
    // TODO: cache value as optimization?
    return this.sum(this.state.P) - this.sum(this.state.N);
  }

  private sum(map: Map<string, number>): number {
    let ans = 0;
    for (let value of map.values()) ans += value;
    return ans;
  }

  /**
   * Performs an equivalent add.
   */
  set value(value: number) {
    this.add(value - this.value);
  }

  canGC() {
    return this.state.P.size === 0 && this.state.N.size === 0;
  }
}

export class Counter
  extends CompositeCrdt<CounterEventsRecord & ResettableEventsRecord>
  implements ICounter, Resettable
{
  private readonly plus: GCounter;
  private readonly minus: GCounter;

  constructor(readonly initialValue: number = 0) {
    super();
    this.plus = this.addChild("1", new GCounter());
    this.minus = this.addChild("2", new GCounter());
    this.plus.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
    this.minus.on("Add", (event) =>
      this.emit("Add", {
        valueAdded: -event.valueAdded,
        caller: this,
        timestamp: event.timestamp,
      })
    );
    // Dispatch on minus since that is reset last.
    // TODO: that may break with generic CompositeCrdt.
    // How to dispatch reset events for CompositeCrdt in general?
    this.minus.on("Reset", (event) =>
      this.emit("Reset", { ...event, caller: this })
    );
  }

  add(toAdd: number) {
    if (toAdd > 0) this.plus.add(toAdd);
    else this.minus.add(-toAdd);
  }

  reset() {
    // TODO: generic CompositeCrdt reset
    this.plus.reset();
    this.minus.reset();
  }

  get value(): number {
    return this.plus.value - this.minus.value;
  }

  /**
   * Performs an equivalent add.
   */
  set value(value: number) {
    this.add(value - this.value);
  }
}

// TODO: StrongResettable

// export class Counter
//   extends AddStrongResettable(CounterResettable)
//   implements AllAble {
//   static withAbilities<F extends AbilityFlag>(
//     abilityFlag: F,
//     parentOrRuntime: Crdt | CrdtRuntime,
//     id: string,
//     initialValue: number = 0
//   ): CounterBase & InterfaceOf<F> {
//     if (abilityFlag.resettable !== undefined) {
//       if (abilityFlag.strongResettable !== undefined) {
//         return new Counter(parentOrRuntime, id, initialValue) as any;
//       } else {
//         return new CounterResettable(parentOrRuntime, id, initialValue) as any;
//       }
//     } else {
//       if (abilityFlag.strongResettable !== undefined) {
//         return new CounterStrongResettable(
//           parentOrRuntime,
//           id,
//           initialValue
//         ) as any;
//       } else {
//         return new CounterPureBase(parentOrRuntime, id, initialValue) as any;
//       }
//     }
//   }
// }

export interface MultEvent extends CrdtEvent {
  readonly valueMulted: number;
}

export interface MultEventsRecord extends CrdtEventsRecord {
  Mult: MultEvent;
}

export interface IMultRegister extends Crdt<MultEventsRecord> {
  mult(toMult: number): void;
  /**
   *  Setting value performs an equivalent mult.
   */
  value: number;
}

export class MultRegisterBase
  extends PrimitiveCrdt<NumberState, MultEventsRecord>
  implements IMultRegister
{
  constructor(readonly initialValue: number = 1) {
    super(new NumberState(initialValue));
  }

  mult(toMult: number) {
    if (toMult !== 1) {
      let message = MultRegisterMessage.create({ toMult: toMult });
      let buffer = MultRegisterMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): boolean {
    let decoded = MultRegisterMessage.decode(message);
    this.state.value *= decoded.toMult;
    this.emit("Mult", {
      caller: this,
      timestamp,
      valueMulted: decoded.toMult,
    });
    return true;
  }

  get value(): number {
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and will go away once we fix that.
    return this.state.value === -0 ? 0 : this.state.value;
  }
  /**
   * Performs an equivalent mult.
   */
  set value(value: number) {
    this.mult(value / this.value);
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }
}

const AddMultEvents = makeEventAdder<MultEventsRecord>();

export class MultRegister
  extends AddMultEvents(ResetWrapClass(MultRegisterBase, false, false))
  implements IMultRegister, Resettable
{
  constructor(initialValue = 1) {
    super(initialValue);
    this.original.on("Mult", (event) =>
      this.emit("Mult", { ...event, caller: this })
    );
  }
  mult(toMult: number): void {
    this.original.mult(toMult);
  }
  get value(): number {
    return this.original.value;
  }
  set value(value: number) {
    this.original.value = value;
  }
}
// TODO: StrongResettable

interface NumberEventsRecord extends CounterEventsRecord, MultEventsRecord {}

export interface INumber extends Crdt<NumberEventsRecord> {
  add(toAdd: number): void;
  mult(toMult: number, affectConcurrentAdds?: boolean): void;
  readonly value: number;
}

export class NumberBase
  extends SemidirectProduct<NumberState, NumberEventsRecord>
  implements INumber
{
  private addCrdt: CounterPureBase;
  private multCrdt: MultRegisterBase;
  constructor(initialValue: number = 0) {
    super(false);
    this.addCrdt = new CounterPureBase(0);
    this.multCrdt = new MultRegisterBase(0);
    super.setup(this.addCrdt, this.multCrdt, new NumberState(initialValue));
    this.addCrdt.on("Add", (event) =>
      super.emit("Add", { ...event, caller: this })
    );
    this.multCrdt.on("Mult", (event) =>
      super.emit("Mult", { ...event, caller: this })
    );
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = MultRegisterMessage.decode(m2Message);
    let m1Decoded = CounterPureBaseMessage.decode(m1Message);
    let acted = CounterPureBaseMessage.create({
      toAdd: m2Decoded.toMult * m1Decoded.toAdd,
    });
    return {
      m1TargetPath: [],
      m1Message: CounterPureBaseMessage.encode(acted).finish(),
    };
  }

  add(toAdd: number) {
    this.addCrdt.add(toAdd);
  }

  mult(toMult: number) {
    this.multCrdt.mult(toMult);
  }

  multAsAdd(toMult: number) {
    // Perform an equivalent add
    this.add(toMult * this.value - this.value);
  }

  get value(): number {
    return this.addCrdt.value;
  }
}

const AddNumberEvents = makeEventAdder<NumberEventsRecord>();

export class NumberCrdt
  extends AddNumberEvents(ResetWrapClass(NumberBase))
  implements INumber, Resettable
{
  constructor(initialValue: number = 0) {
    super(initialValue);
    this.original.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
    this.original.on("Mult", (event) =>
      this.emit("Mult", { ...event, caller: this })
    );
  }
  add(toAdd: number): void {
    this.original.add(toAdd);
  }

  mult(toMult: number) {
    this.original.mult(toMult);
  }

  multAsAdd(toMult: number) {
    this.original.multAsAdd(toMult);
  }
  get value(): number {
    return this.original.value;
  }
}
// TODO: StrongResettable
