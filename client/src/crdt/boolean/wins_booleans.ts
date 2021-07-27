import { NoopCrdt, Resettable, ResetWrapClass } from "../helper_crdts";
import { CRegisterEventsRecord } from "../register";
import { MakeAbstractCBoolean } from "./abstract_boolean";
import { CBoolean } from "./interfaces";

/** Enable-wins flag */
export class TrueWinsCBoolean
  extends MakeAbstractCBoolean(ResetWrapClass(NoopCrdt, true, false))<
    CRegisterEventsRecord<boolean>
  >
  implements CBoolean, Resettable
{
  private previousValue = false;

  constructor() {
    super();
    // Events
    this.on("Change", (event) => {
      if (this.previousValue !== this.value) {
        // It did indeed change.
        this.previousValue = this.value;
        this.emit("Set", {
          timestamp: event.timestamp,
          previousValue: !this.value,
        });
      }
    });
  }

  get value(): boolean {
    return !this.state.isHistoryEmpty();
  }

  set value(value: boolean) {
    if (value) this.original.noop();
    else this.reset();
  }

  postLoad() {
    this.previousValue = this.value;
  }
}

/** Disable-wins flag */
export class FalseWinsCBoolean
  extends MakeAbstractCBoolean(ResetWrapClass(NoopCrdt, true, false))<
    CRegisterEventsRecord<boolean>
  >
  implements CBoolean, Resettable
{
  private previousValue = true;

  constructor() {
    super();
    // Events
    this.on("Change", (event) => {
      if (this.previousValue !== this.value) {
        // It did indeed change.
        this.previousValue = this.value;
        this.emit("Set", {
          timestamp: event.timestamp,
          previousValue: !this.value,
        });
      }
    });
  }

  get value(): boolean {
    return this.state.isHistoryEmpty();
  }

  set value(value: boolean) {
    if (!value) this.original.noop();
    else this.reset();
  }

  postLoad() {
    this.previousValue = this.value;
  }
}
