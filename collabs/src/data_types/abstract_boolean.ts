import { Collab } from "../core";
import { CBoolean } from "./boolean";

export declare abstract class AbstractCBoolean
  extends Collab
  implements CBoolean
{
  abstract value: boolean;

  /**
   * Override this if you want a semantic different from
   * `this.value = !this.value`.
   */
  toggle(): void;
  true(): void;
  false(): void;
  set(value: boolean): boolean;
  /**
   * @return this.value.toString()
   */
  toString(): string;
}

/**
 * This mixin adds default implementations of CBoolean
 * methods to an arbitrary Collab base class.
 * You may override the default implementations.
 *
 * Implemented methods: toggle, true, false, set
 */
export function MakeAbstractCBoolean<
  TBase extends abstract new (...args: any[]) => Collab
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

    set(value: boolean): boolean {
      this.value = value;
      return this.value;
    }

    toString(): string {
      return this.value.toString();
    }
  }
  return Mixin;
}
