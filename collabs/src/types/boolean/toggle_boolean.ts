import { CPrimitive } from "../../constructions";
import { MessageMeta, InitToken } from "../../core";
import { CRegisterEventsRecord } from "../register";
import { MakeAbstractCBoolean } from "./abstract_boolean";
import { CBoolean } from "./interfaces";

export class ToggleCBoolean
  extends MakeAbstractCBoolean(CPrimitive)<CRegisterEventsRecord<boolean>>
  implements CBoolean 
{
  private valueInternal: boolean;

  constructor(initToken: InitToken, private readonly initialValue = false) {
    super(initToken);
    this.valueInternal = initialValue;
  }

  set value(value: boolean) {
    if (value !== this.valueInternal) this.toggle();
  }

  get value(): boolean {
    return this.valueInternal;
  }

  toggle() {
    this.sendPrimitive(new Uint8Array());
  }

  protected receivePrimitive(message: Uint8Array, meta: MessageMeta): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for ToggleCBoolean");
    this.valueInternal = !this.valueInternal;
    this.emit("Set", {
      meta,
      previousValue: !this.valueInternal,
    });
  }

  save(): Uint8Array {
    // Length 0 for false, 1 for true
    if (this.valueInternal) return new Uint8Array();
    else return new Uint8Array(1);
  }

  load(saveData: Uint8Array | null): void {
    if (saveData === null) return;
    this.valueInternal = saveData.length !== 0;
  }

  canGc(): boolean {
    return this.valueInternal === this.initialValue;
  }
}
