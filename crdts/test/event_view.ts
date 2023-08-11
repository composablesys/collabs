import { Collab } from "@collabs/core";
import { assert } from "chai";
import { CRuntime } from "../src";

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
    view.checkHandlers();
    view.checkInstance();
  }

  /**
   *
   * @param collab
   * @param autoCheck If true, automatically check the view after
   * every event. Note that any resulting errors will not surface until
   * you call EventView.check(collab), which will throw the first error;
   * generally you should call that in an afterEach hook.
   * @param autoCheckTrOnly If true, when autoCheck is true, wait
   * until the end of the transaction before auto-checking.
   */
  constructor(readonly collab: C, autoCheck: boolean, autoCheckTrOnly = false) {
    EventView.views.set(collab, this);
    if (autoCheck) {
      if (autoCheckTrOnly) {
        let checkPending = false;
        collab.on(
          "Any",
          this.wrap(() => {
            if (!checkPending) {
              checkPending = true;
              (collab.runtime as CRuntime).on("Update", () => {
                checkPending = false;
                this.checkInstance();
              });
            }
          })
        );
      } else {
        collab.on("Any", () => this.checkInstance());
      }
    }
  }

  /**
   * Assert that your view is currently correct, i.e.,
   * it has an equivalent state to this.collab.
   */
  abstract checkInstance(): void;

  private error: unknown | null = null;

  /**
   * Wrap all event handlers in this function so that their errors
   * are saved for checkHandlers() instead of being eaten by Collabs.
   */
  protected wrap<E>(handler: (e: E) => void): (e: E) => void {
    return (e) => {
      try {
        handler(e);
      } catch (error) {
        // Only save the first error encountered.
        if (this.error === null) this.error = error;
      }
    };
  }

  checkHandlers() {
    if (this.error !== null) throw this.error;
  }
}
