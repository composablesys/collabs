import {
  CObject,
  CrdtEventsRecord,
  CrdtInitToken,
  CRegisterEvent,
  LwwCRegister,
  Pre,
} from "compoventuals";

// Since you're exporting your type for reuse, it's a good
// idea to convert expose meaningful events.
// See the Compoventuals docs for advice on what events to include.
export interface CPairEventsRecord<T, U> extends CrdtEventsRecord {
  FirstSet: CRegisterEvent<T>;
  SecondSet: CRegisterEvent<U>;
}

/**
 * Demo custom type: a pair (first: T, second: U).
 * first and second are implemented using separate LwwCRegisters,
 * so changes to either of them are opaque writes
 * (no conflict resolution), but changing both concurrently
 * will keep both changes.
 */
export class CPair<T, U> extends CObject<CPairEventsRecord<T, U>> {
  private readonly firstReg: LwwCRegister<T>;
  private readonly secondReg: LwwCRegister<U>;

  constructor(initToken: CrdtInitToken, firstInitial: T, secondInitial: U) {
    super(initToken);

    // Setup child Crdts.
    this.firstReg = this.addChild("firstReg", Pre(LwwCRegister)(firstInitial));
    this.secondReg = this.addChild(
      "secondReg",
      Pre(LwwCRegister)(secondInitial)
    );

    // Convert child Crdt events into our own.
    this.firstReg.on("Set", (e) => this.emit("FirstSet", e));
    this.secondReg.on("Set", (e) => this.emit("SecondSet", e));
  }

  // Convert our own methods into child methods.
  get first(): T {
    return this.firstReg.value;
  }

  set first(first: T) {
    this.firstReg.value = first;
  }

  get second(): U {
    return this.secondReg.value;
  }

  set second(second: U) {
    this.secondReg.value = second;
  }
}
