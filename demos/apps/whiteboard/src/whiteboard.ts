import * as collabs from "@collabs/collabs";
import { CContainer } from "@collabs/container";
import $ from "jquery";

type Color = [r: number, g: number, b: number];

(async function () {
  const container = new CContainer();

  function aggregate(items: collabs.MultiValueMapItem<Color>[]): Color {
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
  const boardState = container.registerCollab(
    "whiteboard",
    (init) =>
      new collabs.CValueMap<[x: number, y: number], Color>(init, {
        aggregator: { aggregate },
      })
  );

  await container.load();

  // Call this before displaying the loaded state, as
  // an optimization.
  // That way, we can immediately draw the complete loaded
  // state (including further messages), instead of syncing
  // the further messages to the canvas using a bunch of events.
  container.receiveFurtherMessages();

  const colors = document.getElementsByClassName("btn-colors");
  const clear = <HTMLButtonElement>document.getElementById("clear");
  const board = <HTMLCanvasElement>document.getElementById("board");
  const ctx = board.getContext("2d")!;
  const GRAN = 2;

  // Display loaded state.
  for (const [key, [r, g, b]] of boardState) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(key[0], key[1], GRAN, GRAN);
  }

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

  // Ready.
  container.ready();
})();
