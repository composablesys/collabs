import { CRuntime, CValueMap, MultiValueMapItem } from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";
import $ from "jquery";

// --- App code ---

type Color = [r: number, g: number, b: number];

const doc = new CRuntime();

function aggregate(items: MultiValueMapItem<Color>[]): Color {
  const sum = items
    .map((item) => item.value)
    .reduce(
      ([r1, g1, b1], [r2, g2, b2]) => [r1 + r2, g1 + g2, b1 + b2],
      [0, 0, 0]
    );
  return [sum[0], sum[1], sum[2]];
}

// The key represents a point in the form: [x, y].
// The value is the RGB color of the stroke.
// For fun, we aggregate concurrent colors by averaging them.
const boardState = doc.registerCollab(
  "whiteboard",
  (init) =>
    new CValueMap<[x: number, y: number], Color>(init, {
      aggregator: { aggregate },
    })
);

const colors = document.getElementsByClassName("btn-colors");
const clear = <HTMLButtonElement>document.getElementById("clear");
const board = <HTMLCanvasElement>document.getElementById("board");
const ctx = board.getContext("2d")!;
const GRAN = 2;

// Draw points
boardState.on("Set", (event) => {
  const [r, g, b] = event.value;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(event.key[0], event.key[1], GRAN, GRAN);
});

// Clear points
boardState.on("Delete", (event) => {
  ctx.clearRect(event.key[0], event.key[1], GRAN, GRAN);
});

function roundGran(n: number): number {
  return Math.round(n / GRAN) * GRAN;
}

function interpolate(
  sX: number,
  sY: number,
  eX: number,
  eY: number
): [number, number][] {
  const pts: [number, number][] = [];

  // special case - line goes straight up/down
  if (sX == eX) {
    for (
      let i = roundGran(Math.min(sY, eY));
      i <= roundGran(Math.max(sY, eY));
      i += GRAN
    ) {
      pts.push([roundGran(sX), i]);
    }

    return pts;
  }

  const slope = (eY - sY) / (eX - sX);
  const intercept = sY - slope * sX;

  // Depending on slope, iterate by xs or ys
  if (slope <= 1 && slope >= -1) {
    for (
      let i = roundGran(Math.min(sX, eX));
      i <= roundGran(Math.max(sX, eX));
      i += GRAN
    ) {
      pts.push([i, roundGran(slope * i + intercept)]);
    }
  } else {
    for (
      let i = roundGran(Math.min(sY, eY));
      i <= roundGran(Math.max(sY, eY));
      i += GRAN
    ) {
      pts.push([roundGran((i - intercept) / slope), i]);
    }
  }

  return pts;
}

// Mouse Event Handlers
let color: Color = [0, 0, 0];

let isDown = false;
let canvasX: number, canvasY: number, prevX: number, prevY: number;

// Update color selection
$(colors).on("click", function (e: JQuery.ClickEvent) {
  color = JSON.parse(e.target.id);
});

$(clear).on("click", function () {
  boardState.clear();
});

// Draw on board
$(board)
  .on("mousedown", function (e: JQuery.MouseDownEvent) {
    isDown = true;
    const rect = e.target.getBoundingClientRect();
    prevX = e.clientX - rect.left;
    prevY = e.clientY - rect.top;
  })
  .on("mousemove", function (e: JQuery.MouseMoveEvent) {
    if ((e.buttons & 1) === 0) isDown = false;
    if (isDown !== false) {
      const rect = e.target.getBoundingClientRect();
      canvasX = e.clientX - rect.left;
      canvasY = e.clientY - rect.top;
      interpolate(prevX, prevY, canvasX, canvasY).forEach(function (pt) {
        boardState.set(pt, color);
      });
      prevX = canvasX;
      prevY = canvasY;
    }
  })
  .on("mouseup", function () {
    isDown = false;
  });

// --- Network/storage setup ---

const docID = "whiteboard";

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
  if (e.cause === "manual") return;
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
