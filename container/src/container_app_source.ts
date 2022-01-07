import { BatchingStrategy, BroadcastNetwork, CRDTApp } from "@collabs/collabs";

class ContainerNetwork implements BroadcastNetwork {
  constructor(private readonly messagePort: MessagePort) {}

  onreceive!: (message: Uint8Array) => void;

  send(message: Uint8Array): void {
    this.messagePort.postMessage({ type: "send", message });
  }

  save(): Uint8Array {
    return new Uint8Array(0);
  }

  load(_saveData: Uint8Array): void {}
}

// TODO: don't use a class since it's just wrapping a single
// function (poor JS style).
// TODO: loading: need to coordinate with consumers so that
// they don't do Collab ops before loading, unless it's not
// going to load.
// Unless we expect the host to block GUI input and trust
// the container not to do ops except on GUI input?
// Since the host needs to wait a bit for loading anyway.
// (Is this possible with an IFrame, though?)
// TODO: need to do this await before the parent receives onload.
// Unless we add an extra message?
export class ContainerAppSource {
  /**
   * Not instantiable.
   */
  private constructor() {}

  /**
   * TODO: caveat: won't return until after the window
   * is loaded.  So don't use window.onload after awaiting
   * this (it will never be triggered).
   * @param  hostWindow   [description]
   * @param  batchOptions [description]
   * @return              [description]
   */
  static async newApp(
    hostWindow: Window,
    batchingStrategy?: BatchingStrategy
  ): Promise<CRDTApp> {
    const messagePort = await new Promise<MessagePort>((resolve) => {
      window.addEventListener("message", (e) => {
        if (e.source !== hostWindow) return;
        // TODO: other checks?
        resolve(e.ports[0]);
        // TODO: remove listener?
      });
    });
    const network = new ContainerNetwork(messagePort);
    const app = new CRDTApp(network, { batchingStrategy });
    messagePort.onmessage = (e) => {
      switch (e.data.type) {
        case "receive":
          network.onreceive(e.data.message);
          break;
        case "load":
          app.load(<Uint8Array | null>e.data.saveData);
          messagePort.postMessage({ type: "loadComplete" });
          // TODO: let this side's user know that loading is
          // complete, either by waiting to return from newApp
          // until this happens, or using an event/promise.
          break;
        default:
          throw new Error("bad e.data.type: " + e.data.type);
      }
    };
    return app;
  }
}
