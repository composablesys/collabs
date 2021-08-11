import { CausalTimestamp } from "../../net";
import { PrimitiveCrdt } from "../core";
import { CRegisterEventsRecord } from "../register";
import { MakeAbstractCBoolean } from "./abstract_boolean";
import { CBoolean } from "./interfaces";

export class ToggleCBoolean
  extends MakeAbstractCBoolean(PrimitiveCrdt)<CRegisterEventsRecord<boolean>>
  implements CBoolean
{
  private valueInternal: boolean;

  constructor(private readonly initialValue = false) {
    super();
    this.valueInternal = initialValue;
  }

  set value(value: boolean) {
    if (value !== this.valueInternal) this.toggle();
  }

  get value(): boolean {
    return this.valueInternal;
  }

  toggle() {
    this.send(new Uint8Array());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for ToggleCBoolean");
    this.valueInternal = !this.valueInternal;
    this.emit("Set", { timestamp, previousValue: !this.valueInternal });
  }

  protected savePrimitive(): Uint8Array {
    // Length 0 for false, 1 for true
    if (this.valueInternal) return new Uint8Array();
    else return new Uint8Array(1);
  }

  protected loadPrimitive(saveData: Uint8Array): void {
    this.valueInternal = saveData.length !== 0;
  }

  canGc(): boolean {
    return this.valueInternal === this.initialValue;
  }
}
