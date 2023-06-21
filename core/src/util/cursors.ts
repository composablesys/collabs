import { Position } from "../data_types";

/**
 * A cursor in a collaborative list or text string.
 *
 * A `Cursor` points to a particular spot in a list, in between
 * two list elements (or text characters).
 * You can use `Cursor`s as ordinary cursors or selection endpoints.
 *
 * Use the [[Cursors]] class to convert between indices and `Cursor`s.
 *
 * Internally, a cursor is represented as a string.
 * Specifically, it is the [[Position]] of the list element
 * to its left, or "START" if it is at the beginning
 * of the list. If that position is later deleted, the cursor stays the
 * same, but its index shifts to the next element on its left.
 */
export type Cursor = Position | "START";

/**
 * Interface for a list that supports [[Cursor]]s.
 *
 * All of Collabs' built-in list and text types implement this interface.
 */
export interface ICursorList {
  /**
   * Returns the position currently at index.
   */
  getPosition(index: number): Position;

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list,
   * then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the right of position,
   * returns the length of the list.
   *
   * To find the index where a position would be if
   * present, use `searchDir = "right"`.
   */
  indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right"
  ): number;
}

/**
 * Utilities for working with [[Cursor]]s.
 */
export class Cursors {
  private constructor() {
    // Not instantiable.
  }

  /**
   * Returns the [[Cursor]] at `index` within the given list.
   * Invert with [[toIndex]].
   *
   * That is, the cursor is between the list elements at `index - 1` and `index`.
   *
   * @param list The target list.
   */
  static fromIndex(index: number, list: ICursorList): Cursor {
    return index === 0 ? "START" : list.getPosition(index - 1);
  }

  /**
   * Returns the current index of `cursor` within the given list. Inverse of [[fromIndex]].
   *
   * That is, the cursor is between the list elements at `index - 1` and `index`.
   *
   * @param cursor The [[Cursor]].
   * @param list The target list.
   */
  static toIndex(cursor: Cursor, list: ICursorList): number {
    return cursor === "START" ? 0 : list.indexOfPosition(cursor, "left") + 1;
  }
}
