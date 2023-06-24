import { assert } from "chai";
import { CCounter } from "../../src";
import { EventView } from "../event_view";

export class CCounterView extends EventView<CCounter> {
  public view: number;

  constructor(collab: CCounter, autoCheck: boolean) {
    super(collab, autoCheck);

    // Initial value
    this.view = collab.value;

    collab.on(
      "Add",
      this.wrap((e) => {
        assert.strictEqual(e.added, e.value - this.view);
        this.view = e.value;
      })
    );
  }

  checkInstance(): void {
    assert.strictEqual(this.view, this.collab.value);
  }
}
