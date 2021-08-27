import * as crdts from "compoventuals";
import { ContainerSource } from "compoventuals-container";

const container: ContainerSource = {
  isContainerSource: true,
  attachNewContainer(document, runtime) {
    // HTML
    document.innerHTML = `
      <style>
        input[type="text"] {
          font-size: 24px;
        }
      </style>

      <input id="textInput" type="text" onpaste="return false;" size="70" />
      <br />
      <h2 id="display">0.00</h2>

      <br />
      <br />
      <p>
        A collaborative recreation of a game by
        <a href="https://williamhoza.com/">William Hoza</a>
      </p>
    `;

    // JS
    const WIN_TEXT = (function () {
      let ans = "a";
      for (let i = 0; i < 29; i++) ans += " a";
      return ans;
    })();

    const text = runtime.registerCrdt("text", new crdts.CText());
    const startTime = runtime.registerCrdt(
      "startTime",
      new crdts.LwwCRegister<number>(0)
    );
    const winElapsedTime = runtime.registerCrdt(
      "winElapsedTime",
      new crdts.LwwCRegister<number>(0)
    );

    const textInput = document.getElementById("textInput") as HTMLInputElement;
    textInput.value = "";

    const myCursor = text.newCursor(0);
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
            text.delete(index - 1);
            myCursor.index = index - 1;
            updateCursor();
          }
        } else if (e.key === "Delete") {
          if (index < textInput.value.length) {
            text.delete(index);
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
          text.insert(index, e.key);
          myCursor.index = index + 1;
          updateCursor();
          if (startTime.conflicts().length === 0) startTime.value = Date.now();
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
      textInput.value = text.join("");
      updateCursor();
    });

    // Display info text (time and win state)
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
        winElapsedTime.reset();
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
  },
};
export default container;
