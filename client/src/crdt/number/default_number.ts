import { DefaultNumberComponentMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  LocallyResettableState,
  ResetWrapClass,
  SemidirectProduct,
} from "../helper_crdts";
import { PrimitiveCrdt } from "../core";
import { Number, NumberEventsRecord } from "./interfaces";

// TODO: handle floating point non-commutativity

class DefaultNumberState implements LocallyResettableState {
  value: number;
  constructor(readonly initialValue: number) {
    this.value = initialValue;
  }
  resetLocalState(): void {
    this.value = this.initialValue;
  }
}

class AddComponent extends PrimitiveCrdt<
  DefaultNumberState,
  NumberEventsRecord
> {
  constructor(initialState: DefaultNumberState) {
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

class MultComponent extends PrimitiveCrdt<
  DefaultNumberState,
  NumberEventsRecord
> {
  constructor(initialState: DefaultNumberState) {
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

class DefaultNumberBase extends SemidirectProduct<
  DefaultNumberState,
  NumberEventsRecord
> {
  private addCrdt: AddComponent;
  private multCrdt: MultComponent;
  constructor(initialValue: number = 0) {
    super(false);
    const state = new DefaultNumberState(initialValue);
    this.addCrdt = new AddComponent(state);
    this.multCrdt = new MultComponent(state);
    super.setup(this.addCrdt, this.multCrdt, state);
    this.addCrdt.on("Add", (event) => super.emit("Add", event));
    this.multCrdt.on("Mult", (event) => super.emit("Mult", event));
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = DefaultNumberComponentMessage.decode(m2Message);
    let m1Decoded = DefaultNumberComponentMessage.decode(m1Message);
    let acted = DefaultNumberComponentMessage.create({
      arg: m2Decoded.arg * m1Decoded.arg,
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

export class DefaultNumber
  extends ResetWrapClass(DefaultNumberBase)<NumberEventsRecord>
  implements Number
{
  constructor(initialValue: number = 0) {
    super(initialValue);
    this.original.on("Add", (event) => this.emit("Add", event));
    this.original.on("Mult", (event) => this.emit("Mult", event));
  }
  add(toAdd: number): void {
    this.original.add(toAdd);
  }

  mult(toMult: number) {
    this.original.mult(toMult);
  }

  get value(): number {
    return this.original.value;
  }
}
