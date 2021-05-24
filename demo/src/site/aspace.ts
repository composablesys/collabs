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
  ),
  { periodMs: 5000 }
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

// Change the text when a key is pressed in textInput
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Restart the game
    text.reset();
    startTime.reset();
    winElapsedTime.reset();
  } else if (textInput.selectionStart !== null) {
    if (e.key === "Backspace") {
      if (textInput.selectionStart > 0) {
        const isAtEnd = textInput.selectionStart === textInput.value.length;
        text.deleteAt(textInput.selectionStart - 1);
        if (!isAtEnd) moveCursorLeft();
      }
    } else if (e.key === "Delete") {
      if (textInput.selectionStart < textInput.value.length) {
        text.deleteAt(textInput.selectionStart);
      }
    } else if (e.key === "ArrowLeft") moveCursorLeft();
    else if (e.key === "ArrowRight") moveCursorRight();
    else if (e.key === "End") {
      textInput.selectionStart = textInput.value.length;
      textInput.selectionEnd = textInput.selectionStart;
    } else if (e.key === "Home") {
      textInput.selectionStart = 0;
      textInput.selectionEnd = textInput.selectionStart;
    } else if (shouldType(e)) {
      text.insertAt(textInput.selectionStart, e.key);
      moveCursorRight();
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

function moveCursorLeft() {
  if (textInput.selectionStart !== null) {
    if (textInput.selectionStart > 0) {
      textInput.selectionStart--;
      textInput.selectionEnd = textInput.selectionStart;
    }
  }
}

function moveCursorRight() {
  if (textInput.selectionStart !== null) {
    if (textInput.selectionStart < textInput.value.length) {
      textInput.selectionStart++;
      textInput.selectionEnd = textInput.selectionStart;
    }
  }
}

// Respond to text changes
text.on("Change", () => {
  const oldSelectionStart = textInput.selectionStart;
  textInput.value = text.asArray().join("");
  textInput.selectionStart = Math.min(
    textInput.value.length,
    Math.max(0, oldSelectionStart ?? textInput.value.length)
  );
  textInput.selectionEnd = textInput.selectionStart;

  if (afterChange) {
    afterChange();
    afterChange = null;
  }
});

// Move cursor in response to others' text changes.
// Need to delay this until after the Change event, since
// the text is not yet edited.
let afterChange: (() => void) | null = null;
text.on("Insert", (e) => {
  if (!e.timestamp.isLocal()) {
    afterChange = () => {
      if (
        textInput.selectionStart !== null &&
        e.index < textInput.selectionStart
      )
        moveCursorRight();
    };
  }
});
text.on("Delete", (e) => {
  if (!e.timestamp.isLocal()) {
    afterChange = () => {
      if (
        textInput.selectionStart !== null &&
        e.index <= textInput.selectionStart
      )
        moveCursorLeft();
    };
  }
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
