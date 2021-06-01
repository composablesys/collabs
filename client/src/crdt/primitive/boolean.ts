import { NoopCrdt } from "../composers/noop_crdt";
import { ResetWrapClass } from "../composers/resettable";
import { Register, RegisterEventsRecord } from "../register/interfaces";

export interface Boolean extends Register<boolean> {
  // TODO: boolean ops (e.g. xor/and, which form
  // the boolean ring)?  Toggle?
  // Mixin to implement them using value-set?
}

/** Enable-wins flag */
export class TrueWinsBoolean
  extends ResetWrapClass(NoopCrdt, true, false)<RegisterEventsRecord<boolean>>
  implements Boolean
{
  constructor() {
    super();
    this.on("Reset", (event) =>
      this.emit("Set", { ...event, caller: this, value: false })
    );
    this.original.on("Change", (event) =>
      this.emit("Set", { ...event, caller: this, value: true })
    );
  }

  get value(): boolean {
    return !this.state.isHistoryEmpty();
  }

  set value(newValue: boolean) {
    if (newValue) this.original.noop();
    else this.reset();
  }
}

/** Disable-wins flag */
export class FalseWinsBoolean
  extends ResetWrapClass(NoopCrdt, true, false)<RegisterEventsRecord<boolean>>
  implements Boolean
{
  constructor() {
    super();
    this.on("Reset", (event) =>
      this.emit("Set", { ...event, caller: this, value: true })
    );
    this.original.on("Change", (event) =>
      this.emit("Set", { ...event, caller: this, value: false })
    );
  }

  get value(): boolean {
    return this.state.isHistoryEmpty();
  }

  set value(newValue: boolean) {
    if (!newValue) this.original.noop();
    else this.reset();
  }
}

// TODO: add-number mod 2 version?  Or ring version?
