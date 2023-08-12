import { CText, Cursor, Cursors } from "@collabs/collabs";
import { nonNull } from "@collabs/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useCollab } from "../hooks/use_collab";

export type CollabsTextInputProps = {
  text: CText;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "type" | "defaultValue" | "ref"
>;

export class CollabsTextInputHandle {
  constructor(
    private readonly input: HTMLInputElement,
    private readonly updateCursors: () => void
  ) {}
  get selectionStart(): number | null {
    return this.input.selectionStart;
  }

  set selectionStart(s: number | null) {
    this.input.selectionStart = s;
    this.updateCursors();
  }

  get selectionEnd(): number | null {
    return this.input.selectionEnd;
  }

  set selectionEnd(s: number | null) {
    this.input.selectionEnd = s;
    this.updateCursors();
  }

  get selectionDirection() {
    return this.input.selectionDirection;
  }

  set selectionDirection(s: "forward" | "backward" | "none" | null) {
    this.input.selectionDirection = s;
  }

  setSelectionRange(
    start: number | null,
    end: number | null,
    direction?: "forward" | "backward" | "none" | undefined
  ) {
    this.input.setSelectionRange(start, end, direction);
    this.updateCursors();
  }

  select() {
    this.input.select();
    // No need to updateCursors - the onSelect handler will do that.
  }

  blur() {
    this.input.blur();
  }

  click() {
    this.input.click();
  }

  focus() {
    this.input.focus();
  }

  scrollIntoView() {
    this.input.scrollIntoView();
  }
}

/**
 * An `<input type="text" />` component that syncs its state to a Collabs CText,
 * provided in the `text` prop.
 *
 * Local changes update `text` collaboratively, and remote updates to `text`
 * show up in the input field. We also manage the local selection in the
 * usual way for collaborative text editing.
 *
 * ## Props
 *
 * - `text: CText`: The Collabs CText to sync to.
 * - Otherwise the same as HTMLInputElement, except we omit a few
 * that don't make sense (`value`, `defaultValue`, `type`).
 *
 * ## Advanced usage
 *
 * - To change the text programmatically, mutate `text`.
 * - Passing `readOnly` or `disabled` prevents editing.
 * - You may intercept and prevent events like `onKeyDown`.
 * - We expose a number of `<input>` methods through our ref
 * ([[CollabsTextInputRef]]), including
 * the ability to set `selectionStart` / `selectionEnd`. Once set,
 * the selection will move around as usual.
 */
export const CollabsTextInput = forwardRef<
  CollabsTextInputHandle,
  CollabsTextInputProps
>(function CollabsTextInput(props, ref) {
  const { text, ...other } = props;
  useCollab(text);

  const [startCursor, setStartCursor] = useState<Cursor>(
    Cursors.fromIndex(0, text)
  );
  const [endCursor, setEndCursor] = useState<Cursor>(
    Cursors.fromIndex(0, text)
  );
  useEffect(() => {
    // Update the selection to match startCursor and endCursor.
    // We do this on every render (no deps) since it is almost as much
    // work to check if it is necessary (= indices changed).
    if (inputRef.current === null) return;
    inputRef.current.selectionStart = Cursors.toIndex(startCursor, text);
    inputRef.current.selectionEnd = Cursors.toIndex(endCursor, text);
  });

  // Updates startCursor and endCursor to match the current selection.
  function updateCursors() {
    if (inputRef.current === null) return;
    setStartCursor(
      Cursors.fromIndex(inputRef.current.selectionStart ?? 0, text)
    );
    setEndCursor(Cursors.fromIndex(inputRef.current.selectionEnd ?? 0, text));
  }

  // Whether we should type e.key.
  function shouldType(e: React.KeyboardEvent<HTMLInputElement>): boolean {
    return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
  }

  // Types str with the given selection.
  function type(str: string, startIndex: number, endIndex: number) {
    if (startIndex < endIndex) {
      // Delete current selection
      text.delete(startIndex, endIndex - startIndex);
    }
    text.insert(startIndex, str);
    setStartCursor(Cursors.fromIndex(startIndex + str.length, text));
    setEndCursor(Cursors.fromIndex(startIndex + str.length, text));
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(
    ref,
    () => new CollabsTextInputHandle(nonNull(inputRef.current), updateCursors)
  );

  return (
    <input
      {...other}
      type="text"
      ref={inputRef}
      value={text.toString()}
      onChange={
        props.onChange ??
        (() => {
          // Add dummy onChange to prevent React readonly complaints (invalid
          // because we edit on keypress using a ref).
        })
      }
      onSelect={(e) => {
        if (props.onSelect) {
          props.onSelect(e);
          if (e.defaultPrevented) return;
        }

        updateCursors();
      }}
      onKeyDown={(e) => {
        if (props.onKeyDown) {
          props.onKeyDown(e);
          if (e.defaultPrevented) return;
        }
        if (props.readOnly || props.disabled) return;

        const startIndex = Cursors.toIndex(startCursor, text);
        const endIndex = Cursors.toIndex(endCursor, text);
        if (e.key === "Backspace") {
          if (endIndex > startIndex) {
            text.delete(startIndex, endIndex - startIndex);
            setEndCursor(Cursors.fromIndex(startIndex, text));
          } else if (endIndex === startIndex && startIndex > 0) {
            text.delete(startIndex - 1);
            setStartCursor(Cursors.fromIndex(startIndex - 1, text));
          }
        } else if (e.key === "Delete") {
          if (endIndex > startIndex) {
            text.delete(startIndex, endIndex - startIndex);
            setEndCursor(Cursors.fromIndex(startIndex, text));
          } else if (endIndex === startIndex && startIndex < text.length) {
            text.delete(startIndex);
          }
        } else if (shouldType(e)) {
          type(e.key, startIndex, endIndex);
        } else {
          // Other events we let happen normally (don't preventDefault).
          // These include selection changes (handled by onSelect), enter/tab
          // (which just change focus, don't add text), Ctrl cut/paste
          // (handled in their own listeners), and Ctrl copy (default behavior
          // is fine).
          return;
        }

        // Don't let the browser type the key, we do it for them.
        e.preventDefault();
      }}
      onPaste={(e) => {
        if (props.onPaste) {
          props.onPaste(e);
          if (e.defaultPrevented) return;
        }
        if (props.readOnly || props.disabled) return;

        if (e.clipboardData) {
          const startIndex = Cursors.toIndex(startCursor, text);
          const endIndex = Cursors.toIndex(endCursor, text);
          const pasted = e.clipboardData.getData("text");
          type(pasted, startIndex, endIndex);
        }
        e.preventDefault();
      }}
      onCut={(e) => {
        if (props.onCut) {
          props.onCut(e);
          if (e.defaultPrevented) return;
        }
        if (props.readOnly || props.disabled) return;

        const startIndex = Cursors.toIndex(startCursor, text);
        const endIndex = Cursors.toIndex(endCursor, text);
        if (startIndex < endIndex) {
          const selected = text.toString().slice(startIndex, endIndex);
          void navigator.clipboard.writeText(selected);
          text.delete(startIndex, endIndex - startIndex);
        }
        e.preventDefault();
      }}
      onDrop={(e) => {
        if (props.onDrop) props.onDrop(e);
        else {
          // I don't know how to get the cursor position to drop on,
          // so for now we just disable drop. But a caller can override
          // onDrop and update the CText themselves.
          e.preventDefault();
        }
      }}
    />
  );
});
