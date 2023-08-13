import { AbstractDoc, DocOptions } from "@collabs/collabs";
import React from "react";
import { CRecipe, Recipe } from "./recipe";

/**
 * The type of document accepted by RecipeComponent.
 *
 * We expose this alongside RecipeComponent, so that callers can
 * construct its `doc` prop. Note that higher-level components
 * don't interact with the recipe state directly; they just construct
 * RecipeDoc and subscribe it to providers. Basically,
 * RecipeDoc serves as an opaque "schema" for RecipeComponent's data.
 */
export class RecipeDoc extends AbstractDoc {
  /**
   * @ignore
   */
  readonly recipe: CRecipe;

  constructor(options?: DocOptions) {
    super(options);

    this.recipe = this.runtime.registerCollab(
      "recipe",
      (init) => new CRecipe(init)
    );

    // Set the initial value using a base state:
    // A single ingredient, and a "\n" in the Instructions for Quill.
    // See https://collabs.readthedocs.io/en/latest/advanced/initial_values.html#loading-a-base-state
    // TODO: To get rid of this,
    // - Work around Quill's need for "\n".
    // - In a real app, one user will "create" the document; they can do the
    // insert-first-ingredient op then. We only have to use a base state
    // because our demo doc "always exists".
    if (this.replicaID !== "BASE") {
      this.load(RecipeDoc.makeBaseState());
    }
  }

  private static makeBaseState(): Uint8Array {
    const doc = new RecipeDoc({ debugReplicaID: "BASE" });

    doc.transact(() => {
      doc.recipe.instructions.insert(0, "\n", {});
      doc.recipe.addIngredient();
    });

    return doc.save();
  }
}

/**
 * React component that renders & mutates a RecipeDoc.
 *
 * You can use RecipeComponent and RecipeDoc as a template for
 * how to expose a Collabs-powered React component:
 * take its doc(s) as input with a specific AbstractDoc type.
 * That way, your parent can construct the doc, subscribe it
 * to providers, and then hand it you for everything else.
 */
export function RecipeComponent({ doc }: { doc: RecipeDoc }) {
  return <Recipe recipe={doc.recipe} />;
}
