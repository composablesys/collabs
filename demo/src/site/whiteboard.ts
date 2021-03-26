import { crdts, network } from "compoventuals-client";
import { LwwMap } from "compoventuals-client/build/src/crdts";
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
export class LwwMapResettable<K, V> extends crdts.AddAllAbilitiesViaChildren(
  crdts.LwwMap
) {}
// let clientBoard: LwwMapResettable<string, string> = new LwwMapResettable(
//   client,
//   "whiteboardId"
// );

let clientBoard : LwwMap<string, string> = new LwwMap(client, "whiteboardId");

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

  clientBoard.on("KeyAdd", (event) => {
    // TODO: remove cast to string once we fix mixin generics
    keyReactGeneric(event.key as string, event.value as string);
  });

  clientBoard.on("ValueChange", (event) => {
    // TODO: remove cast to string once we fix mixin generics
    keyReactGeneric(event.key as string, event.value as string);
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
      clientBoard.hardReset();
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
