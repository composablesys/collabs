import { CollabID, CSet, CVar, Optional } from "@collabs/collabs";
import { CContainer, CContainerHost } from "@collabs/container";
import pako from "pako";

(async function () {
  let afterLoad = false;
  const container = new CContainer();
  const hostFactory = container.registerCollab(
    "",
    (init) =>
      new CSet(init, (valueInit, htmlSrcGzipped: Uint8Array) => {
        const htmlSrc = pako.inflate(htmlSrcGzipped, { to: "string" });
        // Create a new ContainerHost + IFrame from htmlSrc and
        // attach it to the document, invisible for now.
        const iframe = document.createElement("iframe");
        iframe.hidden = true;
        iframe.srcdoc = htmlSrc;
        const host = new CContainerHost(valueInit, iframe);
        document.body.appendChild(iframe);
        // Compact host's save data when compacting our own.
        container.onSaveRequest(() => host.compactSaveData());
        // If it was possible to override causally prior values
        // (triggering host.finalize()), then we
        // would need to call the "off" function returned by
        // onSaveRequest in the finalizer.
        // Otherwise, container's handler set would keep a
        // reference to host, preventing GC and triggering
        // unnecessary save compaction.
        // Opt: when a value is unset, clean it up
        // (treat as permanently deleted), even though technically
        // it is still a "conflict" value in currentHost.

        if (afterLoad) host.loadSkipped();

        return host;
      })
  );
  const currentHost = container.registerCollab(
    "0",
    (init) =>
      new CVar<Optional<CollabID<CContainerHost>>>(init, Optional.empty())
  );

  currentHost.on("Set", (e) => onCurrentHostSet(e.previousValue));

  const initializingDiv = <HTMLDivElement>(
    document.getElementById("initializingDiv")
  );

  function onCurrentHostSet(previousValue: Optional<CollabID<CContainerHost>>) {
    const newHost = hostFactory.fromID(currentHost.value.get())!;

    // Hide other stuff.
    selectorDiv.hidden = true;
    if (previousValue.isPresent) {
      const previousHost = hostFactory.fromID(previousValue.get())!;
      previousHost.containerIFrame.hidden = true;
    }

    // Show "Initializing..." message until the container is
    // ready, then show its IFrame.
    const iframe = newHost.containerIFrame;
    initializingDiv.hidden = false;
    // We can assume the container is not yet ready, since
    // onCurrentHostSet is always called in the same event loop
    // as the IFrame is created (though possibly a later microtask),
    // and readiness requires receiving a message from the IFrame.
    newHost.once("ContainerReady", () => {
      initializingDiv.hidden = true;
      iframe.hidden = false;
    });
    // Set title to that of the visible IFrame.
    // Not sure how to tell if the IFrame is already loaded
    // (hence won't emit "load"); to be safe, we'll set the
    // title if contentDocument !== null, but add the "load"
    // listener anyway.
    if (iframe.contentDocument !== null) {
      document.title = iframe.contentDocument.title;
    }
    iframe.addEventListener("load", () => {
      document.title = iframe.contentDocument!.title;
    });
    // Show the download div.
    downloadDiv.hidden = false;
  }

  // Selector GUI.
  const selectorDiv = <HTMLDivElement>document.getElementById("selectorDiv")!;

  function setHtmlSrc(htmlSrc: string) {
    // The container definitions can get large (100s of KB)
    // but are very gzippable, so let's compress them.
    // CPU penalty should be okay since you only have to do
    // this once at startup, which users should expect to take
    // a moment anyway.
    const htmlSrcGzipped = pako.deflate(htmlSrc);
    const host = hostFactory.add(htmlSrcGzipped);
    currentHost.set(Optional.of(hostFactory.idOf(host)));
  }

  // Handle inputs.
  const urlForm = <HTMLFormElement>document.getElementById("urlForm")!;
  const urlInput = <HTMLInputElement>document.getElementById("url");
  urlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Note that the target server will need to allow the
    // request through CORS (header "Access-Control-Allow-Origin": "*").
    fetch(urlInput.value, { credentials: "omit" })
      .then((response) => response.text())
      .then(setHtmlSrc)
      .catch((reason) => console.log("failed to fetch URL: " + reason));
  });

  const fileForm = <HTMLFormElement>document.getElementById("fileForm");
  const fileInput = <HTMLInputElement>document.getElementById("file");
  fileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = fileInput.files![0];
    if (file === undefined) return;
    file.text().then(setHtmlSrc);
  });

  // Download button GUI.
  const downloadDiv = document.getElementById("downloadDiv")!;
  const downloadButton = <HTMLButtonElement>(
    document.getElementById("downloadButton")
  );
  downloadButton.addEventListener("click", () => {
    if (!currentHost.value.isPresent) return;
    const htmlSrcGzipped = hostFactory.getArgs(
      hostFactory.fromID(currentHost.value.get())!
    );
    const htmlSrc = pako.inflate(htmlSrcGzipped[0], { to: "string" });
    // Trigger a file download of htmlSrc with suggested
    // file name `${document.title}.html`.
    triggerDownload(
      new Blob([htmlSrc], { type: "text/html" }),
      `${document.title}.html`
    );
  });

  function triggerDownload(blob: Blob, filename: string) {
    // a.click() / saveAs in same Window don't work in
    // Matrix widgets, probably due to the IFrame sandbox.
    // We work around it by triggering the download in a new
    // window instead.
    // Thanks to Steffen Kolmer for suggesting this.
    const w = window.open("about:blank")!;
    setTimeout(function () {
      triggerDownloadOnWindow(w, blob, filename);
      setTimeout(function () {
        w.close();
      }, 100);
    }, 0);
    // TODO: if possible, detect when we are in a host that
    // allows downloads and do this nicer version instead.
    // triggerDownloadOnWindow(window, blob, filename);
  }

  function triggerDownloadOnWindow(w: Window, blob: Blob, filename: string) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    w.document.body.appendChild(a);
    a.click();
    w.document.body.removeChild(a);
  }

  await container.load();
  afterLoad = true;

  // Display loaded state.
  if (currentHost.value.isPresent) {
    onCurrentHostSet(Optional.empty());
  }

  // Ready.
  container.ready();
})();
