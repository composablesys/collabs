import { util } from "protobufjs/minimal";
import {
  ISavedStateTreeMessage,
  MessageStacksMessage,
  SavedStateTreeMessage,
} from "../../generated/proto_compiled";
import { SavedStateTree } from "../core";
import { Serializer } from "./serializers";

/**
 * Serializer for a batch of message stacks sent by [[Collab]]s,
 * represented as an array of `(Uint8Array | string)[]`.
 *
 * [[IRuntime]] implementations may use [[MessageStacksSerializer.instance]]
 * to convert a batch of Collab messages into a single Uint8Array.
 *
 * As a common-case
 * optimization, this serializer applies suffix compression to
 * message stacks: shared (string) suffixes will only appear once
 * in the serialized message. That helps when stacks contain
 * Collab paths and there are multiple messages from Collabs in
 * similar parts of the Collab tree.
 */
export class MessageStacksSerializer
  implements Serializer<(Uint8Array | string)[][]>
{
  private constructor() {
    // Singleton.
  }

  static instance = new this();

  serialize(value: (string | Uint8Array)[][]): Uint8Array {
    if (value.length === 1) {
      // Case of single messageStack.
      const message = MessageStacksMessage.create(
        this.serializeEdgeLabels(value[0])
      );
      return MessageStacksMessage.encode(message).finish();
    } else {
      // General case (tree).
      // Treat each message stack as a path from node to root in a tree,
      // where edges with the same parent & *string* label are identical.
      // Then serialize the tree plus the id of each message stack's node
      // in the tree, in order.

      // Map from a parent node ID & string edge label to the corresponding
      // child node ID.
      const children = new Map<number, Map<string, number>>();
      const edgeLabels: (Uint8Array | string)[] = [];
      // ID of each edge's parent. ID 0 = root, ID n + 1 =
      // tail of edgeLabels[n].
      const edgeParents: number[] = [];
      const messageStackIDs: number[] = [];

      for (const messageStack of value) {
        let parent = 0;
        // Set to false after we encounter a non-string.
        let useCache = true;
        // Iterate messageStack backwards (root to node).
        for (let i = messageStack.length - 1; i >= 0; i--) {
          const message = messageStack[i];
          if (useCache && typeof message === "string") {
            // See if this node already exists.
            let parentMap = children.get(parent);
            const cachedID = parentMap?.get(message);
            if (cachedID !== undefined) {
              parent = cachedID;
            } else {
              edgeLabels.push(message);
              edgeParents.push(parent);

              // Cache it.
              if (parentMap === undefined) {
                parentMap = new Map();
                children.set(parent, parentMap);
              }
              parentMap.set(message, edgeLabels.length);

              parent = edgeLabels.length;
            }
          } else {
            useCache = false;
            edgeLabels.push(message);
            edgeParents.push(parent);
            parent = edgeLabels.length;
          }
        }
        messageStackIDs.push(parent);
      }

      const message = MessageStacksMessage.create({
        ...this.serializeEdgeLabels(edgeLabels),
        edgeParents,
        messageStackIDs,
      });
      return MessageStacksMessage.encode(message).finish();
    }
  }

  deserialize(message: Uint8Array): (string | Uint8Array)[][] {
    const decoded = MessageStacksMessage.decode(message);
    const edgeLabels = this.deserializeEdgeLabels(decoded);

    if (decoded.messageStackIDs.length === 0) {
      // Case of single messageStack.
      return [edgeLabels];
    } else {
      // General case (tree).
      const messageStacks = new Array<(Uint8Array | string)[]>(
        decoded.messageStackIDs.length
      );
      for (let i = 0; i < messageStacks.length; i++) {
        const messageStack: (Uint8Array | string)[] = [];
        // Stack from the node to the root, which is the right order
        // for messageStack.
        let nextID = decoded.messageStackIDs[i];
        while (nextID !== 0) {
          messageStack.push(edgeLabels[nextID - 1]);
          nextID = decoded.edgeParents[nextID - 1];
        }

        messageStacks[i] = messageStack;
      }
      return messageStacks;
    }
  }

  private serializeEdgeLabels(edgeLabels: (Uint8Array | string)[]): {
    edgeLabelsPacked: Uint8Array;
    edgeLabelLengths: number[];
  } {
    // Put messageStack's messages in order into edgeLabels.
    // First need to know how long to make edgeLabelsPacked.
    let packedLength = 0;
    for (const edgeLabel of edgeLabels) {
      // Since all strings are ASCII (a Collab.send requirement),
      // string length = utf8-encoded length.
      packedLength += edgeLabel.length;
    }
    const edgeLabelsPacked = new Uint8Array(packedLength);
    const edgeLabelLengths = new Array<number>(edgeLabels.length);
    let offset = 0;
    for (let i = 0; i < edgeLabels.length; i++) {
      const edgeLabel = edgeLabels[i];
      if (typeof edgeLabel === "string") {
        util.utf8.write(edgeLabel, edgeLabelsPacked, offset);
        edgeLabelLengths[i] = ~edgeLabels[i].length;
      } else {
        // Use assumption that label is already serialized,
        // hence must be Uint8Array here.
        edgeLabelsPacked.set(edgeLabel, offset);
        edgeLabelLengths[i] = edgeLabels[i].length;
      }
      offset += edgeLabel.length;
    }
    return { edgeLabelsPacked, edgeLabelLengths };
  }

  private deserializeEdgeLabels(decoded: {
    edgeLabelsPacked: Uint8Array;
    edgeLabelLengths: number[];
  }): (Uint8Array | string)[] {
    const edgeLabels = new Array<Uint8Array | string>(
      decoded.edgeLabelLengths.length
    );
    let offset = 0;
    for (let i = 0; i < decoded.edgeLabelLengths.length; i++) {
      const signedLength = decoded.edgeLabelLengths[i];
      if (signedLength < 0) {
        // string, actual length is ~signedLengthI.
        const length = ~signedLength;
        edgeLabels[i] = util.utf8.read(
          decoded.edgeLabelsPacked,
          offset,
          offset + length
        );
        offset += length;
      } else {
        // Uint8Array, actual length is signedLengthI.
        edgeLabels[i] = new Uint8Array(
          decoded.edgeLabelsPacked.buffer,
          offset + decoded.edgeLabelsPacked.byteOffset,
          signedLength
        );
        offset += signedLength;
      }
    }
    return edgeLabels;
  }
}

/**
 * Serializer for a [[SavedStateTree]] or null, i.e., an output of [[Collab.save]].
 *
 * [[IRuntime]] implementations may use [[SavedStateTreeSerializer.instance]]
 * to convert Collabs's saved states into a single Uint8Array.
 */
export class SavedStateTreeSerializer
  implements Serializer<SavedStateTree | null>
{
  private constructor() {
    // Singleton.
  }

  static instance = new this();

  serialize(value: SavedStateTree | null): Uint8Array {
    const message = this.toMessage(value);
    return SavedStateTreeMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): SavedStateTree | null {
    const decoded = SavedStateTreeMessage.decode(message);
    return this.fromMessage(decoded);
  }

  private toMessage(tree: SavedStateTree | null): ISavedStateTreeMessage {
    if (tree === null) return { isNull: true };
    if (tree.children === undefined) return { self: tree.self };

    const childrenKeys = new Array<string>(tree.children.size);
    const childrenValues = new Array<ISavedStateTreeMessage>(
      tree.children.size
    );
    let i = 0;
    for (const [key, value] of tree.children) {
      childrenKeys[i] = key;
      childrenValues[i] = this.toMessage(value);
      i++;
    }

    return { self: tree.self, childrenKeys, childrenValues };
  }

  private fromMessage(message: SavedStateTreeMessage): SavedStateTree | null {
    if (message.isNull) return null;

    const children = new Map<string, SavedStateTree | null>();
    for (let i = 0; i < message.childrenKeys.length; i++) {
      children.set(
        message.childrenKeys[i],
        // From the generated protobuf, this is actually a SavedStateTreeMessage,
        // not just an ISavedStateTreeMessage.
        this.fromMessage(message.childrenValues[i] as SavedStateTreeMessage)
      );
    }
    return { self: message.self, children };
  }
}
