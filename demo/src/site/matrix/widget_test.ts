import * as crdts from "compoventuals-client";
import { WidgetApi, IWidgetApiRequest } from "matrix-widget-api";

const info = document.getElementById("info")!;

const qs = parseFragment();
const widgetId = assertParam(qs, "widgetId");
// const userId = assertParam(qs, "userId");

const api = new WidgetApi(widgetId);

api.requestCapabilityToSendEvent("com.example.my_action");
// api.requestCapabilityToSendMessage("m.text");

api.requestCapabilityToReceiveEvent("com.example.my_action");
// api.requestCapabilityToReceiveMessage("m.text");

api.on("action:send_event", (ev: CustomEvent<IWidgetApiRequest>) => {
  ev.preventDefault(); // we're handling it, so stop the widget API from doing something.
  api.transport.reply(ev.detail, {}); // ack
  const mxEvent = ev.detail.data;
  if (mxEvent.type === "com.example.my_action") {
    info.innerHTML = JSON.stringify(mxEvent.content);
    // if (mxEvent.sender === userId) return;
  }
});

let counter = 0;
api.on("ready", () => {
  info.innerHTML = "ready";
  const testButton = document.getElementById("test")!;
  testButton.onclick = () => {
    api.sendRoomEvent("com.example.my_action", {
      hello: "world",
      counter,
    });
    counter++;
  };
});

// This has to be done after api.on("ready", ...),
// otherwise it throws an error.
info.innerHTML = "starting";
api.start();

// From https://github.com/matrix-org/matrix-widget-api/blob/master/examples/widget/utils.js
function parseFragment() {
  const fragmentString = window.location.toString() || "?";
  info.innerHTML = fragmentString;
  return new URLSearchParams(
    fragmentString.substring(Math.max(fragmentString.indexOf("?"), 0))
  );
}

function assertParam(fragment: URLSearchParams, name: string) {
  const val = fragment.get(name);
  if (!val)
    throw new Error(`${name} is not present in URL - cannot load widget`);
  return val;
}
