import { AbstractDoc, RuntimeOptions } from "@collabs/collabs";
import React from "react";
import { CRecipe, Recipe } from "./recipe";

export class RecipeDoc extends AbstractDoc {
  // TODO: way to hide this type, so we don't have to export it?
  readonly recipe: CRecipe;

  constructor(options?: RuntimeOptions) {
    super(options);

    this.recipe = this.runtime.registerCollab(
      "recipe",
      (init) => new CRecipe(init)
    );
  }
}

export function RecipeComponent({ doc }: { doc: RecipeDoc }) {
  return <Recipe recipe={doc.recipe} />;
}
