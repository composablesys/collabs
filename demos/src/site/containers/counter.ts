import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";

(async function () {
  // HTML
  document.body.innerHTML = require("./counter.html").default;

  /**
   * Generate CRDTs' Runtime on each runtime and create CRDTs (e.g. Counter).
   */
  const runtime = await ContainerRuntimeSource.newRuntime(window.parent);
  let counterCrdt = runtime.registerCrdt("counter", new crdts.CCounter());

  /* HTML variables */
  var counter = document.getElementById("counter");

  /* Customize the event listener for CRDT as refresh the value */
  counterCrdt.on("Change", (_) => {
    counter!.innerHTML = counterCrdt.value.toString();
  });

  /* Customize onclick() function of increment button with CRDT operation */
  document.getElementById("increment")!.onclick = function () {
    console.log("clicked increment");
    counterCrdt.add(100);
    counter!.innerHTML = counterCrdt.value.toString();
  };

  /* Customize onclick() function of decrement button with CRDT operation */
  document.getElementById("decrement")!.onclick = function () {
    console.log("clicked decrement");
    counterCrdt.add(-100);
    counter!.innerHTML = counterCrdt.value.toString();
  };

  document.getElementById("reset")!.onclick = function () {
    console.log("clicked reset");
    counterCrdt.reset();
    counter!.innerHTML = counterCrdt.value.toString();
  };

  // document.getElementById("strongReset")!.onclick = function () {
  //   console.log("clicked strongReset");
  //   counterCrdt.strongReset();
  //   counter!.innerHTML = counterCrdt.value.toString();
  // };

  // /* Customize onclick() function of sync to synchronize the value */
  // document.getElementById("sync")!.onclick = function() {
  //     counter!.innerHTML = counterCrdt.value.toString();
  // }
})();
