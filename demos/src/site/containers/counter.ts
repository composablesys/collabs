import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";

(async function () {
  // Create a Runtime intended for use within containers.
  const runtime = await ContainerRuntimeSource.newRuntime(window.parent);

  // Create top-level Crdts to store the collaborative state.
  // Here we just need one counter.
  const counterCrdt = runtime.registerCrdt(
    "counter",
    crdts.Pre(crdts.CCounter)()
  );

  const display = document.getElementById("display")!;

  // Refresh the display when the Crdt state changes, possibly
  // due to a message from another replica.
  runtime.on("Batch", () => {
    display.innerHTML = counterCrdt.value.toString();
  });

  // Change counterCrdt's value on button clicks.
  // Note that we need not refresh the display here, since Batch
  // events are also triggered by local operations.
  document.getElementById("increment")!.onclick = () => {
    counterCrdt.add(100);
  };
  document.getElementById("decrement")!.onclick = () => {
    counterCrdt.add(-100);
  };
  document.getElementById("reset")!.onclick = () => {
    counterCrdt.reset();
  };
})();
