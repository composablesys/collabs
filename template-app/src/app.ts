import * as collabs from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

// Create a CRuntime.
const runtime = new collabs.CRuntime();

// TODO: Setup your app, using runtime.registerCollab to create
// Collabs state variables.

// Connect runtime to your chosen network(s) so it can communicate with other
// collaborating users.
// In general, you do this by hooking into runtime.on("Send", ...) and
// runtime.receive:
// ```ts
// runtime.on("Send", e => {
//     // TODO: send e.message to other collaborators
// });
//
// // TODO: Call this when you receive a network message.
// function handleReceivedMessage(message: Uint8Array) {
//     runtime.receive(message);
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
new WebSocketNetwork(runtime, host, "");

// TODO: Load the previous saved state, if any.
// runtime.load(savedState);

// TODO: call runtime.receive on any past messages that didn't make it into
// the save data. WebSocketNetwork does this for you, but in a silly way:
// it merely requests *all* past messages from the server and delivers them
// to runtime.receive. That is okay because runtime.receive ignores redundant messages,
// but it is inefficient, and it does not work while offline.
// For a proper "local-first" experience, as many of these extra messages
// as possible should be persisted locally, so that they are available
// immediately.

// Your app is now ready to be displayed by the user.
// (Technically you can let your user interact with it immediately,
// but you probably want to wait until after calling runtime.load
// and calling runtime.receive on all locally-stored past messages,
// to prevent the GUI from updating rapidly right after it becomes visible.)
