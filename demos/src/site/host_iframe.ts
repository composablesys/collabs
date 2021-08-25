import * as crdts from "compoventuals";
import { ContainerHost } from "compoventuals-container";

/**
 * BroadcastNetwork that talks to the host page using
 * window.postMessage.
 *
 * TODO: move to sandbox package, together with host.ts networking?
 */
class HostIframeNetwork implements crdts.BroadcastNetwork {
  onReceive!: (message: Uint8Array) => void;

  constructor() {
    window.addEventListener(
      "message",
      (event) => {
        if (event.source !== window.parent) return;
        if (event.data.type !== "message") return;
        this.onReceive(event.data.message);
      },
      false
    );
  }

  send(message: Uint8Array): void {
    // TODO: insecure targetOrigin
    window.parent.postMessage({ type: "message", message }, "*");
  }

  save(): Uint8Array {
    // Nothing to save; host will save its own BroadcastNetwork.
    return new Uint8Array();
  }

  load(_saveData: Uint8Array): void {}
}

// TODO: move to sandbox package?
const containerSourceString = new Promise<string>((resolve) => {
  function containerSourceListener(event: MessageEvent<any>) {
    if (event.source !== window.parent) return;
    if (event.data.type !== "containerSource") return;
    window.removeEventListener("message", containerSourceListener);
    resolve(event.data.containerSourceJs as string);
  }
  window.addEventListener("message", containerSourceListener, false);
});

const topDiv = document.getElementById("topDiv")!;
const client = new crdts.Runtime(new HostIframeNetwork());
client.registerCrdt("host", new ContainerHost(topDiv, containerSourceString));

// Let the host know that we are now listening for
// the container.
// TODO: insecure targetOrigin
window.parent.postMessage({ type: "ready" }, "*");
