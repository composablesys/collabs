import * as crdts from "@collabs/collabs";
import { ContainerRuntimeSource } from "@collabs/container";
import { GroupCrdt, GroupState } from "./groupcrdt";
import $ from "jquery";

(async function () {
  // Create a Runtime intended for use within containers.
  const runtime = await ContainerRuntimeSource.newRuntime(window.parent);

  let clientGroup = runtime.registerCrdt("group", crdts.Pre(GroupCrdt)());

  var ops = document.getElementsByClassName("btn-ops");
  var img = <HTMLCanvasElement>document.getElementById("image");
  var deg = <HTMLInputElement>document.getElementById("rotate-deg");

  let updateImg = function () {
    var state: GroupState = clientGroup.getState();
    img!.style.transform = `translate(${state.X}px,${state.Y}px) rotate(${state.rotate}deg) scaleY(${state.reflectX}) scaleX(${state.reflectY})`;
  };

  clientGroup.on("Change", () => {
    updateImg();
  });

  // Perform specified operation on the image
  $(ops).on("click", function (e: JQuery.ClickEvent) {
    switch (e.target.id) {
      case "reflectX":
        clientGroup.reflectX();
        break;

      case "reflectY":
        clientGroup.reflectY();
        break;

      case "rotateCW":
        clientGroup.rotate(parseInt(deg!.value) || 0);
        break;

      case "rotateCCW":
        clientGroup.rotate(-1 * parseInt(deg!.value) || 0);
        break;
    }
  });

  var isDown = false;
  var offsetY = document.getElementById("header")!.offsetHeight || 100;
  // Move image around screen
  $(img)
    .on("mousedown", function () {
      isDown = true;
    })
    .on("mousemove", function (e: JQuery.MouseMoveEvent) {
      if (isDown) {
        clientGroup.translate(
          e.pageX - img.offsetWidth / 2,
          e.pageY - offsetY - img.offsetHeight / 2
        );
      }
    })
    .on("mouseup", function () {
      isDown = false;
    });
})();
