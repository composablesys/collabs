import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  Serializer,
  StringSerializer,
} from "@collabs/core";
import { CValueList } from "./c_value_list";

const charArraySerializer: Serializer<string[]> = {
  serialize(value) {
    return StringSerializer.instance.serialize(value.join(""));
  },

  deserialize(message) {
    return [...StringSerializer.instance.deserialize(message)];
  },
} as const;

export interface TextEvent extends CollabEvent {
  startIndex: number;
  count: number;
  values: string;
}

export interface TextEventsRecord extends CollabEventsRecord {
  Insert: TextEvent;
  Delete: TextEvent;
}

/**
 * A collaborative text string.
 *
 * Positions are as in [[IList]].
 *
 * See also: [[CValueList]].
 */
export class CText extends CObject<TextEventsRecord> {
  // Internally, CText uses a CValueList containing its list of Unicode code
  // points. CText just wraps the API so that e.g. passing a multi-char
  // string to insert does a bulk character insert, instead of accidentally
  // inserting the whole string as a single list value.

  private readonly list: CValueList<string>;

  constructor(init: InitToken) {
    super(init);

    this.list = super.addChild(
      "",
      (init) =>
        new CValueList(init, {
          valueSerializer: StringSerializer.instance,
          valueArraySerializer: charArraySerializer,
        })
    );
  }

  /**
   * Insert the given substring starting at index.
   *
   * Existing characters at `>= index` are shifted `values.length`
   * spots to the right.
   *
   * @param index   [description]
   * @param values  [description]
   */
  insert(index: number, values: string): void {
    this.list.insert(index, ...values);
  }

  /**
   * Delete count characters starting at startIndex, i.e., characters
   * [startIndex, startIndex + count - 1).
   *
   * Characters at `>= startIndex + count` are shifted count spots to the
   * left.
   *
   * @param startIndex  [description]
   * @param count=1     [description]
   */
  delete(startIndex: number, count = 1): void {
    this.list.delete(startIndex, count);
  }

  clear(): void {
    this.list.clear();
  }

  charAt(index: number): string {
    return this.list.get(index);
  }

  values(): IterableIterator<string> {
    return this.list.values();
  }

  [Symbol.iterator]() {
    return this.values();
  }

  entries(): IterableIterator<[index: number, position: string, char: string]> {
    return this.list.entries();
  }

  get length(): number {
    return this.list.length;
  }

  /**
   * @return the text as an ordinary string
   */
  toString(): string {
    return this.list.slice().join("");
  }

  // Convenience accessors.

  at(index: number): string | undefined {
    if (index < 0) index += this.length;
    if (index < 0 || index >= this.length) return undefined;
    return this.list.get(index);
  }

  // slice() is the most reasonable out of {slice, substring, substr}.

  slice(start?: number, end?: number): string {
    return this.list.slice(start, end).join("");
  }

  // Positions.

  /**
   * @return The position currently at index.
   */
  getPosition(index: number): string {
    return this.list.getPosition(index);
  }

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list
   * ([[hasPosition]] returns false), then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the left of position,
   * returns [[length]].
   */
  indexOfPosition(
    position: string,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    return this.list.indexOfPosition(position, searchDir);
  }

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: string): boolean {
    return this.list.hasPosition(position);
  }

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: string): string | undefined {
    return this.list.getByPosition(position);
  }
}
