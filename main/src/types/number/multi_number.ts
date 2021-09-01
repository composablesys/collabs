import { MNumberComponentMessage } from "../../../generated/proto_compiled";
import { PrimitiveCrdt, StatefulCrdt } from "../../constructions";
import { MultipleSemidirectProduct } from "../../constructions/multiple_semidirect_product";
import {
  CausalTimestamp,
  CrdtEvent,
  CrdtEventsRecord,
  CrdtInitToken,
  PreCrdt,
} from "../../core";

// TODO: handle floating point non-commutativity

export interface MNumberAddEvent extends CrdtEvent {
  readonly added: number;
}

export interface MNumberMultEvent extends CrdtEvent {
  readonly multed: number;
}

export interface MNumberCompEvent extends CrdtEvent {
  readonly compared: number;
}

export interface MNumberEventsRecord extends CrdtEventsRecord {
  Add: MNumberAddEvent;
  Mult: MNumberMultEvent;
  Min: MNumberCompEvent;
  Max: MNumberCompEvent;
}

export class MNumberState {
  value: number;
  constructor(readonly initialValue: number) {
    this.value = initialValue;
  }
}

// Exporting just for tests, it's not exported at top-level
export class AddComponent
  extends PrimitiveCrdt<MNumberEventsRecord>
  implements StatefulCrdt<MNumberState>
{
  readonly state: MNumberState;

  constructor(initToken: CrdtInitToken, initialState: MNumberState) {
    super(initToken);
    this.state = initialState;
  }

  add(toAdd: number) {
    if (toAdd !== 0) {
      let message = MNumberComponentMessage.create({ arg: toAdd });
      let buffer = MNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = MNumberComponentMessage.decode(message);
    this.state.value += decoded.arg;
    this.emit("Add", {
      timestamp,
      added: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = MNumberComponentMessage.create({
      arg: this.state.value,
    });
    return MNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = MNumberComponentMessage.decode(saveData).arg;
  }
}

export class MultComponent
  extends PrimitiveCrdt<MNumberEventsRecord>
  implements StatefulCrdt<MNumberState>
{
  readonly state: MNumberState;

  constructor(initToken: CrdtInitToken, initialState: MNumberState) {
    super(initToken);
    this.state = initialState;
  }

  mult(toMult: number) {
    if (toMult !== 1) {
      let message = MNumberComponentMessage.create({ arg: toMult });
      let buffer = MNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = MNumberComponentMessage.decode(message);
    this.state.value *= decoded.arg;
    this.emit("Mult", {
      timestamp,
      multed: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = MNumberComponentMessage.create({
      arg: this.state.value,
    });
    return MNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = MNumberComponentMessage.decode(saveData).arg;
  }
}

export class MinComponent
  extends PrimitiveCrdt<MNumberEventsRecord>
  implements StatefulCrdt<MNumberState>
{
  readonly state: MNumberState;

  constructor(initToken: CrdtInitToken, initialState: MNumberState) {
    super(initToken);
    this.state = initialState;
  }

  min(toComp: number) {
    let message = MNumberComponentMessage.create({ arg: toComp });
    let buffer = MNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = MNumberComponentMessage.decode(message);
    this.state.value = Math.min(this.state.value, decoded.arg);
    this.emit("Min", {
      timestamp,
      compared: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = MNumberComponentMessage.create({
      arg: this.state.value,
    });
    return MNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = MNumberComponentMessage.decode(saveData).arg;
  }
}

export class MaxComponent
  extends PrimitiveCrdt<MNumberEventsRecord>
  implements StatefulCrdt<MNumberState>
{
  readonly state: MNumberState;

  constructor(initToken: CrdtInitToken, initialState: MNumberState) {
    super(initToken);
    this.state = initialState;
  }

  max(toComp: number) {
    let message = MNumberComponentMessage.create({ arg: toComp });
    let buffer = MNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = MNumberComponentMessage.decode(message);
    this.state.value = Math.max(this.state.value, decoded.arg);
    this.emit("Max", {
      timestamp,
      compared: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }

  savePrimitive(): Uint8Array {
    let message = MNumberComponentMessage.create({
      arg: this.state.value,
    });
    return MNumberComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.value = MNumberComponentMessage.decode(saveData).arg;
  }
}

export class MNumber extends MultipleSemidirectProduct<
  MNumberState,
  MNumberEventsRecord
> {
  private minCrdt: MinComponent;
  private maxCrdt: MaxComponent;
  private addCrdt: AddComponent;
  private multCrdt: MultComponent;
  constructor(initToken: CrdtInitToken, initialValue: number = 0) {
    super(initToken);

    const state = new MNumberState(initialValue);
    super.setupState(state);
    /**
     * Arbitration order
     * 0: min
     * 1: max
     * 2: add
     * 3: mult
     */
    this.minCrdt = super.setupOneCrdt(PreCrdt.fromClass(MinComponent, state));
    this.maxCrdt = super.setupOneCrdt(PreCrdt.fromClass(MaxComponent, state));
    this.addCrdt = super.setupOneCrdt(PreCrdt.fromClass(AddComponent, state));
    this.multCrdt = super.setupOneCrdt(PreCrdt.fromClass(MultComponent, state));

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
    let m2Decoded = MNumberComponentMessage.decode(m2Message);
    let m1Decoded = MNumberComponentMessage.decode(m1Message);
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
    let acted = MNumberComponentMessage.create({
      arg: actedArg,
    });

    return {
      m1TargetPath: [],
      m1Message: MNumberComponentMessage.encode(acted).finish(),
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
