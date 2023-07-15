import { InitToken, Serializer } from "@collabs/core";
import { Aggregator } from "../map";
import { CVar } from "../var";

const trueBytes = new Uint8Array();
const falseBytes = new Uint8Array(1);

const BooleanSerializer: Serializer<boolean> = {
  serialize(value) {
    return value ? trueBytes : falseBytes;
  },

  deserialize(message) {
    return message.length === 0;
  },
} as const;

const TrueWinsAggregator: Aggregator<boolean> = {
  aggregate(items) {
    // True if there are any true values.
    return items.find((item) => item.value) !== undefined;
  },
} as const;

const FalseWinsAggregator: Aggregator<boolean> = {
  aggregate(items) {
    // False if there are any false values.
    return items.find((item) => !item.value) === undefined;
  },
} as const;

/**
 * A collaborative `boolean` value.
 *
 * Set and get the value with [[value]]. If multiple
 * users set the value to `true` and `false` concurrently,
 * then the value is given by the constructor's `winner` option
 * (default: `true`).
 *
 * See also: [[CVar]]`<boolean>`.
 */
export class CBoolean extends CVar<boolean> {
  /**
   * Constructs a CBoolean.
   *
   * @param options.winner The winner among concurrent sets.
   * Default: `true`.
   * @param options.initialValue The initial value, used before any
   * value is set or just after [[clear]] is called. Default: `false`.
   */
  constructor(
    init: InitToken,
    options: { winner?: boolean; initialValue?: boolean } = {}
  ) {
    const winner = options.winner ?? true;
    const initialValue = options.initialValue ?? false;
    super(init, initialValue, {
      valueSerializer: BooleanSerializer,
      aggregator: winner ? TrueWinsAggregator : FalseWinsAggregator,
    });
  }
}
