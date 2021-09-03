import { Runtime } from "./runtime";

// This is in a separate file from Runtime so that
// Crdt can import it without creating a circular dependency.
// That is also why we use isRuntime instead of
// instanceof Runtime: the latter requires importing Runtime
// in JS, not just TypeScript.
// It's also possible that isRuntime is more efficient than
// instanceof Runtime when x has a long prototype chain.

export function isRuntime(x: any): x is Runtime {
  if (typeof x === "object") {
    if ((x as Runtime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
