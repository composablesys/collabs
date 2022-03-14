import * as collabs from "@collabs/collabs";
import { CRDTContainer, CRDTContainerHost } from "@collabs/container";
import pako from "pako";
import { richTextPreContent } from "./rich_text_tile";

/**
 * A Collab that holds an immutable value passed to the constructor.
 */
class CImmutable<T> extends collabs.CObject {
  constructor(initToken: collabs.InitToken, readonly value: T) {
    super(initToken);
  }
}

class CTile extends collabs.CObject {
  readonly contentCollab: collabs.Collab;
  readonly left: collabs.LWWCVariable<number>;
  readonly top: collabs.LWWCVariable<number>;
  readonly width: collabs.LWWCVariable<number>;
  readonly height: collabs.LWWCVariable<number>;

  readonly dom: HTMLDivElement;
  readonly innerDiv: HTMLDivElement;

  constructor(
    initToken: collabs.InitToken,
    private readonly domParent: HTMLElement,
    preContent: (
      contentInitToken: collabs.InitToken,
      contentDomParent: HTMLElement
    ) => collabs.Collab,
    initialX: number,
    initialY: number,
    initialWidth: number,
    initialHeight: number
  ) {
    super(initToken);

    // Create DOM.
    this.dom = document.createElement("div");
    this.dom.className = "tile";
    this.dom.draggable = false;
    this.innerDiv = document.createElement("div");
    this.innerDiv.className = "tile-inner-div";
    this.innerDiv.draggable = false;
    this.dom.appendChild(this.innerDiv);
    domParent.appendChild(this.dom);
    this.setupRectHandlers();

    // Create types.
    this.contentCollab = this.addChild("", (contentInitToken) =>
      preContent(contentInitToken, this.innerDiv)
    );
    this.left = this.addChild("x", collabs.Pre(collabs.LWWCVariable)(initialX));
    this.top = this.addChild("y", collabs.Pre(collabs.LWWCVariable)(initialY));
    this.width = this.addChild(
      "width",
      collabs.Pre(collabs.LWWCVariable)(initialWidth)
    );
    this.height = this.addChild(
      "height",
      collabs.Pre(collabs.LWWCVariable)(initialHeight)
    );

    // Keep this.dom in sync with its rect.
    this.dom.style.position = "absolute";
    this.left.on("Set", () => this.updateRect());
    this.top.on("Set", () => this.updateRect());
    this.width.on("Set", () => this.updateRect());
    this.height.on("Set", () => this.updateRect());
    // updateRect() will be called in loadObject to set
    // the initial rect.
  }

  private updateRect() {
    // Don't update the rect while the user is doing something,
    // to avoid confusion.
    if (!(this.isResizing || this.isMoving)) {
      this.dom.style.left = this.left.value + "px";
      this.dom.style.top = this.top.value + "px";
      this.dom.style.width = this.width.value + "px";
      this.dom.style.height = this.height.value + "px";
    }
  }

  private static readonly CORNER_TOL = 10; // in pixels
  private static readonly MIN_SIZE = 20; // in pixels;

  private mouseStartX = 0;
  private mouseStartY = 0;

  private isResizing = false;
  private startWidth = 0;
  private startHeight = 0;
  private newWidth = 0;
  private newHeight = 0;

  private isMoving = false;
  private startLeft = 0;
  private startTop = 0;
  private newLeft = 0;
  private newTop = 0;

  /**
   * Add handlers to this.dom to move or resize this component
   * when the borders are dragged.
   *
   * Top left corner moves, bottom right corner resizes.
   * TODO: visual indicators on the div.
   */
  private setupRectHandlers() {
    this.dom.addEventListener("mousedown", (e) => {
      if ((e.buttons & 1) === 0) return;
      if (this.isResizing || this.isMoving) return;

      if (this.inResizeZone(e)) {
        // Resizing
        this.isResizing = true;
        this.innerDiv.style.pointerEvents = "none";
        this.dom.style.cursor = "nwse-resize";

        const [x, y] = this.coords(e, this.dom);
        this.mouseStartX = x;
        this.mouseStartY = y;
        this.startWidth = this.dom.offsetWidth;
        this.startHeight = this.dom.offsetHeight;
        this.newWidth = this.startWidth;
        this.newHeight = this.startHeight;
      } else if (this.inMoveZone(e)) {
        // Moving
        this.isMoving = true;
        this.innerDiv.style.pointerEvents = "none";
        this.dom.style.cursor = "move";

        const [x, y] = this.coords(e, this.domParent);
        this.mouseStartX = x;
        this.mouseStartY = y;
        this.startLeft = this.dom.offsetLeft;
        this.startTop = this.dom.offsetTop;
        this.newLeft = this.startLeft;
        this.newTop = this.startTop;
      }
    });

    this.dom.addEventListener("mousemove", (e) => {
      if (this.isResizing) {
        if ((e.buttons & 1) === 0) {
          // The mouse was released but we missed it somehow.
          this.mouseEnd(e, true);
          return;
        }
        const [x, y] = this.coords(e, this.dom);
        // Visually update the size, but don't perform a Collab
        // op yet.
        this.newWidth = Math.max(
          this.startWidth + x - this.mouseStartX,
          CTile.MIN_SIZE
        );
        this.dom.style.width = this.newWidth + "px";
        this.newHeight = Math.max(
          this.startHeight + y - this.mouseStartY,
          CTile.MIN_SIZE
        );
        this.dom.style.height = this.newHeight + "px";
      } else if (this.isMoving) {
        if ((e.buttons & 1) === 0) {
          // The mouse was released but we missed it somehow.
          this.mouseEnd(e, true);
          return;
        }
        const [x, y] = this.coords(e, this.domParent);
        // Visually update the size, but don't perform a Collab
        // op yet.
        // TODO: prevent dragging off canvas
        this.newLeft = Math.max(this.startLeft + x - this.mouseStartX, 0);
        this.dom.style.left = this.newLeft + "px";
        this.newTop = Math.max(this.startTop + y - this.mouseStartY, 0);
        this.dom.style.top = this.newTop + "px";
      } else {
        this.setCursor(e);
      }
    });

    this.dom.addEventListener("mouseup", (e) => this.mouseEnd(e));
    this.dom.addEventListener("mouseleave", (e) =>
      this.mouseEnd(e, (e.buttons & 1) === 0)
    );
    this.dom.addEventListener("mouseenter", (e) => {
      if (!(this.isResizing || this.isMoving)) {
        this.setCursor(e);
      }
    });
  }

  /**
   * Sets the move cursor depending on what part of the div
   * the mouse is over.
   *
   * TODO: would be easier if we put HTMLElements in the
   * resize/move places and just set their cursors permanently.
   */
  private setCursor(e: MouseEvent) {
    if (this.inResizeZone(e)) {
      this.dom.style.cursor = "nwse-resize";
    } else if (this.inMoveZone(e)) {
      this.dom.style.cursor = "move";
    } else {
      this.dom.style.cursor = "default";
    }
  }

  private mouseEnd(e: MouseEvent, skipLastUpdate = false) {
    if (this.isResizing) {
      this.isResizing = false;
      this.innerDiv.style.pointerEvents = "auto";
      this.dom.style.cursor = "default";
      // Perform the Collab op.  That also updates our own view.
      if (skipLastUpdate) {
        this.width.value = this.newWidth;
        this.height.value = this.newHeight;
      } else {
        const [x, y] = this.coords(e, this.dom);
        this.width.value = Math.max(
          this.startWidth + x - this.mouseStartX,
          CTile.MIN_SIZE
        );
        this.height.value = Math.max(
          this.startHeight + y - this.mouseStartY,
          CTile.MIN_SIZE
        );
      }
    } else if (this.isMoving) {
      this.isMoving = false;
      this.innerDiv.style.pointerEvents = "auto";
      // Perform the Collab op.  That also updates our own view.
      if (skipLastUpdate) {
        this.left.value = this.newLeft;
        this.top.value = this.newTop;
      } else {
        const [x, y] = this.coords(e, this.domParent);
        // TODO: prevent dragging off canvas
        this.left.value = Math.max(this.startLeft + x - this.mouseStartX, 0);
        this.top.value = Math.max(this.startTop + y - this.mouseStartY, 0);
      }
    }
  }

  private inResizeZone(e: MouseEvent): boolean {
    const [x, y] = this.coords(e, this.dom);
    return (
      Math.abs(x - this.dom.offsetWidth) <= CTile.CORNER_TOL &&
      Math.abs(y - this.dom.offsetHeight) <= CTile.CORNER_TOL
    );
  }

  private inMoveZone(e: MouseEvent): boolean {
    const [x, y] = this.coords(e, this.dom);
    return Math.abs(x) <= CTile.CORNER_TOL && Math.abs(y) <= CTile.CORNER_TOL;
  }

  private coords(e: MouseEvent, base: HTMLElement): [x: number, y: number] {
    const rect = base.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y];
  }

  protected loadObject() {
    // Display loaded rect.
    this.updateRect();
  }
}

export function setupTiles(container: CRDTContainer) {
  // --------------------------------------
  // Existing Apps

  // The list of known (existing) apps, in the order they
  // were added.  Each app is stored as its Blob URL.
  const existingApps = container.registerCollab(
    "existingApps",
    collabs.Pre(collabs.DeletingMutCList)(
      (valueInitToken, htmlSrcGzipped: Uint8Array, title: string) => {
        const htmlSrc = pako.inflate(htmlSrcGzipped, { to: "string" });
        const url = URL.createObjectURL(
          new Blob([htmlSrc], { type: "text/html" })
        );
        return new CImmutable(valueInitToken, { url, title });
      }
    )
  );

  const appExistingDiv = <HTMLDivElement>(
    document.getElementById("appExistingDiv")
  );
  function refreshAppExistingDiv() {
    // Refresh the list of apps in appExistingDiv.
    appExistingDiv.innerHTML = "";

    const richTextButton = document.createElement("button");
    richTextButton.appendChild(document.createTextNode("Sticky Note"));
    richTextButton.onclick = () => {
      addRichText();
    };
    appExistingDiv.appendChild(richTextButton);
    appExistingDiv.appendChild(document.createElement("br"));

    existingApps.forEach((app) => {
      const button = document.createElement("button");
      button.appendChild(document.createTextNode(app.value.title));
      button.onclick = () => {
        addTile(app);
      };
      appExistingDiv.appendChild(button);
      appExistingDiv.appendChild(document.createElement("br"));
    });
  }
  existingApps.on("Any", refreshAppExistingDiv);
  existingApps.on("Delete", (e) => {
    // Release blob URLs, as requested by
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    e.deletedValues.forEach((app) => URL.revokeObjectURL(app.value.url));
  });

  // Add apps to existingApps using the forms.

  function addApp(htmlSrc: string, title: string) {
    const app = existingApps.push(pako.deflate(htmlSrc), title);
    // When adding an app for the first time, also create
    // a tile for it.
    addTile(app);
  }

  const urlForm = <HTMLFormElement>document.getElementById("urlForm")!;
  const urlInput = <HTMLInputElement>document.getElementById("url");
  urlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Note that the target server will need to allow the
    // request through CORS (header "Access-Control-Allow-Origin": "*").
    const pathParts = new URL(urlInput.value).pathname.split("/");
    const file =
      pathParts.length > 0 ? pathParts[pathParts.length - 1] : urlInput.value;
    const dotIndex = file.lastIndexOf(".");
    const title = dotIndex === -1 ? file : file.substring(0, dotIndex);
    fetch(urlInput.value, { credentials: "omit" })
      .then((response) => response.text())
      .then((text) => addApp(text, title))
      .catch((reason) => console.log("failed to fetch URL: " + reason));
  });

  const fileForm = <HTMLFormElement>document.getElementById("fileForm");
  const fileInput = <HTMLInputElement>document.getElementById("file");
  fileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = fileInput.files![0];
    if (file === undefined) return;
    const dotIndex = file.name.lastIndexOf(".");
    const title =
      dotIndex === -1 ? file.name : file.name.substring(0, dotIndex);
    file.text().then((text) => addApp(text, title));
  });

  // --------------------------------------
  // Tiles
  const tileParent = <HTMLDivElement>document.getElementById("boardScroller");
  const tiles = container.registerCollab(
    "tiles",
    collabs.Pre(collabs.DeletingMutCSet)(
      (
        valueInitToken,
        // We use app as an argument instead of url so that
        // it can be serialized properly.  url is a Blob URL
        // meaningful only to the local replica, and using
        // the raw HTML src would be expensive.
        app: "richText" | CImmutable<{ url: string; title: string }>,
        initialX: number,
        initialY: number,
        initialWidth: number,
        initialHeight: number
      ) => {
        // Add a tile with the given app and initial rect.
        const preContent =
          app === "richText"
            ? richTextPreContent
            : iframeFromUrl(app.value.url);
        const tile = new CTile(
          valueInitToken,
          tileParent,
          preContent,
          initialX,
          initialY,
          initialWidth,
          initialHeight
        );
        return tile;
      }
    )
  );

  const tileDestructors = new Map<collabs.Collab, () => void>();
  tiles.on("Delete", (e) => {
    tileParent.removeChild(e.value.dom);
    const destructor = tileDestructors.get(e.value.contentCollab);
    if (destructor !== undefined) destructor();
  });
  // No need to listen on Add events; the valueConstructor
  // handles added values (including ones added during loading).

  function addTile(app: CImmutable<{ url: string; title: string }>) {
    // TODO: set initial rect intelligently.
    // TODO: extract title from app instead of using filenames etc.
    tiles.add(app, 1350, 1350, 300, 300);
  }

  function addRichText() {
    // TODO: set initial rect intelligently.
    tiles.add("richText", 1350, 1350, 300, 300);
  }

  function iframeFromUrl(
    url: string
  ): (
    contentInitToken: collabs.InitToken,
    contentDomParent: HTMLElement
  ) => collabs.Collab {
    return (contentInitToken, contentDomParent) => {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.className = "tileIframe";
      // The IFrame stays hidden until its container is ready.
      // TODO: in its place, display "Initializing..." message.
      iframe.hidden = true;
      contentDomParent.appendChild(iframe);
      const host = new CRDTContainerHost(contentInitToken, iframe);
      host.nextEvent("ContainerReady").then(() => {
        iframe.hidden = false;
      });
      // Compact host's save data when compacting our own.
      // We save the event handler "off" function for when
      // host is deleted.
      const off = container.onSaveRequest(() => host.compactSaveData());
      tileDestructors.set(host, off);
      return host;
    };
  }

  // Once loaded, display the loaded state.
  container.runtime.nextEvent("Load").then(() => {
    refreshAppExistingDiv();
  });
}
