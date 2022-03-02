import Automerge from "automerge";
import { Implementation } from "../../../implementation";
import { AutomergeReplica } from "../../../libraries";
import { randomChar } from "../../../util";
import { MicroReplica } from "../benchmark";
import { WeightedChoiceSource } from "./weighted_choice_source";

// Making this a function that returns a class, instead of
// a normal superclass, to avoid boilerplate.

/**
 * Change doc mutably (as in Automerge.change),
 * unlike other replicas.
 */
function AutomergeMicro(
  initialState: any,
  ops: {
    [opName: string]: [
      (doc: any, rng: seedrandom.prng, opNum: number) => void,
      number
    ];
  },
  getState: (doc: any) => any
): Implementation<MicroReplica> {
  const weightedOpsSource = new WeightedChoiceSource(ops);

  return class extends AutomergeReplica<any> implements MicroReplica {
    doOp(rng: seedrandom.prng, opNum: number): void {
      this.transact(() => {
        this.doc = Automerge.change(this.doc, (d) => {
          weightedOpsSource.getWeightedChoice(rng)(d, rng, opNum);
        });
      });
    }

    getState(): any {
      return getState(this.doc);
    }

    skipLoad() {
      this.doc = Automerge.from(initialState);
    }
  };
}

export const AutomergeLwwRegister = AutomergeMicro(
  { v: 0 },
  { Set: [(doc, rng) => (doc.v = rng()), 1] },
  (doc) => doc.v
);

export const AutomergeLwwMap = AutomergeMicro(
  {},
  {
    Toggle: [
      (doc, rng) => {
        const key = Math.floor(rng() * 100);
        if (doc[key]) delete doc[key];
        else doc[key] = 0;
      },
      0.5,
    ],
    ValueOp: [
      (doc, rng) => {
        const key = Math.floor(rng() * 100);
        doc[key] = Math.floor(rng() * 100 - 50);
      },
      0.5,
    ],
  },
  (doc) => new Map(Object.entries(doc))
);

export const AutomergeLwwMapRolling = AutomergeMicro(
  {},
  {
    Roll: [
      (doc, rng, opNum) => {
        if (opNum >= 100) delete doc[opNum - 100];
        doc[opNum] = Math.floor(rng() * 100 - 50);
      },
      1.0,
    ],
  },
  (doc) => new Map(Object.entries(doc))
);

export const AutomergeTextLtr = AutomergeMicro(
  { v: new Automerge.Text() },
  {
    Op: [
      (doc, rng) => {
        const text = doc.v as Automerge.Text;
        if (text.length > 100) text.deleteAt!(Math.floor(rng() * 100));
        else text.insertAt!(text.length, randomChar(rng));
      },
      1.0,
    ],
  },
  (doc) => doc.v.toString()
);

export const AutomergeTextRandom = AutomergeMicro(
  { v: new Automerge.Text() },
  {
    Op: [
      (doc, rng) => {
        let text = doc.v as Automerge.Text;
        if (text.length > 100) text.deleteAt!(Math.floor(rng() * 100));
        else
          text.insertAt!(
            Math.floor(rng() * (text.length + 1)),
            randomChar(rng)
          );
      },
      1.0,
    ],
  },
  (doc) => doc.v.toString()
);
