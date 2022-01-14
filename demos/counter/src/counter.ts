import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  // Create a CRDTContainer - like CRDTApp, but intended for
  // use within containers.
  const container = new CRDTContainer(window.parent, {});

  // Now setup your program, using container.
  // Note that you you shouldn't try to load saveData like you
  // would in a non-container app;
  // ContainerAppSource will do that for you.

  // We include a simple collaborative counter as an example;
  // delete the code below and replace with your own.
  // Remember to call container.load() (TODO: when, advice).

  // Register collaborative data types.
  const counterCollab = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Wait for the container to load the previous saved state,
  // if any.
  await container.load();

  // Refresh the display when the Collab state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  container.on("Change", () => {
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
