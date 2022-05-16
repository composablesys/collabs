# Quick Start

In this quick start, you will make a collaborative counter app: a webpage where anyone can view and change a shared counter value. The finished app's code is [here](https://github.com/composablesys/collabs/tree/master/demos/apps/counter) and a live demo is [here](https://compoventuals-tests.herokuapp.com/web_socket.html?container=demos/counter/dist/counter.html). The [first part of the guide](../guide/walkthrough) will walk through the code that you copy and paste here.

1. Download the [Container Starter Template](https://github.com/composablesys/collabs/tree/master/template-container).
2. Open the template's root folder in a terminal, then run `npm i` to install dependencies.
3. Open `src/index.html` in a text editor/IDE. Replace the `TODO` comment with the following HTML content, which adds a title, a display area for the counter, and a button to increment the counter:

```html
<head>
  <title>Counter</title>
</head>

<body>
  <p id="display">0</p>
  <button id="increment">+1</button>
</body>
```

4. Open `src/app.ts`. Replace the two `TODO` comments with the TypeScript code below. This code connects the display area and increment button to a Collabs `CCounter`---a collaborative counter.

First `TODO` replacement:

```ts
// Register Collabs.
const counter = container.registerCollab(
  "counter",
  collabs.Pre(collabs.ResettableCCounter)()
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
```

Second `TODO` replacement:

```ts
// Display the loaded state.
refreshDisplay();
```

5. Save both files, then in the terminal (still in the template's root folder), build your app in development mode: `npm run dev`.

6. Test your app: `npm start`, then open [http://localhost:3000/](http://localhost:3000/). You should see a simple collaborative counter. Try using it in multiple windows at once.

7. (Optional) Deploy your app to the web:
   a. Rename the output file: At the `TODO` in `webpack.config.ts`, replace `MY_CONTAINER.html` with `counter.html`. Do the same replacement in `package.json`.
   b. Build your app in production mode: `npm run build`. This is essentially the same as `npm run dev`, but it makes a smaller output file.
   c. Take the output file, `dist/counter.html`, and upload it to [Collabs's Container Selector demo](https://compoventuals-tests.herokuapp.com/web_socket.html?container=demos/selector/dist/selector.html) in the "By file" category. (If you don't see the option to upload a file, you'll need to reset the demo from the "More Info" page linked at the top.) After clicking "Go", you should see your counter, and anyone who visits that page can collaboratively increment the value. Under the hood, Collabs is using our demo server to connect collaborators.

## Next Steps

Head over to the [Guide](./guide) for a walkthrough of this app and to learn how to create your own Collabs apps.
