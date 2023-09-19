import { prng } from "seedrandom";
import { ITextWithCursor } from "../interfaces/text_with_cursor";
import { Trace } from "../replica_benchmark";
import realTextTraceEdits from "./real_text_trace_edits.json";

const { edits, finalText } = realTextTraceEdits as unknown as {
  finalText: string;
  edits: Array<[number, number, string | undefined]>;
};

/**
 * Uses a real text editing trace by Martin Kleppmann
 * (via https://github.com/automerge/automerge-perf).
 */
export class RealTextTrace implements Trace<ITextWithCursor> {
  doOp(replica: ITextWithCursor, _rng: prng, opNum: number): void {
    const edit = edits[opNum];
    const length = replica.length;

    // Infer whether the edit requires a cursor movement.
    let cursorMovement = true;
    if (!replica.needsCursor() && opNum !== 0) {
      const prevEdit = edits[opNum - 1];
      if (prevEdit[2] !== undefined) {
        // Insert.
        if (edit[0] === prevEdit[0] + 1) cursorMovement = false;
      } else {
        // Delete.
        if (edit[0] === prevEdit[0] - 1) cursorMovement = false;
      }
    }
    if (cursorMovement) {
      // For non-sequential traces, need to cap the index to the max
      // at which we can insert/delete.
      // We do so with a modulus instead of a max, to prevent unrealistically
      // moving all users to the end too often.
      const cap = edit[2] !== undefined || length === 0 ? length + 1 : length;
      replica.moveCursor(edit[0] % cap);
    }

    if (edit[2] !== undefined) {
      // Insert edit[2] at edit[0]
      replica.insert(edit[2]);
    } else {
      // Delete character at edit[0]
      if (length === 0) {
        // Nothing to delete;
        // do an insert instead, so we have something to do.
        replica.insert("X");
      } else {
        replica.delete();
      }
    }
  }

  getState(replica: ITextWithCursor) {
    return replica.getText();
  }

  readonly numOps = edits.length;

  readonly correctState = finalText;
}
