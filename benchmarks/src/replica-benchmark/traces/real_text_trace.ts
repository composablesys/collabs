import { prng } from "seedrandom";
import { IText } from "../interfaces/text";
import { Trace } from "../replica_benchmark";
import { edits, finalText } from "./real_text_trace_edits";

/**
 * Uses a real text editing trace by Martin Kleppmann
 * (via https://github.com/automerge/automerge-perf).
 */
export class RealTextTrace implements Trace<IText> {
  doOp(replica: IText, _rng: prng, opNum: number): void {
    const edit = edits[opNum];
    // For non-sequential traces, need to cap the index at length.
    const length = replica.length;
    if (edit[2] !== undefined) {
      // Insert edit[2] at edit[0]
      replica.insert(Math.min(edit[0], length), edit[2]);
    } else {
      // Delete character at edit[0]
      if (length === 0) {
        // Do an insert instead, so we have something to do.
        replica.insert(0, "X");
      } else {
        replica.delete(Math.min(edit[0], length - 1));
      }
    }
  }

  getState(replica: IText) {
    return replica.getText();
  }

  readonly numOps = edits.length;

  readonly correctState = finalText;
}
