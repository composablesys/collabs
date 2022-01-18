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
  // Remember to do `await container.load()` at some point
  // and then display the resulting state.

  // Register collaborative data types.
  const counterCollab = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Wait for the container to load the previous saved state,
  // if any.
  // You can choose not to await here and instead continue setup,
  // so long as:
  //   (1) You refresh the display sometime after the Promise resolves.
  //   (2) You don't perform any operations until after the
  // Promise resolves. Since the host will block user interaction
  // until then, this is automatic unless you
  // perform operations independent of user interaction.
  //   (3) You accept that the process of loading may cause
  // Collabs to emit events (triggering any event handlers you
  // add before the Promise resolves), even though that wouldn't
  // happen during [[CRDTApp.load]]. This is an artifact of the
  // way containers are loaded, which sometimes involves
  // delivering past messages directly.
  // In particular, if you add event handlers before this
  // Promise resolves, they might run into trouble
  // (e.g., index out of bounds errors) if they interact
  // with non-Collabs views of the state, since those views
  // won't yet reflect prior changes to the state.
  await container.load();

  // Refresh the display when the Collab state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  function refreshDisplay() {
    display.innerHTML = counterCollab.value.toString();
  }
  container.on("Change", refreshDisplay);

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

  // Display loaded state.
  refreshDisplay();
})();
