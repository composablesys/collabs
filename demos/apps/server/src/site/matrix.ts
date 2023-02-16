import * as collabs from "@collabs/collabs";
import { CContainerHost } from "@collabs/container";
import { MatrixWidgetNetwork } from "@collabs/matrix-widget";

// Extract the container to use from the URL's
// GET parameters.
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("container")) {
  throw new Error('URL missing "container" GET parameter.');
}
const containerUrl = urlParams.get("container")!;

const doLoad = window.location.search === "?load=true";
if (doLoad) {
  // Get rid of the GET parameter in the address bar,
  // so it doesn't automatically happen on refresh.
  window.history.pushState(
    {},
    document.title,
    window.location.origin + window.location.pathname
  );
}

// --- Setup our app ---

const runtime = new collabs.CRuntime();
const network = new MatrixWidgetNetwork(
  runtime,
  "com.herokuapp.@collabs/tests.counter"
);

// Add the container in an IFrame,
// initially hidden so that user input is blocked.
const iframe = document.createElement("iframe");
iframe.src = containerUrl;
iframe.style.display = "none";
document.body.appendChild(iframe);
// Set title to that of the container.
iframe.addEventListener("load", () => {
  // contentDocument is only non-null if IFrame is from the
  // same origin.
  if (iframe.contentDocument !== null) {
    document.title = iframe.contentDocument.title;
  } else {
    // TODO: should change this whole thing to use messages
    // from the container, since different origins is the
    // common case.
    document.title = "Collabs Demo";
  }
});

// Attach the container.
const host = runtime.registerCollab(
  "host",
  (init) => new CContainerHost(init, iframe)
);

// Show the container once it's ready.
host.once("ContainerReady", () => {
  const loadingDiv = <HTMLDivElement>document.getElementById("loading");
  document.body.removeChild(loadingDiv);
  iframe.style.display = "block";
});

// TODO: loading from prior state (either local or received
// from Matrix).
// Also, saving/loading/resending unsent messages in local storage,
// requesting only needed messages at startup, etc.
// Currently, the only "loading" that happens is: if you're
// lucky and the Matrix client has backfilled all previous
// widget messages *before* the widget is initialized, then
// all those messages will delivered by MatrixWidgetNetwork
// shortly after startup.
host.loadSkipped();
