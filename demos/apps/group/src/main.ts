import { CRuntime } from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";
import $ from "jquery";
import { GroupCRDT, GroupState } from "./groupcrdt";

// --- App code ---

const doc = new CRuntime();

let clientGroup = doc.registerCollab("group", (init) => new GroupCRDT(init));

var ops1 = document.getElementsByClassName("btn-ops-1");
var ops2 = document.getElementsByClassName("btn-ops-2");
var ops3 = document.getElementsByClassName("btn-ops-3");
var deg1 = <HTMLInputElement>document.getElementById("rotate-deg1");
var deg2 = <HTMLInputElement>document.getElementById("rotate-deg2");
var deg3 = <HTMLInputElement>document.getElementById("rotate-deg3");
var groupdX = <HTMLInputElement>document.getElementById("translateX3");
var groupdY = <HTMLInputElement>document.getElementById("translateY3");
var img1 = <HTMLCanvasElement>document.getElementById("shape2");
var img2 = <HTMLCanvasElement>document.getElementById("shape1");
var groupDiv = <HTMLDivElement>document.getElementById("group");

let updateImg = function () {
  let state: GroupState = clientGroup.getState();
  img1!.style.transform = `translate(${state.X1}px,${state.Y1}px) rotate(${state.rotate1}deg) scaleY(${state.reflectX1}) scaleX(${state.reflectY1})`; // translate(-50%, -50%)`;
  img2!.style.transform = `translate(${state.X2}px,${state.Y2}px) rotate(${state.rotate2}deg) scaleY(${state.reflectX2}) scaleX(${state.reflectY2})`; // translate(-50%, -50%)`;
};

doc.on("Change", () => {
  updateImg();
});

// Perform specified operation on the CMU image
$(ops1).on("click", function (e: JQuery.ClickEvent) {
  switch (e.target.id) {
    case "reflectX1":
      clientGroup.reflectX(1);
      break;

    case "reflectY1":
      clientGroup.reflectY(1);
      break;

    case "rotateCW1":
      clientGroup.rotate(parseInt(deg1!.value) || 0, 1);
      break;

    case "rotateCCW1":
      clientGroup.rotate(-1 * parseInt(deg1!.value) || 0, 1);
      break;
  }
});

// Perform specified operation on the ISR image
$(ops2).on("click", function (e: JQuery.ClickEvent) {
  switch (e.target.id) {
    case "reflectX2":
      clientGroup.reflectX(2);
      break;

    case "reflectY2":
      clientGroup.reflectY(2);
      break;

    case "rotateCW2":
      clientGroup.rotate(parseInt(deg2!.value) || 0, 2);
      break;

    case "rotateCCW2":
      clientGroup.rotate(-1 * parseInt(deg2!.value) || 0, 2);
      break;
  }
});

function groupRotate(dDegrees: number) {
  let state: GroupState = clientGroup.getState();
  let centerX = (state.X1 + state.X2) / 2;
  let centerY = (state.Y1 + state.Y2) / 2;
  clientGroup.translate(-1 * centerX, -1 * centerY, 3);
  clientGroup.rotate(dDegrees, 3);
  clientGroup.translate(centerX, centerY, 3);
}

function groupReflect(axis: string) {
  let state: GroupState = clientGroup.getState();
  switch (axis) {
    case "X":
      let centerX = (state.Y1 + state.Y2) / 2;
      clientGroup.translate(0, -1 * centerX, 3);
      clientGroup.reflectX(3);
      clientGroup.translate(0, centerX, 3);
      break;
    case "Y":
      let centerY = (state.X1 + state.X2) / 2;
      clientGroup.translate(-1 * centerY, 0, 3);
      clientGroup.reflectY(3);
      clientGroup.translate(centerY, 0, 3);
      break;
  }
}

// Perform specified operation on both images
$(ops3).on("click", function (e: JQuery.ClickEvent) {
  switch (e.target.id) {
    case "reflectX3":
      groupReflect("X");
      break;

    case "reflectY3":
      groupReflect("Y");
      break;

    case "rotateCW3":
      groupRotate(parseInt(deg3!.value) || 0);
      break;

    case "rotateCCW3":
      groupRotate(-1 * parseInt(deg3!.value) || 0);
      break;

    case "translate3":
      clientGroup.translate(
        parseInt(groupdX!.value) || 0,
        parseInt(groupdY!.value) || 0,
        3
      );
      break;
  }
});

var offsetY = document.getElementById("header")!.offsetHeight || 100;

// Move images around screen.
var isDown1 = false;
var X1: number, Y1: number;
var isDown2 = false;
var X2: number, Y2: number;

$(img1).on("mousedown", function (e: JQuery.MouseDownEvent) {
  isDown1 = true;
  isDown2 = false;
  X1 = e.pageX;
  Y1 = e.pageY;
});
$(img2).on("mousedown", function (e: JQuery.MouseDownEvent) {
  isDown2 = true;
  isDown1 = false;
  X2 = e.pageX;
  Y2 = e.pageY;
});

$(groupDiv)
  .on("mousemove", function (e: JQuery.MouseMoveEvent) {
    if (isDown1) {
      clientGroup.translate(e.pageX - X1, e.pageY - Y1, 1);
      X1 = e.pageX;
      Y1 = e.pageY;
    }
    if (isDown2) {
      clientGroup.translate(e.pageX - X2, e.pageY - Y2, 2);
      X2 = e.pageX;
      Y2 = e.pageY;
    }
  })
  .on("mouseup mouseleave", function () {
    isDown1 = false;
    isDown2 = false;
  });

// --- Network/storage setup ---

const docID = "group";

// Connect to the server over WebSocket.
const wsURL = location.origin.replace(/^http/, "ws");
const wsNetwork = new WebSocketNetwork(wsURL, { connect: false });
wsNetwork.on("Load", (e) => {
  console.log(`Loaded doc "${e.docID}" from the server.`);
});
wsNetwork.on("Save", (e) => {
  console.log(`Saved all local updates to doc "${e.docID}" to the server`);
});
wsNetwork.on("Connect", () => console.log("Connected to the server."));
wsNetwork.on("Disconnect", (e) => {
  // After a disconnection, try to reconnect every 2 seconds, unless
  // we deliberately called wsNetwork.disconnect().
  if (e.cause === "disconnect") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});
wsNetwork.subscribe(doc, docID);

// In a real app, you would probably also add on-device storage
// (@collabs/indexeddb or @collabs/local-storage)
// and cross-tab sync (@collabs/tab-sync).
// See the [Guide](TODO) for an example.

// --- "Connected" checkbox for testing concurrency ---

const connected = document.getElementById("connected") as HTMLInputElement;
connected.checked = localStorage.getItem("connected") !== "false";
if (connected.checked) {
  // Instead of calling connect() here, you can just remove WebSocketNetwork's
  // { connect: false } option above.
  wsNetwork.connect();
}
connected.addEventListener("click", () => {
  localStorage.setItem("connected", connected.checked + "");
  if (connected.checked) wsNetwork.connect();
  else wsNetwork.disconnect();
});
