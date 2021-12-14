import {
  MessageMeta,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  Serializer,
} from "../core";
import { DefaultSerializer } from "../util";
import { CPrimitive } from "./primitive";

export interface CMessengerEvent<M> extends CollabEvent {
  message: M;
}

export interface CMessengerEventsRecord<M> extends CollabEventsRecord {
  Message: CMessengerEvent<M>;
}

/**
 * A Collab that merely sends messages.
 *
 * Intended for use with [[SemidirectProductStore]], and little
 * else.
 *
 * When a message is received, a Message event is emitted.
 * Note that messages may arrive in different orders on
 * different replicas.
 */
export class CMessenger<M> extends CPrimitive<CMessengerEventsRecord<M>> {
  constructor(
    initToken: InitToken,
    private readonly messageSerializer: Serializer<M> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);
  }

  sendMessage(message: M): void {
    const encoded = this.messageSerializer.serialize(message);
    super.sendPrimitive(encoded);
  }

  protected receivePrimitive(message: Uint8Array, meta: MessageMeta): void {
    const decoded = this.messageSerializer.deserialize(message);
    this.emit("Message", {
      message: decoded,
      meta,
    });
  }

  save(): Uint8Array {
    return new Uint8Array();
  }

  load(): void {
    // No-op.
  }

  canGc(): boolean {
    return true;
  }
}
