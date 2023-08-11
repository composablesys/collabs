# Documents (CRuntime and AbstractDoc)

In Collabs, a **document** is a "unit of collaboration" - some collaborative state that is shared together. This could be a single shared whiteboard, a rich-text document, a recipe, etc.

Each document comes in two parts:

- A fixed set of Collabs that store the collaborative state. For example, a shared whiteboard document could have a single `CValueMap<[x: number, y: number], Color>`, like we described on [the previous page](./introduction.html#example-whiteboard).
- A [CRuntime](../api/collabs/classes/CRuntime.html) that manages those Collabs. It is responsible for creating the Collabs, connecting them to [network and storage providers](./providers.html), [filtering out duplicate updates](../advanced/updates.html#syncing-documents), etc.

## Using CRuntime

To use a document, first construct a CRuntime:

```ts
import { CRuntime } from "@collabs/collabs";

const doc = new CRuntime();
```

Next, "register" its Collabs using [CRuntime.registerCollab](../api/collabs/classes/CRuntime.html#registerCollab). E.g. for a shared whiteboard document:

```ts
const boardState: CValueMap<[x: number, y: number], Color> = doc.registerCollab(
  "boardState",
  (init) => new CValueMap(init)
);
// Other calls to doc.registerCollab...
```

There are a few weird things going on in this `registerCollab` call:

1. You have to give a _name_ to your Collab - here `"boardState"`. It must be unique among all calls to `doc.registerCollab` but is otherwise arbitrary. We suggest using the same name as the Collab's variable, like here.
2. Instead of constructing the CValueMap directly, you supply a callback that does so: `(init) => new CValueMap(init)`. Internally, `registerCollab` will invoke this callback and return the constructed Collab. That lets `doc` configure `boardState`.

Registering Collabs essentially defines a "schema" for your document. That schema tells CRuntime how to interpret updates from remote collaborators and persistent storage.

To ensure that they can understand each other, **collaborators must all use the same "schema"**. Specifically, they must make the same calls to `registerCollab`, with the same names, Collab classes, and Collab constructor arguments. This is easy to guarantee if they all run the same code.

<!-- > See [Versioning](TODO) for tips on how to migrate schemas over time. -->

Once you register all Collabs, your document is ready to use. You can [handle changes](./handling_changes.html), connect [providers](./providers.html), and perform collaborative operations on its Collabs.

## Using AbstractDoc

In the above example, our document consisted of two variables: `doc` of type CRuntime, and `boardState` of type CValueMap. If you have many Collabs in the same document, or many documents in the same app, it becomes convenient to group each document into a single object.

You can do that by extending the [AbstractDoc](../api/collabs/classes/AbstractDoc.html) class, as shown below.

```ts
import { AbstractDoc, DocOptions } from "@collabs/collabs";

class MyWhiteboardDoc extends AbstractDoc {
  /** The whiteboard's state, exposed publicly for convenience. */
  readonly boardState: CValueMap<[x: number, y: number], Color>;

  constructor(options?: DocOptions) {
    super(options);

    // this.runtime is a CRuntime provided by our superclass.
    this.boardState = this.runtime.registerCollab(
      "boardState",
      (init) => new CValueMap(init)
    );
  }
}
```

The AbstractDoc superclass gives MyWhiteboardDoc a similar API to CRuntime - in particular, you can still pass it as an argument to providers. But it hides internal methods like `registerCollab`, and subclassing lets you encapsulate your Collabs in a type-specific API. (For example, you could make `boardState` private and instead expose `getPixel` and `setPixel` methods.)

## Multiple Documents

You can use as many documents as you like in a single app. For example, in a sticky notes app, each sticky note could have its own document. That way, the user can choose to share each sticky note with a different group of collaborators. Or, you can wait to load each sticky note from storage until it is scrolled into view.

Our network and storage providers use `docID`s (arbitrary strings) to keep track of which documents are supposed to be kept in sync. For example, when using our Websocket client and server, documents on different devices that subscribe to the same `docID` will be kept in sync via the server.

## Next Steps

Continue following the Guide with [Handling Changes](./handling_changes.html).
