import {
  MessageMeta,
  CrdtEvent,
  CrdtEventMeta,
  CrdtEventsRecord,
  InitToken,
  Serializer,
} from "../core";
import { DefaultSerializer } from "../util";
import { CPrimitive } from "./primitive";

export interface CMessengerEvent<M> extends CrdtEvent {
  message: M;
}

export interface CMessengerEventsRecord<M> extends CrdtEventsRecord {
  Message: CMessengerEvent<M>;
}

/**
 * A Crdt that merely sends messages.
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
    super.send(encoded);
  }

  protected receivePrimitive(meta: MessageMeta, message: Uint8Array): void {
    const decoded = this.messageSerializer.deserialize(message, this.runtime);
    this.emit("Message", {
      message: decoded,
      meta: CrdtEventMeta.fromTimestamp(meta),
    });
  }

  protected savePrimitive(): Uint8Array {
    return new Uint8Array();
  }

  protected loadPrimitive(_saveData: Uint8Array): void {
    // No-op.
  }

  canGc(): boolean {
    return true;
  }
}
