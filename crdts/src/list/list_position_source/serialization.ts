import { int64AsNumber, Serializer } from "@collabs/core";
import {
  CreatedPositionSerializerMessage,
  ListPositionSerializerMessage,
} from "../../../generated/proto_compiled";
import { ListPosition } from "./list_position_source";

/**
 * Serializer for [[ListPosition]]. This is slightly more efficient
 * than [[DefaultSerializer]].
 *
 * Unless you are implementing a list CRDT, you will
 * instead use the positions described by [[IList]],
 * which are opaque strings.
 */
export class ListPositionSerializer implements Serializer<ListPosition> {
  private constructor() {
    // Private constructor, use instance instead.
  }

  static instance = new this();

  serialize(value: ListPosition): Uint8Array {
    const message = ListPositionSerializerMessage.create({
      sender: value[0],
      counter: value[1],
      valueIndex: value[2],
    });
    return ListPositionSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): ListPosition {
    const decoded = ListPositionSerializerMessage.decode(message);
    return [decoded.sender, int64AsNumber(decoded.counter), decoded.valueIndex];
  }
}

/**
 * Serializer for the return value of [[ListPositionSource.createPositions]].
 * This is slightly more efficient
 * than [[DefaultSerializer]].
 *
 * Unless you are implementing a list CRDT, you will
 * instead use the positions described by [[IList]],
 * which are opaque strings.
 */
export class CreatePositionsSerializer
  implements
    Serializer<
      [counter: number, startValueIndex: number, metadata: Uint8Array | null]
    >
{
  private constructor() {
    // Private constructor, use instance instead.
  }

  static instance = new this();

  serialize(
    value: [
      counter: number,
      startValueIndex: number,
      metadata: Uint8Array | null
    ]
  ): Uint8Array {
    const message = CreatedPositionSerializerMessage.create({
      counter: value[0],
      startValueIndex: value[1],
      metadata: value[2],
    });
    return CreatedPositionSerializerMessage.encode(message).finish();
  }

  deserialize(
    message: Uint8Array
  ): [counter: number, startValueIndex: number, metadata: Uint8Array | null] {
    const decoded = CreatedPositionSerializerMessage.decode(message);
    const metadata = Object.prototype.hasOwnProperty.call(decoded, "metadata")
      ? decoded.metadata
      : null;
    return [int64AsNumber(decoded.counter), decoded.startValueIndex, metadata];
  }
}
