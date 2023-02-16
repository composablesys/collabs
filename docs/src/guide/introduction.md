# Introduction

**Collabs** is a collections library for **collaborative data structures**. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user.

We sometimes use `Collab` as an abbreviation for "collaborative data structure". It is also the name of an abstract class, [`Collab`](../api/collabs/classes/Collab.html), that all of our collaborative data structures extend. Then the Collabs library is literally a library of `Collab`s.

> To avoid confusion between the library name (Collabs) vs the plural of `Collab` (`Collab`s), we will always put the latter in `code font`.

## Example: Counter

For example, the [Quick Start](../quick_start.html) (live demo [here](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/counter/dist/counter.html)) uses a [`CCounter`](../api/collabs/classes/CCounter.html) collaborative data structure. This is an object that has an API like a `number`:

```ts
class CCounter {
  add(toAdd: number): void;
  get value(): number;
  // ...
}
```

But unlike an ordinary number, when one user calls `counter.add(1)`, 1 is added to _every_ user's `counter.value`, not just theirs. If multiple users call `counter.add(1)` at the same time, all of their additions go through, increasing their shared value by the total number of calls. In this way, everyone eventually (after network delay) ends up seeing the same `counter.value`, as you'd expect.

You can try this out in the [live demo](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/counter/dist/counter.html): open it in multiple tabs, then watch how incrementing the value in one tab also increments the value in the other. This also works if you open the tabs on different devices, since they are connected through our demo server.

You can also try disconnecting one tab by unchecking the box at the top. Verify that if you disconnect one tab, increment both tabs, then reconnect the first tab, all tabs end up seeing both increments.

## Example: Whiteboard

`CCounter` is simple but not especially useful. Collection types, like maps, are more useful.

For example, our [whiteboard demo](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/whiteboard/dist/whiteboard.html) uses a map collaborative data structure to store the board state. Specifically, it uses an [`CValueMap`](../api/collabs/classes/CValueMap.html) from coordinates `[x: number, y: number]` to HTML color strings:

```
const boardState: collabs.CValueMap<[x: number, y: number], string>
```

Here:

- "LWW" stands for _Last Writer Wins_. It describes what happens if two users try to set the color of the same pixel concurrently: the "last" one, according to senders' clock times, wins and sets the color.
- We write the type as `collabs.CValueMap` because we have imported as the library as `import * as collabs from @collabs/collabs`. This is the recommended style if you want to keep the library in its own namespace, although you can also import individual names directly, e.g., `import { CValueMap } from @collabs/collabs`.
- The `boardState` is a `const` because we always use the same `CValueMap` _instance_; all operations mutate the map internally. This is a general rule for Collabs: you keep the same instance of a `Collab` for its whole lifetime, while operations (either by the local user and by other collaborators) mutate its internal state.

Once `boardState` is initialized (discussed later in [Initialization](./initialization.html)), you can use it like an ordinary `Map<[x: number, y: number], string>`:

```ts
class CValueMap<K, V> {
  get(key: K): V | undefined;
  has(key: K);
  set(key: K, value: V): V; // Returns the set value
  entries(): IterableIterator<[K, V]>;
  // ...
}
```

In particular, when a user draws with `color` on pixel `[x, y]`, the demo calls `boardState.set([x, y], color)`; and you can display the current board by iterating over `boardState.entries()`:

```ts
function repaint(ctx: CanvasRenderingContext2D) {
  // Clear old state.
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  // Draw current state.
  for (const [[x, y], color] of boardState.entries()) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }
}
```

> The actual [demo code](https://github.com/composablesys/collabs/tree/master/demos/apps/whiteboard) is a bit different because it uses granular "pixels", and because it optimizes repaints using [Events] (covered in the [Advanced Guide](../advanced/)).

## More Collaborative Data Structures

Collabs comes with many more collaborative data structures built-in. These include other primitive and collection types like `CCounter` and `CValueMap`, plus collections like `CSet` that can contain `Collab`s as elements. See [Built-In `Collab`s](./build_in_collabs.html) for a summary.

For complex apps, you might want to organize your collaborative state into reusable classes. [Data Modeling](./data_modeling) explains how you can make these classes be `Collab`s themselves---a unique feature of our library.

## Using Collabs

There are a few extra wrinkles when using Collabs, relative to using ordinary (non-collaborative) data structures. We go over them in the next sections of this Guide. Briefly, they are:

1. [**Entry Points:**](./entry_points.html) Before you can initialize your `Collab`s, you must create an entry point, which is either a [CRDTApp](../api/collabs/classes/CRDTApp.html) or a [CContainer](../api/container/classes/CContainer.html). This handles connecting your `Collab`s to other collaborators over the network, loading saved state from storage, and other utilities.
2. [**Initializing `Collab`s:**](./initialization.html) To ensure that your `Collab`s are connected to the network, they need to know about your entry point. We enforce this by not letting you initialize `Collab`s in isolation by calling their constructor directly. Instead, you need to initialize `Collab`s using a method like [CRDTApp.registerCollab](../api/collabs/classes/CRDTApp.html#registerCollab).
3. [**Handling Changes:**](./handling_changes.html) When your collaborative state changes, such as when you receive an update from a remote user, you need to know about that change so you can refresh your display. [Handling Changes](./handling_changes.html) describes an easy way to do this. More flexible/optimized techniques are described in [Events](../advanced/events.html) in the [Advanced Guide](../advanced/).

## Next Steps

Continue following the Guide with [Entry Points](./entry_points.html).

Or, if you are impatient, skip to the [Walkthrough of Quick Start](../walkthrough.html) to see how everything fits together in a complete app.
