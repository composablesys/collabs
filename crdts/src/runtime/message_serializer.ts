import {
  MessageMeta,
  MessageStacksSerializer,
  Serializer,
} from "@collabs/core";
import { MessageSerializerMergeInfo } from "../../generated/proto_compiled";
import { RuntimeMetaSerializer } from "./crdt_meta_implementations";

enum MessageType {
  Merged = "m",
}

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
      // Default message type (single-transaction message).
      // We indicate this by using a Uint8Array as the footer, instead of a
      // (string) MessageType.
      const { messageStacks, meta } = value[0];
      messageStacks.push([RuntimeMetaSerializer.serialize(meta)]);
      return MessageStacksSerializer.instance.serialize(messageStacks);
    } else {
      // Merged message (multiple transactions in one).
      // To compress vector clocks, we encode replicaIDs using their index in this array.
      const replicaIDs: string[] = [];
      const replicaIDsInv = new Map<string, number>();
      const replicaIDEncoder = (replicaID: string) => {
        let index = replicaIDsInv.get(replicaID);
        if (index === undefined) {
          index = replicaIDs.length;
          replicaIDs.push(replicaID);
          replicaIDsInv.set(replicaID, index);
        }
        return index;
      };

      const allMessageStacks: (Uint8Array | string)[][] = [];
      const lengths = new Array<number>(value.length);

      let i = 0;
      for (const { messageStacks, meta } of value) {
        // Push the messageStacks themselves followed by the serialized meta.
        allMessageStacks.push(...messageStacks);
        allMessageStacks.push([
          RuntimeMetaSerializer.serialize(meta, replicaIDEncoder),
        ]);
        lengths[i] = messageStacks.length;
        i++;
      }

      // Push info and footer.
      allMessageStacks.push([
        MessageSerializerMergeInfo.encode({ replicaIDs, lengths }).finish(),
      ]);
      allMessageStacks.push([MessageType.Merged]);

      return MessageStacksSerializer.instance.serialize(allMessageStacks);
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
    const allMessageStacks =
      MessageStacksSerializer.instance.deserialize(message);
    const footer = (<[Uint8Array | string]>allMessageStacks.pop())[0];

    if (typeof footer === "string") {
      // footer indicates the message type.
      switch (footer) {
        case MessageType.Merged: {
          // Merged message (multiple transactions in one).
          const ans: {
            trMessage?: Uint8Array;
            messageStacks: (Uint8Array | string)[][];
            meta: MessageMeta;
          }[] = [];

          const info = MessageSerializerMergeInfo.decode(
            // Note: footer removed by earlier pop().
            (<[Uint8Array]>allMessageStacks.pop())[0]
          );
          let nextStart = 0;
          for (const length of info.lengths) {
            const messageStacks = allMessageStacks.slice(
              nextStart,
              nextStart + length
            );
            const meta = RuntimeMetaSerializer.deserialize(
              (<[Uint8Array]>allMessageStacks[nextStart + length])[0],
              info.replicaIDs
            );
            const tr: {
              trMessage?: Uint8Array;
              messageStacks: (Uint8Array | string)[][];
              meta: MessageMeta;
            } = { messageStacks, meta };
            if (trMessages) {
              tr.trMessage = this.serialize([
                { messageStacks: messageStacks.slice(), meta },
              ]);
            }
            ans.push(tr);

            nextStart += length + 1;
          }

          // We should have processed all of allMessageStacks.
          // Note: footer and info removed by earlier pop()s.
          if (nextStart !== allMessageStacks.length) {
            throw new Error(
              "Internal error: lengths/allMessageStacks mismatch"
            );
          }

          return ans;
        }
        default:
          throw new Error(
            'Unknown message type "' +
              footer +
              '"; your @collabs/collabs version may need updating'
          );
      }
    } else {
      // No message type - use default (single-transaction message).
      const meta = RuntimeMetaSerializer.deserialize(footer);
      return [
        {
          trMessage: trMessages ? message : undefined,
          // Note: footer removed by earlier pop().
          messageStacks: allMessageStacks,
          meta,
        },
      ];
    }
  }
}
