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
  const [, setCounter] = useState(0);

  let changePending = false;

  useEffect(() => {
    let cleanedUp = false;
    const off = collab.on("Any", (e) => {
      if (e.meta.isLocalOp) setCounter((count) => count + 1);
      else {
        // If we receive a batch of remote events in the same change
        // (e.g. during loading), wait until the end of the change,
        // so we rerender only once for the whole batch.
        // (React <18 usually won't batch rerenders for us in this case.)
        if (changePending) return;
        changePending = true;
        (collab.runtime as CRuntime).on(
          "Change",
          () => {
            changePending = false;
            // If cleanup gets called between the Any and Change events,
            // avoid React warnings from calling setCounter.
            if (!cleanedUp) setCounter((count) => count + 1);
          },
          { once: true }
        );
        // We don't do this for local ops because:
        // 1. Local ops usually occur in a React event handler, hence are batched
        // by React (all versions).
        // 2. Waiting until the "Change" event would break React <18's batching,
        // since for local ops, the "Change" event is usually async.

        // OPT: Allow providers to batch multiple receive/load calls into a
        // single "Change" event, to reduce rerenders with React <18.
      }
    });
    return () => {
      off();
      cleanedUp = true;
    };
  }, [collab]);
}
