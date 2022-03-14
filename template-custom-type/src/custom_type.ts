import {
  CObject,
  CollabEventsRecord,
  InitToken,
  CVariableEvent,
  LWWCVariable,
  Pre,
} from "@collabs/collabs";

// Since you're exporting your type for reuse, it's a good
// idea to expose meaningful events.
// See the Collabs docs (https://github.com/composablesys/collabs/tree/master/collabs/docs/custom_types.md) for advice on what events to include.
export interface CPairEventsRecord<T, U> extends CollabEventsRecord {
  FirstSet: CVariableEvent<T>;
  SecondSet: CVariableEvent<U>;
}

/**
 * Demo custom type: a pair (first: T, second: U).
 * first and second are implemented using separate LWWCVariables,
 * so changes to either of them are opaque writes
 * (no conflict resolution), but changing both concurrently
 * will keep both changes.
 */
export class CPair<T, U> extends CObject<CPairEventsRecord<T, U>> {
  private readonly firstReg: LWWCVariable<T>;
  private readonly secondReg: LWWCVariable<U>;

  constructor(initToken: InitToken, firstInitial: T, secondInitial: U) {
    super(initToken);

    // Setup child Collabs.
    this.firstReg = this.addChild("firstReg", Pre(LWWCVariable)(firstInitial));
    this.secondReg = this.addChild(
      "secondReg",
      Pre(LWWCVariable)(secondInitial)
    );

    // Convert child Collab events into our own.
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
