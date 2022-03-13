import { InitToken, MessageMeta } from "../../core";
import {
  CBoolean,
  CVariableEventsRecord,
  MakeAbstractCBoolean,
} from "../../data_types";
import { Optional } from "../../util";
import { PrimitiveCRDT } from "../constructions";

export class ToggleCBoolean
  extends MakeAbstractCBoolean(PrimitiveCRDT)<CVariableEventsRecord<boolean>>
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

  private static MESSAGE = new Uint8Array();

  toggle() {
    this.sendCRDT(ToggleCBoolean.MESSAGE);
  }

  protected receiveCRDT(message: string | Uint8Array, meta: MessageMeta): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for ToggleCBoolean");
    this.valueInternal = !this.valueInternal;
    this.emit("Set", {
      meta,
      previousValue: !this.valueInternal,
    });
  }

  // Length 0 for false, 1 for true.
  private static FALSE_SAVE = new Uint8Array(0);
  private static TRUE_SAVE = new Uint8Array(1);

  save(): Uint8Array {
    if (this.valueInternal) return ToggleCBoolean.FALSE_SAVE;
    else return ToggleCBoolean.TRUE_SAVE;
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) return;
    this.valueInternal = saveData.get().length !== 0;
  }

  canGC(): boolean {
    return this.valueInternal === this.initialValue;
  }
}
