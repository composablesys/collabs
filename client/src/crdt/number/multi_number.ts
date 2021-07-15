import { DefaultNumberComponentMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  LocallyResettableState,
  ResetWrapClass,
  MultipleSemidirectProduct,
} from "../helper_crdts";
import { PrimitiveCrdt } from "../core";
import { Number, NumberEventsRecord } from "./interfaces";

// TODO: handle floating point non-commutativity

export class MultiNumberState implements LocallyResettableState {
  value: number;
  constructor(readonly initialValue: number) {
    this.value = initialValue;
  }
  resetLocalState(): void {
    this.value = this.initialValue;
  }
}

// Exporting just for tests, it's not exported at top-level
export class AddComponent extends PrimitiveCrdt<
  MultiNumberState,
  NumberEventsRecord
> {
  constructor(initialState: MultiNumberState) {
    super(initialState);
  }

  add(toAdd: number) {
    if (toAdd !== 0) {
      let message = DefaultNumberComponentMessage.create({ arg: toAdd });
      let buffer = DefaultNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = DefaultNumberComponentMessage.decode(message);
    this.state.value += decoded.arg;
    this.emit("Add", {
      timestamp,
      added: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }
}

export class MultComponent extends PrimitiveCrdt<
  MultiNumberState,
  NumberEventsRecord
> {
  constructor(initialState: MultiNumberState) {
    super(initialState);
  }

  mult(toMult: number) {
    if (toMult !== 1) {
      let message = DefaultNumberComponentMessage.create({ arg: toMult });
      let buffer = DefaultNumberComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = DefaultNumberComponentMessage.decode(message);
    this.state.value *= decoded.arg;
    this.emit("Mult", {
      timestamp,
      multed: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }
}

export class MinComponent extends PrimitiveCrdt<
  MultiNumberState,
  NumberEventsRecord
> {
  constructor(initialState: MultiNumberState) {
    super(initialState);
  }

  min(toComp: number) {
    let message = DefaultNumberComponentMessage.create({ arg: toComp });
    let buffer = DefaultNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = DefaultNumberComponentMessage.decode(message);
    this.state.value = Math.min(this.state.value, decoded.arg);
    this.emit("Min", {
      timestamp,
      compared: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }
}

export class MaxComponent extends PrimitiveCrdt<
  MultiNumberState,
  NumberEventsRecord
> {
  constructor(initialState: MultiNumberState) {
    super(initialState);
  }

  max(toComp: number) {
    let message = DefaultNumberComponentMessage.create({ arg: toComp });
    let buffer = DefaultNumberComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    let decoded = DefaultNumberComponentMessage.decode(message);
    this.state.value = Math.max(this.state.value, decoded.arg);
    this.emit("Max", {
      timestamp,
      compared: decoded.arg,
    });
  }

  canGc() {
    return this.state.value === this.state.initialValue;
  }
}

class MultiNumberBase extends MultipleSemidirectProduct<
  MultiNumberState,
  NumberEventsRecord
> {
  private minCrdt: MinComponent;
  private maxCrdt: MaxComponent;
  private addCrdt: AddComponent;
  private multCrdt: MultComponent;
  constructor(initialValue: number = 0) {
    super(false);
    const state = new MultiNumberState(initialValue);
    this.addCrdt = new AddComponent(state);
    this.multCrdt = new MultComponent(state);
    this.minCrdt = new MinComponent(state);
    this.maxCrdt = new MaxComponent(state);
    /**
     * Arbitration order
     * 0: min
     * 1: max
     * 2: add
     * 3: mult
     */
    super.setup(
      [this.minCrdt, this.maxCrdt, this.addCrdt, this.multCrdt],
      state
    );
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
    let m2Decoded = DefaultNumberComponentMessage.decode(m2Message);
    let m1Decoded = DefaultNumberComponentMessage.decode(m1Message);
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
    let acted = DefaultNumberComponentMessage.create({
      arg: actedArg,
    });

    return {
      m1TargetPath: [],
      m1Message: DefaultNumberComponentMessage.encode(acted).finish(),
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

export class MultiNumber
  extends ResetWrapClass(MultiNumberBase)<NumberEventsRecord>
  implements Number
{
  constructor(initialValue: number = 0) {
    super(initialValue);
    this.original.on("Add", (event) => this.emit("Add", event));
    this.original.on("Mult", (event) => this.emit("Mult", event));
    this.original.on("Min", (event) => this.emit("Min", event));
    this.original.on("Max", (event) => this.emit("Max", event));
  }
  add(toAdd: number): void {
    this.original.add(toAdd);
  }

  mult(toMult: number) {
    this.original.mult(toMult);
  }

  min(toComp: number) {
    this.original.min(toComp);
  }

  max(toComp: number) {
    this.original.max(toComp);
  }

  get value(): number {
    return this.original.value;
  }
}
