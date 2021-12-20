import { CRegister } from "./register";

export interface CBoolean extends CRegister<boolean, [boolean]> {
  /**
   * Toggle the value, i.e., negate it.
   *
   * When all operations happen sequentially, toggle
   * is equivalent to setting
   * this.value = !this.value.  However, implementations may
   * choose a different semantics in the face of conflicts
   * (e.g., two concurrent toggles could cancel out).
   */
  toggle(): void;

  /**
   * Alias for this.set(true).
   */
  true(): void;

  /**
   * Alias for this.set(false).
   */
  false(): void;

  value: boolean;
}
