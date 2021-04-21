import { CausalTimestamp } from "../network";
import { PrimitiveCrdt, StatefulCrdt } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";
import {
  Resettable,
  ResettableEventsRecord,
  StrongResettableEventsRecord,
  StrongResettable,
  ConstructorArgs,
} from "./mixins";

/**
 * A state for a StatefulCrdt that can be "reset", restoring its
 * state to some fixed reset value (e.g., the initial state).  The reset
 * is a local, sequential operation, not a Crdt operation; it is not
 * replicated and does not need to worry about concurrent operations.
 */
export interface LocallyResettableState {
  /**
   * Reset the state to a fixed value depending only on the enclosing
   * Crdt's constructor arguments, not on the history of Crdt operations
   * or calls to this method.  Typically this will restore the state
   * to its initial value set in the Crdt constructor.
   *
   * This method is used by the resetting Crdt constructions to perform local,
   * sequential (non-Crdt) reset operations.
   */
  resetLocalState(): void;
}

class ResetComponentMessage extends Uint8Array {
  readonly isResetComponentMessage = true;
  // TODO: named params?
  replay: [string[], CausalTimestamp | null, Uint8Array][] = [];
  outOfOrderMessage: Uint8Array | null = null;
}

class ResetComponent<
  S extends LocallyResettableState
> extends PrimitiveCrdt<S> {
  constructor(readonly resetWrapperCrdt: ResetWrapperCrdt<S, StatefulCrdt<S>>) {
    // This state will get overwritten by original's state
    super((null as unknown) as S);
  }

  resetTarget() {
    super.send(new Uint8Array());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array | ResetComponentMessage
  ) {
    if (message.length !== 0)
      throw new Error("Unexcepted nontrivial message for ResetComponent");
    this.resetWrapperCrdt.original.state.resetLocalState();
    this.resetWrapperCrdt.dispatchResetEvent(timestamp);
    if ("isResetComponentMessage" in message) {
      // Replay message.replay
      for (let toReplay of message.replay) {
        // toReplay[1] is only null if keepTimestamps
        // was set to false, in which case original
        // promises not to look at it anyway, hence this
        // is okay.  TODO: type-safe way to do this?
        this.resetWrapperCrdt.original.receive(
          toReplay[0],
          toReplay[1]!,
          toReplay[2]
        );
      }
    }
  }

  canGC() {
    return true;
  }
}

// TODO: rename ResetWrapper; same for StrongResetWrapper
export class ResetWrapperCrdt<
    S extends LocallyResettableState,
    C extends StatefulCrdt<S>
  >
  extends SemidirectProduct<S, ResettableEventsRecord>
  implements Resettable {
  private resetComponent!: ResetComponent<S>;
  // TODO: make original protected?  Must then also pass to
  // resetComponent.
  /**
   * @param keepOnlyMaximal=false Store only causally maximal
   * messages in the history, to save space (although possibly
   * at some CPU cost).  This is only allowed if the state
   * only ever depends on the causally maximal messages.
   * @param keepTimestamps=true If false, when replaying messages after
   * a reset, replace their timestamps with null.  That is only
   * allowed if original and its descendants never use timestamps
   * in their receive methods.  Setting this to false saves storage space
   * by not storing timestamps in the history.
   * TODO: issue: timestamps are always used in events,
   * now they'll be null.  Although they're kind of weird
   * in resets anyway.
   */
  constructor(
    readonly original: C,
    keepOnlyMaximal = false,
    keepTimestamps = true
  ) {
    super(keepTimestamps, true, keepOnlyMaximal);
    this.resetComponent = new ResetComponent(this);
    super.setup(this.resetComponent, original, original.state);
  }

  protected action(
    m2TargetPath: string[],
    m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ) {
    if (!("isResetComponentMessage" in m1Message)) {
      m1Message = new ResetComponentMessage();
    }
    (m1Message as ResetComponentMessage).replay.push([
      m2TargetPath.slice(),
      m2Timestamp,
      m2Message,
    ]);
    return { m1TargetPath, m1Message };
  }

  dispatchResetEvent(timestamp: CausalTimestamp) {
    this.emit("Reset", {
      caller: this,
      timestamp: timestamp,
    });
  }

  reset() {
    this.resetComponent.resetTarget();
  }

  /**
   * Defers OutOfOrder receipt handling to the target Crdt.
   * Note that the target Crdt may not actually be OutOfOrderAble,
   * in which case this will throw an error.
   * OutOfOrderAble is not supported for reset() operations and
   * will cause an error.
   */
  /*receiveOutOfOrder(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // TODO: this is bad layering
    // TODO: what if the OoO op is reset?
    if (targetPath[0] === SemidirectProduct.crdt1Name) {
      throw new Error(
        "OutOfOrderAble is not supported for reset()" +
          " operations added by ResetWrapperCrdt"
      );
    }
    if (targetPath[0] !== SemidirectProduct.crdt2Name) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in semidirect product: " +
          JSON.stringify(targetPath)
      );
    }
    if (!isOutOfOrderAble(this.resetComponent.targetCrdt)) {
      // TODO: only be OutOfOrderAble if the target is
      throw new Error(
        "receiveOutOfOrder() called on ResetWrapperCrdt, but the " +
          "original (wrapped) Crdt is not OutOfOrderAble"
      );
    }
    targetPath.length--;
    this.resetComponent.targetCrdt.receiveOutOfOrder(
      targetPath,
      timestamp,
      message
    );
  }*/
}

export function ResetWrapClass<
  S extends LocallyResettableState,
  C extends StatefulCrdt<S>,
  Args extends any[]
>(
  Base: ConstructorArgs<Args, C>,
  keepOnlyMaximal = false,
  keepTimestamps = true
): ConstructorArgs<Args, ResetWrapperCrdt<S, C>> {
  return class ResetWrapped extends ResetWrapperCrdt<S, C> {
    constructor(...args: Args) {
      let original = new Base(...args);
      super(original, keepOnlyMaximal, keepTimestamps);
    }
  };
}

// Strong reset

export class StrongResetComponent<
  S extends LocallyResettableState
> extends PrimitiveCrdt<S> {
  constructor(
    readonly strongResetWrapperCrdt: StrongResetWrapperCrdt<S, StatefulCrdt<S>>
  ) {
    // This state will get overwritten by original's state
    super((null as unknown) as S);
  }

  strongResetTarget() {
    super.send(new Uint8Array());
  }

  protected receivePrimitive(timestamp: CausalTimestamp, message: Uint8Array) {
    if (message.length !== 0)
      throw new Error("Unexcepted nontrivial message for StrongResetComponent");
    this.strongResetWrapperCrdt.original.state.resetLocalState();
    this.strongResetWrapperCrdt.dispatchStrongResetEvent(timestamp);
  }

  canGC() {
    return true;
  }
}

export class StrongResetWrapperCrdt<
    S extends LocallyResettableState,
    C extends StatefulCrdt<S>
  >
  extends SemidirectProduct<S, StrongResettableEventsRecord>
  implements StrongResettable {
  private strongResetComponent!: StrongResetComponent<S>;
  /**
   * @param keepOnlyMaximal=false Store only causally maximal
   * messages in the history, to save space (although possibly
   * at some CPU cost).  This is only allowed if the state
   * only ever depends on the causally maximal messages.
   */
  constructor(readonly original: C, keepOnlyMaximal = false) {
    super(false, true, keepOnlyMaximal);
    this.strongResetComponent = new StrongResetComponent(this);
    super.setup(original, this.strongResetComponent, original.state);
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    _m2Message: Uint8Array,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    _m1Message: Uint8Array
  ) {
    // The action converts every message to the identity
    return null;
  }

  dispatchStrongResetEvent(timestamp: CausalTimestamp) {
    this.emit("StrongReset", {
      caller: this,
      timestamp: timestamp,
    });
  }

  strongReset() {
    this.strongResetComponent.strongResetTarget();
  }

  /**
   * Defers OutOfOrder receipt handling to the target Crdt.
   * Note that the target Crdt may not actually be OutOfOrderAble,
   * in which case this will throw an error.
   * OutOfOrderAble is not supported for strongReset() operations and
   * will cause an error.
   */
  /*receiveOutOfOrder(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // TODO: this is bad layering
    // TODO: what if the OoO op is reset?
    if (targetPath[0] === SemidirectProduct.crdt2Name) {
      throw new Error(
        "OutOfOrderAble is not supported for reset()" +
          " operations added by ResetWrapperCrdt"
      );
    }
    if (targetPath[0] !== SemidirectProduct.crdt1Name) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in semidirect product: " +
          JSON.stringify(targetPath)
      );
    }
    if (!isOutOfOrderAble(this.strongResetComponent.targetCrdt)) {
      // TODO: only be OutOfOrderAble if the target is
      throw new Error(
        "receiveOutOfOrder() called on ResetWrapperCrdt, but the " +
          "original (wrapped) Crdt is not OutOfOrderAble"
      );
    }
    targetPath.length--;
    this.strongResetComponent.targetCrdt.receiveOutOfOrder(
      targetPath,
      timestamp,
      message
    );
  }*/
}

export function StrongResetWrapClass<
  S extends LocallyResettableState,
  C extends StatefulCrdt<S>,
  Args extends any[]
>(
  Base: ConstructorArgs<Args, C>,
  keepOnlyMaximal = false
): ConstructorArgs<Args, StrongResetWrapperCrdt<S, C>> {
  return class StrongResetWrapped extends StrongResetWrapperCrdt<S, C> {
    constructor(...args: Args) {
      let original = new Base(...args);
      super(original, keepOnlyMaximal);
    }
  };
}
