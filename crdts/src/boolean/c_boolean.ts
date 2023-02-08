import { InitToken, Serializer } from "@collabs/core";
import { MultiValueMapItem } from "../map";
import { AggregateCVar } from "../var";

class BooleanSerializer implements Serializer<boolean> {
  private static readonly TRUE = new Uint8Array();
  private static readonly FALSE = new Uint8Array(1);

  private constructor() {
    // Not constructable.
  }

  static readonly instance = new BooleanSerializer();

  serialize(value: boolean): Uint8Array {
    return value ? BooleanSerializer.TRUE : BooleanSerializer.FALSE;
  }

  deserialize(message: Uint8Array): boolean {
    return message.length === 0;
  }
}

function aggregate(
  items: MultiValueMapItem<boolean>[],
  winner: boolean,
  initialValue: boolean
) {
  if (items.length === 0) return initialValue;
  if (winner) {
    // True if there are any true values.
    return items.find((item) => item.value) !== undefined;
  } else {
    // False if there are any false values.
    return items.find((item) => !item.value) === undefined;
  }
}

// TODO: Document relation to EWFlag/DWFlag.
export class CBoolean extends AggregateCVar<boolean> {
  constructor(init: InitToken, { winner = true, initialValue = false } = {}) {
    super(
      init,
      // OPT: avoid making a closure each time.
      (items) => aggregate(items, winner, initialValue),
      false,
      BooleanSerializer.instance
    );
  }
}
