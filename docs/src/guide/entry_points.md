# Entry Points: `CRuntime` and `CContainer`

Before you can initialize your `Collab`s, you must create an **entry point**. The entry point handles connecting your `Collab`s to other collaborators over the network, loading a previous session's saved state from storage, and other utilities.

Which entry point you choose depends on how you plan to deploy your app. Collabs's two built-in entry points are:

- [**CRuntime**](../api/collabs/classes/CRuntime.html) (package [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs)): You can use Collabs anywhere by constructing a `CRuntime` and connecting it to a network and storage yourself. This lets you use Collabs as part of a larger app, e.g., to add collaboration to an editor within a traditional web app. Each `CRuntime` instance is a plain standalone object, so you can use them in any context (including on a NodeJS server), have multiple `CRuntime` instances, etc.
- [**CContainer**](../api/container/classes/CContainer.html) (package [@collabs/container](https://www.npmjs.com/package/@collabs/container)): Instead of providing networking and storage yourself, you can deploy your app as a [**Collabs container**](./containers.html). A Collabs container is a network-agnostic, self-contained collaborative app that is deployed using static files only - ideally a single file with no external dependencies. A container must be executed by a **container host** to function; the host then handles networking and storage for the container. A container must contain a single `CContainer` entry point, which connects to the container host automatically.

We recommend choosing a [container](./containers.html) deployment for any "purely collaborative" app that doesn't need to integrate with a specific network/server/service. That way, you don't have to pay for server hosting, and your users can run and redistribute your app however they like - making this ideal for FOSS apps and personal projects. For any other kind of app, use `CRuntime`.

Both entry points require a small amount of boilerplate during your app's setup, described below. We also provide templates to help with this: [template-app](https://github.com/composablesys/collabs/tree/master/template-app) for `CRuntime`, and [template-container](https://github.com/composablesys/collabs/tree/master/template-container) for `CContainer`.

## [CRuntime](../api/collabs/classes/CRuntime.html)

Template: [template-app](https://github.com/composablesys/collabs/tree/master/template-app), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts).

To create a `CRuntime`, in any context:

1. Construct it:

```ts
import * as collabs from "@collabs/collabs";
const runtime = new collabs.CRuntime();
```

2. Optionally, at some point, call [`runtime.load`](../api/collabs/classes/CRuntime.html#load):

```ts
const savedState: collabs.Optional<Uint8Array>;
runtime.load(savedState);
```

The call to `runtime.load` lets you load state from a previous session - either from the current user or from a collaborator - that was returned by that session's [`runtime.save()`](../api/collabs/classes/CRuntime.html#save).

If you call `runtime.load`, you must do so:

- **After** making all calls to [`runtime.registerCollab`](../api/collabs/classes/CRuntime.html#registerCollab), which initialize your app's `Collab`s as described in the [next section of the guide](./initialization.html). Those calls let `runtime` know the types and structure of your data - i.e., its schema - so that it knows how to parse the input `savedState`.
- **Before** performing any `Collab` operations (mutating method calls) or processing network messages with [`runtime.receive`](../api/collabs/classes/CRuntime.html#receive). That way, you ensure that your app's state is up-to-date with the `savedState` before you start making new changes on top of it.

Collabs will throw errors if you do this wrong, so it is to catch mistakes during testing.

Except for these rules about `runtime.load`, you are free to use [CRuntime](../api/collabs/classes/CRuntime.html) however you like. Of course, you will want to connect it to other collaborators over a network so that your Collabs are actually collaborative. Get messages to send by listening on the ["Send"](../api/collabs/interfaces/RuntimeEventsRecord.html#Send) event with [`runtime.on("Send", ...)`](../api/collabs/classes/CRuntime.html#on), and deliver messages you receive to [runtime.receive](../api/collabs/classes/CRuntime.html#receive). See the comments in [the template's `src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts).

## [CContainer](../api/container/classes/CContainer.html)

Template: [template-container](https://github.com/composablesys/collabs/tree/master/template-container), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-container/src/app.ts).

To create a `CContainer`, **only in the context of a [Collabs container](./containers.html)**:

1. Construct it:

```ts
import { CContainer } from "@collabs/container";
const container = new CContainer();
```

2. Call `await `[`container.load()`](../api/container/CContainer#load) **exactly once**, **after** making all calls to [`container.registerCollab`](../api/collabs/classes/CRuntime.html#registerCollab) as described in the [next section of the guide](./initialization.html). This loads state from a previous session (if any), but unlike [`CRuntime.load`](../api/collabs/classes/CRuntime.html#load), you don't have to provide the save data; the container host will do that for you.
3. Once your app is ready to use (loaded state synced to GUI, input handlers added, etc.), call `container.ready()`. This tells the host to display your app and make it interactable.

## Next Steps

Continue following the Guide with [Initialization](./initialization.html).
