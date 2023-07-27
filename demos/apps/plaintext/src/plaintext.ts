import { CRuntime, CText, Cursors } from "@collabs/collabs";
import { LocalStorageDocStore } from "@collabs/storage";
import { WebSocketNetwork } from "@collabs/ws-client";

// --- App code ---

const doc = new CRuntime();

const text = doc.registerCollab("text", (init) => new CText(init));

const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
textarea.value = text.toString(); // Use loaded state here.

// Display text changes
text.on("Any", () => {
  textarea.value = text.toString();
  updateSelection();
});

let myStartCursor = Cursors.fromIndex(0, text);
let myEndCursor = Cursors.fromIndex(0, text);
function updateCursors() {
  // Need to do this on a delay because the event doesn't
  // due its default action (updating the handler) until
  // after the event handlers.
  setTimeout(() => {
    myStartCursor = Cursors.fromIndex(textarea.selectionStart, text);
    myEndCursor = Cursors.fromIndex(textarea.selectionEnd, text);
  }, 0);
}
function updateSelection() {
  textarea.selectionStart = Cursors.toIndex(myStartCursor, text);
  textarea.selectionEnd = Cursors.toIndex(myEndCursor, text);
}

window.addEventListener("selectionchange", updateCursors);
textarea.addEventListener("mousedown", updateCursors);
textarea.addEventListener("mousemove", (e) => {
  if (e.buttons === 1) updateCursors();
});
textarea.addEventListener("mouseclick", updateCursors);

// Change the text when a key is pressed in textarea
textarea.addEventListener("keydown", (e) => {
  const startIndex = Cursors.toIndex(myStartCursor, text);
  const endIndex = Cursors.toIndex(myEndCursor, text);
  if (e.key === "Backspace") {
    if (endIndex > startIndex) {
      text.delete(startIndex, endIndex - startIndex);
      myEndCursor = Cursors.fromIndex(startIndex, text);
    } else if (endIndex === startIndex && startIndex > 0) {
      text.delete(startIndex - 1);
      myStartCursor = Cursors.fromIndex(startIndex - 1, text);
    }
  } else if (e.key === "Delete") {
    if (endIndex > startIndex) {
      text.delete(startIndex, endIndex - startIndex);
      myEndCursor = Cursors.fromIndex(startIndex, text);
    } else if (endIndex === startIndex && startIndex < textarea.value.length) {
      text.delete(startIndex);
    }
  } else if (e.key === "Enter") {
    type("\n", startIndex, endIndex);
  } else if (e.key === "Tab") {
    // TODO: proper tab behavior
    type("    ", startIndex, endIndex);
  } else if (shouldType(e)) {
    type(e.key, startIndex, endIndex);
  } else {
    // Assume it's either irrelevant or selection related
    updateCursors();
    return; // Don't updateSelection or preventDefault.
    // Ctrl+V, Ctrl+X dispatch paste/cut events, like when
    // using the mouse menu versions, which we handle below.
    // Ctrl+C doesn't need to be handled (default works fine.)
    // So we don't need cases for these.
  }

  updateSelection();
  // Don't let the browser type the key, we do it for them
  e.preventDefault();
});

function type(str: string, startIndex: number, endIndex: number) {
  if (startIndex < endIndex) {
    // Delete current selection
    text.delete(startIndex, endIndex - startIndex);
  }
  text.insert(startIndex, str);
  myStartCursor = Cursors.fromIndex(startIndex + str.length, text);
  myEndCursor = Cursors.fromIndex(startIndex + str.length, text);
}

function shouldType(e: KeyboardEvent): boolean {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

textarea.addEventListener("paste", (e) => {
  if (e.clipboardData) {
    const pasted = e.clipboardData.getData("text");
    type(
      pasted,
      Cursors.toIndex(myStartCursor, text),
      Cursors.toIndex(myEndCursor, text)
    );
    updateSelection();
  }
  e.preventDefault();
});

textarea.addEventListener("cut", () => {
  const startIndex = Cursors.toIndex(myStartCursor, text);
  const endIndex = Cursors.toIndex(myEndCursor, text);
  if (startIndex < endIndex) {
    const selected = textarea.value.slice(startIndex, endIndex);
    navigator.clipboard.writeText(selected);
    text.delete(startIndex, endIndex - startIndex);
  }
});

// TODO: allow drag+drop text?  Currently we just
// disable it.
textarea.addEventListener("dragstart", (e) => {
  e.preventDefault();
});
textarea.addEventListener("drop", (e) => {
  e.preventDefault();
});

// --- Network/storage setup ---

const docID = "plaintext";

// Connect to the server over WebSocket.
const wsURL = location.origin.replace(/^http/, "ws");
const wsNetwork = new WebSocketNetwork(wsURL, { connect: false });
wsNetwork.on("Load", (e) => {
  console.log(`Loaded doc "${e.docID}" from the server.`);
});
wsNetwork.on("Save", (e) => {
  console.log(`Saved all local updates to doc "${e.docID}" to the server`);
});
wsNetwork.on("Connect", () => console.log("Connected to the server."));
wsNetwork.on("Disconnect", (e) => {
  // After a disconnection, try to reconnect every 2 seconds, unless
  // we deliberately called wsNetwork.disconnect().
  if (e.cause === "disconnect") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});
wsNetwork.subscribe(doc, docID);

// Change to true to store a copy of the doc locally in IndexedDB.
// We disable this for our demos because the server frequently resets
// the doc's state. Disabling is also useful during development.
if (false) {
  // TODO: change to IndexedDB.
  const docStore = new LocalStorageDocStore();
  docStore.subscribe(doc, docID);
}

// --- "Connected" checkbox for testing concurrency ---

const connected = document.getElementById("connected") as HTMLInputElement;
connected.checked = localStorage.getItem("connected") !== "false";
if (connected.checked) {
  // Instead of calling connect() here, you can just remove WebSocketNetwork's
  // { connect: false } option above.
  wsNetwork.connect();
}
connected.addEventListener("click", () => {
  localStorage.setItem("connected", connected.checked + "");
  if (connected.checked) wsNetwork.connect();
  else wsNetwork.disconnect();
});
