import { CausalTimestamp } from "../../net";
import { PrimitiveCrdt } from "../core";
import { LocallyResettableState, Resettable } from "./resettable";

export class NoopState implements LocallyResettableState {
  resetLocalState(): void {}
  static instance = new NoopState();
}

export class NoopCrdt extends PrimitiveCrdt<NoopState> implements Resettable {
  constructor() {
    super(NoopState.instance);
  }

  noop() {
    this.send(new Uint8Array());
  }

  protected receivePrimitive(
    _timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for NoopCrdt");
  }

  reset() {}

  canGc() {
    return true;
  }
}
