import * as collabs from "@collabs/collabs";
import { ContainerAppSource } from "@collabs/container";

// Async so we can await ContainerAppSource.newApp.
(async function () {
  // Create a App intended for use within containers.
  const runtime = await ContainerAppSource.newApp(window.parent);

  // Now setup your program, using runtime.
  // Note that you you shouldn't try to load saveData like you
  // would in a non-container app;
  // ContainerAppSource will do that for you.

  // We include a simple collaborative counter as an example;
  // delete the code below and replace with your own.

  // Register collaborative data types.
  const counterCollab = runtime.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Refresh the display when the Collab state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  runtime.on("Change", () => {
    display.innerHTML = counterCollab.value.toString();
  });

  // Change counterCollab's value on button clicks.
  // Note that we need not refresh the display here, since Change
  // events are also triggered by local operations.
  document.getElementById("increment")!.onclick = () => {
    counterCollab.add(100);
  };
  document.getElementById("decrement")!.onclick = () => {
    counterCollab.add(-100);
  };
  document.getElementById("reset")!.onclick = () => {
    counterCollab.reset();
  };
})();
