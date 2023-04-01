import { Collab, IList, Position } from "@collabs/core";
import { assert } from "chai";
import { CList } from "../../src";
import { EventView } from "../event_view";

export class IListView<
  T,
  L extends IList<T, any> = IList<T, any>
> extends EventView<L> {
  readonly view: [position: Position, value: T][] = [];

  constructor(collab: L, autoCheck: boolean) {
    super(collab, autoCheck);

    collab.on("Insert", (e) => {
      assert.strictEqual(e.positions.length, e.values.length);
      const elements: [position: Position, value: T][] = [];
      for (let i = 0; i < e.values.length; i++) {
        assert(collab.hasPosition(e.positions[i]));
        elements.push([e.positions[i], e.values[i]]);
      }
      this.view.splice(e.index, 0, ...elements);
    });

    collab.on("Delete", (e) => {
      // Check that the deleted values/positions are accurate.
      assert.strictEqual(e.positions.length, e.values.length);
      for (let i = 0; i < e.values.length; i++) {
        assert.strictEqual(e.values[i], this.collab.get(e.index + i));
        assert.strictEqual(
          e.positions[i],
          this.collab.getPosition(e.index + i)
        );
        assert.isFalse(collab.hasPosition(e.positions[i]));
      }
      this.view.splice(e.index, e.values.length);
    });
  }

  checkInstance(): void {
    assert.deepStrictEqual(
      this.view.map(([position, value], index) => [index, position, value]),
      [...this.collab.entries()]
    );
  }
}

export class CListView<C extends Collab> extends IListView<C, CList<C, any>> {
  constructor(collab: CList<C, any>, autoCheck: boolean) {
    super(collab, autoCheck);

    // Also need to listen on Move events.
    collab.on("Move", (e) => {
      assert.strictEqual(e.values.length, e.previousPositions.length);
      for (let i = 0; i < e.values.length; i++) {
        assert.strictEqual(e.values[i], this.view[e.previousIndex + i][1]);
        assert.strictEqual(
          e.previousPositions[i],
          this.view[e.previousIndex + i][0]
        );
      }

      this.view.splice(e.previousIndex, e.values.length);
      assert.strictEqual(e.values.length, e.positions.length);
      const elements: [position: Position, value: C][] = [];
      for (let i = 0; i < e.values.length; i++) {
        elements.push([e.positions[i], e.values[i]]);
      }
      this.view.splice(e.index, 0, ...elements);
    });

    // We don't check the archive/restore fields on Insert/Delete events,
    // since we don't know the proper values.
  }
}
