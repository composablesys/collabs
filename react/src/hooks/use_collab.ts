import { Collab } from "@collabs/core";
import { useEffect, useState } from "react";

/**
 * React hook that you should call when referencing a Collab's
 * state in a React component, so that the component is refreshed
 * when the Collab's state changes.
 *
 * Technically, it refreshes only when the Collab emits an event.
 * E.g. for CObjects, this won't happen by default when a child
 * changes (which is often what you want anyway - the child
 * should refresh its own component instead).
 */
export function useCollab(collab: Collab) {
  const [, setCounter] = useState(0);
  const rerender = () => setCounter((count) => count + 1);
  useEffect(() => {
    return collab.on("Any", rerender);
  }, [collab]);
}
