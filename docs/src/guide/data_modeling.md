# Data Modeling and Using CObjects

Collabs is designed to let you create custom type-safe collaborative data models. By _data model_, we mean the model in a model-view-\* architecture: the part that holds the application state. A _collaborative data model_ is then the shared state in a collaborative app, which all users can edit, and which automatically propagates these edits to all users.

In addition to making data models for entire apps, you can make reusable data models for parts of an app. These serve a similar purpose to React Components, but for shared state instead of for the UI. You can even publish them in 3rd-party libraries for others to use.

<details>
<summary>Aside</summary>
Here we have been using the term "collaborative data models", but we could just as well call them "collaborative data structures", like we do for other types in the library. The distinction is only in how they are used: "data structure" brings to mind fundamental building blocks like sets, lists, etc. (e.g. Java Collections), while "data model" suggests a more app-specific thing built on top of these fundamental building blocks.

Of course, from the library's perspective, there is no difference. Indeed, many of our built-in "data structures" are actually implemented on top of other data structures using the techniques described here.

</details>

## Process

We recommend creating collaborative data models using the following general process:

1. Create a single-user (non-collaborative) version of your data model, using ES6 classes and strong typing.
2. Replace collection types (`Set`, etc.) and primitive types (`boolean`, etc.) with Collab versions, following the advice in [Built-in Collabs](./built_in_collabs.html).
3. Replace your custom classes with subclasses of [CObject](../api/collabs/classes/CObject.html), whose children are their instance variables.

We illustrate this process with examples below.

Notes:

- In practice, steps 2 and 3 are not sequential, but instead are a back-and-forth. Don't expect your program to compile until you have finished both of them together.
- You may find that you need to revise your choice of Collabs or your class structure, in order to support the right operations or obtain the right semantics (see [Built-in Collabs](./built_in_collabs.html) for some common choice points).
- You don't need to replace variables with collaborative versions if they are never mutated after being set (`readonly`/`const` and internally immutable).

## Examples

There are some examples below. For more examples, see the source code for our [built-in Collabs](https://github.com/composablesys/collabs/tree/master/crdts/src) or [demos](https://github.com/composablesys/collabs/tree/master/demos/apps).

### [CPairs](https://github.com/composablesys/collabs/blob/master/template-custom-type/src/custom_type.ts)

**App:** We want to create a pair of variables.

**Single-user data model:** We start by thinking about a single-user pairs.

```ts
class Pair<T, U> {
  private readonly firstReg: T;
  private readonly secondReg: U;

  constructor(firstInitial: T, secondInitial: U) {
    this.firstReg = firstInitial;
    this.secondReg = secondInitial;
  }
  get first(): T {
    return this.firstReg;
  }

  set first(first: T) {
    this.firstReg = first;
  }

  get second(): U {
    return this.secondReg;
  }

  set second(second: U) {
    this.secondReg = second;
  }
}
```

**Collaborative data model:** We now give a collaborative version in the form of a custom Collab that is called CPair, which can hold a pair collaboratively.

```ts
class CPair<T, U> extends CObject {
  // First, declare the variables.
  // Notice that we have two private variables, and they are
  // both Collabs instead of local variables.
  private readonly firstReg: CVar<T>;
  private readonly secondReg: CVar<U>;

  constructor(init: InitToken, firstInitial: T, secondInitial: U) {
    super(init);

    // Setup child Collabs.
    this.firstReg = this.registerCollab(
      "firstReg",
      (init) => new Collabs.CVar(init, firstInitial)
    );
    this.secondReg = this.registerCollab(
      "secondReg",
      (init) => new Collabs.CVar(init, secondInitial)
    );
  }

  // Convert our own methods into child methods.
  get first(): T {
    return this.firstReg.value;
  }

  set first(first: T) {
    this.firstReg.value = first;
  }

  get second(): U {
    return this.secondReg.value;
  }

  set second(second: U) {
    this.secondReg.value = second;
  }
}
```

### Whiteboard

[Complete demo](https://github.com/composablesys/collabs/tree/master/demos/apps/whiteboard)

**App:** A simple collaborative whiteboard that users can draw on.

**Single-user data model:** We start by considering a single-user (non-collaborative) whiteboard. We could implement this just by drawing on an HTML5 Canvas, without storing the state ourselves. However, per step 1, we should instead store the whiteboard's state in our own data model.

For that, we can just use a `Map` from pixel coordinates to that pixel's current color:

```ts
// The key represents a point in the form: [x, y].
// The type Color is defined by [r: number, g: number, b: number].
const boardState = new Map<[x: number, y: number], Color>();
```

When the user draws on a point, we set that point's color in `boardState`:

```ts
boardState.set([x, y], color);
```

<!-- We also must integrate this model with the view, i.e., update the Canvas when map keys are set or deleted, to reflect the corresponding pixel's new color (not shown). -->

**Collaborative data model:** Next, we convert the above data model into a collaborative one. Per step 2, we should replace the `Map<[x: number, y: number], Color>` with a collaborative version. The table in [Types] asks us to consider whether the value type `Color` is immutable or mutable. Here, we treat it as immutable: the color strings cannot be edited in-place, only set to a value. Thus our collaborative replacement is a `CValueMap<[x: number, y: number], Color>`:

```ts
const boardState = doc.registerCollab(
  "whiteboard",
  (init) => new collabs.CValueMap<[x: number, y: number], Color>(init)
);
```

When the user draws on a point, we set that point's color in `boardState`, which turns out to use the exact same code as before:

```ts
boardState.set([x, y], color);
```

This completes our data model. To actually use this data model, we also have to integrate it with the view (Canvas), by updating the view in response to [Events](../advanced/events.html) (either from the local user or other collaborators). For example:

```ts
// ctx is the Canvas's getContext("2d").
boardState.on("Set", (event) => {
  const [r, g, b] = event.value;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(event.key[0], event.key[1], 1, 1);
});

boardState.on("Delete", (event) => {
  ctx.clearRect(event.key[0], event.key[1], 1, 1);
});
```

### Minesweeper

[Complete demo](https://github.com/composablesys/collabs/tree/master/demos/apps/minesweeper)

**App:** A game of Minesweeper that all users play together (anyone can click to reveal a square).

**Single-user data model:** We again start by considering a single-user Minesweeper app. Let's represent each tile in the grid as an instance of a Tile class, and the whole board as an instance of a Minesweeper class.

For each tile, we need to store:

- whether the tile has been revealed
- the tile's flag state (none/flag/question flag)
- whether the tile is a mine
- what number to display when revealed (how many neighboring mines it has).

So, we define class Tile to have the following properties:

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

We then define class Minesweeper to store a grid of tiles:

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

The app's top-level state is a variable `currentGame: Minesweeper | null`. When the user first clicks a tile, `currentGame` is set to a new instance of Minesweeper. (It is `null` before the first click: we provide that click's coordinates `(startX, startY)` to the Minesweeper constructor, so that it can generate a game where that coordinate is mine-free.)

**Collaborative data model:** Next, we convert the above data model into a collaborative one.

Per step 2, we should replace Tile's properties with collaborative versions:

- `revealed: boolean`: This should start `false`, and once it becomes `true`, it should stay that way forever - you can't "un-reveal" a tile (especially a mine!). CBoolean with the default options satisfies these conditions, so we use that.
- `flag: FlagStatus`: Recall that FlagStatus is a custom enum. As an opaque immutable type, the table in [Built-in Collabs](./built_in_collabs.html) suggests `CVar<FlagStatus>`. In case of concurrent changes to the flag, this will pick one arbitrarily, which seems fine from the users' perspective.
- `readonly isMine: boolean;`, `readonly number: number;`: Since these are fixed, we actually don't need to make them collaborative. We can just set them in the constructor as usual.

Also, per step 3, we should replace Tile with a subclass of CObject. That leads to the class CTile below:

```ts
class CTile extends collabs.CObject {
  private readonly revealed: collabs.CBoolean;
  private readonly flag: collabs.CVar<FlagStatus>;
  readonly isMine: boolean;
  number: number = 0;

  constructor(init: collabs.InitToken, isMine: boolean) {
    super(init);
    this.revealed = this.registerCollab(
      "revealed",
      (init) => new collabs.CBoolean(init)
    );
    this.flag = this.registerCollab(
      "flag",
      (init) => new collabs.CVar<FlagStatus>(init, FlagStatus.NONE)
    );
    this.isMine = isMine;
  }

  // Methods...
}
```

We must likewise transform the Minesweeper class. This deviates from the usual process in two ways.

First, we cannot use randomness in the constructor: per [Documents](./documents.html#using-cruntime), the constructor must behave identically when called on different users with the same arguments. Instead, we use a PRNG, and pass its seed as a constructor argument. The seed will be randomly set by whichever user starts a new game, so that the board is still random.

Second, even though `tiles` has type `Tile[][]` and the table maps `Array` to CList or CValueList, there is actually no need for us to use a list here. Indeed, we don't plan to mutate the arrays themselves after the constructor, just the tiles inside them. Instead, we treat each Tile as its own property with its own name, using the arrays only as a convenient way to store them. (See [Lists, not Arrays](./built_in_collabs.html#lists-not-arrays).)

```ts
class CMinesweeper extends collabs.CObject {
  readonly tiles: CTile[][];
  readonly width: number;
  readonly height: number;

  constructor(
    init: collabs.InitToken,
    width: number,
    height: number,
    fractionMines: number,
    startX: number,
    startY: number,
    seed: string
  ) {
    super(init);

    this.width = width;
    this.height = height;

    // Adjust fractionMines to account for fact that start
    // won't be a mine
    const size = width * height;
    if (size > 1) fractionMines *= size / (size - 1);
    // Place mines and init tiles
    this.tiles = new Array<CTile[]>(width);
    for (let x = 0; x < width; x++) {
      this.tiles[x] = new Array<CTile>(height);
      for (let y = 0; y < height; y++) {
        const isMine =
          x === startX && y === startY ? false : rng() < fractionMines;
        this.tiles[x][y] = this.registerCollab(
          x + ":" + y,
          (init) => new CTile(init, isMine)
        );
      }
    }
  }

  // Methods...
}
```

Finally, we need to convert the variable `currentGame: Minesweeper | null` that holds the app's top-level state. This is a bit tricky because it requires two parts:

1. A "factory" that creates new CMinesweeper instances dynamically. For this, we use a `CSet<CMinesweeper>` and "add" new instances to it.
2. A variable holding a _reference_ to the current game (or `null`). In general, Collabs uses a [CollabID](../api/collabs/modules.html#CollabID) to store a reference to a Collab in another collection. So, we use a `CVar<CollabID<CMinesweeper> | null>`.

```ts
const gameFactory = doc.registerCollab(
  "gameFactory",
  (init) =>
    new CSet(
      init,
      (
        valueInit: InitToken,
        width: number,
        height: number,
        fractionMines: number,
        startX: number,
        startY: number,
        seed: string
      ) =>
        new CMinesweeper(
          valueInit,
          width,
          height,
          fractionMines,
          startX,
          startY,
          seed
        )
    )
);
const currentGame = doc.registerCollab(
  "currentGame",
  (init) => new CVar<CollabID<CMinesweeper> | null>(init, null)
);
```

To start a new game, we call `gameFactory.add` with CMinesweeper's constructor arguments (except `init`), then set `currentGame` to reference the new game:

```ts
const newGame = gameFactory.add(
  settings.width,
  settings.height,
  settings.fractionMines,
  x,
  y,
  Math.random() + ""
);
currentGame.value = gameFactory.idOf(newGame);
```

This completes our data model. To actually use this data model, we also have to integrate it with the view, by updating the view in response to [Events](../advanced/events.html) (either from the local user or other collaborators). An easy (though inefficient) way to do this is to refresh the entire view whenever anything changes:

```ts
doc.on("Change", () => {
  // Refresh the whole view so that it displays currentGame.
  // ...
});
```
