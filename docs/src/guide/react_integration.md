# React Integration

Collabs is agnostic about what UI framework you use, but it should work fine with React.

The [@collabs/react](https://www.npmjs.com/package/@collabs/react) package provides tools to make this easier:

- [useCollab](../api/react/modules.html#useCollab), a React hook that triggers a rerender whenever `collab`'s state changes (specifically, when it emits an event).
- [CollabsTextInput](../api/react/modules.html#CollabsTextInput), a wrapper around `<input type="text" />` with built-in Collabs sync.

## Examples

For examples using React, see the source code of our [recipe editor demo](https://github.com/composablesys/collabs/tree/master/demos/apps/recipe-editor).

1. [Basic component using a Collab.](https://github.com/composablesys/collabs/tree/master/demos/apps/recipe-editor/src/recipe-component/recipe_name.tsx)
2. [Encapsulated component that inputs a Collabs document.](https://github.com/composablesys/collabs/tree/master/demos/apps/recipe-editor/src/recipe-component/index.tsx)
3. [Loader for a Collabs document (provider integration).](https://github.com/composablesys/collabs/tree/master/demos/apps/recipe-editor/src/loader.tsx)

## Next Steps

Finish the guide with [Gotchas](./gotchas.html).
