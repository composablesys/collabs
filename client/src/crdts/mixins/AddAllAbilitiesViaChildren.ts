// import { CausalTimestamp } from "../../network/causal_broadcast_network";
// import { Crdt, CrdtRuntime } from "../crdt_core";
// import {
//   ABILITIES_ALL,
//   AbilityFlag,
//   AllAble,
//   AllAbleEventsRecord,
//   InterfaceOf,
//   isOutOfOrderAble,
//   isResettable,
//   isStrongResettable,
// } from "./abilities";
// import { Constructor, CrdtMixinWithNewEvents } from "./mixin";
//
// export const AddAllAbilitiesViaChildren: CrdtMixinWithNewEvents<
//   Crdt,
//   AllAble,
//   AllAbleEventsRecord
// > = <Input extends Constructor<Crdt>>(Base: Input) => {
//   let AbleViaChildren = class AbleViaChildren extends Base {
//     abilityFlag: AbilityFlag;
//     constructor(...args: any[]) {
//       super(...args);
//       // From the type signature of the wrapper method, abilityFlag
//       // is always the argument with index 2 and is not undefined.
//       this.abilityFlag = args[2] as AbilityFlag;
//     }
//     // Override this to attempt to throw an error at runtime if
//     // the children don't have the correct abilities.
//     protected registerChild(child: Crdt) {
//       // Check abilities
//       if (this.abilityFlag.resettable !== undefined && !isResettable(child)) {
//         throw new Error(
//           "this.abilityFlag.resettable is defined, so AddAbilitiesViaChildren" +
//             "requires all child Crdts to implement Resettable, but child " +
//             child.id +
//             " does not."
//         );
//       }
//       if (
//         this.abilityFlag.strongResettable !== undefined &&
//         !isStrongResettable(child)
//       ) {
//         throw new Error(
//           "this.abilityFlagstrongResettable is defined, so AddAbilitiesViaChildren" +
//             "requires all child Crdts to implement StrongResettable, but child " +
//             child.id +
//             " does not."
//         );
//       }
//       // Don't check OutOfOrderAble since some operations may not
//       // be intended to support it.
//       super.registerChild(child);
//     }
//
//     reset() {
//       if (this.abilityFlag.resettable === undefined) {
//         throw new Error(
//           "reset called but this.abilityFlag.resettable is undefined"
//         );
//       }
//       for (let child of this.children.values()) {
//         if (!isResettable(child)) {
//           throw new Error(
//             "this.abilityFlag.resettable is defined, so AddAbilitiesViaChildren" +
//               "requires all child Crdts to implement Resettable, but child " +
//               child.id +
//               " does not."
//           );
//         }
//         child.reset();
//       }
//     }
//
//     strongReset() {
//       if (this.abilityFlag.strongResettable === undefined) {
//         throw new Error(
//           "strongReset called but this.abilityFlag.strongResettable is undefined"
//         );
//       }
//       for (let child of this.children.values()) {
//         if (!isStrongResettable(child)) {
//           throw new Error(
//             "this.abilityFlag.strongResettable is defined, so AddAbilitiesViaChildren" +
//               "requires all child Crdts to implement StrongResettable, but child " +
//               child.id +
//               " does not."
//           );
//         }
//         child.strongReset();
//       }
//     }
//
//     /**
//      * Defers OutOfOrder receipt handling to the target Crdt.
//      * Note that the target Crdt may not actually be OutOfOrderAble,
//      * in which case this will throw an error.
//      */
//     receiveOutOfOrder(
//       targetPath: string[],
//       timestamp: CausalTimestamp,
//       message: Uint8Array
//     ): void {
//       let child = this.children.get(targetPath[targetPath.length - 1]);
//       if (child === undefined) {
//         throw new Error(
//           "Unknown child: " +
//             targetPath[targetPath.length - 1] +
//             " in: " +
//             JSON.stringify(targetPath) +
//             ", children: " +
//             JSON.stringify([...this.children.keys()])
//         );
//       }
//       if (!isOutOfOrderAble(child)) {
//         throw new Error(
//           "receiveOutOfOrder() called on StrongResetWrapperCrdt, but the " +
//             "original (wrapped) Crdt is not OutOfOrderAble"
//         );
//       }
//       targetPath.length--;
//       child.receiveOutOfOrder(targetPath, timestamp, message);
//     }
//   };
//   // Return a subclass that is AllAble by default.
//   return class AllAbleViaChildren extends AbleViaChildren implements AllAble {
//     constructor(...args: any[]) {
//       // Insert the ABILITIES_ALL flag at the flag index (index 2)
//       super(args[0], args[1], ABILITIES_ALL, ...args.slice(2));
//     }
//
//     static withAbilities<F extends AbilityFlag>(
//       abilityFlag: F,
//       parentOrRuntime: Crdt | CrdtRuntime,
//       id: string,
//       ...otherArgs: any[]
//     ): InstanceType<Input> & InterfaceOf<F> {
//       // our args have the same signature as Base's constructor args,
//       // but with the abilityFlag moved from index 2 to 0.
//       if (
//         abilityFlag.resettable === undefined &&
//         abilityFlag.strongResettable === undefined &&
//         abilityFlag.outOfOrderAble === undefined
//       )
//         return new Base(parentOrRuntime, id, abilityFlag, ...otherArgs) as any;
//       else
//         return new AbleViaChildren(
//           parentOrRuntime,
//           id,
//           abilityFlag,
//           ...otherArgs
//         ) as any;
//     }
//   } as any;
// };
