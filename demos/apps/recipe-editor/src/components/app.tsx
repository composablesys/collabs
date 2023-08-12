import React, { useRef, useState } from "react";
import { LoadDocReturn, loadDoc } from "../doc/load_doc";
import { Editor } from "./editor";

export function App() {
  const [loadDocReturn, setLoadDocReturn] = useState<LoadDocReturn | null>(
    null
  );
  const [connected, setConnected] = useState<boolean>(true);

  // On first render, start loadDoc.
  const firstRender = useRef<boolean>(true);
  if (firstRender.current) {
    firstRender.current = false;
    void loadDoc().then(setLoadDocReturn);
  }

  return (
    <Editor
      doc={loadDocReturn?.doc ?? null}
      connected={connected}
      onConnectedChange={(newValue) => {
        loadDocReturn!.onConnectedChange(newValue);
        setConnected(newValue);
      }}
    />
  );
}
