import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  // Create a CRDTContainer, the entry point for a Collabs container.
  const container = new CRDTContainer();

  // Register Collabs.
  const counter = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Refresh the display when the Collabs state changes, possibly
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
    counter.add(1);
  };

  // Wait for the container to load the previous saved state, if any.
  await container.load();

  // Display the loaded state.
  refreshDisplay();

  // Signal to the container host that we're ready for use.
  container.ready();
})();
