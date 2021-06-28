import * as crdts from "compoventuals-client";

var HOST = location.origin.replace(/^http/, "ws");
const client = new crdts.Runtime(new crdts.WebSocketNetwork(HOST, "plaintext"));

const text = client.registerCrdt("text", new crdts.TextCrdt());

const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
textarea.value = "";

// TODO: shared cursors

const myCursor = new crdts.Cursor(text, 0);
function updateCursor() {
  const index = myCursor.index;
  textarea.selectionStart = index;
  textarea.selectionEnd = index;
}

// TODO: support copy, paste

// Change the text when a key is pressed in textarea
textarea.addEventListener("keydown", (e) => {
  if (textarea.selectionStart !== null) {
    const index = textarea.selectionStart;
    // TODO: allow ranges; delete whole range on backspace, delete
    if (e.key === "Backspace") {
      if (index > 0) {
        text.deleteAt(index - 1);
        myCursor.index = index - 1;
      }
    } else if (e.key === "Delete") {
      if (index < textarea.value.length) {
        text.deleteAt(index);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        myCursor.index = index - 1;
      }
    } else if (e.key === "ArrowRight") {
      if (index < textarea.value.length) {
        myCursor.index = index + 1;
      }
    } else if (e.key === "End") {
      myCursor.index = textarea.value.length;
    } else if (e.key === "Home") {
      myCursor.index = 0;
    } else if (e.key === "Enter") {
      text.insertAt(index, "\n");
      myCursor.index = index + 1;
    } else if (shouldType(e)) {
      text.insertAt(index, e.key);
      myCursor.index = index + 1;
    }
    updateCursor();
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
  textarea.value = text.asArray().join("");
  updateCursor();
});
