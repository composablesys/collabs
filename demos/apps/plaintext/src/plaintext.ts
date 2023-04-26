import * as collabs from "@collabs/collabs";
import { CContainer } from "@collabs/container";

(async function () {
  const container = new CContainer();

  const text = container.registerCollab(
    "text",
    (init) => new collabs.CText(init)
  );

  await container.load();

  const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
  textarea.value = text.toString(); // Use loaded state here.

  // Display text changes
  text.on("Any", () => {
    textarea.value = text.toString();
    updateSelection();
  });

  let myStartCursor = collabs.Cursors.fromIndex(0, text);
  let myEndCursor = collabs.Cursors.fromIndex(0, text);
  function updateCursors() {
    // Need to do this on a delay because the event doesn't
    // due its default action (updating the handler) until
    // after the event handlers.
    setTimeout(() => {
      myStartCursor = collabs.Cursors.fromIndex(textarea.selectionStart, text);
      myEndCursor = collabs.Cursors.fromIndex(textarea.selectionEnd, text);
    }, 0);
  }
  function updateSelection() {
    textarea.selectionStart = collabs.Cursors.toIndex(myStartCursor, text);
    textarea.selectionEnd = collabs.Cursors.toIndex(myEndCursor, text);
  }

  window.addEventListener("selectionchange", updateCursors);
  textarea.addEventListener("mousedown", updateCursors);
  textarea.addEventListener("mousemove", (e) => {
    if (e.buttons === 1) updateCursors();
  });
  textarea.addEventListener("mouseclick", updateCursors);

  // Change the text when a key is pressed in textarea
  textarea.addEventListener("keydown", (e) => {
    const startIndex = collabs.Cursors.toIndex(myStartCursor, text);
    const endIndex = collabs.Cursors.toIndex(myEndCursor, text);
    if (e.key === "Backspace") {
      if (endIndex > startIndex) {
        text.delete(startIndex, endIndex - startIndex);
        myEndCursor = collabs.Cursors.fromIndex(startIndex, text);
      } else if (endIndex === startIndex && startIndex > 0) {
        text.delete(startIndex - 1);
        myStartCursor = collabs.Cursors.fromIndex(startIndex - 1, text);
      }
    } else if (e.key === "Delete") {
      if (endIndex > startIndex) {
        text.delete(startIndex, endIndex - startIndex);
        myEndCursor = collabs.Cursors.fromIndex(startIndex, text);
      } else if (
        endIndex === startIndex &&
        startIndex < textarea.value.length
      ) {
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
    myStartCursor = collabs.Cursors.fromIndex(startIndex + str.length, text);
    myEndCursor = collabs.Cursors.fromIndex(startIndex + str.length, text);
  }

  function shouldType(e: KeyboardEvent): boolean {
    return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
  }

  textarea.addEventListener("paste", (e) => {
    if (e.clipboardData) {
      const pasted = e.clipboardData.getData("text");
      type(
        pasted,
        collabs.Cursors.toIndex(myStartCursor, text),
        collabs.Cursors.toIndex(myEndCursor, text)
      );
      updateSelection();
    }
    e.preventDefault();
  });

  textarea.addEventListener("cut", () => {
    const startIndex = collabs.Cursors.toIndex(myStartCursor, text);
    const endIndex = collabs.Cursors.toIndex(myEndCursor, text);
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

  // Ready.
  container.ready();
})();
