import { Collab } from "@collabs/core";
import { assert } from "chai";

/**
 * A local view of a Collab that is maintained by listening to
 * the Collab's events.
 *
 * Implement this abstract class for each Collab type. Register
 * event handlers in your constructor. Those handlers should also
 * assert correctness properties for their events before updating
 * the view. Note that errors
 * from those assertions will just be printed (since they are in
 * event handlers), but should still fail the test, since the view
 * won't be updated properly.
 *
 * To test a Collab's events, construct an EventView of the
 * appropriate type when you construct the Collab. Then,
 * occasionally check that the view is accurate by calling
 * EventView.check(collab).
 */
export abstract class EventView<C extends Collab> {
  private static views = new WeakMap<Collab, EventView<any>>();

  /**
   * Asserts that the collab's EventView is currently correct, i.e.,
   * it has an equivalent state.
   *
   * You must have constructed an EventView with `collab` as its
   * constructor parameter, before performing any operations on the Collab.
   */
  static check(collab: Collab): void {
    const view = this.views.get(collab)!;
    assert.isDefined(view, "Test error: No EventView constructed for collab");
    view.checkInstance();
  }

  /**
   *
   * @param collab
   * @param autoCheck If true, automatically check the view after
   * every event.
   */
  constructor(readonly collab: C, autoCheck: boolean) {
    EventView.views.set(collab, this);
    if (autoCheck) {
      // TODO: errors here print, but don't fail the test.
      collab.on("Any", () => this.checkInstance());
    }
  }

  /**
   * Assert that your view is currently correct, i.e.,
   * it has an equivalent state to this.collab.
   */
  abstract checkInstance(): void;
}
