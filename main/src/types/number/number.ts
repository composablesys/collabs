import { CNumberComponentMessage } from "../../../generated/proto_compiled";
import { CObject, CPrimitive, StatefulCrdt } from "../../constructions";
import { MultipleSemidirectProduct } from "../../constructions/multiple_semidirect_product";
import {
  CausalTimestamp,
  CrdtEvent,
  CrdtEventMeta,
  CrdtEventsRecord,
  CrdtInitToken,
  Pre,
} from "../../core";
import { ToggleCBoolean } from "../boolean";

// TODO: handle floating point non-commutativity

export interface CNumberEvent extends CrdtEvent {
  readonly arg: number;
  readonly previousValue: number;
}

export interface CNumberEventsRecord extends CrdtEventsRecord {
  Add: CNumberEvent;
  Mult: CNumberEvent;
  Min: CNumberEvent;
  Max: CNumberEvent;
}

export class CNumberState {
  value: number;
  constructor(readonly initialValue: number) {
    this.value = initialValue;
  }
}

// Exporting just for tests, it's not exported at top-level
export class AddComponent
  extends CPrimitive<CNumberEventsRecord>
  implements StatefulCrdt<CNumberState>
{
  readonly state: CNumberState;

  constructor(initToken: CrdtInitToken, initialState: CNumberState) {
    super(initToken);
    this.state = initialState;
  }

  add(toAdd: number) {
    if (toAdd !== 0) {
      let message = CNumberComponentMessage.create({ arg: toAdd });
      let buffer = CNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = CNumberComponentMessage.decode(message);
    const previousValue = this.state.value;
    this.state.value += decoded.arg;
    this.emit("Add", {
      meta: CrdtEventMeta.fromTimestamp(timestamp),
      arg: decoded.arg,
      previousValue,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = CNumberComponentMessage.decode(saveData).arg;
  }
}

export class MultComponent
  extends CPrimitive<CNumberEventsRecord>
  implements StatefulCrdt<CNumberState>
{
  readonly state: CNumberState;

  constructor(initToken: CrdtInitToken, initialState: CNumberState) {
    super(initToken);
    this.state = initialState;
  }

  mult(toMult: number) {
    if (toMult !== 1) {
      let message = CNumberComponentMessage.create({ arg: toMult });
      let buffer = CNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = CNumberComponentMessage.decode(message);
    const previousValue = this.state.value;
    this.state.value *= decoded.arg;
    this.emit("Mult", {
      meta: CrdtEventMeta.fromTimestamp(timestamp),
      arg: decoded.arg,
      previousValue,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = CNumberComponentMessage.decode(saveData).arg;
  }
}

export class MinComponent
  extends CPrimitive<CNumberEventsRecord>
  implements StatefulCrdt<CNumberState>
{
  readonly state: CNumberState;

  constructor(initToken: CrdtInitToken, initialState: CNumberState) {
    super(initToken);
    this.state = initialState;
  }

  min(toComp: number) {
    let message = CNumberComponentMessage.create({ arg: toComp });
    let buffer = CNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = CNumberComponentMessage.decode(message);
    const previousValue = this.state.value;
    this.state.value = Math.min(this.state.value, decoded.arg);
    this.emit("Min", {
      meta: CrdtEventMeta.fromTimestamp(timestamp),
      arg: decoded.arg,
      previousValue,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = CNumberComponentMessage.decode(saveData).arg;
  }
}

export class MaxComponent
  extends CPrimitive<CNumberEventsRecord>
  implements StatefulCrdt<CNumberState>
{
  readonly state: CNumberState;

  constructor(initToken: CrdtInitToken, initialState: CNumberState) {
    super(initToken);
    this.state = initialState;
  }

  max(toComp: number) {
    let message = CNumberComponentMessage.create({ arg: toComp });
    let buffer = CNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = CNumberComponentMessage.decode(message);
    const previousValue = this.state.value;
    this.state.value = Math.max(this.state.value, decoded.arg);
    this.emit("Max", {
      meta: CrdtEventMeta.fromTimestamp(timestamp),
      arg: decoded.arg,
      previousValue,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = CNumberComponentMessage.create({
      arg: this.state.value,
    });
    return CNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = CNumberComponentMessage.decode(saveData).arg;
  }
}

/**
 * Unlike CNumber, this doesn't allow multiplications with
 * negative args.
 */
class CNumberBase extends MultipleSemidirectProduct<CNumberState> {
  minCrdt: MinComponent;
  maxCrdt: MaxComponent;
  addCrdt: AddComponent;
  multCrdt: MultComponent;
  constructor(initToken: CrdtInitToken, initialValue: number) {
    super(initToken);

    const state = new CNumberState(initialValue);
    super.setupState(state);
    /**
     * Arbitration order
     * 0: min
     * 1: max
     * 2: add
     * 3: mult
     */
    this.minCrdt = super.setupOneCrdt(Pre(MinComponent)(state));
    this.maxCrdt = super.setupOneCrdt(Pre(MaxComponent)(state));
    this.addCrdt = super.setupOneCrdt(Pre(AddComponent)(state));
    this.multCrdt = super.setupOneCrdt(Pre(MultComponent)(state));
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m2Index: number,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp | null,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = CNumberComponentMessage.decode(m2Message);
    let m1Decoded = CNumberComponentMessage.decode(m1Message);
    var actedArg: number;
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
    let acted = CNumberComponentMessage.create({
      arg: actedArg,
    });

    return {
      m1TargetPath: [],
      m1Message: CNumberComponentMessage.encode(acted).finish(),
    };
  }

  get value(): number {
    return this.state.internalState.value;
  }
}

export class CNumber extends CObject<CNumberEventsRecord> {
  private base: CNumberBase;
  /**
   * Used to implement negative multiplications, which don't
   * directly obey the semidirect product rules with min and
   * max.  Instead, we use this boolean.  If true, the value
   * is a negated view of our internal state.  Correspondingly,
   * add, min, and max args must be negated, and min/max must
   * be switched.
   */
  private negated: ToggleCBoolean;

  constructor(initToken: CrdtInitToken, initialValue: number = 0) {
    super(initToken);

    this.base = this.addChild("", Pre(CNumberBase)(initialValue));
    this.negated = this.addChild("0", Pre(ToggleCBoolean)());

    this.base.minCrdt.on("Min", (event) => {
      if (this.negated.value) {
        super.emit("Max", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Min", event);
    });
    this.base.maxCrdt.on("Max", (event) => {
      if (this.negated.value) {
        super.emit("Min", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Max", event);
    });
    this.base.addCrdt.on("Add", (event) => {
      if (this.negated.value) {
        super.emit("Add", {
          arg: -event.arg,
          previousValue: -event.previousValue,
          meta: event.meta,
        });
      } else super.emit("Add", event);
    });
    this.base.multCrdt.on("Mult", (event) => super.emit("Mult", event));
    // TODO: combine negative mult events so that they reflect
    // the original arg, instead of two separate events?
    this.negated.on("Set", (event) =>
      super.emit("Mult", {
        arg: -1,
        previousValue: -this.value,
        meta: event.meta,
      })
    );
  }

  add(toAdd: number) {
    if (this.negated.value) {
      this.base.addCrdt.add(-toAdd);
    } else this.base.addCrdt.add(toAdd);
  }

  mult(toMult: number) {
    if (toMult < 0) {
      this.negated.toggle();
      this.base.multCrdt.mult(-toMult);
    } else this.base.multCrdt.mult(toMult);
  }

  min(toComp: number) {
    if (this.negated.value) {
      this.base.maxCrdt.max(-toComp);
    } else this.base.minCrdt.min(toComp);
  }

  max(toComp: number) {
    if (this.negated.value) {
      this.base.minCrdt.min(-toComp);
    } else this.base.maxCrdt.max(toComp);
  }

  get value(): number {
    const value = (this.negated.value ? -1 : 1) * this.base.value;
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and will go away once we fix that.
    return value === -0 ? 0 : value;
  }
}
