import * as crdts from "compoventuals";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";

// Create a Runtime using our chosen network.
// Here we use MatrixWidgetNetwork from package compoventuals-matrix,
// which uses a Matrix group chat to send messages, assuming
// we are loaded as a widget.
// We also rate-limit messages to be nicer to the Matrix servers.
const runtime = new crdts.Runtime(
  new MatrixWidgetNetwork("com.herokuapp.compoventuals-tests.counter"),
  new crdts.RateLimitBatchingStrategy(300)
);

// Create top-level Crdts to store the collaborative state.
// Here we just need one counter.
const counterCrdt = runtime.registerCrdt(
  "counter",
  crdts.Pre(crdts.CCounter)()
);

const display = document.getElementById("display")!;

// Refresh the display when the Crdt state changes, possibly
// due to a message from another replica.
runtime.on("Change", () => {
  display.innerHTML = counterCrdt.value.toString();
});

// Change counterCrdt's value on button clicks.
// Note that we need not refresh the display here, since Batch
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counterCrdt.add(100);
};
document.getElementById("decrement")!.onclick = () => {
  counterCrdt.add(-100);
};
document.getElementById("reset")!.onclick = () => {
  counterCrdt.reset();
};
