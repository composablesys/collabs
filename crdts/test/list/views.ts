import { Collab, IList, Position } from "@collabs/core";
import { assert } from "chai";
import { CList, CRichText } from "../../src";
import { EventView } from "../event_view";

export class IListView<
  T,
  L extends IList<T, any> = IList<T, any>
> extends EventView<L> {
  readonly view: [position: Position, value: T][] = [];

  constructor(collab: L, autoCheck: boolean) {
    super(collab, autoCheck);

    collab.on(
      "Insert",
      this.wrap((e) => {
        assert.notStrictEqual(e.index, -1);
        assert.isAbove(e.positions.length, 0);
        assert.strictEqual(e.positions.length, e.values.length);
        const elements: [position: Position, value: T][] = [];
        for (let i = 0; i < e.values.length; i++) {
          assert(collab.hasPosition(e.positions[i]));
          elements.push([e.positions[i], e.values[i]]);
        }
        this.view.splice(e.index, 0, ...elements);
      })
    );

    collab.on(
      "Delete",
      this.wrap((e) => {
        assert.notStrictEqual(e.index, -1);
        assert.isAbove(e.positions.length, 0);
        // Check that the deleted values/positions are accurate.
        assert.strictEqual(e.positions.length, e.values.length);
        for (let i = 0; i < e.values.length; i++) {
          const [position, value] = this.view[e.index + i];
          assert.strictEqual(e.values[i], value);
          assert.strictEqual(e.positions[i], position);
          assert.isFalse(collab.hasPosition(e.positions[i]));
        }
        this.view.splice(e.index, e.values.length);
      })
    );
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
    collab.on(
      "Move",
      this.wrap((e) => {
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
      })
    );

    // We don't check the archive/restore fields on Insert/Delete events,
    // since we don't know the proper values.
  }
}

export class CRichTextView<F extends Record<string, any>> extends EventView<
  CRichText<F>
> {
  readonly view: [position: Position, value: string, format: Partial<F>][] = [];

  constructor(collab: CRichText<F>, autoCheck: boolean) {
    // Since Format events are "behind" (not sent until a new span
    // is fully applied, even if that causes multiple events),
    // we need to wait until the end of the transaction before checking
    // our view.
    super(collab, autoCheck, true);

    collab.on(
      "Insert",
      this.wrap((e) => {
        assert.notStrictEqual(e.index, -1);
        assert.isAbove(e.positions.length, 0);
        assert.strictEqual(e.positions.length, e.values.length);
        const elements: [
          position: Position,
          value: string,
          format: Partial<F>
        ][] = [];
        for (let i = 0; i < e.values.length; i++) {
          assert(collab.hasPosition(e.positions[i]));
          // Make a copy of format, so we can mutate it per-character later.
          elements.push([e.positions[i], e.values[i], { ...e.format }]);
        }
        this.view.splice(e.index, 0, ...elements);
      })
    );

    collab.on(
      "Delete",
      this.wrap((e) => {
        assert.notStrictEqual(e.index, -1);
        assert.isAbove(e.positions.length, 0);
        // Check that the deleted values/positions are accurate.
        assert.strictEqual(e.positions.length, e.values.length);
        for (let i = 0; i < e.values.length; i++) {
          const [position, value] = this.view[e.index + i];
          assert.strictEqual(e.values[i], value);
          assert.strictEqual(e.positions[i], position);
          assert.isFalse(collab.hasPosition(e.positions[i]));
          // TODO: if we add format to the event, check it here.
        }
        this.view.splice(e.index, e.values.length);
      })
    );

    collab.on(
      "Format",
      this.wrap((e) => {
        assert.notStrictEqual(e.startIndex, -1);
        assert.notStrictEqual(e.endIndex, -1);
        assert(e.startIndex < e.endIndex);
        for (let i = e.startIndex; i < e.endIndex; i++) {
          const format = this.view[i][2];
          // Check that previousValue is accurate.
          assert.strictEqual(e.previousValue, format[e.key]);
          // Update the view.
          if (e.value === undefined) delete format[e.key];
          else format[e.key] = e.value;
          // Check that the whole format is accurate.
          assert.deepStrictEqual(e.format, format);
        }
      })
    );
  }

  checkInstance(): void {
    assert.deepStrictEqual(
      this.view.map(([position, value, format], index) => [
        index,
        position,
        value,
        format,
      ]),
      [...this.collab.entries()]
    );
  }
}
