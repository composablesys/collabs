import { Crdt } from "../core";
import { CBoolean } from "./interfaces";

export declare abstract class AbstractCBoolean
  extends Crdt
  implements CBoolean
{
  abstract value: boolean;

  /**
   * Override this if you want a semantic different from
   * this.value = !this.value.
   */
  toggle(): void;
  true(): void;
  false(): void;
  set(value: boolean): void;
}

// export type AbstractCBoolean = DeclareAbstractCBoolean;

/**
 * This mixin adds default implementations of CBoolean
 * methods to an arbitrary Crdt base class.
 * You may override the default implementations.
 *
 * Implemented methods: toggle, true, false, set
 */
export function MakeAbstractCBoolean<
  TBase extends abstract new (...args: any[]) => Crdt
>(Base: TBase): TBase & (abstract new (...args: any[]) => AbstractCBoolean) {
  abstract class Mixin extends Base implements AbstractCBoolean {
    constructor(...args: any[]) {
      super(...args);
    }

    abstract value: boolean;

    toggle(): void {
      this.value = !this.value;
    }

    true(): void {
      this.value = true;
    }

    false(): void {
      this.value = false;
    }

    set(value: boolean): void {
      this.value = value;
    }
  }
  return Mixin;
}

// Testing
// class Test1 extends MakeAbstractCBoolean(CompositeCrdt)<CNumberEventsRecord> {
//   constructor() {
//     super();
//     this.addChild("test", new CompositeCrdt());
//     // this.emit("Add", /* properly extends CNumberEvent */);
//   }
//   value = true;
// }
//
// const x = new Test1();
// x.toggle();
// const z: CBoolean = x;
//
// class Test2 extends MakeAbstractCBoolean(PrimitiveCrdt)<number> {
//   protected receivePrimitive(
//     timestamp: CausalTimestamp,
//     message: Uint8Array
//   ): void {
//     throw new Error("Method not implemented.");
//   }
//   protected savePrimitive(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
//   protected loadPrimitive(saveData: Uint8Array): void {
//     throw new Error("Method not implemented.");
//   }
//   canGc(): boolean {
//     throw new Error("Method not implemented.");
//   }
//   value = true;
// }
//
// const y: CBoolean = new Test2(7);
//
// // Properly angry that Object does not extend Crdt
// export class TestBase extends MakeAbstractCBoolean(Object) {}
//
// export class TestOverride extends MakeAbstractCBoolean(CompositeCrdt) {
//   toggle() {
//     this.value = false;
//   }
//
//   value = true;
// }
