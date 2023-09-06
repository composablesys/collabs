import {
  MessageMeta,
  MessageStacksSerializer,
  Serializer,
} from "@collabs/core";
import { RuntimeMetaSerializer } from "./crdt_meta_implementations";

/**
 * Serializer for the messages sent by CRuntime.
 */
export const MessageSerializer: Serializer<
  [messageStacks: (Uint8Array | string)[][], meta: MessageMeta][]
> = {
  /** Note: this mutates value internally. */
  serialize(value) {
    if (value.length === 1) {
      const [messageStacks, meta] = value[0];
      messageStacks.push([RuntimeMetaSerializer.serialize(meta)]);
      return MessageStacksSerializer.instance.serialize(messageStacks);
    } else {
      throw new Error("Not yet implemented");
    }
  },

  deserialize(message) {
    const messageStacks = MessageStacksSerializer.instance.deserialize(message);
    const meta = RuntimeMetaSerializer.deserialize(
      (<Uint8Array[]>messageStacks.pop())[0]
    );
    return [[messageStacks, meta]];
  },
} as const;
