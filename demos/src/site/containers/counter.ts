import * as crdts from "compoventuals";
import { ContainerSource } from "compoventuals-container";

const container: ContainerSource = {
  isContainerSource: true,
  attachNewContainer(document, runtime) {
    // HTML
    document.innerHTML = `
      <!-- HTML page variables and buttons -->
      <p id="counter">0</p>
      <button id="increment">💯️</button>
      <button id="decrement">-💯️</button>
      <br />
      <button id="reset">Reset</button>
      <!-- Testing security: this is blocked by the browser. -->
      <!--<img src="http://imgs.xkcd.com/comics/fissile_raspberry_isotopes.png">-->
    `;

    // JS
    let clientCounter = runtime.registerCrdt("counter", new crdts.CCounter());

    /* HTML variables */
    // Note that here we use document instead of document,
    // to get Shadow DOM scoping.
    var counter = document.getElementById("counter");

    /* Customize the event listener for CRDT as refresh the value */
    clientCounter.on("Change", (_) => {
      counter!.innerHTML = clientCounter.value.toString();
    });

    /* Customize onclick() function of increment button with CRDT operation */
    document.getElementById("increment")!.onclick = function () {
      console.log("clicked increment");
      clientCounter.add(100);
      counter!.innerHTML = clientCounter.value.toString();
    };

    /* Customize onclick() function of decrement button with CRDT operation */
    document.getElementById("decrement")!.onclick = function () {
      console.log("clicked decrement");
      clientCounter.add(-100);
      counter!.innerHTML = clientCounter.value.toString();
    };

    document.getElementById("reset")!.onclick = function () {
      console.log("clicked reset");
      clientCounter.reset();
      counter!.innerHTML = clientCounter.value.toString();
    };

    // // Testing security: this is blocked by the browser.
    // var HOST = "wss://compoventuals-tests.herokuapp.com";
    // let client = new crdts.Runtime(new WebSocketNetwork(HOST, "counter"));
  },
};
export default container;
