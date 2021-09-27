# Getting Started Guide

## Template

We provide starter templates for convenience. Each template includes a basic TypeScript + Webpack + npm setup plus a server for local testing. If you bring your own configuration, you will only need the `src/` folder.

Your choice of template depends on how you want to deploy your app. They are similar enough that you can easily change your mind later.

### [Container starter template](TODO: github)

A Compoventuals [container](TODO) that users can run on the network of their choice. Specifically, users can run the container in any [host](TODO), including embedding it in other Compoventuals apps like (TODO: whiteboard).

Deploy using a static site or as a shareable standalone file. Ideal for FOSS apps and personal projects.

Follow [Getting Started: Container](TODO).

### [WebSocket app starter template](TODO: github)

TODO: app to something else? (Use app for any program.)

A self-contained app using a network that you provide. The template uses a simple WebSocket server where everyone who visits the site is a collaborator, but you can easily replace this with your own network.

Deploy using your choice of network, e.g., your own server, an integration with an existing platform, or a peer-to-peer network. Ideal for apps that are part of an existing service, integrate Compoventuals with a new network, or need to interact with their network outside of Compoventuals.

Follow [Getting Started: App](TODO).

# Getting Started: Container

## Setup

1. Clone the template

```
git clone TODO
cd template-container
```

2. Install dependencies

We assume you have `npm` installed ([https://nodejs.org/](https://nodejs.org/)). TODO: check works with LTS version.

In the template-container folder, run

```
npm i
```

3. Build and run starter app

```
npm run dev
npm run start
```

Go to [http://localhost:3000/](http://localhost:3000/). You should see a simple collaborative counter. Try using it in multiple windows at once.

TODO: screenshot showing two windows.

## Walkthrough

Let's take a look at `src/my_container.ts`.

We import the library, plus the container-specific `ContainerRuntimeSource` from [compoventuals-container](TODO).

```ts
import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";
```

TODO: async

Our first task is to get an instance of `Runtime`. This is the entry point for Compoventuals; it connects collaborative types to the network. For a container, we use `ContainerRuntimeSource.newRuntime`.

```ts
// Create a Runtime intended for use within containers.
const runtime = await ContainerRuntimeSource.newRuntime(window.parent);
```

Next, we register our "global variable" collaborative types - types that exist outside of any scope. These must together encompass the whole collaborative state, and they must be registered immediately after creating `runtime`. We do so using `runtime.registerCrdt`.

```ts
// Register collaborative data types.
const counter = runtime.registerCrdt("counter", crdts.Pre(crdts.CCounter)());
```

A few things to note here:

- The first argument to `registerCrdt` is a _name_ for the collaborative type, used to identify it across different users. This can be arbitrary, but we recommend using the same name as the variable used to store the collaborative type. Each call to `registerCrdt` must use a unique name.
- We don't call [`CCounter`](./typedoc/classes/CCounter.html)'s constructor directly. Indeed, that constructor's first argument, of type `CrdtInitToken`, is something we don't have (and shouldn't create ourselves). Instead, we call the function `crdts.Pre(crdts.CCounter)` with the rest of `CCounter`'s constructor arguments - in this case, `()`.  
  In general, when constructing collaborative types, you use `Pre` instead of `new` in this way. I.e.:
  ```ts
  Pre(class_name)<generic types>( constructor args)
  ```
  instead of
  ```ts
  new class_name<generic types>(constructor args)
  ```
  See [Initialization](TODO) for more info.

Now that we have our `counter`, we need to observe changes to it and update the state. Here we use the catch-all `Runtime` "Change" event, which is fired whenever any collaborative type changes, including by the local user. See [Events](TODO) for more info.

```ts
// Refresh the display when the Crdt state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
runtime.on("Change", () => {
  display.innerHTML = counter.value.toString();
});
```

Finally, we convert user inputs into operations on `counter`. Since `counter` is a collaborative type, these operations will eventually show up for all users. Furthermore, everyone will eventually end up in the same state even if multiple users do operations concurrently. (Use the "Disconnect" buttons on the test page to try this out!)

```ts
// Change counter's value on button clicks.
// Note that we need not refresh the display here, since Change
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counter.add(100);
};
document.getElementById("decrement")!.onclick = () => {
  counter.add(-100);
};
document.getElementById("reset")!.onclick = () => {
  counter.reset();
};
```

The complete `src/my_container.ts` appears below.

```ts
import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";

// Async so we can await ContainerRuntimeSource.newRuntime.
(async function () {
  // Create a Runtime intended for use within containers.
  const runtime = await ContainerRuntimeSource.newRuntime(window.parent);

  // Now setup your program, using runtime.
  // Note that you you shouldn't try to load saveData like you
  // would in a non-container app;
  // ContainerRuntimeSource will do that for you.

  // We include a simple collaborative counter as an example;
  // delete the code below and replace with your own.

  // Register collaborative data types.
  const counter = runtime.registerCrdt("counter", crdts.Pre(crdts.CCounter)());

  // Refresh the display when the Crdt state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  runtime.on("Change", () => {
    display.innerHTML = counter.value.toString();
  });

  // Change counter's value on button clicks.
  // Note that we need not refresh the display here, since Change
  // events are also triggered by local operations.
  document.getElementById("increment")!.onclick = () => {
    counter.add(100);
  };
  document.getElementById("decrement")!.onclick = () => {
    counter.add(-100);
  };
  document.getElementById("reset")!.onclick = () => {
    counter.reset();
  };
})();
```

## Deployment

Now that you have a collaborative app, it's time to deploy it for your users. Unlike a traditional app, this doesn't require running any servers of your own - you just need to distribute your build file(s).

First, build the container in production mode instead of development mode (this makes the output file a lot smaller):

```
npm run build
```

Your finished container is now in `dist/my_container.html`. You can host this on a static site or file sharing platform, or just distribute it by word-of-mouth.

Anyone can run your app in any [container host](TODO). TODO: example (run in our server/Matrix)? Also upload/download example.

## Next steps

To start building more complex apps, check out [Types](TODO), [Data Modeling](TODO), and [Events](TODO). Or, learn by example from our [demos](TODO).

For more info on configuration and deployment, see [Containers](TODO).

# Getting Started: App

Coming soon

<!-- TODO: deployment (which files and what to do with them). For app, link to writing your own BroadcastNetwork (e.g. integrating with your own service + accounts), plus desc of existing options (Matrix is the only practical one, then you can deploy it from a static site).

TODO: adding load/save to app; make sure container awaits load/save properly

TODO: Matrix app (as demo of switching out network), mention how you can then use Matrix API yourself? -->
