import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  const WIN_TEXT = (function () {
    let ans = "a";
    for (let i = 0; i < 29; i++) ans += " a";
    return ans;
  })();

  const container = new CRDTContainer();

  const text = container.registerCollab(
    "text",
    (init) => new collabs.CText(init)
  );
  const startTime = container.registerCollab(
    "startTime",
    (init) => new collabs.CVar(init, 0)
  );
  const winElapsedTime = container.registerCollab(
    "winElapsedTime",
    (init) => new collabs.CVar(init, 0)
  );

  await container.load();

  const textInput = document.getElementById("textInput") as HTMLInputElement;
  textInput.value = text.toString(); // Use loaded state here.

  // Respond to text changes.
  text.on("Any", () => {
    textInput.value = text.toString();
    updateCursor();
  });

  let myCursor = collabs.Cursor.fromIndex(text, 0);
  function updateCursor() {
    const index = myCursor.index;
    textInput.selectionStart = index;
    textInput.selectionEnd = index;
  }

  // Display info text (time and win state).
  // Instead of listening for events, we just refresh it
  // frequently using setInterval.
  const display = document.getElementById("display")!;
  setInterval(() => {
    // Update the win state, if it is inconsistent between
    // the text and winElapsedTime.
    if (
      textInput.value.startsWith(WIN_TEXT) &&
      winElapsedTime.conflicts().length === 0
    ) {
      // Record now as the winning time
      winElapsedTime.value = getElapsedTime();
    } else if (
      !textInput.value.startsWith(WIN_TEXT) &&
      winElapsedTime.conflicts().length !== 0
    ) {
      // Reset the win time
      winElapsedTime.clear();
    }

    if (
      textInput.value.startsWith(WIN_TEXT) &&
      winElapsedTime.conflicts().length > 0
    ) {
      // Get the minimum winElapsedTime
      let ans = Number.MAX_VALUE;
      for (let value of winElapsedTime.conflicts()) {
        ans = Math.min(ans, value);
      }
      display.innerHTML = (ans / 1000).toFixed(2);
    } else {
      display.innerHTML = (getElapsedTime() / 1000).toFixed(2);
    }
  }, 10);

  function getElapsedTime() {
    let values = startTime.conflicts();
    if (values.length === 0) return 0;
    // Use the *least* start time
    let start = Number.MAX_VALUE;
    for (let value of values) start = Math.min(start, value);
    return Date.now() - start;
  }

  // Change the text when a key is pressed in textInput.
  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Restart the game
      text.clear();
      startTime.clear();
      winElapsedTime.clear();
    } else if (textInput.selectionStart !== null) {
      const index = textInput.selectionStart;
      if (e.key === "Backspace") {
        if (index > 0) {
          text.delete(index - 1);
          myCursor = collabs.Cursor.fromIndex(text, index - 1);
          updateCursor();
        }
      } else if (e.key === "Delete") {
        if (index < textInput.value.length) {
          text.delete(index);
        }
      } else if (e.key === "ArrowLeft") {
        if (index > 0) {
          myCursor = collabs.Cursor.fromIndex(text, index - 1);
          updateCursor();
        }
      } else if (e.key === "ArrowRight") {
        if (index < textInput.value.length) {
          myCursor = collabs.Cursor.fromIndex(text, index + 1);
          updateCursor();
        }
      } else if (e.key === "End") {
        myCursor = collabs.Cursor.fromIndex(text, textInput.value.length);
        updateCursor();
      } else if (e.key === "Home") {
        myCursor = collabs.Cursor.fromIndex(text, 0);
        updateCursor();
      } else if (shouldType(e)) {
        text.insert(index, e.key);
        myCursor = collabs.Cursor.fromIndex(text, index + 1);
        updateCursor();
        if (startTime.conflicts().length === 0) startTime.value = Date.now();
      }
    }

    // Don't let the browser type the key, we do it for them.
    e.preventDefault();
  });

  function shouldType(e: KeyboardEvent): boolean {
    return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
  }

  // Ready.
  container.ready();
})();
