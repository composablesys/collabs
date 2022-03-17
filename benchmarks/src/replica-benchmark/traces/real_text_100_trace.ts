import { prng } from "seedrandom";
import { IText } from "../interfaces/text";
import { Trace } from "../replica_benchmark";
import { edits } from "./real_text_trace_edits";

/**
 * RealTextTrace 100x in a row (same edits each time).
 */
export class RealText100Trace implements Trace<IText> {
  doOp(replica: IText, _rng: prng, opNum: number): void {
    const realOpNum = opNum % edits.length;
    if (realOpNum === 0 && (opNum / edits.length) % 5 === 0) {
      console.log(`${opNum / edits.length}%`);
    }
    const edit = edits[realOpNum];
    // For non-sequential traces, need to cap the index at length.
    const length = replica.length;
    if (edit[2] !== undefined) {
      // Insert edit[2] at edit[0]
      replica.insert(Math.min(edit[0], length), edit[2]);
    } else {
      // Delete character at edit[0]
      replica.delete(Math.min(edit[0], length - 1));
    }
  }

  getState(replica: IText) {
    return replica.getText();
  }

  readonly numOps = edits.length * 100;

  // We could check the answer, but it would be a bit expensive.
  readonly correctState = undefined;
}
