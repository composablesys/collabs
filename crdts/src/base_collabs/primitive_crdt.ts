import {
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  UpdateMeta,
} from "@collabs/core";
import {
  CRDTMessageMeta,
  CRDTMetaProvider,
  CRDTMetaRequest,
  CRDTSavedStateMeta,
} from "../runtime";

/**
 * Convenience base class for a CRDT implementation that sends
 * its own messages over the network.
 *
 * Extend this class to implement a "primitive" CRDT with a simple
 * broadcast interface ([[sendCRDT]]/[[receiveCRDT]]) and no child
 * Collabs. This matches how most (op-based) CRDTs
 * are described algorithmically.
 *
 * This class differs from [[CPrimitive]] in that it requires [[CRuntime]],
 * and it makes it easier to work with [[CRuntime]]'s [[CRDTMessageMeta]].
 *
 * See also:
 * - [[CObject]], for an "object" Collab that does not need to send its own
 * messages.
 * - [[CPrimitive]], for general [[Collab]]s (not just CRDTs).
 */
export abstract class PrimitiveCRDT<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends CPrimitive<Events> {
  constructor(init: InitToken) {
    super(init);

    if (
      (this.runtime as unknown as CRDTMetaProvider).providesCRDTMeta !== true
    ) {
      throw new Error(
        "this.runtime must be CRuntime or another CRDTMetaProvider"
      );
    }
  }

  /**
   * Broadcasts a message to other replicas of this CRDT.
   * The message will be delivered to all replicas' [[receiveCRDT]],
   * including locally.
   *
   * Call this method instead of [[Collab.send]] or [[CPrimitive.sendPrimitive]].
   *
   * By default, [[receiveCRDT]]'s `crdtMeta` will contain all fields that are accessed
   * during the sender's local call to receiveCRDT.
   * You can request additional fields with `metaRequest`.
   *
   * @param message The message to send.
   */
  protected sendCRDT(
    message: Uint8Array | string,
    metaRequest?: CRDTMetaRequest
  ): void {
    super.sendPrimitive(message, metaRequest);
  }

  /**
   * Do not override; override [[receiveCRDT]] instead.
   */
  protected receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void {
    this.receiveCRDT(message, meta, <CRDTMessageMeta>meta.runtimeExtra);
  }

  /**
   * Receives a message sent by [[sendCRDT]]
   * on a local or remote replica of this PrimitiveCRDT.
   *
   * This method processes the message, changes the
   * local state accordingly, and emits events describing the
   * local changes.
   *
   * This method may assume eventual, exactly-once, causal-order message
   * delivery, and it must ensure strong eventual consistency.
   *
   * See [[Collab.receive]].
   *
   * @param message The message sent by [[sendCRDT]].
   * @param meta Generic metadata attached to this message by the [[CRuntime]].
   * Note that `meta.updateType` is always `"message"`.
   * @param crdtMeta CRDT-specific Metadata attached to this message by the [[CRuntime]].
   * It contains all fields that were accessed
   * during the sender's local call to receiveCRDT,
   * plus requests made in [[sendCRDT]].
   */
  protected abstract receiveCRDT(
    message: Uint8Array | string,
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta
  ): void;

  protected savePrimitive(): Uint8Array | null {
    return this.saveCRDT();
  }

  protected loadPrimitive(savedState: Uint8Array, meta: UpdateMeta): void {
    this.loadCRDT(savedState, meta, <CRDTSavedStateMeta>meta.runtimeExtra);
  }

  protected abstract saveCRDT(): Uint8Array | null;

  protected abstract loadCRDT(
    savedState: Uint8Array,
    meta: UpdateMeta,
    crdtMeta: CRDTSavedStateMeta
  ): void;
}
