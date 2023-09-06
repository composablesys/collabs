import { MessageMeta, MessageStacksSerializer } from "@collabs/core";
import { RuntimeMetaSerializer } from "./crdt_meta_implementations";

/**
 * Serializer for the messages sent by CRuntime.
 *
 * Not actually a Serializer because the input/output types are different.
 */
export const MessageSerializer = {
  /** Note: this mutates value internally. */
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
  },

  deserialize(message: Uint8Array): {
    trMessage: Uint8Array;
    messageStacks: (Uint8Array | string)[][];
    meta: MessageMeta;
  }[] {
    const messageStacks = MessageStacksSerializer.instance.deserialize(message);
    const meta = RuntimeMetaSerializer.deserialize(
      (<Uint8Array[]>messageStacks.pop())[0]
    );
    return [{ trMessage: message, messageStacks, meta }];
  },
} as const;
