// TODO: better names (include Boolean);
// default values?; new interfaces (remove IFlag, remove
// enable/disable names)

export interface FlagEventsRecord extends CrdtEventsRecord {
  Enable: CrdtEvent;
  Disable: CrdtEvent;
}

// TODO: remove old boolean return values (everywhere) from receive

export interface IFlag extends Crdt<FlagEventsRecord> {
  enable(): void;
  disable(): void;
  enabled: boolean;
  value: boolean;
}

// TODO: makeEventAdder: preserve constructor args
const AddFlagEvents = makeEventAdder<FlagEventsRecord>();

export class EnableWinsFlag
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true, false))
  implements IFlag, Resettable
{
  constructor() {
    super();
    this.on("Reset", (event) => this.emit("Disable", { ...event }));
    this.original.on("Change", (event) =>
      this.emit("Enable", { ...event, caller: this })
    );
  }

  enable() {
    this.original.noop();
  }
  disable() {
    this.reset();
  }
  // strongDisable() {
  //   this.strongReset();
  // }

  get enabled(): boolean {
    return !this.state.isHistoryEmpty();
  }
  set enabled(newValue: boolean) {
    if (newValue) this.enable();
    else this.disable();
  }
  get value() {
    return this.enabled;
  }
  set value(newValue: boolean) {
    this.enabled = newValue;
  }
}

export class DisableWinsFlag
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true, false))
  implements IFlag, Resettable
{
  constructor() {
    super();
    this.on("Reset", (event) => this.emit("Enable", { ...event }));
    this.original.on("Change", (event) =>
      this.emit("Disable", { ...event, caller: this })
    );
  }

  enable() {
    this.reset();
  }
  disable() {
    this.original.noop();
  }
  // strongDisable() {
  //   this.strongReset();
  // }
  get enabled(): boolean {
    return this.state.isHistoryEmpty();
  }
  set enabled(newValue: boolean) {
    if (newValue) this.enable();
    else this.disable();
  }
  get value() {
    return this.enabled;
  }
  set value(newValue: boolean) {
    this.enabled = newValue;
  }
}
