import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";
import $ from "jquery";

export function setupWhiteboard(container: CRDTContainer) {
  // The key represents a point in the form: [x, y].
  // The value is the color of the stroke.
  const boardState = container.registerCollab(
    "whiteboard",
    collabs.Pre(collabs.LWWCMap)<[x: number, y: number], string>()
  );

  // Draw points
  boardState.on("Set", (event) => {
    ctx.fillStyle = boardState.get(event.key)!;
    ctx.fillRect(event.key[0], event.key[1], GRAN, GRAN);
  });

  // Clear points
  boardState.on("Delete", (event) => {
    ctx.clearRect(event.key[0], event.key[1], GRAN, GRAN);
  });

  const colors = document.getElementsByClassName("btn-colors");
  const clear = <HTMLButtonElement>document.getElementById("clear");
  const board = <HTMLCanvasElement>document.getElementById("board");
  const ctx = board.getContext("2d")!;
  const GRAN = 2;

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
  let color = "black";

  let isDown = false;
  let canvasX: number, canvasY: number, prevX: number, prevY: number;

  // Update color selection
  $(colors).on("click", function (e: JQuery.ClickEvent) {
    color = e.target.id;
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

  // Once loaded, display loaded state.
  container.runtime.once("Load", () => {
    for (const [key, value] of boardState) {
      ctx.fillStyle = value;
      ctx.fillRect(key[0], key[1], GRAN, GRAN);
    }
  });
}
