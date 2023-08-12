import React from "react";
import { RecipeDoc } from "../doc/recipe_doc";
import { Recipe } from "./recipe";

export function Editor({
  doc,
  connected,
  onConnectedChange,
}: {
  doc: RecipeDoc | null;
  connected: boolean;
  onConnectedChange: (newValue: boolean) => void;
}) {
  if (doc === null) {
    return <p>Loading...</p>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontSize: "16pt",
        }}
      >
        <div>
          <input
            id="connected"
            type="checkbox"
            checked={connected}
            onChange={(e) => onConnectedChange(e.target.checked)}
          />
          <label htmlFor="connected">Connected</label>
        </div>
        <hr style={{ width: "100%" }} />
        <div style={{ flex: "1 0 auto" }}>
          <Recipe recipe={doc.recipe} />
        </div>
      </div>
    );
  }
}
