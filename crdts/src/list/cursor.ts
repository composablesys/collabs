import {
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  Pre,
  CObject,
  CursorCommon,
  CursorLocation,
  CursorLocationSerializer,
  LocatableCList,
  Optional,
} from "@collabs/core";
import { LWWCVariable } from "../variable";

export interface CCursorEvent extends CollabEvent {
  /**
   * The cursor's previous index.
   *
   * If the underlying list doesn't
   * emit an event every time it is changed, this might be
   * inaccurate.
   */
  previousIndex: number;
  /**
   * The reason the cursor moved.
   *
   * - "set": [[CCursor.index]] was set.
   * - "list": the list changed (e.g., an item was inserted
   * or deleted to the left of the cursor).
   */
  reason: "set" | "list";
}

export interface CCursorEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when the cursor's index changes,
   * either because it was set or because the
   * list changed around it. This event is also emitted
   * when the cursor is set to a new cursor location
   * (i.e., bound to a new list item) even if that does
   * not change the cursor's index.
   *
   * If the underlying list doesn't
   * emit an event every time it is changed, this might
   * fail to be emitted after a list change.
   */
  Change: CCursorEvent;
}

/**
 * A collaborative cursor in a list.
 *
 * `CCursor` is mainly intended to track shared presence
 * in a collaborative text editor (showing where each
 * user's cursor is).
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
 * For a local version (not replicated),
 * see [[LocalCursor]].
 */
export class CCursor extends CObject<CCursorEventsRecord> {
  private readonly common: CursorCommon;
  // LWW is overkill since usually only one replica
  // will use this cursor, but it's easiest.
  private readonly location: LWWCVariable<CursorLocation>;
  private previousIndex: number;

  /**
   * @param list    The underlying list.
   * @param startIndex The cursor's initial index.
   * @param binding Whether the cursor should stick to the
   * list item to its left or its right, in the face of
   * insertions at the cursor's current index.
   */
  constructor(
    initToken: InitToken,
    list: LocatableCList<unknown, unknown[]>,
    startIndex: number,
    binding: "left" | "right" = "left"
  ) {
    super(initToken);

    this.common = new CursorCommon(list, binding);
    this.location = this.addChild(
      "",
      Pre(LWWCVariable)(
        Optional.of(list.getLocation(startIndex)),
        CursorLocationSerializer.instance
      )
    );

    // Events.
    this.previousIndex = startIndex;
    this.location.on("Set", (e) => this.childEvent(e, "set"));
    // Note that we listen on "Any", not just "Insert" and
    // "Delete", in case the list has other events that can
    // move cursors (e.g., "Move").
    list.on("Any", (e) => this.childEvent(e, "list"));
  }

  /**
   * Called on child events to maybe emit our own Set event.
   */
  private childEvent(e: CollabEvent, reason: "set" | "list") {
    const newIndex = this.index;
    // Skip emitting if e is a list event that didn't change
    // the cursor index.
    if (reason === "list" && newIndex === this.previousIndex) return;

    this.emit("Change", {
      previousIndex: this.previousIndex,
      reason,
      meta: e.meta,
    });
    this.previousIndex = newIndex;
  }

  set index(index: number) {
    // Only set if changed.  This will help optimize in case
    // the user is setting index each time the user types,
    // even when this cursor's location doesn't change.
    const newLocation = this.common.indexToCursorLocation(index);
    if (
      newLocation.isPresent === this.location.value.isPresent &&
      (!newLocation.isPresent ||
        newLocation.get() === this.location.value.get())
    ) {
      return;
    }

    this.location.set(newLocation);
  }

  get index(): number {
    // We don't use any caching here (e.g. this.previousIndex)
    // in case the list doesn't always emit events.
    return this.common.cursorLocationToIndex(this.location.value);
  }
}

// Feature: make binding mutable like the index?
// (Only if have use case.)

// Feature: generalized CCursor based on general variable?
// Then can move this construction outside of CRDT lib
// and just have a special CRDT class (although we haven't
// been doing that for the other generic constructions).
