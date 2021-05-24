import { crdts, network } from "compoventuals-client";

const WIN_TEXT = (function () {
  let ans = "a";
  for (let i = 0; i < 29; i++) ans += " a";
  return ans;
})();

var HOST = location.origin.replace(/^http/, "ws");

const client = new crdts.CrdtRuntime(
  new network.DefaultCausalBroadcastNetwork(
    new network.WebSocketNetwork(HOST, "aspace")
  )
);
const text = client.registerCrdt("text", new crdts.TextCrdt());
const startTime = client.registerCrdt(
  "startTime",
  new crdts.MultiValueRegister<number>()
);
const winElapsedTime = client.registerCrdt(
  "winElapsedTime",
  new crdts.MultiValueRegister<number>()
);

const textInput = document.getElementById("textInput") as HTMLInputElement;
textInput.value = "";

const myCursor = new crdts.Cursor(text, 0);
function updateCursor() {
  const index = myCursor.index;
  textInput.selectionStart = index;
  textInput.selectionEnd = index;
}

// Change the text when a key is pressed in textInput
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Restart the game
    text.reset();
    startTime.reset();
    winElapsedTime.reset();
  } else if (textInput.selectionStart !== null) {
    const index = textInput.selectionStart;
    if (e.key === "Backspace") {
      if (index > 0) {
        text.deleteAt(index - 1);
        myCursor.index = index - 1;
        updateCursor();
      }
    } else if (e.key === "Delete") {
      if (index < textInput.value.length) {
        text.deleteAt(index);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        myCursor.index = index - 1;
        updateCursor();
      }
    } else if (e.key === "ArrowRight") {
      if (index < textInput.value.length) {
        myCursor.index = index + 1;
        updateCursor();
      }
    } else if (e.key === "End") {
      myCursor.index = textInput.value.length;
      updateCursor();
    } else if (e.key === "Home") {
      myCursor.index = 0;
      updateCursor();
    } else if (shouldType(e)) {
      text.insertAt(index, e.key);
      myCursor.index = index + 1;
      updateCursor();
      if (startTime.valueSet.size === 0) startTime.value = Date.now();
    }
  }

  // Don't let the browser type the key, we do it for them
  e.preventDefault();
});

function shouldType(e: KeyboardEvent): boolean {
  // TODO
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

// Respond to text changes
text.on("Change", () => {
  textInput.value = text.asArray().join("");
  updateCursor();
});

// Display info text (time and win state)
const display = document.getElementById("display")!;
setInterval(() => {
  // Update the win state, if it is inconsistent between
  // the text and winElapsedTime.
  if (
    textInput.value.startsWith(WIN_TEXT) &&
    winElapsedTime.valueSet.size === 0
  ) {
    // Record now as the winning time
    winElapsedTime.value = getElapsedTime();
  } else if (
    !textInput.value.startsWith(WIN_TEXT) &&
    winElapsedTime.valueSet.size !== 0
  ) {
    // Reset the win time
    winElapsedTime.reset();
  }

  if (
    textInput.value.startsWith(WIN_TEXT) &&
    winElapsedTime.valueSet.size > 0
  ) {
    // Get the minimum winElapsedTime
    let ans = Number.MAX_VALUE;
    for (let value of winElapsedTime.valueSet.values())
      ans = Math.min(ans, value);
    display.innerHTML = (ans / 1000).toFixed(2);
  } else {
    display.innerHTML = (getElapsedTime() / 1000).toFixed(2);
  }
}, 10);

function getElapsedTime() {
  let values = startTime.valueSet;
  if (values.size === 0) return 0;
  // Use the *least* start time
  let start = Number.MAX_VALUE;
  for (let value of values.values()) start = Math.min(start, value);
  return Date.now() - start;
}
