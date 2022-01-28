import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  // Create a CRDTContainer, the entry point for a Collabs
  // container.
  // Note: in a non-container app, you would instead use collabs.CRDTApp.
  const container = new CRDTContainer();

  // Now setup your program, using container.

  // We include a simple collaborative counter as an example;
  // delete the code below and replace with your own.

  // Register Collabs.
  const counter = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Refresh the display when the Collab state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  function refreshDisplay() {
    display.innerHTML = counter.value.toString();
  }
  container.on("Change", refreshDisplay);

  // Change counter's value on button clicks.
  // Note that we don't need to refresh the display here, since Change
  // events are also triggered by local operations.
  document.getElementById("increment")!.onclick = () => {
    counter.add(100);
  };
  document.getElementById("decrement")!.onclick = () => {
    counter.add(-100);
  };
  document.getElementById("reset")!.onclick = () => {
    counter.reset();
  };

  // Wait for the container to load the previous saved state,
  // if any.
  // Observe that unlike CRDTApp.load, we don't need to provide
  // the save data ourselves, and the method is async.
  await container.load();

  // Display the loaded state.
  refreshDisplay();

  // Signal that we're ready.
  container.ready();
})();
