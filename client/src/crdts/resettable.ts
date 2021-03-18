import { CausalTimestamp } from "../network";
import { PrimitiveCrdt, StatefulCrdt } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";
import {
  isResettable,
  isOutOfOrderAble,
  AllAble,
  Resettable,
  OutOfOrderAble,
  ResettableEventsRecord,
  StrongResettableEventsRecord,
} from "./mixins";

export interface HardResettable {
  /**
   * Warning: not a Crdt operation (not synced to
   * other replicas)!
   *
   * This method should reset the Crdt's state
   * to a value depending only on its constructor
   * arguments (e.g., a fresh copy of the initial
   * state set in the constructor).  More specifically,
   * the resulting state must be the same on all replicas
   * even if they have received different messages
   * so far, including possibly different numbers of
   * previous hardReset() calls.
   */
  hardReset(): void;
}

class ResetComponentMessage extends Uint8Array {
  readonly isResetComponentMessage = true;
  replay: [string[], CausalTimestamp, Uint8Array][] = [];
  outOfOrderMessage: Uint8Array | null = null;
}

class ResetComponent<S extends Object | null> extends PrimitiveCrdt<S> {
  constructor(
    readonly targetCrdt: StatefulCrdt<S, any> & HardResettable,
    readonly resetWrapperCrdt: ResetWrapperCrdt<S>
  ) {
    super((null as unknown) as S);
  }

  resetTarget() {
    super.send(new Uint8Array());
  }

  receive(
    timestamp: CausalTimestamp,
    message: Uint8Array | ResetComponentMessage
  ) {
    this.targetCrdt.hardReset();
    this.resetWrapperCrdt.dispatchResetEvent(timestamp);
    if ("isResetComponentMessage" in message) {
      // Replay message.replay
      for (let toReplay of message.replay) {
        this.targetCrdt.receiveGeneral(...toReplay);
      }
    }
  }
}

export class ResetWrapperCrdt<S extends Object | null>
  extends SemidirectProduct<S, ResettableEventsRecord>
  implements HardResettable, Resettable, OutOfOrderAble {
  private resetComponent!: ResetComponent<S>;
  /**
   * @param keepOnlyMaximal=false Store only causally maximal
   * messages in the history, to save space (although possibly
   * at some CPU cost).  This is only allowed if the state
   * only ever depends on the causally maximal messages.
   */
  constructor(keepOnlyMaximal = false) {
    super(true, true, keepOnlyMaximal);
  }

  setupReset(targetCrdt: StatefulCrdt<S, any> & HardResettable) {
    this.resetComponent = new ResetComponent(targetCrdt, this);
    super.setup(this.resetComponent, targetCrdt, targetCrdt.state);
  }

  action(
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
      m2Timestamp!,
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
   * In case we want to further wrap this with StrongResetWrapperCrdt.
   */
  hardReset(): void {
    this.resetComponent.targetCrdt.hardReset();
    this.state.hardReset();
  }

  /**
   * Defers OutOfOrder receipt handling to the target Crdt.
   * Note that the target Crdt may not actually be OutOfOrderAble,
   * in which case this will throw an error.
   * OutOfOrderAble is not supported for reset() operations and
   * will cause an error.
   */
  receiveOutOfOrder(
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
  }
}

// Strong reset

export class StrongResetComponent<
  S extends Object | null
> extends PrimitiveCrdt<S> {
  constructor(
    readonly targetCrdt: StatefulCrdt<S, any> & HardResettable,
    readonly strongResetWrapperCrdt: StrongResetWrapperCrdt<S>
  ) {
    super((null as unknown) as S);
  }

  strongResetTarget() {
    super.send(new Uint8Array());
  }

  receive(
    timestamp: CausalTimestamp,
    _message: Uint8Array | ResetComponentMessage
  ) {
    this.targetCrdt.hardReset();
    this.strongResetWrapperCrdt.dispatchStrongResetEvent(timestamp);
  }
}

export class StrongResetWrapperCrdt<S extends Object | null>
  extends SemidirectProduct<S, StrongResettableEventsRecord>
  implements AllAble {
  private strongResetComponent!: StrongResetComponent<S>;
  /**
   * @param keepOnlyMaximal=false Store only causally maximal
   * messages in the history, to save space (although possibly
   * at some CPU cost).  This is only allowed if the state
   * only ever depends on the causally maximal messages.
   */
  constructor(keepOnlyMaximal = false) {
    super(true, true, keepOnlyMaximal);
  }

  setupStrongReset(targetCrdt: StatefulCrdt<S, any> & HardResettable) {
    this.strongResetComponent = new StrongResetComponent(targetCrdt, this);
    super.setup(targetCrdt, this.strongResetComponent, targetCrdt.state);
  }

  action(
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
   * Defers (non-strong) reset() operations to the target Crdt.
   * Note that the target Crdt may not actually be Resettable,
   * in which case this will throw an error.
   * This method is implemented for the sake of AddAbilitiesViaChildren,
   * which calls reset() on all children of a Crdt; targetCrdt's wrapped with
   * this class will have this class as the parent's child instead of
   * targetCrdt, so we need to handle those reset() calls.
   *
   * TODO: only support if target is Resettable?
   */
  reset() {
    if (isResettable(this.strongResetComponent.targetCrdt)) {
      this.strongResetComponent.targetCrdt.reset();
    } else
      throw new Error(
        "reset() called on StrongResetWrapperCrdt, but the " +
          "original (wrapped) Crdt is not Resettable"
      );
  }

  /**
   * Defers OutOfOrder receipt handling to the target Crdt.
   * Note that the target Crdt may not actually be OutOfOrderAble,
   * in which case this will throw an error.
   * OutOfOrderAble is not supported for strongReset() operations and
   * will cause an error.
   */
  receiveOutOfOrder(
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
  }
}
