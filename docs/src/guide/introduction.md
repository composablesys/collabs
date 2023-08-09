# Introduction

**Collabs** is a collections library for **collaborative data structures**. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user.

We call each collaborative data structure a **Collab**, for short.

## Example: Counter

The [Quick Start](../quick_start.html) uses a [`CCounter`](../api/collabs/classes/CCounter.html) Collab. This is an object with a simple numeric API:

```ts
class CCounter {
  add(toAdd: number): void;
  get value(): number;
  // ...
}
```

But unlike an ordinary number, when one user calls `counter.add(1)`, 1 is added to _every_ user's `counter.value`, not just theirs. If multiple users call `counter.add(1)` at the same time, all of their additions go through, increasing their shared value by the total number of calls. In this way, everyone eventually ends up seeing the same `counter.value`, as you'd expect.

You can try this out in the [live demo](https://collabs-demos.herokuapp.com/counter/): open it in multiple tabs, then watch how incrementing the value in one tab also increments the value in the other. This also works if you open the tabs on different devices, since they are connected through our demo server.

You can also try disconnecting one tab by unchecking the box at the top. Verify that if you disconnect one tab, increment both tabs, then reconnect the first tab, they get both increments.

## Example: Whiteboard

Our [whiteboard demo](https://collabs-demos.herokuapp.com/whiteboard/) uses a map Collab to store the board state. Specifically, it uses an [`CValueMap`](../api/collabs/classes/CValueMap.html) that maps each coordinate `[x, y]` to its color:

```ts
const boardState: CValueMap<[x: number, y: number], Color>;
```

Once `boardState` is initialized (TODO discussed later in [Initialization](./initialization.html)), you can use it like an ordinary `Map<[x: number, y: number], Color>`:

```ts
class CValueMap<K, V> {
  get(key: K): V | undefined;
  has(key: K);
  set(key: K, value: V): V; // Returns the set value
  entries(): IterableIterator<[K, V]>;
  // ...
}
```

In particular, when a user draws with `color` on pixel `[x, y]`, the demo calls `boardState.set([x, y], color)`. You can display the current board by iterating over `boardState.entries()`:

```ts
function repaint(ctx: CanvasRenderingContext2D) {
  // Clear old state.
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  // Draw current state.
  for (const [[x, y], [r, g, b]] of boardState.entries()) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
  }
}
```

As an optimization, you can also render changes incrementally, by handling [Collab events](./handling_changes.html#collab-events).

## More Collaborative Data Structures

Collabs comes with more collaborative data structures built-in. Fancy ones include [CRichText](TODO) for rich text, and [CList](TODO) for a list of other Collabs. See [Built-In Collabs](./built_in_collabs.html) for a summary.

For complex apps, you might want to organize your collaborative state into reusable classes. [Data Modeling](./data_modeling) explains how you can make your own Collab that encapsulates existing Collabs in a custom API - a unique feature of our library.

## Using Collabs

Collaborative data structures require a bit more setup than local ones, to make them actually collaborative. The steps are:

1. Create a [**document**](./documents.html) holding your Collabs.
2. [**Handle changes**](./handling_changes.html) to your Collabs, so that when a remote collaborator changes the collaborative state, you update the local display.
3. Configure [**network and storage providers**](./providers.html) that keep your Collabs in sync with remote collaborators and persistent storage.

We go over these steps in the next three pages of the Guide.

## Next Steps

Continue following the Guide with [Documents](./documents.html).

Or, check out the [Quick Start](../quick_start.html) to get started with an app template.
