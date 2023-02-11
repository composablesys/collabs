import { SavedStateTree } from "../core";
import { Serializer } from "./serializers";

// TODO: combine, so can include "type" bit? Or, keep separate but include
// bit at beginning, & give method to test which?
// To avoid CRuntime's re-encoding the whole thing to add one bit.

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
    // TODO
    throw new Error("Method not implemented.");
  }

  deserialize(message: Uint8Array): (string | Uint8Array)[][] {
    throw new Error("Method not implemented.");
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
    // TODO
    throw new Error("Method not implemented.");
  }

  deserialize(message: Uint8Array): SavedStateTree | null {
    throw new Error("Method not implemented.");
  }
}
