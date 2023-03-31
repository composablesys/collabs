import {
  CCounter,
  CObject,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  PrimitiveCRDT,
  UpdateMeta,
} from "@collabs/collabs";
import { CNumberComponentMessage } from "../generated/proto_compiled";
import {
  MultipleSemidirectProduct,
  StatefulCRDT,
} from "./multiple_semidirect_product";

export interface NumberEvent extends CollabEvent {
  readonly arg: number;
  readonly previousValue: number;
}

export interface NumberEventsRecord extends CollabEventsRecord {
  Add: NumberEvent;
  Mult: NumberEvent;
  Min: NumberEvent;
  Max: NumberEvent;
}

export class CNumberState {
  value: number;
  constructor(readonly initialValue: number) {
    this.value = initialValue;
  }
}

// Exporting just for tests, it's not exported at top-level
export class AddComponent
  extends PrimitiveCRDT<NumberEventsRecord>
  implements StatefulCRDT<CNumberState>
{
  readonly state: CNumberState;

  constructor(init: InitToken, initialState: CNumberState) {
    super(init);
    this.state = initialState;
  }

  add(toAdd: number) {
    if (toAdd !== 0) {
      const message = CNumberComponentMessage.create({ arg: toAdd });
      const buffer = CNumberComponentMessage.encode(message).finish();
      this.sendCRDT(buffer);
    }
  }

  protected receiveCRDT(message: string | Uint8Array, meta: UpdateMeta) {
    const decoded = CNumberComponentMessage.decode(<Uint8Array>message);
    const previousValue = this.state.value;
    this.state.value += decoded.arg;
    this.emit("Add", {
      meta,
      arg: decoded.arg,
      previousValue,
    });
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    const message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null) {
    this.state.value = CNumberComponentMessage.decode(savedState).arg;
  }
}

export class MultComponent
  extends PrimitiveCRDT<NumberEventsRecord>
  implements StatefulCRDT<CNumberState>
{
  readonly state: CNumberState;

  constructor(init: InitToken, initialState: CNumberState) {
    super(init);
    this.state = initialState;
  }

  mult(toMult: number) {
    if (toMult !== 1) {
      const message = CNumberComponentMessage.create({ arg: toMult });
      const buffer = CNumberComponentMessage.encode(message).finish();
      this.sendCRDT(buffer);
    }
  }

  protected receiveCRDT(message: string | Uint8Array, meta: UpdateMeta) {
    const decoded = CNumberComponentMessage.decode(<Uint8Array>message);
    const previousValue = this.state.value;
    this.state.value *= decoded.arg;
    this.emit("Mult", {
      meta,
      arg: decoded.arg,
      previousValue,
    });
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    const message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null) {
    this.state.value = CNumberComponentMessage.decode(savedState).arg;
  }
}

export class MinComponent
  extends PrimitiveCRDT<NumberEventsRecord>
  implements StatefulCRDT<CNumberState>
{
  readonly state: CNumberState;

  constructor(init: InitToken, initialState: CNumberState) {
    super(init);
    this.state = initialState;
  }

  min(toComp: number) {
    const message = CNumberComponentMessage.create({ arg: toComp });
    const buffer = CNumberComponentMessage.encode(message).finish();
    this.sendCRDT(buffer);
  }

  protected receiveCRDT(message: string | Uint8Array, meta: UpdateMeta) {
    const decoded = CNumberComponentMessage.decode(<Uint8Array>message);
    const previousValue = this.state.value;
    this.state.value = Math.min(this.state.value, decoded.arg);
    this.emit("Min", {
      meta,
      arg: decoded.arg,
      previousValue,
    });
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    const message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null) {
    this.state.value = CNumberComponentMessage.decode(savedState).arg;
  }
}

export class MaxComponent
  extends PrimitiveCRDT<NumberEventsRecord>
  implements StatefulCRDT<CNumberState>
{
  readonly state: CNumberState;

  constructor(init: InitToken, initialState: CNumberState) {
    super(init);
    this.state = initialState;
  }

  max(toComp: number) {
    const message = CNumberComponentMessage.create({ arg: toComp });
    const buffer = CNumberComponentMessage.encode(message).finish();
    this.sendCRDT(buffer);
  }

  protected receiveCRDT(message: string | Uint8Array, meta: UpdateMeta) {
    const decoded = CNumberComponentMessage.decode(<Uint8Array>message);
    const previousValue = this.state.value;
    this.state.value = Math.max(this.state.value, decoded.arg);
    this.emit("Max", {
      meta,
      arg: decoded.arg,
      previousValue,
    });
  }

  canGC() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    const message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null) {
    this.state.value = CNumberComponentMessage.decode(savedState).arg;
  }
}

/**
 * Unlike CNumber, this doesn't allow multiplications with
 * negative args.
 */
class CNumberBase extends MultipleSemidirectProduct<CNumberState> {
  minCRDT: MinComponent;
  maxCRDT: MaxComponent;
  addCRDT: AddComponent;
  multCRDT: MultComponent;
  constructor(init: InitToken, initialValue: number) {
    super(init);

    const state = new CNumberState(initialValue);
    super.setupState(state);
    /**
     * Arbitration order
     * 0: min
     * 1: max
     * 2: add
     * 3: mult
     */
    this.minCRDT = super.setupOneCRDT((init) => new MinComponent(init, state));
    this.maxCRDT = super.setupOneCRDT((init) => new MaxComponent(init, state));
    this.addCRDT = super.setupOneCRDT((init) => new AddComponent(init, state));
    this.multCRDT = super.setupOneCRDT(
      (init) => new MultComponent(init, state)
    );
  }

  protected action(
    m2MessageStack: (Uint8Array | string)[],
    _m2Meta: UpdateMeta,
    m2Index: number,
    m1MessageStack: (Uint8Array | string)[],
    _m1Meta: UpdateMeta | null
  ): { m1MessageStack: (Uint8Array | string)[] } | null {
    const m2Decoded = CNumberComponentMessage.decode(
      <Uint8Array>m2MessageStack[0]
    );
    const m1Decoded = CNumberComponentMessage.decode(
      <Uint8Array>m1MessageStack[0]
    );
    let actedArg: number;
    switch (m2Index) {
      case 3:
        actedArg = m2Decoded.arg * m1Decoded.arg;
        break;
      case 2:
        actedArg = m2Decoded.arg + m1Decoded.arg;
        break;
      case 1:
        actedArg = Math.max(m2Decoded.arg, m1Decoded.arg);
        break;
      default:
        actedArg = m1Decoded.arg;
    }
    const acted = CNumberComponentMessage.create({
      arg: actedArg,
    });

    return {
      m1MessageStack: [CNumberComponentMessage.encode(acted).finish()],
    };
  }

  get value(): number {
    return this.state.internalState.value;
  }
}

/**
 * Experimental; stable alternatives are [[CCounter]], [[ResettableCCounter]],
 * and [[LwwCVar]]`<number>`.
 *
 * Experimental warnings:
 * - Eventual consistency may fail due to rounding issues.
 * The only safe way is to stick to integer operands that aren't
 * large enough to overflow anything.
 * - Uses tombstones (one per operation).  So the memory
 * usage will grow without bound, unlike most of our Collabs.
 *
 * See https://github.com/composablesys/collabs/issues/177
 */
export class CNumber extends CObject<NumberEventsRecord> {
  private base: CNumberBase;
  /**
   * Used to implement negative multiplications, which don't
   * directly obey the semidirect product rules with min and
   * max.  Instead, we use this counter mod 2.  If odd, the value
   * is a negated view of our internal state.  Correspondingly,
   * add, min, and max args must be negated, and min/max must
   * be switched.
   */
  private negated: CCounter;

  constructor(init: InitToken, initialValue = 0) {
    super(init);

    this.base = this.registerCollab(
      "",
      (init) => new CNumberBase(init, initialValue)
    );
    this.negated = this.registerCollab("0", (init) => new CCounter(init));

    this.base.minCRDT.on("Min", (event) => {
      if (this.negated.value % 2 === 1) {
        super.emit("Max", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Min", event);
    });
    this.base.maxCRDT.on("Max", (event) => {
      if (this.negated.value % 2 === 1) {
        super.emit("Min", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Max", event);
    });
    this.base.addCRDT.on("Add", (event) => {
      if (this.negated.value % 2 === 1) {
        super.emit("Add", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Add", event);
    });
    this.base.multCRDT.on("Mult", (event) => super.emit("Mult", event));
    this.negated.on("Add", (event) =>
      super.emit("Mult", {
        arg: -1,
        previousValue: -this.value,
        meta: event.meta,
      })
    );
  }

  add(toAdd: number) {
    if (this.negated.value % 2 === 1) {
      this.base.addCRDT.add(-toAdd);
    } else this.base.addCRDT.add(toAdd);
  }

  mult(toMult: number) {
    if (toMult < 0) {
      this.negated.add(1);
      this.base.multCRDT.mult(-toMult);
    } else this.base.multCRDT.mult(toMult);
  }

  min(toComp: number) {
    if (this.negated.value % 2 === 1) {
      this.base.maxCRDT.max(-toComp);
    } else this.base.minCRDT.min(toComp);
  }

  max(toComp: number) {
    if (this.negated.value % 2 === 1) {
      this.base.minCRDT.min(-toComp);
    } else this.base.maxCRDT.max(toComp);
  }

  get value(): number {
    const value = (this.negated.value % 2 === 1 ? -1 : 1) * this.base.value;
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and will go away once we fix that.
    return value === 0 ? 0 : value;
  }

  /**
   * @return this.value.toString()
   */
  toString(): string {
    return this.value.toString();
  }
}
