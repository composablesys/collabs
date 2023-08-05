import { MessageStacksSerializer, Serializer, MessageMeta } from "@collabs/core";
import { RuntimeMetaSerializer } from "./crdt_meta_implementations";

/**
 * Serializer for the messages sent by CRuntime.
 */
export const MessageSerializer: Serializer<
  [messageStacks: (Uint8Array | string)[][], meta: MessageMeta]
> = {
  /** Note: this mutates messageStacks. */
  serialize([messageStacks, meta]) {
    messageStacks.push([RuntimeMetaSerializer.serialize(meta)]);
    return MessageStacksSerializer.instance.serialize(messageStacks);
  },

  deserialize(message) {
    const messageStacks = MessageStacksSerializer.instance.deserialize(message);
    const meta = RuntimeMetaSerializer.deserialize(
      (<Uint8Array[]>messageStacks.pop())[0]
    );
    return [messageStacks, meta];
  },
} as const;
