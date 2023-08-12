import { AbstractDoc, RuntimeOptions } from "@collabs/collabs";
import { CRecipe } from "./components/recipe";

export class RecipeDoc extends AbstractDoc {
  readonly recipe: CRecipe;

  constructor(options?: RuntimeOptions) {
    super(options);

    this.recipe = this.runtime.registerCollab(
      "recipe",
      (init) => new CRecipe(init)
    );
  }
}
