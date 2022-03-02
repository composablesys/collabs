import * as Y from "yjs";
import { Implementation } from "../../../implementation";
import { YjsReplica } from "../../../libraries";
import { randomChar } from "../../../util";
import { MicroReplica } from "../benchmark";
import { WeightedChoiceSource } from "./weighted_choice_source";

// Making this a function that returns a class, instead of
// a normal superclass, to avoid boilerplate.
function YjsMicro(
  ops: {
    [opName: string]: [
      (doc: Y.Doc, rng: seedrandom.prng, opNum: number) => void,
      number
    ];
  },
  getState: (doc: Y.Doc) => any
): Implementation<MicroReplica> {
  const weightedOpsSource = new WeightedChoiceSource(ops);

  return class extends YjsReplica implements MicroReplica {
    doOp(rng: seedrandom.prng, opNum: number): void {
      this.transact(() => {
        weightedOpsSource.getWeightedChoice(rng)(this.doc, rng, opNum);
      });
    }

    getState(): any {
      return getState(this.doc);
    }
  };
}

// TODO: store map/etc. separately, like in CollabsMicro?

export const YjsLwwRegister = YjsMicro(
  { Set: [(doc, rng) => doc.getMap().set("", rng()), 1] },
  (doc) => doc.getMap().get("")
);

export const YjsLwwMap = YjsMicro(
  {
    Toggle: [
      (doc, rng) => {
        const key = Math.floor(rng() * 100);
        const map = doc.getMap();
        if (map.has(key + "")) map.delete(key + "");
        else map.set(key + "", 0);
      },
      0.5,
    ],
    ValueOp: [
      (doc, rng) => {
        const key = Math.floor(rng() * 100);
        const map = doc.getMap();
        map.set(key + "", Math.floor(rng() * 100 - 50));
      },
      0.5,
    ],
  },
  (doc) => new Map(doc.getMap().entries())
);

export const YjsLwwMapRolling = YjsMicro(
  {
    Roll: [
      (doc, rng, opNum) => {
        const map = doc.getMap();
        if (opNum >= 100) map.delete(opNum - 100 + "");
        map.set(opNum + "", Math.floor(rng() * 100 - 50));
      },
      1.0,
    ],
  },
  (doc) => new Map(doc.getMap().entries())
);

export const YjsTextLtr = YjsMicro(
  {
    Op: [
      (doc, rng) => {
        const text = doc.getText();
        if (text.length > 100) text.delete(Math.floor(rng() * 100), 1);
        else text.insert(text.length, randomChar(rng));
      },
      1.0,
    ],
  },
  (doc) => doc.getText().toString()
);

export const YjsTextRandom = YjsMicro(
  {
    Op: [
      (doc, rng) => {
        const text = doc.getText();
        if (text.length > 100) text.delete(Math.floor(rng() * 100), 1);
        else
          text.insert(Math.floor(rng() * (text.length + 1)), randomChar(rng));
      },
      1.0,
    ],
  },
  (doc) => doc.getText().toString()
);
