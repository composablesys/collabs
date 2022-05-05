# Data Modeling

Collabs is designed to let you create custom type-safe collaborative data models. By _data model_, we mean the model in a model-view-\* architecture: the part that holds the application state. A _collaborative data model_ is then the shared state in a collaborative app, which all users can edit, and which automatically propagates these edits to all users.

In addition to making data models for entire apps, you can make reusable data models for parts of an app. These serve a similar purpose to React Components, but for shared state instead of for the UI. You can even publish them as [Custom Types](./custom_types.md) for others to use.

> **Aside:** Here we have been using the term "collaborative data models", but we could just as well call them "collaborative data structures", like we do for other types in the library. The distinction is only in how they are used: "data structure" brings to mind fundamental building blocks like sets, lists, etc. (e.g. Java Collections), while "data model" suggests a more app-specific thing built on top of these fundamental building blocks.  
> Of course, from the library's perspective, there is no difference. Indeed, many of our built-in "data structures" are actually implemented on top of other data structures using the techniques described here.

## Process

We recommend creating collaborative data models using the following general process:

1. Create a single-user (non-collaborative) version of your data model, using ES6 classes and strong typing.
2. Replace collection types (`Set`, etc.) and primitive types (`boolean`, etc.) with collaborative versions, following the advice in [Collaborative Data Structures](./types.md).
3. Replace your custom classes with subclasses of [`CObject`](./typedoc/classes/CObject.html), whose children are their instance variables.

We illustrate this process with examples below.

Notes:

- In practice, steps 2 and 3 are not sequential, but instead are a back-and-forth. Don't expect your program to compile until you have finished both of them together.
- You may find that you need to revise your choice of collaborative data structures or your class structure, in order to support the right operations or obtain the right semantics (see [Choices](./types.md) for some common choice points).
- You don't need to replace variables with collaborative versions if they are never mutated after being set (`readonly`/`const` and internally immutable).
- For advanced scenarios, like supporting new primitive types or novel behavior in the face of concurrent operations, you may need to use more advanced techniques for creating [Custom Types](./custom_types.md).

<!-- TODO: events somewhere (how to connect model with the view); perhaps also mention ops in each example (controller -> model). -->

## Using `CObject`

Coming Soon. For now, see the example in [template-custom-type](https://github.com/composablesys/collabs/tree/master/template-custom-type).

<!-- TODO: here, or ref elsewhere? (Extra guide page? Custom types? CObject typedoc?) -->

## Examples

For more examples, see the [Demos](https://github.com/composablesys/collabs/tree/master/demos).

### Whiteboard

[Complete demo](https://github.com/composablesys/collabs/tree/master/demos/whiteboard)

**App:** A simple collaborative whiteboard that users can draw on.

**Single-user data model:** We start by considering a single-user (non-collaborative) whiteboard. We could implement this just by drawing on an HTML5 Canvas, without storing the state ourselves. However, per step 1, we should instead store the whiteboard's state in our own data model.

For that, we can just use a `Map` from pixel coordinates to that pixel's current color:

```ts
// The key represents a point in the form: [x, y].
// The value is the color of the stroke.
const boardState = new Map<[x: number, y: number], string>();
```

When the user draws on a point, we set that point's color in `boardState`:

```ts
boardState.set([x, y], color);
```

<!-- We also must integrate this model with the view, i.e., update the Canvas when map keys are set or deleted, to reflect the corresponding pixel's new color (not shown). -->

**Collaborative data model:** Next, we convert the above data model into a collaborative one. Per step 2, we should replace the `Map<[x: number, y: number], string>` with a collaborative version. The table in [Types] asks us to consider whether the value type `string` is immutable or mutable. Here, we treat it as immutable: the color strings cannot be edited in-place, only set to a value. Thus our collaborative replacement is an `LwwCMap<[x: number, y: number], string>`:

```ts
const boardState = runtime.registerCollab(
  "whiteboard",
  collabs.Pre(collabs.LwwCMap)<[x: number, y: number], string>()
);
```

When the user draws on a point, we set that point's color in `boardState`, which turns out to use the exact same code as before:

```ts
boardState.set([x, y], color);
```

This completes our data model. To actually use this data model, we also have to integrate it with the view (Canvas), by updating the view in response to [Events](./events.md) (either from the local user or other collaborators). For example:

```ts
// ctx is the Canvas's getContext("2d").
boardState.on("Set", (event) => {
  ctx.fillStyle = boardState.get(event.key)!;
  ctx.fillRect(event.key[0], event.key[1], 1, 1);
});

boardState.on("Delete", (event) => {
  ctx.clearRect(event.key[0], event.key[1], 1, 1);
});
```

### Minesweeper

[Complete demo](https://github.com/composablesys/collabs/tree/master/demos/minesweeper)

**App:** A game of Minesweeper that all users play together (anyone can click to reveal a square).

**Single-user data model:** We again start by considering a single-user Minesweeper app. Let's represent each tile in the grid as an instance of a `Tile` class, and the whole board as an instance of a `Minesweeper` class.

For each tile, we need to store:

- whether the tile has been revealed
- the tile's flag state (none/flag/question flag)
- whether the tile is a mine
- what number to display when revealed (how many neighboring mines it has).

So, we define class `Tile` to have the following properties:

```ts
class Tile {
  revealed: boolean;
  flag: FlagStatus; // FlagStatus is a custom enum
  readonly isMine: boolean;
  readonly number: number;

  // Constructor, methods...
}
```

Note that `isMine` and `number` are `readonly` since they cannot be changed by the user.

We then define class `Minesweeper` to store a grid of tiles:

```ts
class Minesweeper {
  readonly tiles: Tile[][];
  readonly width: number;
  readonly height: number;

  constructor(
    width: number,
    height: number,
    fractionMines: number,
    startX: number,
    startY: number
  ) {
    // Fill in tiles with a random width X height board having
    // fractionMines mines and with the starting tile
    // (startX, startY) guaranteed safe.
    // ...
  }

  // Methods...
}
```

The app's top-level state is a variable `currentGame: Minesweeper`. When the user starts a new game, `currentGame` is set to a new instance of `Minesweeper`.

**Collaborative data model:** Next, we convert the above data model into a collaborative one.

Per step 2, we should replace `Tile`'s properties with collaborative versions:

- `revealed: boolean`: This should start `false`, and once it becomes `true`, it should stay that way forever - you can't "un-reveal" a tile (especially a mine!). `TrueWinsCBoolean` satisfies these conditions, so we use that.
- `flag: FlagStatus`: Recall that `FlagStatus` is a custom enum. As an opaque immutable type, the table in [Collaborative Data Structures](./types.md) suggests `LwwCVariable<FlagStatus>`. In case of concurrent changes to the flag, this will pick one arbitrarily, which seems fine from the users' perspective.
- `readonly isMine: boolean;`, `readonly number: number;`: Since these are fixed, we actually don't need to make them collaborative. We can just set them in the constructor as usual.

Also, per step 3, we should replace `Tile` with a subclass of `CObject`. That leads to the class `CTile` below:

```ts
class CTile extends collabs.CObject {
  readonly revealed: collabs.TrueWinsCBoolean;
  readonly flag: collabs.LwwCVariable<FlagStatus>;
  readonly isMine: boolean;
  readonly number: number;

  constructor(initToken: collabs.InitToken, isMine: boolean, number: number) {
    super(initToken);
    this.revealed = this.addChild(
      "revealed",
      collabs.Pre(collabs.TrueWinsCBoolean)()
    );
    this.flag = this.addChild(
      "flag",
      collabs.Pre(collabs.LwwCVariable)<FlagStatus>(FlagStatus.NONE)
    );
    this.isMine = isMine;
    this.number = number;
  }

  // Methods...
}
```

We must likewise transform the `Minesweeper` class. This deviates from the usual process in two ways.

First, we cannot use randomness in the constructor: per [Initialization](./initialization.md), the constructor must behave identically when called on different users with the same arguments. Instead, we use a PRNG, and pass its seed as a constructor argument. The seed will be randomly set by whichever user starts a new game, so that the board is still random.

Second, even though `tiles` has type `Tile[][]` and the table maps `Array` to `CList` implementations, there is actually no need for us to use a `CList` here. Indeed, we don't plan to mutate the arrays themselves after the constructor, just the tiles inside them. Instead, we treat each `Tile` as its own property with its own name, using the arrays only as a convenient way to store them. (See Arrays vs `CLists` in [Collaborative Data Structures](./types.md).)

```ts
class MinesweeperCollab extends collabs.CObject {
  readonly tiles: CTile[][];
  readonly width: number;
  readonly height: number;

  constructor(
    initToken: collabs.InitToken,
    width: number,
    height: number,
    fractionMines: number,
    startX: number,
    startY: number,
    seed: string
  ) {
    super(initToken);
    const rng = seedrandom(seed);
    // Use rng to plan out a width X height board having
    // fractionMines mines and with the starting tile
    // (startX, startY) guaranteed safe, accessed using
    // this.isMine(x, y) and this.number(x, y).
    // ...
    // Setup tiles.
    this.tiles = new Array<CTile[]>(width);
    for (let x = 0; x < width; x++) {
      this.tiles[x] = new Array<CTile>(height);
      for (let y = 0; y < height; y++) {
        this.tiles[x][y] = this.addChild(
          x + ":" + y, // Unique name
          collabs.Pre(CTile)(this.isMine(x, y), this.number(x, y))
        );
      }
    }
  }

  // Methods...
}
```

Finally, we need to convert the variable `currentGame: Minesweeper` that holds the app's top-level state. Since games can be created dynamically - there's not just a single game the whole time - this is really a _reference_ to a Minesweeper object. The table in [Collaborative Data Structures](./types.md) suggests `LwwMutCVariable<CMinesweeper>` because the game is internally mutable:

```ts
const currentGame = runtime.registerCollab(
  "currentGame",
  collabs.Pre(collabs.LwwMutCVariable)(
    collabs.ConstructorAsFunction(CMinesweeper)
  )
);
```

To start a new game, we call `currentGame.set` with `CMinesweeper`'s constructor arguments (except `initToken`).

This completes our data model. To actually use this data model, we also have to integrate it with the view, by updating the view in response to [Events](./events.md) (either from the local user or other collaborators). An easy (though inefficient) way to do this is to refresh the entire view whenever anything changes:

```ts
runtime.on("Change", () => {
  // Refresh the whole view so that it displays currentGame.
  // ...
});
```

<!-- ### Spreadsheet

TODO

Point out variables general usefulness (again), for spreadsheet cell.


### Sorted Set

TODO: Views (example with sorted set): not directly replicated, but still EC so long as you do events right. Load/save.

### Rich Text (Quill)

TODO: rich text? To point out need for adjusting the original data model to fit the known operations (no good "split" op on CList, which you'd need to match Quill's exact data model). -->
