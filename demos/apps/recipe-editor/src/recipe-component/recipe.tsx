import { CList, CObject, CRichText, CVar, InitToken } from "@collabs/collabs";
import React from "react";
import { CollabsQuill } from "../collabs-quill";
import { CIngredient } from "./ingredient";
import { Ingredients } from "./ingredients";
import { RecipeName } from "./recipe_name";

import "./recipe.css";

export class CRecipe extends CObject {
  readonly recipeName: CVar<string>;
  private readonly _ingrs: CList<CIngredient, []>;
  // Controls the ambient scale.
  private readonly _scaleVar: CVar<number>;
  readonly instructions: CRichText;

  constructor(init: InitToken) {
    super(init);

    this.recipeName = super.registerCollab(
      "name",
      (nameInit) => new CVar(nameInit, "Untitled")
    );
    this._scaleVar = super.registerCollab(
      "scaleVar",
      (scaleVarInit) => new CVar(scaleVarInit, 1)
    );
    this._ingrs = super.registerCollab(
      "ingrs",
      (ingrsInit) =>
        new CList(
          ingrsInit,
          (valueInit) => new CIngredient(valueInit, this._scaleVar)
        )
    );
    this.instructions = super.registerCollab(
      "instructions",
      (instInit) => new CRichText(instInit)
    );

    // Expose _ingrs events for ingredients.tsx's useCollab call.
    this._ingrs.on("Any", (e) => this.emit("Any", e));
  }

  ingredients(): IterableIterator<CIngredient> {
    return this._ingrs.values();
  }

  addIngredient(): CIngredient {
    return this._ingrs.push();
  }

  deleteIngredient(ingr: CIngredient): void {
    // Note: CList.indexOf is as fast as get(index), not a linear time search.
    const index = this._ingrs.indexOf(ingr);
    if (index === -1) return;
    // Use archive so keepIngredient can resurrect in case of concurrent edits.
    this._ingrs.archive(index);
  }

  /**
   * Keeps ingr "alive" (present) in the list. Called each time the
   * ingredient is edited.
   */
  keepIngredient(ingr: CIngredient): void {
    this._ingrs.restore(ingr);
  }

  moveIngredient(ingr: CIngredient, index: number): void {
    // Note: CList.indexOf is as fast as get(index), not a linear time search.
    const startIndex = this._ingrs.indexOf(ingr);
    if (startIndex === -1) return;
    this._ingrs.move(startIndex, index);
  }

  scale(factor: number) {
    if (factor < 0) throw new Error("Invalid factor: less than 0");
    if (factor === 0) throw new Error("Not yet implemented: scale by 0");

    // Note this is an LWW set - concurrent scales don't multiply.
    // That is probably what the users expect.
    this._scaleVar.value *= factor;
  }
}

export function Recipe({ recipe }: { recipe: CRecipe }) {
  // No need to call useCollab(recipe) because this component doesn't
  // directly read its state.

  return (
    <div className="outerDiv">
      <RecipeName recipeName={recipe.recipeName} />
      <div className="splitViewport">
        <div className="split left">
          <div className="centered">
            <Ingredients recipe={recipe} />
          </div>
        </div>
        <div className="split right">
          <div className="instructions">
            <div className="title">Instructions</div>
            <CollabsQuill text={recipe.instructions} />
          </div>
        </div>
      </div>
    </div>
  );
}
