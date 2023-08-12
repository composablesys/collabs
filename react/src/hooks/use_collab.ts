import { CRuntime } from "@collabs/collabs";
import { Collab } from "@collabs/core";
import { useEffect, useState } from "react";

/**
 * React hook that schedules a rerender whenever `collab` emits an event,
 * indicating that its state changed.
 *
 * You should call this hook in any component that reads `collab`'s state.
 *
 * **Warning:** If you define a
 * [custom CObject subclass](https://collabs.readthedocs.io/en/latest/guide/data_modeling.html),
 * it will **not** automatically emit an event each time one its children does.
 * Either call `useCollab` on each child that you read, or have the CObject
 * emit its own events in response to child events.
 */
export function useCollab(collab: Collab): void {
  const [count, setCounter] = useState(0);
  const rerender = () => setCounter(count + 1);

  useEffect(() => {
    return collab.on(
      "Any",
      (e) => {
        if (e.meta.isLocalOp) rerender();
        else {
          // If we receive a batch of remote events in the same change
          // (e.g. during loading), wait until the end of the change,
          // so we rerender only once for the whole batch.
          // (React <18 usually won't batch rerenders for us in this case.)
          (collab.runtime as CRuntime).on("Change", rerender, { once: true });

          // We don't do this for local ops because:
          // 1. Local ops usually occur in a React event handler, hence are batched
          // by React (all versions).
          // 2. Waiting until the "Change" event would break React <18's batching,
          // since for local ops, the "Change" event is usually async.

          // OPT: Allow providers to batch multiple receive/load calls into a
          // single "Change" event, to reduce rerenders with React <18.
        }
      },
      // Only the first event matters; after that, we know a rerender is
      // scheduled and don't need to call rerender/on("Change") again.
      { once: true }
    );
  }, [collab]);
}
