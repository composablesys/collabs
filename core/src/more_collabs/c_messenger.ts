import { CPrimitive } from "../base_collabs/c_primitive";
import {
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  UpdateMeta,
} from "../core";
import { DefaultSerializer, Serializer } from "../util";

export interface MessengerEvent<M> extends CollabEvent {
  message: M;
}

export interface MessengerEventsRecord<M> extends CollabEventsRecord {
  Message: MessengerEvent<M>;
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
export class CMessenger<M> extends CPrimitive<MessengerEventsRecord<M>> {
  private readonly messageSerializer: Serializer<M>;

  constructor(
    init: InitToken,
    options: { messageSerializer?: Serializer<M> } = {}
  ) {
    super(init);

    this.messageSerializer =
      options.messageSerializer ?? DefaultSerializer.getInstance();
  }

  sendMessage(message: M): void {
    const encoded = this.messageSerializer.serialize(message);
    super.sendPrimitive(encoded);
  }

  protected receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void {
    const decoded = this.messageSerializer.deserialize(<Uint8Array>message);
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
