# Quick Start

To get started quickly with Collabs, you can use our [app template](https://github.com/composablesys/collabs/tree/master/template-app).

This page has instructions for using the template, a walkthrough of its starter code, and next steps for your own collaborative app.

## Using the Template

1. Download the template from GitHub:

```bash
git clone TODO
```

2. Install dependencies:

```bash
npm i
```

3. Start the app:

```bash
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) in a browser and try out the example app that it starts with - a collaborative counter. Open multiple windows to watch them count in sync!

## Starter Code

The template's starter code is a basic Webpack/TypeScript app, plus code for the collaborative counter example. Let's walk through the code files.

### `src/index.html`

First, take a look at `src/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Collabs template-app</title>
  </head>

  <body>
    <!-- We include a simple collaborative counter as an example. -->
    <p id="display">0</p>
    <button id="increment">+1</button>

    <!-- HtmlWebpackPlugin inserts the script tag for us. -->
  </body>
</html>
```

There's nothing surprising here - it's just a number display and a "+1" button, like you saw on screen.

### `src/main.ts`

Next, let's go through `src/main.ts` one part at a time.

#### Imports

At the top, we import classes from various Collabs packages:

```ts
import { CCounter, CRuntime } from "@collabs/collabs";
import { IndexedDBDocStore } from "@collabs/indexeddb";
import { TabSyncNetwork } from "@collabs/tab-sync";
import { WebSocketNetwork } from "@collabs/ws-client";
```

- [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs) is Collabs's main package. It contains all of the library's collaborative data structures, such as [CCounter](./api/collabs/classes/CCounter.html). It also contains [CRuntime](./api/collabs/classes/CRuntime.html), which you use to make a Collabs [document](./guide/documents.html): a group of Collabs that are shared together.
- The other packages are optional [network and storage providers](./guide/providers.html), described below. These help you sync Collabs documents with remote collaborators and store them locally.

#### Collaborative Counter

Next, we setup the app's example collaborative state: a single Collabs document containing a collaborative counter.

```ts
// --- App code ---

const doc = new CRuntime();

const counter = doc.registerCollab("counter", (init) => new CCounter(init));
```

Then we hook up this collaborative counter to the GUI, so that:

- The displayed value always matches the counter's current value, even when it is changed by another user.
- Clicking "+1" increments the counter.

```ts
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
doc.on("Change", refreshDisplay);

document.getElementById("increment")!.onclick = () => counter.add(1);
```

#### Network and Storage Providers

The code so far creates a single-user app that forgets its state when you refresh the page. To make it collaborative and persistent, we need to set up the network and storage providers that we imported above.

First, [WebSocketNetwork](./api/ws-client/classes/WebSocketNetwork.html) from package [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client):

```ts
// --- Network/storage setup ---

const docID = "counter";

const wsURL = "ws://localhost:3001/";
const wsNetwork = new WebSocketNetwork(wsURL);
wsNetwork.on("Disconnect", (e) => {
  // After a disconnection, try to reconnect every 2 seconds, unless
  // we deliberately called wsNetwork.disconnect().
  if (e.cause === "manual") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});

wsNetwork.subscribe(doc, docID);
```

WebSocketNetwork is a network provider that syncs Collabs documents with a central server using WebSockets. This is an easy way to collaborate with other users: each update is sent to the server, which echoes it to other users listening on the same `docID` and also stores it for later.

Note that using a central server to collaborate is convenient but not necessary - you can share Collabs updates however you like (WebRTC, [Dropbox](https://github.com/mweidner037/fileshare-recipe-editor/), ...).

The next provider is [TabSyncNetwork](./api/tab-sync/classes/TabSyncNetwork.html) from package [@collabs/tab-sync](https://www.npmjs.com/package/@collabs/tab-sync):

```ts
const tabSync = new TabSyncNetwork();
tabSync.on("Error", (e) => {
  console.error("IndexedDBDocStore error:", e.err);
});

tabSync.subscribe(doc, docID);
```

This is a network provider that shares updates across local tabs using BroadcastChannel. That way, a user with multiple tabs open sees their changes sync quickly, even when offline.

The final provider is [IndexedDBDocStore](./api/indexeddb/classes/IndexedDBDocStore.html) from package [@collabs/indexeddb](https://www.npmjs.com/package/@collabs/indexeddb):

```ts
const docStore = new IndexedDBDocStore();
docStore.on("Error", (e) => {
  console.error("IndexedDBDocStore error:", e.err);
});

docStore.subscribe(doc, docID);
```

This is a _storage_ provider that stores Collabs documents in IndexedDB. That way, your app can load documents quickly, even when offline. Adding IndexedDB storage is one step towards making your app [local-first](https://www.inkandswitch.com/local-first/).

### `package.json`

The last bit of code is the `npm start` script, defined in `package.json`:

```json
{
  "scripts": {
    "start": "npm run start:webpack & npm run start:ws-server",
    "start:webpack": "TS_NODE_PROJECT='tsconfig.webpack-config.json' webpack-dev-server",
    "start:ws-server": "collabs-ws-server"
  }
}
```

This script runs two servers in parallel (note the single `&`); you can also run each script in a separate terminal.

- `npm run start:webpack` starts [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/). It serves the app's static files on port 3000 (after building them with Webpack).
- `npm run start:ws-server` starts `collabs-ws-server` from package [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server). It handles connections from WebSocketNetwork on port 3001.

## Next Steps

You've now completed the walkthrough of template-app's starter code. Hopefully this gave you a taste of Collabs!

To turn this into your own app, you'll need to replace the "App code" section in `src/main.ts`. By registering more interesting Collabs than CCounter, you can model your app's collaborative state in Collabs, whether it's a [shared whiteboard](https://collabs-demos.herokuapp.com/whiteboard/), [rich-text editor](https://collabs-demos.herokuapp.com/rich-text/), [recipe editor](https://github.com/mweidner037/fileshare-recipe-editor/), etc.

Eventually, you'll outgrow the template's single, globally-accessible document. Luckily, the network and storage providers let you [work with many documents](./guide/providers.html#collabs-providers), and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) lets you set up basic server-side authentication and storage. You can also write [your own providers](./guide/providers.html#manual).

The [Guide](./guide/) covers these topics and more.
