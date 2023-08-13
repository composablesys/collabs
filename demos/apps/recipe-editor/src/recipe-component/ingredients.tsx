import { CollabsTextInputHandle, objectKey, useCollab } from "@collabs/react";
import React, { useEffect, useRef, useState } from "react";
import { CIngredient, Ingredient } from "./ingredient";
import { CRecipe } from "./recipe";

import "./ingredients.css";

export function Ingredients({ recipe }: { recipe: CRecipe }) {
  useCollab(recipe);

  // When the local user adds a new ingredient, scroll to it and
  // select its text.
  const [newIngr, setNewIngr] = useState<CIngredient | null>(null);
  const newIngrTextRef = useRef<CollabsTextInputHandle>(null);
  useEffect(() => {
    if (newIngrTextRef.current === null) return;
    newIngrTextRef.current.select();
    newIngrTextRef.current.scrollIntoView();
    // Use newIngr as dependency so this only runs on the first render after adding.
  }, [newIngr]);

  const ingrs = [...recipe.ingredients()];

  return (
    <>
      <div className="title">Ingredients</div>
      {ingrs.map((ingr, index) => (
        // Use ingr "itself" as a React key instead of Position, so that
        // React remembers component state even during move ops.
        // TODO: scroll-to-ingredient if the one you're editing is moved.
        <div key={objectKey(ingr)} className="ingredientWrapper">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              style={{ alignSelf: "flex-start" }}
              disabled={index === 0}
              onClick={() => recipe.moveIngredient(ingr, index - 1)}
            >
              ↑
            </button>
            <button
              style={{ alignSelf: "flex-start" }}
              disabled={index === ingrs.length - 1}
              // +2 because we have to hop over ourselves as well.
              onClick={() => recipe.moveIngredient(ingr, index + 2)}
            >
              ↓
            </button>
          </div>
          <Ingredient
            ingr={ingr}
            textRef={ingr === newIngr ? newIngrTextRef : undefined}
            // TODO: delay keepIngredient slightly, in case of technically
            // sequential but psychologically concurrent delete+edit?
            onChange={() => recipe.keepIngredient(ingr)}
          />
          <button
            onClick={() => recipe.deleteIngredient(ingr)}
            className="deleteButton"
          >
            X
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          const ingr = recipe.addIngredient();
          setNewIngr(ingr);
        }}
        className="addButton"
      >
        +
      </button>
      <br />
      <button onClick={() => recipe.scale(2)} className="scaleButton">
        Double the recipe!
      </button>
      &nbsp;&nbsp;
      <button onClick={() => recipe.scale(0.5)} className="scaleButton">
        Halve the recipe!
      </button>
    </>
  );
}
