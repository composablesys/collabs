import { crdts, network } from "compoventuals-client";
import { v4 as uuid } from "uuid";

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, "ws");

/**
 * Generate uuid for each client.
 */
const client_uuid: string = uuid();

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. Counter).
 */
let client = new crdts.CrdtRuntime(
  new network.DefaultCausalBroadcastNetwork(
    client_uuid,
    new network.WebSocketNetwork(HOST)
  )
);

// The key represents a stroke in the form: endX:endY:startX:startY
// The value is the color of the stroke.
let clientBoard: crdts.LwwMap<string, string> = client
  .groupParent("default")
  .addChild("whiteboardId", new crdts.LwwMap());

window.onload = function () {
  var colors = document.getElementsByClassName("btn-colors");
  var clear = <HTMLButtonElement>document.getElementById("clear");
  var board = <HTMLCanvasElement>document.getElementById("board");
  var ctx = board.getContext("2d");
  ctx!.lineWidth = 5;

  let keyReactGeneric = function (key: string, value: string) {
    ctx!.strokeStyle = value;
    var keys = key.split(":");
    ctx!.beginPath();
    ctx!.moveTo(parseInt(keys[0]), parseInt(keys[1]));
    ctx!.lineTo(parseInt(keys[2]), parseInt(keys[3]));
    ctx!.stroke();
    ctx!.closePath();
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

    var isDown = false;
    var canvasX, canvasY, prevX: number, prevY: number;

    ctx!.lineWidth = 5;
    ctx!.strokeStyle = "black";

    // Update color selection
    $(colors).on("click", function (e: JQuery.ClickEvent) {
      console.log(e.target.id);
      ctx!.strokeStyle = e.target.id;
    });

    $(clear).on("click", function () {
      clientBoard.reset();
    });

    // Draw on board
    $(board)
      .on("mousedown", function (e: JQuery.MouseDownEvent) {
        isDown = true;
        canvasX = e.pageX - board.offsetLeft;
        canvasY = e.pageY - board.offsetTop;
        prevX = canvasX;
        prevY = canvasY;
        var key = prevX + ":" + prevY + ":" + canvasX + ":" + canvasY;
        clientBoard.set(key, <string>ctx!.strokeStyle);
      })
      .on("mousemove", function (e: JQuery.MouseMoveEvent) {
        if (isDown !== false) {
          canvasX = e.pageX - board.offsetLeft;
          canvasY = e.pageY - board.offsetTop;
          var key = prevX + ":" + prevY + ":" + canvasX + ":" + canvasY;
          clientBoard.set(key, <string>ctx!.strokeStyle);
          prevX = canvasX;
          prevY = canvasY;
        }
      })
      .on("mouseup", function () {
        isDown = false;
      });
  }
};
