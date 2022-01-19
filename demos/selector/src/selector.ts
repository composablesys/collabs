import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";
import { CRDTContainerHost } from "@collabs/container";
import pako from "pako";

(async function () {
  const container = new CRDTContainer(window.parent, {});
  const currentHost = container.registerCollab(
    "",
    collabs.Pre(collabs.LwwMutCRegister)(
      (valueInitToken, htmlSrcGzipped: Uint8Array) => {
        const htmlSrc = pako.inflate(htmlSrcGzipped, { to: "string" });
        // Create a new ContainerHost + IFrame from htmlSrc and
        // attach it to the document, invisible for now.
        const iframe = document.createElement("iframe");
        iframe.hidden = true;
        iframe.srcdoc = htmlSrc;
        const host = new CRDTContainerHost(valueInitToken, iframe);
        document.body.appendChild(iframe);
        return host;
      }
    )
  );

  await container.load();

  // Display loaded state.
  if (currentHost.value.isPresent) {
    onCurrentHostSet(collabs.Optional.empty());
  }

  currentHost.on("Set", (e) => onCurrentHostSet(e.previousValue));

  function onCurrentHostSet(
    previousValue: collabs.Optional<CRDTContainerHost>
  ) {
    // Make the set value the only visible thing.
    selectorDiv.hidden = true;
    if (previousValue.isPresent) {
      previousValue.get().containerIFrame.hidden = true;
    }
    const iframe = currentHost.value.get().containerIFrame;
    iframe.hidden = false;
    // Set title to that of the visible IFrame.
    // We know that it is not yet loaded because it will only
    // be Set once, in the same thread where it is initially
    // created.
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
    currentHost.set(htmlSrcGzipped);
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
  const downloadDiv = document.getElementById("download.div")!;
  const downloadButton = <HTMLButtonElement>(
    document.getElementById("download.button")
  );
  downloadButton.addEventListener("click", () => {
    const htmlSrcGzippedOptional = currentHost.getArgs();
    if (!htmlSrcGzippedOptional.isPresent) return;
    const htmlSrcGzipped = htmlSrcGzippedOptional.get()[0];
    const htmlSrc = pako.inflate(htmlSrcGzipped, { to: "string" });
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
})();
