import * as collabs from "@collabs/collabs";
import { Data, Implementation } from "../../../implementation";
import { CollabsReplica } from "../../../libraries";
import { randomChar } from "../../../util";
import { MicroReplica } from "../benchmark";
import { WeightedChoiceSource } from "./weighted_choice_source";

// Making this a function that returns a class, instead of
// a normal superclass, to avoid boilerplate (e.g., super
// constructor args).
function CollabsMicro<C extends collabs.Collab>(
  collabConstructor: collabs.Pre<C>,
  ops: {
    [opName: string]: [
      (collab: C, rng: seedrandom.prng, opNum: number) => void,
      number
    ];
  },
  getState: (collab: C) => any
): Implementation<MicroReplica> {
  const weightedOpsSource = new WeightedChoiceSource(ops);

  return class extends CollabsReplica implements MicroReplica {
    private readonly collab: C;
    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng);

      this.collab = this.app.registerCollab("", collabConstructor);
    }

    doOp(rng: seedrandom.prng, opNum: number): void {
      this.transact(() => {
        weightedOpsSource.getWeightedChoice(rng)(this.collab, rng, opNum);
      });
    }

    getState(): any {
      return getState(this.collab);
    }
  };
}

export const CollabsRegister = CollabsMicro(
  collabs.Pre(collabs.LwwCRegister)<number>(0),
  { Set: [(collab, rng) => (collab.value = rng()), 1] },
  (collab) => collab.value
);

export const CollabsMap = CollabsMicro(
  collabs.Pre(collabs.LwwCMap)<number, number>(),
  {
    Toggle: [
      (collab, rng) => {
        const key = Math.floor(rng() * 100);
        if (collab.has(key)) collab.delete(key);
        else collab.set(key, 0);
      },
      0.5,
    ],
    ValueOp: [
      (collab, rng) => {
        const key = Math.floor(rng() * 100);
        collab.set(key, Math.floor(rng() * 100 - 50));
      },
      0.5,
    ],
  },
  (collab) => new Map(collab.entries())
);

export const CollabsMapRolling = CollabsMicro(
  collabs.Pre(collabs.LwwCMap)<number, number>(),
  {
    Roll: [
      (collab, rng, opNum) => {
        if (opNum >= 100) collab.delete(opNum - 100);
        collab.set(opNum, Math.floor(rng() * 100 - 50));
      },
      1.0,
    ],
  },
  (collab) => new Map(collab.entries())
);

export const CollabsTextLtr = CollabsMicro(
  collabs.Pre(collabs.CText)(),
  {
    Op: [
      (collab, rng) => {
        if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
        else collab.insert(collab.length, randomChar(rng));
      },
      1.0,
    ],
  },
  (collab) => collab.toString()
);

export const CollabsTextRandom = CollabsMicro(
  collabs.Pre(collabs.CText)(),
  {
    Op: [
      (collab, rng) => {
        if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
        else
          collab.insert(
            Math.floor(rng() * (collab.length + 1)),
            randomChar(rng)
          );
      },
      1.0,
    ],
  },
  (collab) => collab.toString()
);

// /**
//  * A trivial Collab that does nothing except send
//  * empty messages.  Used for baseline measurements.
//  */
// class NoopCRDT extends collabs.CPrimitive {
//   noop() {
//     super.sendPrimitive(new Uint8Array());
//   }
//
//   receivePrimitive() {}
//
//   save() {
//     return new Uint8Array();
//   }
//
//   load() {}
//
//   canGC() {
//     return true;
//   }
// }
//
// export const CollabsNoop = CollabsMicro(
//   collabs.Pre(NoopCRDT)(),
//   { Noop: [(collab) => collab.noop(), 1] },
//   () => null
// );
//
// class DeepNoopCRDT extends collabs.CObject {
//   readonly child: collabs.Collab;
//   readonly noop: NoopCRDT;
//   constructor(initToken: collabs.InitToken, index: number) {
//     super(initToken);
//     if (index === 0) {
//       this.child = this.addChild("child " + index, collabs.Pre(NoopCRDT)());
//       this.noop = this.child as NoopCRDT;
//     } else {
//       this.child = this.addChild(
//         "child " + index,
//         collabs.Pre(DeepNoopCRDT)(index - 1)
//       );
//       this.noop = (this.child as DeepNoopCRDT).noop;
//     }
//   }
// }
//
// export const CollabsDeepNoop = CollabsMicro(
//   collabs.Pre(DeepNoopCRDT)(10 - 1),
//   { Noop: [(collab) => collab.noop.noop(), 1] },
//   () => null
// );
//
// // TODO: other extras from before:
// function ICounter(
//   name: string,
//   counter: typeof collabs.CCounter,
//   resetFraction: number
// ) {
//   return new MicroCollabsBenchmark(
//     name,
//     (initToken) => new counter(initToken),
//     {
//       Add: [
//         (collab, rng) => collab.add(Math.floor(rng() * 100 - 50)),
//         1 - resetFraction,
//       ],
//       Reset: [(collab) => collab.reset(), resetFraction],
//     },
//     (collab) => collab.value
//   );
// }
//
// function MultiValueRegister() {
//   return new MicroCollabsBenchmark(
//     "MultiValueRegister",
//     (initToken) => new collabs.LwwCRegister<number>(initToken, 0),
//     { Set: [(collab, rng) => (collab.value = rng()), 1] },
//     (collab) => collab.conflicts()
//   );
// }
//
// function LwwCRegister() {
//   return new MicroCollabsBenchmark(
//     "Register",
//     (initToken) => new collabs.LwwCRegister<number>(initToken, 0),
//     { Set: [(collab, rng) => (collab.value = rng()), 1] },
//     (collab) => collab.value
//   );
// }
//
// function NumberTest() {
//   return new MicroCollabsBenchmark(
//     "Number",
//     (initToken) => new collabs.CNumber(initToken, 1),
//     {
//       Add: [(collab, rng) => collab.add(Math.floor(rng() * 100 - 50)), 0.5],
//       Mult: [(collab, rng) => collab.mult(Math.floor(8 * rng() - 4) / 2), 0.5],
//     },
//     (collab) => collab.value
//   );
// }
//
// function EnableWinsFlag() {
//   return new MicroCollabsBenchmark(
//     "EnableWinsFlag",
//     (initToken) => new collabs.TrueWinsCBoolean(initToken),
//     {
//       Enable: [(collab) => (collab.value = true), 0.5],
//       Disable: [(collab) => (collab.value = false), 0.5],
//     },
//     (collab) => collab.value
//   );
// }
//
// function AddWinsSet() {
//   return new MicroCollabsBenchmark(
//     "AddWinsSet",
//     (initToken) => new collabs.AddWinsCSet<number>(initToken),
//     {
//       Toggle: [
//         (collab, rng) => {
//           let value = Math.floor(rng() * 100);
//           if (collab.has(value)) collab.delete(value);
//           else collab.add(value);
//         },
//         1.0,
//       ],
//     },
//     (collab) => new Set(collab)
//   );
// }
//
// /**
//  * Set is maintained at a rolling size of 100,
//  * but many more elements are added overall.
//  * Useful for memory benchmarking.
//  * Note each op is an add+delete, unlike AddWinsSet().
//  */
// function AddWinsSetRolling() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "AddWinsSetRolling",
//     (initToken) => {
//       i = 0;
//       return new collabs.AddWinsCSet<number>(initToken);
//     },
//     {
//       Roll: [
//         (collab) => {
//           if (i >= 100) collab.delete(i - 100);
//           collab.add(i);
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => {
//       //console.log("AddWinsSetRolling total elements touched: " + i);
//       return new Set(collab);
//     }
//   );
// }
//
// function AddWinsSetRollingGrow() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "AddWinsSetRollingGrow",
//     (initToken) => {
//       i = 0;
//       return new collabs.AddWinsCSet<number>(initToken);
//     },
//     {
//       Roll: [
//         (collab) => {
//           collab.add(i);
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => {
//       //console.log("AddWinsSetRolling total elements touched: " + i);
//       return new Set(collab);
//     }
//   );
// }
//
// function MapTest() {
//   return new MicroCollabsBenchmark(
//     "Map",
//     (initToken) =>
//       new collabs.MergingMutCMap<number, collabs.CCounter>(
//         initToken,
//         (valueInitToken) => new collabs.CCounter(valueInitToken),
//         collabs.DefaultSerializer.getInstance(initToken.runtime)
//       ),
//     {
//       Toggle: [
//         (collab, rng) => {
//           let key = Math.floor(rng() * 100);
//           if (collab.has(key)) collab.delete(key);
//           else collab.set(key);
//         },
//         0.5,
//       ],
//       ValueOp: [
//         (collab, rng) => {
//           let key = Math.floor(rng() * 100);
//           if (!collab.has(key)) collab.set(key);
//           collab.get(key)!.add(Math.floor(rng() * 100 - 50));
//         },
//         0.5,
//       ],
//     },
//     (collab) => new Map([...collab].map((value) => [value[0], value[1].value]))
//   );
// }
//
// /**
//  * Set is maintained at a rolling size of 100,
//  * but many more elements are added overall.
//  * Useful for memory benchmarking.
//  * Note each op is an add+delete, unlike AddWinsSet().
//  */
// function MapRolling() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "MapRolling",
//     (initToken) => {
//       i = 0;
//       return new collabs.MergingMutCMap<number, collabs.CCounter>(
//         initToken,
//         (valueInitToken) => new collabs.CCounter(valueInitToken),
//         collabs.DefaultSerializer.getInstance(initToken.runtime)
//       );
//     },
//     {
//       Roll: [
//         (collab, rng) => {
//           if (i >= 100) collab.delete(i - 100);
//           if (!collab.has(i)) collab.set(i);
//           collab.get(i)!.add(Math.floor(rng() * 100 - 50));
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => {
//       //console.log("MapRolling total elements touched: " + i);
//       return new Map([...collab].map((value) => [value[0], value[1].value]));
//     }
//   );
// }
//
// function MapRollingGrow() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "MapRollingGrow",
//     (initToken) => {
//       i = 0;
//       return new collabs.MergingMutCMap<number, collabs.CCounter>(
//         initToken,
//         (valueInitToken) => new collabs.CCounter(valueInitToken),
//         collabs.DefaultSerializer.getInstance(initToken.runtime)
//       );
//     },
//     {
//       Roll: [
//         (collab, rng) => {
//           if (!collab.has(i)) collab.set(i);
//           collab.get(i)!.add(Math.floor(rng() * 100 - 50));
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => {
//       //console.log("MapRolling total elements touched: " + i);
//       return new Map([...collab].map((value) => [value[0], value[1].value]));
//     }
//   );
// }
//
// function LwwMap() {
//   return new MicroCollabsBenchmark(
//     "LwwMap",
//     (initToken) => new collabs.LwwCMap<number, number>(initToken),
//     {
//       Toggle: [
//         (collab, rng) => {
//           let key = Math.floor(rng() * 100);
//           if (collab.has(key)) collab.delete(key);
//           else collab.set(key, 0);
//         },
//         0.5,
//       ],
//       ValueOp: [
//         (collab, rng) => {
//           let key = Math.floor(rng() * 100);
//           collab.set(key, Math.floor(rng() * 100 - 50));
//         },
//         0.5,
//       ],
//     },
//     (collab) => new Map(collab.entries())
//   );
// }
//
// function LwwMapRolling() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "LwwMapRolling",
//     (initToken) => {
//       i = 0;
//       return new collabs.LwwCMap<number, number>(initToken);
//     },
//     {
//       Roll: [
//         (collab, rng) => {
//           if (i >= 100) collab.delete(i - 100);
//           collab.set(i, Math.floor(rng() * 100 - 50));
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => new Map(collab.entries())
//   );
// }
//
// function LwwMapRollingGrow() {
//   let i = 0;
//   return new MicroCollabsBenchmark(
//     "LwwMapRollingGrow",
//     (initToken) => {
//       i = 0;
//       return new collabs.LwwCMap<number, number>(initToken);
//     },
//     {
//       Roll: [
//         (collab, rng) => {
//           collab.set(i, Math.floor(rng() * 100 - 50));
//           i++;
//         },
//         1.0,
//       ],
//     },
//     (collab) => new Map(collab.entries())
//   );
// }
//
// function TextLtr() {
//   return new MicroCollabsBenchmark(
//     "TextLtr",
//     (initToken) => new collabs.CText(initToken),
//     {
//       Op: [
//         (collab, rng) => {
//           if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
//           else collab.insert(collab.length, randomChar(rng));
//         },
//         1.0,
//       ],
//     },
//     (collab) => collab.slice()
//   );
// }
//
// function TextLtrGrow() {
//   return new MicroCollabsBenchmark(
//     "TextLtrGrow",
//     (initToken) => new collabs.CText(initToken),
//     {
//       Op: [
//         (collab, rng) => {
//           collab.insert(collab.length, randomChar(rng));
//         },
//         1.0,
//       ],
//     },
//     (collab) => collab.slice()
//   );
// }
//
// function TextRandom() {
//   return new MicroCollabsBenchmark(
//     "TextRandom",
//     (initToken) => new collabs.CText(initToken),
//     {
//       Op: [
//         (collab, rng) => {
//           if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
//           else
//             collab.insert(
//               Math.floor(rng() * (collab.length + 1)),
//               randomChar(rng)
//             );
//         },
//         1.0,
//       ],
//     },
//     (collab) => collab.slice()
//   );
// }
//
// function TextRandomGrow() {
//   return new MicroCollabsBenchmark(
//     "TextRandomGrow",
//     (initToken) => new collabs.CText(initToken),
//     {
//       Op: [
//         (collab, rng) => {
//           collab.insert(
//             Math.floor(rng() * (collab.length + 1)),
//             randomChar(rng)
//           );
//         },
//         1.0,
//       ],
//     },
//     (collab) => collab.slice()
//   );
// }
//
// function ITensor(
//   name: "TensorAvg" | "TensorCounter",
//   shape: number[],
//   dtype: tf.NumericDataType,
//   resetFraction: number
// ) {
//   return new MicroCollabsBenchmark<TensorAverageCollab | TensorCounterCollab>(
//     name,
//     (initToken) =>
//       name === "TensorAvg"
//         ? new TensorAverageCollab(initToken, shape, dtype)
//         : new TensorCounterCollab(initToken, shape, dtype),
//     {
//       Add: [
//         (collab, rng) => {
//           const toAdd = tf.rand(shape, () => 10 * rng() - 5, dtype);
//           collab.add(toAdd);
//           toAdd.dispose();
//         },
//         1 - resetFraction,
//       ],
//       Reset: [(collab) => collab.reset(), resetFraction],
//     },
//     (collab) => tf.tidy(() => collab.value.arraySync()),
//     (collab) => collab.dispose()
//   );
// }
