import {
  MessageMeta,
  MessageStacksSerializer,
  Serializer,
} from "@collabs/core";
import { RuntimeMetaSerializer } from "./crdt_meta_implementations";

/**
 * Serializer for the messages sent by CRuntime.
 */
export class MessageSerializer
  implements
    Serializer<
      { messageStacks: (Uint8Array | string)[][]; meta: MessageMeta }[]
    >
{
  private constructor() {
    // Singleton class - use instance instead.
  }

  static readonly instance = new this();

  serialize(
    value: { messageStacks: (Uint8Array | string)[][]; meta: MessageMeta }[]
  ): Uint8Array {
    if (value.length === 1) {
      const { messageStacks, meta } = value[0];
      messageStacks.push([RuntimeMetaSerializer.serialize(meta)]);
      return MessageStacksSerializer.instance.serialize(messageStacks);
    } else {
      throw new Error("Not yet implemented");
    }
  }

  deserialize(
    message: Uint8Array
  ): { messageStacks: (Uint8Array | string)[][]; meta: MessageMeta }[] {
    return this.deserializeInternal(message, false);
  }

  deserializeWithTrMessages(message: Uint8Array): {
    trMessage: Uint8Array;
    messageStacks: (Uint8Array | string)[][];
    meta: MessageMeta;
  }[] {
    return this.deserializeInternal(message, true) as {
      trMessage: Uint8Array;
      messageStacks: (Uint8Array | string)[][];
      meta: MessageMeta;
    }[];
  }

  private deserializeInternal(
    message: Uint8Array,
    trMessages: boolean
  ): {
    trMessage?: Uint8Array;
    messageStacks: (Uint8Array | string)[][];
    meta: MessageMeta;
  }[] {
    const messageStacks = MessageStacksSerializer.instance.deserialize(message);
    const meta = RuntimeMetaSerializer.deserialize(
      (<Uint8Array[]>messageStacks.pop())[0]
    );
    return [
      { trMessage: trMessages ? message : undefined, messageStacks, meta },
    ];
  }
}
