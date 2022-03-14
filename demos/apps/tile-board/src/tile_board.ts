import { CRDTContainer } from "@collabs/container";
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
  const container = new CRDTContainer();

  setupWhiteboard(container);
  setupTiles(container);

  await container.load();

  // The whiteboard and tiles take care of displaying
  // loaded state on their own.

  // Ready. It's okay that setupWhiteboard and setupTiles do
  // some setup in microtasks, since ready won't really
  // take effect (start delivering messages) until the next
  // event loop iteration.
  container.ready();
})();
