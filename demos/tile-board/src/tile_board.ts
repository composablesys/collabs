import * as collabs from "@collabs/collabs";
import { ContainerAppSource } from "@collabs/container";
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
  const app = await ContainerAppSource.newApp(
    window.parent,
    new collabs.RateLimitBatchingStrategy(200)
  );

  setupWhiteboard(app);
  setupTiles(app);
})();
