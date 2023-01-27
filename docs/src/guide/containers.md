# Containers

A _Collabs container_ is a network-agnostic, self-contained collaborative app that is deployed using static files only - ideally a single file. A container must be paired with a _container host_ to function; the host handles networking (for collaboration), saving, loading, etc. for the container.

Our intent is that containers can make it easier to develop and use collaborative apps. Specifically, our hopes for containers are:

- They should be easy to deploy, since the container author only needs to distribute a file, either on a static site or just as a file. Dedicated container hosts would handle the parts that are hard to deploy (networking, backup storage, etc.).
- They should be easy to write, since the author only needs to write frontend code: a data model made of `Collabs`, a GUI view of that data model, a controller that updates the model in response to user input, and a bit of boilerplate to connect to the host.
- They should free users to use whatever network they prefer: a public provider, a self-hosted server, a compatible group chat service, etc. Users can also nest containers inside other Collabs apps (e.g., our [Tile Board demo](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/tile-board/dist/tile_board.html)).
- They should guarantee longevity for users: once a user has a copy of the container, they can use it forever, so long as they have access to a (version-compatible) container host.

See also: [Why Make Collabs?](../further_info/why.html).

## Development

The easiest way to develop a container is by following the [Getting Started Guide](../quick_start.html), which walks through our [template-container](https://github.com/composablesys/collabs/tree/master/template-container).

Starting from scratch, the steps are:

1. Install [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs) and [@collabs/container](https://www.npmjs.com/package/@collabs/container) as dependencies, and [@collabs/container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server) as a devDependency.
2. Setup a toolchain for your project (e.g., TypeScript + Webpack) so that it builds the whole thing as a single HTML (not JS) file, ideally containing all dependencies and assets. (See [Advanced](#advanced) for advice and alternatives.)
3. In your main TypeScript file:

   a. Start by creating an instance of `CRDTContainer` from @collabs/container. We'll assume it's named `container`.

   b. Setup your app: register your top-level Collabs using `container.registerCollabs`, connect them to your GUI using [event listeners](../advanced/events.html), and connect user input to them.

   c. `await container.load()`. Basically, the container host can periodically save snapshots of the container's state, then use one to restart it quickly later. It can even send snapshots to new collaborators, so that they can load the current state without replaying every past message. `container.load()` waits to receive this save data from the host, uses it to fill in your Collabs' state, then resolves its Promise.

   d. Display the loaded state, i.e., sync it to your GUI. You need to do this explicitly because events aren't emitted during loading.

   e. Call `container.ready()`. This signals to the host that you are ready. The host will then reveal the container to the user, allow user input, and start delivering messages - both new messages from collaborators, and old messages that didn't make it into the loaded state.

4. Test your compiled app using the `container-testing-server` command provided by @collabs/container-testing-server. It takes the path to your compiled HTML file as an argument.

## Deployment

You deploy your container merely by distributing your compiled HTML file. You can host this on a static site or file sharing platform, or just distribute it by word-of-mouth.

Users can then run your app in any container host. Some options:

- For a quick public test, upload your build file to our [Selector demo](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/selector/dist/selector.html). Anyone who visits that link will then see your container (until the demo gets reset). Note that if someone else is currently using the selector demo, you'll see their container instead.
- For a private (but still networked) test, upload your build file to the Matrix version of our Selector demo.

  [Instructions](https://collabs-demos.herokuapp.com/#matrix)

  Matrix widget command: `/addwidget https://collabs-demos.herokuapp.com/matrix.html?container=demos/selector/dist/selector.html`

  This option has the most longevity for users: once they hit "Go" at the beginning, the container code is stored in the Matrix chat, so they no longer need the original file/URL; and as long as they have a copy of your compiled HTML file, they can start new sessions using your app, with their choice of collaborators.

- For a more permanent public test, host your build file on a static site or file sharing platform and give users the URL:

```
https://collabs-demos.herokuapp.com/web_socket.html?container=<your file URL>
```

This will run your container like our demos: anyone who visits that page can make edits, and the server will occasionally reset its state when no use is using it.

For this to work, `<your file URL>` must be configured to return the CORS header ["Access-Control-Allow-Origin: \*"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).

- For practical use, host your build file on a static site or file sharing platform and give users the Matrix widget command:

```
/addwidget https://collabs-demos.herokuapp.com/matrix.html?container=<your file URL>
```

[Instructions](https://collabs-demos.herokuapp.com/#matrix)

For this to work, `<your file URL>` must be configured to return the CORS header ["Access-Control-Allow-Origin: \*"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin). Note that this the container will stop working for users if your URL stops working or changes content. (In particular, your URL should include a version, so you can upload new versions without affecting existing users.)

## Developing Container Hosts

A container host is mostly just a Collabs app that uses the `CRDTContainerHost` class (from @collabs/container) as one of its Collabs. Messages sent by the container get converted to messages sent by the `CRDTContainerHost`, which then get sent by the app as usual. Likewise for receiving messages and for saving and loading.

The `CRDTContainerHost` constructor expects an IFrame holding the container. I.e., you set the IFrame's `src` equal to the container's URL. You are expected to block user interaction with the IFrame until the container is ready, as indicated by the "ContainerReady" event. E.g., you can set `hidden = true` until ready. Otherwise, users might be tempted to click things (performing Collabs operations) before the container is ready, causing errors.

If you want to support a specific network/storage/UX/etc. for general Collabs apps, you can write a container host for it. This would take the form of a (non-container) Collabs app that uses your chosen network/storage/UX/etc., with a `CRDTContainerHost` as its single Collab, and with some way for users to specify the container.

Example container hosts:

- [Demo server WebSocket host](https://github.com/composablesys/collabs/blob/master/demos/server/src/site/web_socket.ts)
- [Demo server Matrix host](https://github.com/composablesys/collabs/blob/master/demos/server/src/site/matrix.ts)
- [Selector demo](https://github.com/composablesys/collabs/tree/master/demos/selector). This is not a "pure" host like the previous examples, but is instead itself a container. It lets the user pick a container from a file or URL.
- [Tile Board demo](https://github.com/composablesys/collabs/tree/master/demos/tile-board) (specifically [`src/tiles.ts`](https://github.com/composablesys/collabs/blob/master/demos/tile-board/src/tiles.ts)). Again itself a container, not a pure host. It lets the user pick a container to use as a tile in the board.

There is room for improvement in our "pure" hosts. The demo server Matrix host is the closest to providing a normal collaboration experience, with access controls (provided by a Matrix room) and the possibility of long-lasting collaboration sessions. However, it does not yet incorporate saving state or local persistent storage (see its code comments).

<!-- ## Internals

TODO, maybe not necessary (typedoc should be enough) -->

## <a id="advanced"></a>Advanced

### Multi-File Builds

Dpending on how you configure your build toolchain, you might end up with output files besides just the main HTML file (e.g., non-inlined images). You'll need to distribute those files on a static site, in addition to your main HTML file, and configure the app to point to them. Some hosts (e.g., the Selector demo) will break relative URLs, so make sure to use absolute URLs when pointing to assets (e.g., by setting Webpack's `publicPath` field).

See the [Horse Color Genetics demo](https://github.com/composablesys/collabs/tree/master/demos/horse-color-genetics)'s "multi" build for an example using Webpack.

Note that containers that depend on external assets will not have all the features of single-file containers. In particular, they will not load properly offline, and they will break if your URLs ever break.

### <a id="loading"></a>More on Loading

There are actually two parts to "loading":

1. The most recent save data (from `CRDTRuntime.save`), provided by your host, is loaded into your Collabs state (using `CRDTRuntime.load`). This happens during `Container.load`, which then resolves its Promise.
2. Besides the save data, your host may have "further messages" that the previous instance of your container sent or received after generating the most recent save data. These are also received during `Container.load`, but not applied to your Collabs state until the next event loop iteration after you call `Container.ready`. This makes them indistinguishable from newly received messages.

You can choose to instead do step 2 before calling `Container.ready` (but after awaiting `Container.load`), by calling `Container.receiveFurtherMessages()`. This will apply the further messages immediately and synchronously. Example reasons:

- You don't want to risk displaying your container to the user before it has processed these further messages, since while it is processing them, the GUI will freeze.
- You have expensive event listeners, and would rather wait until after receiving further messages to display the loaded state and attach event listeners, instead of displaying the initial loaded state and then processing a bunch of messages that emit a bunch of events. Note that this can break invariants (e.g., you might forget to clean up some state deleted by the further messages), so use care.

Usually, you shouldn't worry about these performance issues unless they become visible in practice. The host is expected to save often enough that the further messages will be few, hence quick to apply.
