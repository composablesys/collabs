# Walkthrough

In this page, we will walk through the [Quick Start](../quick_start.html)'s finished app. Its code is [here](https://github.com/composablesys/collabs/tree/master/demos/apps/counter) and a live demo is [here](https://compoventuals-tests.herokuapp.com/web_socket.html?container=demos/counter/dist/counter.html). This shows you the general structure of a Collabs app, which you can use as a basis for your own apps. We assume you have read [What is Collabs?](../what_is_collabs.html).

## Project Setup

The project is set up as a **Collabs container**: a Collabs app that does not connect to other collaborators over the network directly, but instead expects a **Collabs container host** to do that for it. For us, what this means is that the compiled app is a normal HTML page, but if you open it in a browser directly, it won't work; instead, you have to give the page to a container host, which will open it in a special IFrame. The `npm start` command does that for you, so you don't have to worry about it for now. We will revisit Collabs containers [later in the guide](./containers.html).

Compilation and bundling uses a fairly standard [npm](https://docs.npmjs.com/cli/) + [TypeScript](https://www.typescriptlang.org/) + [Webpack](https://webpack.js.org/) toolchain. The HTML entrypoint is `src/index.html` and the TypeScript entrypoint is `src/app.ts`. The only unusual part is that Webpack is configured to output a single HTML file (`dist/MY_CONTAINER.html`) with all assets inlined, including the compiled and bundled JavaScript code and TypeScript source maps. This makes it easy to distribute the app without hosting it on a web server, like in the Quick Start's optional last step.

The project setup comes from the [Container Starter Template](https://github.com/composablesys/collabs/tree/master/template-container) that we copied at the beginning of the Quick Start.

## Code

The HTML file, `src/index.html`, is self-explanatory: it creates a display area for the counter value and an increment button labeled "+1".

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Counter</title>
  </head>

  <body>
    <p id="display">0</p>
    <button id="increment">+1</button>
  </body>
</html>
```

The interesting part of the app is `src/app.ts`. We will go through this file top-down.

```ts
import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  // Create a CRDTContainer, the entry point for a Collabs container.
  const container = new CRDTContainer();

  // Register Collabs.
  const counter = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Refresh the display when the Collabs state changes, possibly
  // due to a message from another replica.
  const display = document.getElementById("display")!;
  function refreshDisplay() {
    display.innerHTML = counter.value.toString();
  }
  container.on("Change", refreshDisplay);

  // Change counter's value on button clicks.
  // Note that we don't need to refresh the display here, since Change
  // events are also triggered by local operations.
  document.getElementById("increment")!.onclick = () => {
    counter.add(1);
  };

  // Wait for the container to load the previous saved state, if any.
  await container.load();

  // Display the loaded state.
  refreshDisplay();

  // Signal to the container host that we're ready for use.
  container.ready();
})();
```

### 0. Imports and Async Wrapper

To start, we import the Collabs library, plus the container-specific `CRDTContainer` class from [@collabs/container](https://www.npmjs.com/package/@collabs/container).

```ts
import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";
```

To let us use `await` later, the rest of the file is wrapped in an `async` IIFE.

```ts
(async function () {
  ...
})();
```

### 1. Create `CRDTContainer`

Our first real task is to get an instance of `CRDTContainer`. This is the entry point for a Collabs container; it connects your `Collab`s to the Collabs container host, which in turn connects them to other collaborators over the network.

```ts
const container = new CRDTContainer();
```

### 2. Register "Global Variable" `Collab`s

Next, we register/create our "global variable" `Collab`s - data structures that exist outside of any scope. These must together encompass the whole collaborative state. We register each one using `container.registerCollab`.

For this simple app, there is just one `Collab`, a `CCounter`.

```ts
const counter = container.registerCollab(
  "counter",
  collabs.Pre(collabs.CCounter)()
);
```

A few things to note here:

- The first argument to `registerCollab` is a _name_ for the `Collab`, used to identify it across different users. This can be arbitrary, but it's easiest to use the same name as the variable used to store the `Collab`. Each call to `registerCollab` must use a unique name.
- We don't call `CCounter`'s constructor directly. Indeed, that constructor's first argument, of type `InitToken`, is something we don't have (and shouldn't create ourselves). Instead, we call the function `collabs.Pre(collabs.CCounter)` with the rest of `CCounter`'s constructor arguments - in this case, `()`. `registerCollab` then returns the actual constructed `CCounter`.
  In general, when constructing `Collab`s, you use `Pre` instead of `new` in this way. I.e.:
  ```ts
  Pre(class_name)<generic types>(constructor args)
  ```
  instead of
  ```ts
  new class_name<generic types>(constructor args)
  ```
  [Initialization](./initialization.html) goes into more detail later in the guide.

### 3. Update Display on Events

Now that we have our `counter`, we need to observe changes to it and update the GUI. This ensures that the GUI always reflects the current collaborative state.

In general, a `Collab` emits **events** when its state changes due to operations by the local user or by remote collaborators. You can subscribe to events using a `Collab`'s `on` method. `CRDTContainer` also emits a catch-all "Change" event whenever any `Collab` changes. [Events](./events.html) goes into more detail later in the guide.

Here we listen on `CRDTContainer`'s "Change" event and refresh the entire display whenever it is emitted.

```ts
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
container.on("Change", refreshDisplay);
```

### 4. Convert User Inputs into `Collab` Operations

Next, we convert user inputs into operations on `counter`. Since `counter` is a `Collab`, these operations will eventually show up for all users. Furthermore, everyone will eventually end up in the same state even if multiple users do operations concurrently. Note that we do not need to update the display directly because events are also emitted for local operations.

```ts
document.getElementById("increment")!.onclick = () => {
  counter.add(1);
};
```

### 5. Last Steps

Now that our app is set up, we load previous saved state, if any.

```ts
await container.load();
```

This "previous saved state" might come from the last time this user used the app, or it might come from a different collaborator who sent us a snapshot. The details are left up to our container host; we just wait for loading finish, using `await`.

Next, we display the loaded state.

```ts
refreshDisplay();
```

We have to explicitly call `refreshDisplay()` here because events, including "Change" events, aren't emitted during loading.

Finally, our container is ready to use: we've registered our Collabs, connected them to the GUI (display + user input), loaded the previous saved state, and displayed the loaded state. We call `container.ready()` to start the app.

```ts
container.ready();
```

Our container's host will then reveal the container to the user, allow user input, and start delivering messages.

## Deployment

To deploy the app, we need to give our compiled file, `dist/counter.html` to a Collabs container host, as mentioned [above](#project-setup). The container host will then run `dist/counter.html` in an IFrame and communicate with it using [cross-window communication](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). In turn, the container host communicates with other collaborators over a network of its choice.

One such container host is built into `npm start`---specifically, the [container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server) command that it uses. The command launches a server whose home page includes a container host and that automatically loads `dist/counter.html` into that host. The host connects collaborators to its server using WebSockets.

The Quick Start's optional last step mentions another container host, [Collabs's Container Selector demo](https://compoventuals-tests.herokuapp.com/web_socket.html?container=demos/selector/dist/selector.html). That one uses our demo server to connect collaborators, again using WebSockets.

For more container hosts, see [Container Deployment](./containers.html#deployment) later in the guide.

## Next steps

You've now seen the basic structure of a Collabs app (specifically, a Collabs container). By following the steps above and using the [Container Starter Template](https://github.com/composablesys/collabs/tree/master/template-container) (if desired), you can start building your own collaborative apps!

<!-- TODO: per-step links to the above -->

Specifically, to make your own Collabs app, your main tasks are:

- In Step 2, instead of register a `CCounter`, register whatever `Collab`s you need to represent your app's entire collaborative state. Guide pages: [Built-in Collabs](./collaborative_data_structures.html), [Data Modeling](./data_modeling.html).
- In Step 3, update your display in response to events, so that it always reflects the current collaborative state. Guide page: [Events](./events.html).
- In Step 4, convert user inputs onto operations on your `Collab`s.
- In Step 5, display the loaded state, i.e., update your display to reflect your `Collab`s' current states.

For more info, continue following the guide with [Built-in Collabs](./collaborative_data_structures.html), or learn by example from our [demos](https://github.com/composablesys/collabs/tree/master/demos).
