import { CausalTimestamp } from "../../net";
import { Constructor } from "../../util/mixin_types";
import { CrdtEvent, CrdtEventsRecord } from "../core/crdt";
import { StatefulCrdt } from "../core/interfaces";
import { PrimitiveCrdt } from "../core/primitive_crdt";
import { SemidirectProduct } from "./semidirect_product";

// TODO: revise whole file

// TODO: ResettableCompositeCrdt (implement reset for you)

export interface Resettable {
  /**
   * Perform an observed-reset operation on this Crdt.  Actually,
   * any behavior is acceptable (will not violate eventual
   * consistency) so long as this method commutes with
   * concurrent operations and has no effect if timestamp
   * is prior to the timestamps of all other received messages.
   * In particular, if you don't want to implement resets, it is okay to
   * make this method a no-op, so long as users are aware that
   * reset() will have no effect.
   */
  reset(): void;
}

// TODO: allow specializing caller type to the actual type?
export interface ResettableEventsRecord extends CrdtEventsRecord {
  Reset: CrdtEvent;
}

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
    super(null as unknown as S);
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

  canGc() {
    return true;
  }
}

// TODO: rename ResetWrapper; same for StrongResetWrapper
export class ResetWrapperCrdt<
    S extends LocallyResettableState,
    C extends StatefulCrdt<S>,
    Events extends ResettableEventsRecord = ResettableEventsRecord
  >
  extends SemidirectProduct<S, Events>
  implements Resettable
{
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
}

/**
 * Uses two layers of functions so that the caller can
 * specify Events while letting the remaining type params
 * (S, C, Args) be inferred.  To use it, do:
 * ResetWrapClass<Events>()(actual args).
 * (TODO: specify params here since they aren't
 * auto-generated by docs, due to nested function.)
 *
 * Currently TypeScript
 * requires that if one type argument is given, all
 * must be, which is inconvenient here: Events must
 * be specified (doesn't make sense to infer), while
 * S, C, and Args are easily inferred and annoying
 * to write.  This might be fixed at some point
 * (https://github.com/Microsoft/TypeScript/pull/26349).
 */
export function ResetWrapClass<Events extends ResettableEventsRecord>() {
  return function <
    S extends LocallyResettableState,
    C extends StatefulCrdt<S>,
    Args extends any[]
  >(
    Base: Constructor<Args, C>,
    keepOnlyMaximal = false,
    keepTimestamps = true
  ): Constructor<Args, ResetWrapperCrdt<S, C, Events>> {
    return class ResetWrapped extends ResetWrapperCrdt<S, C, Events> {
      constructor(...args: Args) {
        let original = new Base(...args);
        super(original, keepOnlyMaximal, keepTimestamps);
      }
    };
  };
}
