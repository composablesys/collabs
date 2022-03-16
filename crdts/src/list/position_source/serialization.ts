import { int64AsNumber, Serializer } from "@collabs/core";
import {
  CreatedPositionSerializerMessage,
  PositionSerializerMessage,
} from "../../../generated/proto_compiled";
import { Position } from "./position_source";

export class PositionSerializer implements Serializer<Position> {
  private constructor() {
    // Private constructor, use instance instead.
  }

  static instance = new PositionSerializer();

  serialize(value: Position): Uint8Array {
    const message = PositionSerializerMessage.create({
      sender: value[0],
      counter: value[1],
      valueIndex: value[2],
    });
    return PositionSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): Position {
    const decoded = PositionSerializerMessage.decode(message);
    return [decoded.sender, int64AsNumber(decoded.counter), decoded.valueIndex];
  }
}

export class CreatedPositionSerializer
  implements
    Serializer<
      [counter: number, startValueIndex: number, metadata: Uint8Array | null]
    >
{
  private constructor() {
    // Private constructor, use instance instead.
  }

  static instance = new CreatedPositionSerializer();

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
