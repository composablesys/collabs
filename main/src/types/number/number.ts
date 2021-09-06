import { CNumberComponentMessage } from "../../../generated/proto_compiled";
import { CPrimitive, StatefulCrdt } from "../../constructions";
import { MultipleSemidirectProduct } from "../../constructions/multiple_semidirect_product";
import {
  CausalTimestamp,
  CrdtEvent,
  CrdtEventMeta,
  CrdtEventsRecord,
  CrdtInitToken,
  Pre,
} from "../../core";

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

export class CNumber extends MultipleSemidirectProduct<
  CNumberState,
  CNumberEventsRecord
> {
  private minCrdt: MinComponent;
  private maxCrdt: MaxComponent;
  private addCrdt: AddComponent;
  private multCrdt: MultComponent;
  constructor(initToken: CrdtInitToken, initialValue: number = 0) {
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

    this.minCrdt.on("Min", (event) => super.emit("Min", event));
    this.maxCrdt.on("Max", (event) => super.emit("Max", event));
    this.addCrdt.on("Add", (event) => super.emit("Add", event));
    this.multCrdt.on("Mult", (event) => super.emit("Mult", event));
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m2Index: number,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
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

  add(toAdd: number) {
    this.addCrdt.add(toAdd);
  }

  mult(toMult: number) {
    this.multCrdt.mult(toMult);
  }

  min(toComp: number) {
    this.minCrdt.min(toComp);
  }

  max(toComp: number) {
    this.maxCrdt.max(toComp);
  }

  get value(): number {
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and will go away once we fix that.
    return this.state.internalState.value === -0
      ? 0
      : this.state.internalState.value;
  }
}
