import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";

// Test Container, modified from counter demo.
const testContainer: crdts.ContainerSource = {
  isContainerSource: true,
  attachNewContainer(domParent, crdtParentHook) {
    // Counter HTML.
    domParent.innerHTML = `
    <!-- HTML page variables and buttons -->
    <p id="counter">0</p>
    <button id="increment">💯️</button>
    <button id="decrement">-💯️</button>
    <br />
    <button id="reset">Reset</button>
    <!-- Testing security: this is blocked by the browser. -->
    <!--<img src="http://imgs.xkcd.com/comics/fissile_raspberry_isotopes.png">-->
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

    // // Testing security: this is blocked by the browser.
    // var HOST = "wss://compoventuals-tests.herokuapp.com";
    // let client = new crdts.Runtime(new WebSocketNetwork(HOST, "counter"));
  },
};
export default testContainer;
