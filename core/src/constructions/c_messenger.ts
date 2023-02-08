import {
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  UpdateMeta,
} from "../core";
import { DefaultSerializer, Serializer } from "../util";
import { CPrimitive } from "./c_primitive";

export interface CMessengerEvent<M> extends CollabEvent {
  message: M;
}

export interface CMessengerEventsRecord<M> extends CollabEventsRecord {
  Message: CMessengerEvent<M>;
}

/**
 * A collaborative messenger.
 *
 * This Collab has no state; it merely broadcasts messages between replicas.
 * To receive messages, listen on Message events.
 *
 * Note that depending on the [[IRuntime]],
 * messages may be received in different orders on
 * different replicas.
 */
export class CMessenger<M> extends CPrimitive<CMessengerEventsRecord<M>> {
  constructor(
    init: InitToken,
    private readonly messageSerializer: Serializer<M> = DefaultSerializer.getInstance()
  ) {
    super(init);
  }

  sendMessage(message: M): void {
    const encoded = this.messageSerializer.serialize(message);
    super.sendPrimitive(encoded);
  }

  protected receivePrimitive(message: Uint8Array, meta: UpdateMeta): void {
    const decoded = this.messageSerializer.deserialize(message);
    this.emit("Message", {
      message: decoded,
      meta,
    });
  }

  savePrimitive() {
    return null;
  }

  loadPrimitive(): void {
    // No-op.
  }

  canGC(): boolean {
    return true;
  }
}
