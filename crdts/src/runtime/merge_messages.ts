import { MessageMeta } from "@collabs/core";
import { MessageSerializer } from "./message_serializer";

/**
 * **Experimental** - message format is unstable.
 *
 * Merges the given messages, returning a single message that incorporates
 * all of their transactions. This message may be passed to
 * [[AbstractDoc.receive]]/[[CRuntime.receive]] as usual.
 *
 * @param messages The messages to merge. These must come from either
 * [[DocEventsRecord.Send]] events or previous `mergeMessages` calls.
 * @throws If `messages.length` is 0.
 */
export function mergeMessages(messages: Uint8Array[]): Uint8Array {
  if (messages.length === 0) {
    throw new Error("messages.length is 0");
  }
  if (messages.length === 1) return messages[0];

  const originals: {
    messageStacks: (Uint8Array | string)[][];
    meta: MessageMeta;
  }[] = [];
  for (const message of messages) {
    originals.push(...MessageSerializer.instance.deserialize(message));
  }
  return MessageSerializer.instance.serialize(originals);
}
