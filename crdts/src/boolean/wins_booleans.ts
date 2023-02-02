import { InitToken, Serializer } from "@collabs/core";
import { AggregateCVar } from "../variable";

class BooleanSerializer implements Serializer<boolean> {
  private static readonly TRUE = new Uint8Array();
  private static readonly FALSE = new Uint8Array(1);

  private constructor() {
    // Not constructable.
  }

  serialize(value: boolean): Uint8Array {
    return value ? BooleanSerializer.TRUE : BooleanSerializer.FALSE;
  }
  deserialize(message: Uint8Array): boolean {
    return message.length === 0;
  }

  static readonly INSTANCE = new BooleanSerializer();
}

export class TrueWinsCBoolean extends AggregateCVar<boolean> {
  constructor(init: InitToken) {
    super(
      init,
      // True if there are any "true" values.
      (items) => items.find((item) => item.value) !== undefined,
      false,
      BooleanSerializer.INSTANCE
    );
  }
}

export class FalseWinsCBoolean extends AggregateCVar<boolean> {
  constructor(init: InitToken) {
    super(
      init,
      // False if there are any "false" values.
      (items) => items.find((item) => !item.value) === undefined,
      false,
      BooleanSerializer.INSTANCE
    );
  }
}
