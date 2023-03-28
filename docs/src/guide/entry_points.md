# Entry Points: `CRuntime`, `AbstractDoc`, and `CContainer`

Before you can initialize your `Collab`s, you must create an **entry point**. The entry point handles connecting your `Collab`s to other collaborators over the network, loading saved states, and other utilities.

Which entry point you choose depends on how you plan to deploy your app. Collabs's built-in entry points are:

- [**CRuntime**](../api/collabs/classes/CRuntime.html) (package [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs)): You can use Collabs anywhere by constructing a `CRuntime` and connecting it to a network and storage yourself. This lets you use Collabs as part of a larger app, e.g., to add collaboration to an editor within a traditional web app. Each `CRuntime` instance is a plain standalone object, so you can use them in any context (including on a NodeJS server), have multiple `CRuntime` instances, etc.
- [**AbstractDoc**](../api/collabs/classes/AbstractDoc.html) (package [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs)): Wrapper around a `CRuntime` that lets you encapsulate it together with its Collabs, as described [later in the guide](./data_modeling.html#abstractdoc). This is convenient for passing documents around and for working with multiple documents in the same app.
- [**CContainer**](../api/container/classes/CContainer.html) (package [@collabs/container](https://www.npmjs.com/package/@collabs/container)): Instead of providing networking and storage yourself, you can deploy your app as a [**Collabs container**](./containers.html). A Collabs container is a network-agnostic, self-contained collaborative app that is deployed using static files only - ideally a single file with no external dependencies. A container must be executed by a **container host** to function; the host then handles networking and storage for the container. A container must contain a single `CContainer` entry point, which connects to the container host automatically.

Each entry point requires a small amount of boilerplate during your app's setup, described below. We also provide templates to help with this: [template-app](https://github.com/composablesys/collabs/tree/master/template-app) for `CRuntime` (`AbstractDoc` is similar), and [template-container](https://github.com/composablesys/collabs/tree/master/template-container) for `CContainer`.

## [CRuntime](../api/collabs/classes/CRuntime.html)

Template: [template-app](https://github.com/composablesys/collabs/tree/master/template-app), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts).

To create a `CRuntime`, in any context:

1. Construct it:

```ts
import * as collabs from "@collabs/collabs";
const runtime = new collabs.CRuntime();
```

2. Make all calls to [`runtime.registerCollab`](../api/collabs/classes/CRuntime.html#registerCollab) as described in the [next section of the guide](./initialization.html).

3. Use `runtime` in your app, calling its other methods freely. See [the template's `src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts). In particular:
   - You will want to connect it to other collaborators over a network so that your Collabs are actually collaborative. Get messages to send by listening on the ["Send"](../api/collabs/interfaces/RuntimeEventsRecord.html#Send) event with [`runtime.on("Send", ...)`](../api/collabs/classes/CRuntime.html#on), and deliver messages you receive to [runtime.receive](../api/collabs/classes/CRuntime.html#receive).
   - At the start of your app (and possibly later), you'll want to load saved state from a previous session if it exists. You get the saved state from a previous session's [`runtime.save()`](../api/collabs/classes/CRuntime.html#save) and load it with [`runtime.load(savedState)`](../api/collabs/classes/CRuntime.html#load). The saved state can come from either the current user or a collaborator, and you can call `runtime.load` multiple times; each call merges in that call's saved state, updating the Collabs and emitting events as usual.

## [AbstractDoc](../api/collabs/classes/AbstractDoc.html)

<!-- TODO: Template: [template-app](https://github.com/composablesys/collabs/tree/master/template-app), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts). -->

Everything we've said so far for `CRuntime` also applies to `AbstractDoc`. The difference comes when you register Collabs; that is described in [the next part of the guide](./initialization.html) for `CRuntime` and [later](./data_modeling.html#abstractdoc) for `AbstractDoc`.

## [CContainer](../api/container/classes/CContainer.html)

Template: [template-container](https://github.com/composablesys/collabs/tree/master/template-container), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-container/src/app.ts).

To create a `CContainer`, **only in the context of a [Collabs container](./containers.html)**:

1. Construct it:

```ts
import { CContainer } from "@collabs/container";
const container = new CContainer();
```

2. Make all calls to [`container.registerCollab`](../api/container/classes/CContainer.html#registerCollab) as described in the [next section of the guide](./initialization.html).

3. Call `await `[`container.load()`](../api/container/CContainer#load) **exactly once**. This loads state from a previous session (if any), but unlike [`CRuntime.load`](../api/collabs/classes/CRuntime.html#load), you don't have to provide the saved state; the container host will do that for you.
4. Once your app is ready to use (loaded state synced to GUI, input handlers added, etc.), call `container.ready()`. This tells the host to display your app and make it interactable.

## Next Steps

Continue following the Guide with [Initialization](./initialization.html).
