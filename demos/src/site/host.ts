import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";

// Test Container, modified from counter demo.
const testContainer: crdts.ContainerSource = {
  attachNewContainer(domParent, crdtParentHook) {
    // Counter HTML.
    domParent.innerHTML = `
    <!-- HTML page variables and buttons -->
    <p id="counter">0</p>
    <button id="increment">💯️</button>
    <button id="decrement">-💯️</button>
    <br />
    <button id="reset">Reset</button>
    `;

    // Counter JS
    let clientCounter = crdtParentHook(new crdts.CCounter());

    /* HTML variables */
    // Note that here we use domParent instead of document,
    // to get Shadow DOM scoping.
    var counter = domParent.getElementById("counter");

    /* Customize the event listener for CRDT as refresh the value */
    clientCounter.on("Change", (_) => {
      counter!.innerHTML = clientCounter.value.toString();
    });

    /* Customize onclick() function of increment button with CRDT operation */
    domParent.getElementById("increment")!.onclick = function () {
      console.log("clicked increment");
      clientCounter.add(100);
      counter!.innerHTML = clientCounter.value.toString();
    };

    /* Customize onclick() function of decrement button with CRDT operation */
    domParent.getElementById("decrement")!.onclick = function () {
      console.log("clicked decrement");
      clientCounter.add(-100);
      counter!.innerHTML = clientCounter.value.toString();
    };

    domParent.getElementById("reset")!.onclick = function () {
      console.log("clicked reset");
      clientCounter.reset();
      counter!.innerHTML = clientCounter.value.toString();
    };
  },
};

// Actual hosting stuff
// TODO: permissionless iframe (no communication except
// what we allow).  Although some of this code (e.g. Shadow
// DOM) stuff should remain on the permissionless side.
// TODO: dynamic loading.
// TODO: test with multiple instances.

const topDiv = document.getElementById("topDiv")!;
const shadowRoot = topDiv.attachShadow({ mode: "open" });

const HOST = location.origin.replace(/^http/, "ws");
const client = new crdts.Runtime(new WebSocketNetwork(HOST, "container"));

testContainer.attachNewContainer(shadowRoot, (topLevelCrdt) =>
  client.registerCrdt("container", topLevelCrdt)
);
