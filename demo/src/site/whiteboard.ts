import { crdts, network } from "compoventuals-client";
import { min, max, round } from "mathjs";

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, "ws");

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. Counter).
 */
let client = new crdts.CrdtRuntime(
  new network.DefaultCausalBroadcastNetwork(
    new network.WebSocketNetwork(HOST, "whiteboard")
  ),
  { periodMs: 5000 }
);

// The key represents a point in the form: x:y
// The value is the color of the stroke.
let clientBoard: crdts.LwwMap<string, string> = client.registerCrdt(
  "whiteboardId",
  new crdts.LwwMap()
);

window.onload = function () {
  var colors = document.getElementsByClassName("btn-colors");
  var clear = <HTMLButtonElement>document.getElementById("clear");
  var board = <HTMLCanvasElement>document.getElementById("board");
  var ctx = board.getContext("2d");
  let gran = 2;

  let roundGran = function (n: number): number {
    return round(n / gran) * gran;
  };

  let interpolate = function (sX: number, sY: number, eX: number, eY: number) {
    // special case - line goes straight up/down
    if (sX == eX) {
      let pts = [];
      for (
        let i = roundGran(min(sY, eY));
        i <= roundGran(max(sY, eY));
        i += gran
      ) {
        pts.push(roundGran(sX) + ":" + i);
      }

      return pts;
    }

    let slope = (eY - sY) / (eX - sX);
    let pts = [];
    let intercept = sY - slope * sX;

    // Depending on slope, iterate by xs or ys
    if (slope <= 1 && slope >= -1) {
      for (
        let i = roundGran(min(sX, eX));
        i <= roundGran(max(sX, eX));
        i += gran
      ) {
        pts.push(i + ":" + roundGran(slope * i + intercept));
      }
    } else {
      for (
        let i = roundGran(min(sY, eY));
        i <= roundGran(max(sY, eY));
        i += gran
      ) {
        pts.push(roundGran((i - intercept) / slope) + ":" + i);
      }
    }

    return pts;
  };

  // Draw points
  clientBoard.on("ValueChange", (event) => {
    var keys = event.key.split(":");
    ctx!.fillStyle = event.value;
    ctx!.fillRect(parseInt(keys[0]), parseInt(keys[1]), gran, gran);
  });

  // Clear points
  clientBoard.on("KeyDelete", (event) => {
    var keys = event.key.split(":");
    ctx!.clearRect(parseInt(keys[0]), parseInt(keys[1]), gran, gran);
  });

  // Mouse Event Handlers
  if (board) {
    var ctx = board.getContext("2d");
    var color = "black";

    var isDown = false;
    var canvasX: number, canvasY: number, prevX: number, prevY: number;

    // Update color selection
    $(colors).on("click", function (e: JQuery.ClickEvent) {
      color = e.target.id;
    });

    $(clear).on("click", function () {
      clientBoard.reset();
    });

    // Draw on board
    $(board)
      .on("mousedown", function (e: JQuery.MouseDownEvent) {
        isDown = true;
        prevX = e.pageX - board.offsetLeft;
        prevY = e.pageY - board.offsetTop;
      })
      .on("mousemove", function (e: JQuery.MouseMoveEvent) {
        if (isDown !== false) {
          canvasX = e.pageX - board.offsetLeft;
          canvasY = e.pageY - board.offsetTop;
          interpolate(prevX, prevY, canvasX, canvasY).forEach(function (pt) {
            clientBoard.set(pt, color);
          });
          prevX = canvasX;
          prevY = canvasY;
        }
      })
      .on("mouseup", function () {
        isDown = false;
      });
  }
};
