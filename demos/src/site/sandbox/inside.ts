import { SEND_CONTAINER_TYPE } from "./message_types";

// TODO: copied from container package
const SEND_CHANNEL_TYPE = "compoventuals-container.ContainerHost";

(async function () {
  const htmlSrcPromise = new Promise<string>((resolve) => {
    window.addEventListener("message", (e) => {
      console.log("inside: message");
      console.log(e.data);
      if (e.source !== window.parent) return;
      if (typeof e.data !== "object") return;
      if (e.data.type !== SEND_CONTAINER_TYPE) return;
      console.log("inside: htmlSrcPromise resolving");
      // TODO: other checks?
      resolve(e.data.htmlSrc);
      // TODO: remove listener?
    });
  });
  // TODO: copied from container_runtime_source.ts (bad abstraction, fragile).
  const messagePortPromise = new Promise<MessagePort>((resolve) => {
    window.addEventListener("message", (e) => {
      console.log("inside: message");
      console.log(e.data);
      if (e.source !== window.parent) return;
      if (typeof e.data !== "object") return;
      if (e.data.type !== SEND_CHANNEL_TYPE) return;
      console.log("inside: messagePortPromise resolving");
      // TODO: other checks?
      resolve(e.ports[0]);
      // TODO: remove listener?
    });
  });
  const [htmlSrc, messagePort] = await Promise.all([
    htmlSrcPromise,
    messagePortPromise,
  ]);
  console.log("inside: awaited promise, creating IFrame");

  const iframe = document.createElement("iframe");
  // Long data: URLs are really slow in Firefox
  // iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(htmlSrc);
  iframe.src = URL.createObjectURL(new Blob([htmlSrc], { type: "text/html" }));
  // btoa breaks on non-1-byte UTF16 chars
  // (https://developer.mozilla.org/en-US/docs/Glossary/Base64)
  // iframe.src = "data:text/html;charset=utf-8;base64," + btoa(htmlSrc);

  console.log("iframe.src set");
  // TODO: copied from ContainerHost (bad abstraction, fragile).
  iframe.addEventListener("load", () => {
    console.log("inside: IFrame load");
    // TODO: targetOrigin
    // TODO: can we guarantee contentWindow will be non-null
    // once onload?  It happens when the IFrame is attached
    // to the document; is that a prerequisite for loading as
    // well?
    iframe.contentWindow!.postMessage({ type: SEND_CHANNEL_TYPE }, "*", [
      messagePort,
    ]);
    // TODO: remove listener once used?
  });
  document.body.appendChild(iframe);
})();
