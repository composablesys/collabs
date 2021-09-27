import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";
import { setupTiles } from "./tiles";
import { setupWhiteboard } from "./whiteboard";

window.onload = () => {
  // Scroll the canvas so it is centered.
  const boardScroller = <HTMLDivElement>(
    document.getElementById("boardScroller")
  );
  const board = <HTMLCanvasElement>document.getElementById("board");
  boardScroller.scroll(
    Math.max(0, Math.round((board.width - boardScroller.clientWidth) / 2)),
    Math.max(0, Math.round((board.height - boardScroller.clientHeight) / 2))
  );
};

(async function () {
  const runtime = await ContainerRuntimeSource.newRuntime(
    window.parent,
    new crdts.RateLimitBatchingStrategy(200)
  );

  setupWhiteboard(runtime);
  setupTiles(runtime);
})();
