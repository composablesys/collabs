import { LocatableCList } from "../data_types";
import {
  Optional,
  OptionalSerializer,
  Serializer,
  TextSerializer,
} from "../util";

/**
 * The location of a cursor.
 *
 * Analogous to [[CList]] locations, except for cursors
 * (which go between values) instead of values.
 */
export type CursorLocation = Optional<string>;

export const CursorLocationSerializer = {
  instance: <Serializer<CursorLocation>>(
    OptionalSerializer.getInstance(TextSerializer.instance)
  ),
} as const;

/**
 * Common functionality for [[LocalCursor]] and [[CCursor]].
 *
 * A cursor at index i means that it is located just to the left
 * of the list item at index i.
 */
export class CursorCommon {
  /**
   * @param list    The underlying list.
   * @param binding Whether the cursor should stick to the
   * list item to its left or its right, in the face of
   * insertions at the cursor's current index.
   */
  constructor(
    readonly list: LocatableCList<unknown, unknown[]>,
    readonly binding: "left" | "right" = "left"
  ) {}

  /**
   * Convert the given index to a cursor location.
   */
  indexToCursorLocation(index: number): CursorLocation {
    if (this.binding === "left") {
      if (index === 0) return Optional.empty();
      else {
        return Optional.of(this.list.getLocation(index - 1));
      }
    } else {
      if (index === this.list.length) return Optional.empty();
      else return Optional.of(this.list.getLocation(index));
    }
  }

  /**
   * Convert the given cursor location to its current index.
   */
  cursorLocationToIndex(location: CursorLocation): number {
    if (this.binding === "left") {
      if (!location.isPresent) return 0;
      else {
        return this.list.findLocation(location.get()).gtIndex;
      }
    } else {
      if (!location.isPresent) return this.list.length;
      else {
        return this.list.findLocation(location.get()).geIndex;
      }
    }
  }
}

// Feature: events for local cursor? (Only if have use case.)

/**
 * A local (not collaborative) cursor in a list.
 *
 * `LocalCursor` is mainly intended to track where the
 * local user's cursor is in a collaborative text
 * editor.
 *
 * A cursor exists at a "cursor location" between two list items,
 * and it moves around as those items move around due to
 * earlier insertions and deletions. At any moment,
 * the cursor's current location is given by [[index]].
 *
 * [[index]] indicates the index of the list item immediately
 * to cursor's right. E.g., in the list abc, using | to
 * mark the cursor:
 *
 * - |abc -> index 0
 * - a|bc -> index 1
 * - abc| -> index 3 (the length of the list)
 *
 * A cursor has a "binding" of `"left"` or `"right"`. This
 * indicates which list item the cursor sticks to when
 * list items are inserted at the cursor's current index.
 * For example, in a|bc, if "d" is inserted at the cursor
 * (between "a" "b"), then the result is:
 * - With left binding: a|dbc
 * - With right binding: ad|bc
 * Note that this holds regardless of whether or not the local
 * user inserted "d". So, if you want the cursor to move in
 * response to local user insertions (e.g., to the right of
 * a just-typed character), you must set [[index]] manually.
 *
 * For a collaborative version (replicated across all replicas),
 * see [[CCursor]].
 */
export class LocalCursor {
  private readonly common: CursorCommon;
  private location!: CursorLocation;

  /**
   * @param list    The underlying list.
   * @param startIndex The cursor's initial index.
   * @param binding Whether the cursor should bind to the
   * list item to its left or its right, in the face of
   * insertions at the cursor's current index.
   */
  constructor(
    list: LocatableCList<unknown, unknown[]>,
    startIndex: number,
    binding: "left" | "right" = "left"
  ) {
    this.common = new CursorCommon(list, binding);
    this.index = startIndex;
  }

  set index(index: number) {
    this.location = this.common.indexToCursorLocation(index);
  }

  get index(): number {
    return this.common.cursorLocationToIndex(this.location);
  }
}

// Feature: make binding mutable like the index?
// (Only if have use case.)
