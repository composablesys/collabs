import { IVar } from "@collabs/core";
import { assert } from "chai";
import { EventView } from "../event_view";

export class IVarView<T> extends EventView<IVar<T, any>> {
  public view: T;

  constructor(collab: IVar<T, any>, autoCheck: boolean) {
    super(collab, autoCheck);

    // Initial value
    this.view = collab.value;

    collab.on(
      "Set",
      this.wrap((e) => {
        assert.strictEqual(e.previousValue, this.view);
        this.view = e.value;
      })
    );
  }

  checkInstance(): void {
    assert.strictEqual(this.view, this.collab.value);
  }
}
