import { ISet } from "@collabs/core";
import { assert } from "chai";
import { EventView } from "../event_view";

export class ISetView<T> extends EventView<ISet<T, any>> {
  readonly view = new Set<T>();

  constructor(collab: ISet<T, any>, autoCheck: boolean) {
    super(collab, autoCheck);

    collab.on(
      "Add",
      this.wrap((e) => {
        assert.isFalse(this.view.has(e.value));
        this.view.add(e.value);
      })
    );

    collab.on(
      "Delete",
      this.wrap((e) => {
        assert(this.view.has(e.value));
        this.view.delete(e.value);
      })
    );
  }

  checkInstance(): void {
    assert.deepStrictEqual(this.view, new Set(this.collab));
  }
}
