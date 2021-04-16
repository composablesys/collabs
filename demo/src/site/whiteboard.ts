import { crdts, network } from "compoventuals-client";

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, "ws");

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. Counter).
 */
let client = new crdts.CrdtRuntime(
  new network.DefaultCausalBroadcastNetwork(new network.WebSocketNetwork(HOST))
);

// The key represents a stroke in the form: endX:endY:startX:startY
// The value is the color of the stroke.
let clientBoard: crdts.LwwMap<string, string> = client
  .groupParent("whiteboardGroup")
  .addChild("whiteboardId", new crdts.LwwMap());

window.onload = function () {
  var colors = document.getElementsByClassName("btn-colors");
  var clear = <HTMLButtonElement>document.getElementById("clear");
  var board = <HTMLCanvasElement>document.getElementById("board");
  var ctx = board.getContext("2d");
  ctx!.lineWidth = 5;

  let keyReactGeneric = function (key: string, value: string) {
    var keys = key.split(":");
    ctx!.fillStyle = value;
    ctx!.fillRect(parseInt(keys[0]), parseInt(keys[1]), 5, 5);
  };

  let interpolate = function (startX: number, startY: number, endX: number, endY: number) {
    // special case - line goes straight down
    if (endX - startX == 0) {
      let pts = [];
      for (let i = startY; i <= endY; i++) {
        pts.push(startX + ":" + i);
      }

      return pts;
    }
    
    let slope = (endY - startY) / (endX - startX);
    let intercept = startY - slope * startX;
    let pts = [];
    for (let i = startX; i <= endX; i++) {
      pts.push(i + ":" + (slope*i + intercept));
    }

    return pts;
  };

  // clientBoard.on("KeyAdd", (event) => { generics
  //   keyReactGeneric(event.key, event.value);
  // });

  clientBoard.on("ValueChange", (event) => {
    keyReactGeneric(event.key, event.value);
  });

  // Mouse Event Handlers
  if (board) {
    var ctx = board.getContext("2d");
    var color = "black";

    var isDown = false;
    var canvasX, canvasY, prevX, prevY;

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
