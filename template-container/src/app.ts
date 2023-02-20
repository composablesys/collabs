import { CContainer } from "@collabs/container";

(async function () {
  // Create a CContainer, the entry point for a Collabs container.
  const container = new CContainer();

  // TODO: Setup your app, using container.registerCollab to create
  // Collabs state variables.

  // Wait for the container to load the previous saved state, if any.
  await container.load();

  // TODO: Display the loaded state, i.e., sync it from your Collabs state
  // variables to the GUI.

  // Signal to the container host that we're ready for use.
  container.ready();
})();
