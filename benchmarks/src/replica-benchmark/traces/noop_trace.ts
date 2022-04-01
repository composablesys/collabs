import { INoop } from "../interfaces/noop";
import { Trace } from "../replica_benchmark";

/**
 * Number of ops to do.
 */
const OPS = 10000;

export class NoopTrace implements Trace<INoop> {
  doOp(replica: INoop): void {
    replica.noop();
  }

  readonly numOps = OPS;

  /**
   * No checking (undefined).
   */
  readonly correctState = undefined;

  getState(): unknown {
    return undefined;
  }
}
