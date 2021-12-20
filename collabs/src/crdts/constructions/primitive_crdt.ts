import { CPrimitive } from "../../constructions";
import { CollabEventsRecord, MessageMeta } from "../../core";
import { CRDTMessageMeta } from "./crdt_message_meta";

/**
 * Superclass for a primitive (message-passing) op-based CRDT.
 *
 * TODO: rules: sendCRDT/receiveCRDT in causal order, with
 * requested CRDT metadata. Model is of an op-based CRDT as
 * defined by TODO.
 *
 * TODO: context/meta/ancestor reqs.
 *
 * TODO: difference from CPrimitive: adds CRDT meta, that's it.
 */
export abstract class PrimitiveCRDT<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends CPrimitive<Events> {
  protected sendCRDT(message: string | Uint8Array): void {
    super.sendPrimitive(message);
  }

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: MessageMeta
  ): void {
    this.receiveCRDT(message, CRDTMessageMeta.from(meta));
  }

  protected abstract receiveCRDT(
    message: string | Uint8Array,
    meta: CRDTMessageMeta
  ): void;
}
