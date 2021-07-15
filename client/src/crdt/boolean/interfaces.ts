import { CRegister } from "../register";

export interface CBoolean extends CRegister<boolean> {
  /**
   * Toggle the value, i.e., negate it.
   *
   * This is sequentially equivalent to setting
   * this.value = !this.value, but implementations may
   * choose a different semantics in the face of conflicts
   * (e.g., two concurrent toggles could cancel out).
   */
  toggle(): void;

  /**
   * Alias for this.value = true.
   */
  true(): void;

  /**
   * Alias for this.value = false.
   */
  false(): void;
}
