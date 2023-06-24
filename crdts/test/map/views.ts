import { IMap } from "@collabs/core";
import { assert } from "chai";
import { EventView } from "../event_view";

export class IMapView<K, V> extends EventView<IMap<K, V, any>> {
  readonly view = new Map<K, V>();

  constructor(collab: IMap<K, V, any>, autoCheck: boolean) {
    super(collab, autoCheck);

    collab.on(
      "Set",
      this.wrap((e) => {
        if (e.previousValue.isPresent) {
          assert.strictEqual(e.previousValue.get(), this.view.get(e.key));
        } else {
          assert.isFalse(this.view.has(e.key));
        }
        this.view.set(e.key, e.value);
      })
    );

    collab.on(
      "Delete",
      this.wrap((e) => {
        assert.strictEqual(e.value, this.view.get(e.key));
        this.view.delete(e.key);
      })
    );
  }

  checkInstance(): void {
    assert.deepStrictEqual(this.view, new Map(this.collab.entries()));
  }
}
