# Handling Changes

A Collab changes state not just when you mutate it locally, but also when you receive updates from a remote collaborator, or when you load some state from storage. You need to know about these changes so that you can update your display.

## Document "Change" Event

The easiest way to handle changes is to listen on your document's "Change" event, like so:

```ts
function refreshDisplay() {
  // Refresh the display (and other views of the collaborative state)
  // so that it reflects the current state of your Collabs.
  // ...
}
doc.on("Change", refreshDisplay);
```

Here `doc` can be a [CRuntime](../api/collabs/classes/CRuntime.html) or [AbstractDoc](../api/collabs/classes/AbstractDoc.html). This "Change" event is emitted after each synchronous set of changes, as described in [our API documentation](../api/collabs/interfaces/DocEventsRecord.html#Change).

For example, in the [Quick Start](../quick_start.html), we did:

```ts
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
doc.on("Change", refreshDisplay);
```

## Collab Events

Each Collab also emits type-specific events describing changes as they occur.

For example, in [our whiteboard demo](https://github.com/composablesys/collabs/blob/master/demos/apps/whiteboard/src/main.ts), it would be inefficient to repaint the whole whiteboard after each change. Instead, we listen on CValueMap's ["Set"](../api/collabs/interfaces/MapEventsRecord.html#Set) and ["Delete"](../api/collabs/interfaces/MapEventsRecord.html#Delete) events:

```ts
const boardState: CValueMap<[x: number, y: number], Color> = ...;
const ctx: CanvasRenderingContext2D = ...;

// Draw points
boardState.on("Set", (event) => {
  const [x, y] = event.key;
  const [r, g, b] = event.value;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(x, y, 1, 1);
});

// Clear points
boardState.on("Delete", (event) => {
  const [x, y] = event.key;
  ctx.clearRect(x, y, 1, 1);
});
```

Each of our built-in Collabs emits events like these that completely describe how its state changes over time. You can find a Collab's event names and types in the API docs for its `on` method (click the `...EventsRecord` type name). E.g., here is [CValueMap.on](../api/collabs/classes/CValueMap.html#on), and here is its [MapEventsRecord](../api/collabs/interfaces/MapEventsRecord.html).

## useCollab React Hook

In a React component, call [useCollab(collab)](../api/react/modules.html#useCollab) to trigger a rerender whenever `collab`'s state changes (specifically, when it emits an event):

```tsx
import { useCollab } from "@collabs/react";
import React from "react";

function BoardInspector({
  boardState,
}: {
  boardState: CValueMap<[x: number, y: number], Color>;
}) {
  // Rerender when boardState changes.
  useCollab(boardState);

  return <p>The corner pixel is {boardState.get([0, 0])}.</p>;
}
```

## Next Steps

Finish setting up your Collabs by configuring [Providers](./providers.html).
