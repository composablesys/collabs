import { MessageMeta, InitToken, CPrimitive } from "@collabs/collabs";

export class ContainerHost extends CPrimitive {
  private readonly messagePort: MessagePort;
  /**
   * Resolves once the container is done loading.
   * If this Collab is never loaded, this will never resolve.
   *
   * Await this promise before allowing the user to interact
   * with the container's IFrame, if you plan to load saveData.
   * Otherwise the container might send a message before
   * it is loaded, causing an error.
   *
   * TODO
   */
  readonly loadCompletePromise: Promise<void>;
  private loadCompleteResolve!: () => void;

  /**
   * It is assumed that onload has not yet been triggered.
   *
   * @param containerIFrame [description]
   */
  constructor(
    initToken: InitToken,
    readonly containerIFrame: HTMLIFrameElement
  ) {
    super(initToken);

    const channel = new MessageChannel();
    this.messagePort = channel.port1;
    this.messagePort.onmessage = this.messagePortReceive.bind(this);
    containerIFrame.addEventListener("load", () => {
      // TODO: targetOrigin
      // TODO: can we guarantee contentWindow will be non-null
      // once onload?  It happens when the IFrame is attached
      // to the document; is that a prerequisite for loading as
      // well?
      containerIFrame.contentWindow!.postMessage(null, "*", [channel.port2]);
      // TODO: remove listener once used?
    });

    // TODO: container needs to block operations until it's
    // loaded, unless it's not going to be loaded.  How to
    // know if that is the case?  Requiring loading
    // in same thread so we can detect with setTimeout(0)?
    // (But what about when loading is async?)
    // Or, we could do nothing and rely on the host's GUI
    // preventing interaction with the IFrame until after
    // loading.  That's probably what they would do in the
    // face of normal async loading; only complication here is
    // that unless loadPrimitive is made async, Runtime.load
    // will return before the IFrame is done loading.
    // For now we provide loadCompletePromise.
    this.loadCompletePromise = new Promise((resolve) => {
      this.loadCompleteResolve = resolve;
    });
  }

  private messagePortReceive(e: MessageEvent<any>) {
    switch (e.data.type) {
      case "loadComplete":
        this.loadCompleteResolve();
        break;
      case "send":
        this.sendPrimitive(<Uint8Array>e.data.message);
        break;
      default:
        throw new Error("bad e.data.type: " + e.data.type);
    }
  }

  protected receivePrimitive(message: Uint8Array, meta: MessageMeta): void {
    if (!meta.isLocalEcho) {
      this.messagePort.postMessage({ type: "receive", meta, message });
    }
    // Else the container already processed it.
  }

  save(): Uint8Array {
    // TODO: need this to be async
    throw new Error("Method not implemented.");
  }

  load(saveData: Uint8Array | null): void {
    this.messagePort.postMessage({ type: "load", saveData });
  }

  canGC(): boolean {
    return false;
  }
}
