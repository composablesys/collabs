# Entry Points: `CRDTApp` and `CRDTContainer`

Before you can initialize your `Collab`s, you must create an **entry point**. The entry point handles connecting your `Collab`s to other collaborators over the network, loading a previous session's saved state from storage, and other utilities.

Which entry point you choose depends on how you plan to deploy your app. Collabs's two built-in entry points are:

- [**CRDTApp**](../api/collabs/classes/CRDTApp.html) (package [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs)): You can use Collabs anywhere by constructing a `CRDTApp` and connecting it to a network and storage yourself. This lets you use Collabs as part of a larger app, e.g., to add collaboration to an editor within a traditional web app. Each `CRDTApp` instance is a plain standalone object, so you can use them in any context (including on a NodeJS server), have multiple `CRDTApp` instances, etc.
- [**CRDTContainer**](../api/container/classes/CRDTContainer.html) (package [@collabs/container](https://www.npmjs.com/package/@collabs/container)): Instead of providing networking and storage yourself, you can deploy your app as a [**Collabs container**](./containers.html). A Collabs container is a network-agnostic, self-contained collaborative app that is deployed using static files only - ideally a single file with no external dependencies. A container must be executed by a **container host** to function; the host then handles networking and storage for the container. A container must contain a single `CRDTContainer` entry point, which connects to the container host automatically.

We recommend choosing a [container](./containers.html) deployment for any "purely collaborative" app that doesn't need to integrate with a specific network/server/service. That way, you don't have to pay for server hosting, and your users can run and redistribute your app however they like - making this ideal for FOSS apps and personal projects. For any other kind of app, use `CRDTApp`.

Both entry points require a small amount of boilerplate during your app's setup, described below. We also provide templates to help with this: [template-app](https://github.com/composablesys/collabs/tree/master/template-app) for `CRDTApp`, and [template-container](https://github.com/composablesys/collabs/tree/master/template-container) for `CRDTContainer`.

## [CRDTApp](../api/collabs/classes/CRDTApp.html)

Template: [template-app](https://github.com/composablesys/collabs/tree/master/template-app), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts).

To create a `CRDTApp`, in any context:

1. Construct it:

```ts
import * as collabs from "@collabs/collabs";
const app = new collabs.CRDTApp();
```

2. At some point, call [`app.load`](../api/collabs/classes/CRDTApp.html#load) **exactly once**:

```ts
const savedState: collabs.Optional<Uint8Array>;
app.load(savedState);
```

The call to `app.load` lets you load state from a previous session - either from the current user or from a collaborator - that was returned by that session's [`app.save()`](../api/collabs/classes/CRDTApp.html#save). Pass in a [Optional.empty()](../api/collabs/classes/Optional#empty) if you don't have any saved state, so that the app knows you are skipping loading.

You must call `app.load`:

- **After** making all calls to [`app.registerCollab`](../api/collabs/classes/CRDTApp.html#registerCollab), which initialize your app's `Collab`s as described in the [next section of the guide](./initialization.html). Those calls let `app` know the types and structure of your data - i.e., its schema - so that it knows how to parse the input `savedState`.
- **Before** performing any `Collab` operations (mutating method calls) or processing network messages with [`app.receive`](../api/collabs/classes/CRDTApp.html#receive). That way, you ensure that your app's state is up-to-date with the `savedState` before you start making new changes on top of it.

Collabs will throw errors if you do this wrong, so it is to catch mistakes during testing.

Except for these rules about `app.load`, you are free to use [CRDTApp](../api/collabs/classes/CRDTApp.html) however you like. Of course, you will want to connect it to other collaborators over a network so that your Collabs are actually collaborative. Get messages to send by listening on the ["Send"](../api/collabs/interfaces/CRDTAppEventsRecord.html#Send) event with [`app.on("Send", ...)`](../api/collabs/classes/CRDTApp.html#on), and deliver messages you receive to [app.receive](../api/collabs/classes/CRDTApp.html#receive). See the comments in [the template's `src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-app/src/app.ts).

## [CRDTContainer](../api/container/classes/CRDTContainer.html)

Template: [template-container](https://github.com/composablesys/collabs/tree/master/template-container), see [`src/app.ts`](https://github.com/composablesys/collabs/blob/master/template-container/src/app.ts).

To create a `CRDTContainer`, **only in the context of a [Collabs container](./containers.html)**:

1. Construct it:

```ts
import { CRDTContainer } from "@collabs/container";
const container = new CRDTContainer();
```

2. Call `await `[`container.load()`](../api/container/CRDTContainer#load) **exactly once**, **after** making all calls to [`app.registerCollab`](../api/collabs/classes/CRDTApp.html#registerCollab) as described in the [next section of the guide](./initialization.html). This loads state from a previous session (if any), but unlike [`CRDTApp.load`](../api/collabs/classes/CRDTApp.html#load), you don't have to provide the save data; the container host will do that for you.
3. Once your app is ready to use (loaded state synced to GUI, input handlers added, etc.), call `container.ready()`. This tells the host to display your app and make it interactable.

## Next Steps

Continue following the Guide with [Initialization](./initialization.html).
