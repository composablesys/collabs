import { CursorMessage } from "../../generated/proto_compiled";
import { Serializer } from "../util";

// TODO: revise

/**
 * A list with a concept of "positions" that are tied to particular values,
 * moving with them.
 *
 * For example, in text editing, you can use positions to represent
 * where specific characters are located. If a character changes index
 * due to insertions or deletions in front of it, then its position changes
 * index as well.
 *
 * By "list", we mean any sequential data structure, not necessarily a
 * [[IList]] (e.g., [[CText]]).
 */
export interface PositionedList {
  /**
   * @return The position currently at index.
   */
  getPosition(index: number): string;

  /**
   * @return [The index where the position would be if it were present
   * (equivalently, the first index greater than or equal to it),
   * whether it is currently present].
   */
  findPosition(position: string): [geIndex: number, isPresent: boolean];

  /**
   * The length of the list.
   */
  readonly length: number;
}

/**
 * A cursor in a [[PositionedList]], pointing to a place in between values.
 *
 * For example, in text editing, you can use a Cursor to represent where a
 * user's GUI cursor (text insertion point) is. The Cursor's index then
 * gives the index of the character that should be directly after the
 * GUI cursor, updating in the intuitive way in response to
 * text changes.
 *
 * Cursors are immutable, but [[index]] changes as the underlying list
 * changes.
 *
 * [[fromIndex]] lets you get a Cursor given a starting index.
 * [[CursorSerializer]] is a [[Serializer]] for cursors.
 *
 * Internally, a Cursor is represented as a
 * [[PositionedList]] position plus a "binding"; the cursor then moves
 * so that the position is on its binding side, with no intervening values.
 */
export class Cursor {
  constructor(
    readonly list: PositionedList,
    readonly position: string | null,
    readonly binding: "left" | "right" = "left"
  ) {}

  /**
   * [fromIndex description]
   * @param  list    [description]
   * @param  index   [description]
   * @param  binding [description] Default: "left"
   * @return A cursor for the given list and binding starting at the given
   * index.
   */
  static fromIndex(
    list: PositionedList,
    index: number,
    binding: "left" | "right" = "left"
  ): Cursor {
    let position: string | null;
    if (binding === "left") {
      if (index === 0) position = null;
      else position = list.getPosition(index - 1);
    } else {
      if (index === list.length) position = null;
      else position = list.getPosition(index);
    }
    return new Cursor(list, position, binding);
  }

  get index(): number {
    if (this.binding === "left") {
      if (this.position === null) return 0;
      else {
        const [geIndex, isPresent] = this.list.findPosition(this.position);
        return isPresent ? geIndex + 1 : geIndex;
      }
    } else {
      if (this.position === null) return this.list.length;
      else {
        return this.list.findPosition(this.position)[0];
      }
    }
  }
}

// TODO: add to DefaultSerializer? Change Cursor into a JSON-able object or string?
// Cf. Yjs's relative/absolute positions.

/**
 * A [[Serializer]] for cursors from a given list.
 */
export class CursorSerializer implements Serializer<Cursor> {
  constructor(private readonly list: PositionedList) {}

  /**
   * [serialize description]
   * @param  value [description]
   * @return       [description]
   * @throws if value.list !== this.list
   */
  serialize(value: Cursor): Uint8Array {
    if (value.list !== this.list) {
      throw new Error("value.list !== this.list");
    }
    const message = CursorMessage.create({
      position: value.position,
      bindingIsLeft: value.binding === "left",
    });
    return CursorMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): Cursor {
    const decoded = CursorMessage.decode(message);
    const position = Object.prototype.hasOwnProperty.call(decoded, "position")
      ? decoded.position
      : null;
    return new Cursor(
      this.list,
      position,
      decoded.bindingIsLeft ? "left" : "right"
    );
  }
}
