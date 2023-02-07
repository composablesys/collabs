import * as collabs from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

// Create a CRDTApp.
const app = new collabs.CRDTApp();

// TODO: Setup your app, using app.registerCollab to create
// Collabs state variables.

// Load the previous saved state, if any.
// If there is no previous saved state, use collabs.Optional.empty().
// You always need to call app.load exactly once, even if there is no
// previous saved state; otherwise
// app will throw an error on Collab operations and message receipt.
const savedState: collabs.Optional<Uint8Array> =
  /* TODO: if present, use collabs.Optional.of(saveDataUint8Array); */
  /* else use: */ collabs.Optional.empty();
app.load(savedState);

// TODO: Display the loaded state, i.e., sync it from your Collabs state
// variables to the GUI.

// Connect app to your chosen network(s) so it can communicate with other
// collaborating users.
// In general, you do this by hooking into app.on("Send", ...) and
// app.receive:
// ```ts
// app.on("Send", e => {
//     // TODO: send e.message to other collaborators
// });
//
// // TODO: Call this when you receive a network message.
// function handleReceivedMessage(message: Uint8Array) {
//     app.receive(message);
// }
// ```
// In specific cases, you can use a premade <something>Network class,
// which automatically does the above setup in its constructor.
// For this template, we use WebSocketNetwork from package @collabs/ws-client,
// which sends messages through a @collabs/ws-server via WebSockets.
// The template's server starter code (`server/testing_server.ts`, run by
// `npm start`) runs one of these servers for you.
// (A central server like this is not necessary to use
// Collabs, but it is convenient, especially for local testing.)
const host = location.origin.replace(/^http/, "ws");
new WebSocketNetwork(app, host, "");

// TODO: call app.receive on any past messages that didn't make it into
// the save data. WebSocketNetwork does this for you, but in a silly way:
// it merely requests *all* past messages from the server and delivers them
// to app.receive. That is okay because app.receive ignores redundant messages,
// but it is inefficient, and it does not work while offline.
// For a proper "local-first" experience, as many of these extra messages
// as possible should be persisted locally, so that they are available
// immediately.

// Your app is now ready to be displayed by the user.
// (Technically you can let your user interact with it as soon as you
// call app.load, although you may want to wait until after you call
// app.receive on all locally-stored past messages, to prevent the
// GUI from updating rapidly right after it becomes visible.)
