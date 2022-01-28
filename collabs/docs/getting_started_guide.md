# Getting Started Guide

## Template

We provide starter templates for convenience. Each template includes a basic TypeScript + Webpack + npm setup plus a server for local testing. If you bring your own configuration, you will only need the `src/` folder.

Your choice of template depends on how you want to deploy your app.

### [Container starter template](https://github.com/composablesys/collabs/tree/master/template-container)

A Collabs [container](./containers.md) that users can run on the network of their choice. Specifically, users can run the container in any "container host", including embedding it in other Collabs apps.

Deploy using a static site or as a shareable standalone file. Ideal for FOSS apps and personal projects.

Follow [Getting Started: Container](#container) below.

### [WebSocket app starter template](https://github.com/composablesys/collabs/tree/master/template-app)

<!-- TODO: app to something else? (Use app for any program.) -->

A self-contained app using a network that you provide. The template uses a simple WebSocket server where everyone who visits the site is a collaborator, but you can easily replace this with your own network.

Deploy using your choice of network, e.g., your own server, an integration with an existing platform, or a peer-to-peer network. Ideal for apps that are part of an existing service, integrate Collabs with a new network, or need to interact with their network outside of Collabs.

Follow [Getting Started: App](#app) below.

# <a id="container"></a> Getting Started: Container

## Setup

1. Clone the template

- Download [https://github.com/composablesys/collabs/archive/refs/heads/master.zip](https://github.com/composablesys/collabs/archive/refs/heads/master.zip)
- Extract the `template-container` folder as your project folder
- `cd` into that folder

2. Install dependencies

We assume you have `npm` installed ([https://nodejs.org/](https://nodejs.org/)).

In the template-container folder, run

```
npm i
```

3. Build and run starter container

```
npm run dev
npm start
```

Go to [http://localhost:3000/](http://localhost:3000/). You should see a simple collaborative counter. Try using it in multiple windows at once.

<!-- TODO: screenshot showing two windows. -->

## Walkthrough

Let's take a look at `src/my_container.ts`.

We import the library, plus the container-specific `CRDTContainer` class from [@collabs/container](https://www.npmjs.com/package/@collabs/container).

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

Our first real task is to get an instance of `CRDTContainer`. This is the entry point for a Collabs container; it connects your collaborative data structures (`Collab`s, for short) to the container host, hence to the network.

```ts
const container = new CRDTContainer();
```

Next, we register our "global variable" `Collab`s - data structures that exist outside of any scope. These must together encompass the whole collaborative state. We register each one using `container.registerCollab`.

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
  See [Initialization](./initialization.md) for more info.

Now that we have our `counter`, we need to observe changes to it and update the state. Here we use the catch-all `CRDTContainer` "Change" event, which is fired whenever any `Collab` changes, including due to local user input. See [Events](./events.md) for more info.

```ts
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
container.on("Change", refreshDisplay);
```

Next, we convert user inputs into operations on `counter`. Since `counter` is a `Collab`, these operations will eventually show up for all users. Furthermore, everyone will eventually end up in the same state even if multiple users do operations concurrently.

```ts
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

Now that our setup is complete, we load previous saved state (if any).

```ts
await container.load();
```

Basically, the container host can periodically save snapshots of the container's state, then use one to restart it quickly later. It can even send snapshots to new collaborators, so that they can load the current state without replaying every past message.

Because saving and loading is the host's job, we don't have to provide any save data here; we just wait for the host to provide it. Once the `await` completes, your Collabs will be filled in with the save data.

Next, we display the loaded state.

```ts
refreshDisplay();
```

We have to explicitly call `refreshDisplay()` here because events, including "Change" events, aren't emitted during loading.

Finally, our container is ready to use: we've setup our Collabs, connected them to GUI (display + user input), loaded the previous saved state, and displayed the loaded state. We call `container.ready()` to signal this to our host.

```ts
container.ready();
```

The host will then reveal the container to the user, allow user input, and start delivering messages - both new messages from collaborators, and old messages that didn't make it into the loaded state.

The complete `src/my_container.ts` appears below.

```ts
import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";

(async function () {
  // Create a CRDTContainer, the entry point for a Collabs
  // container.
  // Note: in a non-container app, you would instead use collabs.CRDTApp.
  const container = new CRDTContainer();

  // Now setup your program, using container.

  // We include a simple collaborative counter as an example;
  // delete the code below and replace with your own.

  // Register Collabs.
  const counter = container.registerCollab(
    "counter",
    collabs.Pre(collabs.CCounter)()
  );

  // Refresh the display when the Collab state changes, possibly
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
    counter.add(100);
  };
  document.getElementById("decrement")!.onclick = () => {
    counter.add(-100);
  };
  document.getElementById("reset")!.onclick = () => {
    counter.reset();
  };

  // Wait for the container to load the previous saved state,
  // if any.
  // Observe that unlike CRDTApp.load, we don't need to provide
  // the save data ourselves, and the method is async.
  await container.load();

  // Display the loaded state.
  refreshDisplay();

  // Signal that we're ready.
  container.ready();
})();
```

## Testing

To test your container, build and run it.

```
npm run dev
npm start
```

Then go to [http://localhost:3000/](http://localhost:3000/) (or whatever link `npm start` prints out). This runs your app using [@collabs/container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server).

To test collaboration, open the link in multiple windows/tabs at once. You can simulate concurrency (multiple user making changes at the same time) by unchecking one window's "Connected" checkbox, making some changes in that window and another one, then re-checking the box. Doing so temporarily isolates the disconnected window, then reconnects it, delivering all messages queued during disconnection (sent + receivd). Unless something has gone wrong, all windows will end up in the same state. Ideally, that state will also be a reasonable merge of the concurrent changes.

You can also test that saving and loading doesn't corrupt the state. Click "Save to sessionStorage" to save the current state in the browser, then "Reload from sessionStorage" to load that state followed by replaying any further messages. Unless you write your own Collabs with custom load/save functions, you should only need to worry about bugs due to improperly displaying the loaded state.

## Deployment

Now that you have a collaborative app, it's time to deploy it for your users. Unlike a traditional app, this doesn't require running any servers of your own - you just need to distribute your build file.

First, build the container in production mode instead of development mode (this makes the output file a lot smaller):

```
npm run build
```

Your finished container is now in `dist/my_container.html`. You can host this on a static site or file sharing platform, or just distribute it by word-of-mouth.

Users can run your app in any container host. See [containers](./containers.md#deployment) for some options.

## Next steps

To start building more complex apps, check out [Collaborative Data Structures](./types.md), [Data Modeling](./data_modeling.md), and [Events](./events.md). Or, learn by example from our [demos](https://github.com/composablesys/collabs/tree/master/demos).

For more info on configuration and deployment, including adding dependencies and assets (e.g. images), see [Containers](./containers.md).

# <a id="app"></a> Getting Started: App

Work in progress. For now, check out the starter code in [WebSocket app starter template](https://github.com/composablesys/collabs/tree/master/template-app), especially `my_app.ts` and its comments.

Basically, it's similar to Getting Started: Container, except you use `collabs.CRDTApp` instead of `CRDTContainer`, and you have to handle networking, saving, and loading yourself.

`CRDTApp` methods/events that you'll need to use (in addition to `registerCollab`, which is the same as for `CRDTContainer`):

- A "Send" event is emitted each time the app wants to send a message. This message needs to be delivered eventually at-least-once to every other collaborator, by giving it to their `CRDTApp`s' `receive` methods.
- `receive`: Receives a message from a collaborator, applying it to the local app.
- `save`: Returns a snapshot of the current state. This can be passed to `load` on a future instance of the app. It has the same effect as receiving all messages received before `save` was called, so that the future instance doesn't need to receive those messages again, but does need to receive all other messages.
- `load`: Loads a snapshot from a previous instance's `save` method. This can only be called on a new instance, which registered Collabs but not been used (either user operations or calling `receive`). If you have no previous snapshot, you must still call `load` before using the app, but with `Optional.empty()` as its argument.

Other things to keep in mind when writing an app:

- Persist locally sent messages until they are sent on the network, so that if they don't get sent properly before the user closes the app, you can retry later.
- Persist locally sent/received messages that are not accounted for in the most recent save data (`save` output), so that you can reload the app from its most recent state the next time it starts up, even if the user is offline then. Specifically, you will want to deliver these messages to the app (`receive`) after setting it up and calling `load`, before letting the user interact with it.
- Occasionally call `save` and persist its save data locally. The returned save data will be smaller and load faster than the complete message history.
- More occasionally, call `save` and put its save data somewhere that new users can access. That way, they can initialize starting from that save data, instead of needing to `receive` every message ever sent.
