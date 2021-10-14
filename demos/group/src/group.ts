import * as crdts from "compoventuals";
import { ContainerRuntimeSource } from "compoventuals-container";
import { GroupCrdt, GroupState } from "./groupcrdt";
import $ from "jquery";

(async function () {
  // Create a Runtime intended for use within containers.
  const runtime = await ContainerRuntimeSource.newRuntime(window.parent);

  let clientGroup = runtime.registerCrdt("group", crdts.Pre(GroupCrdt)());

  var ops1 = document.getElementsByClassName("btn-ops-1");
  var ops2 = document.getElementsByClassName("btn-ops-2");
  var deg1 = <HTMLInputElement>document.getElementById("rotate-deg1");
  var deg2 = <HTMLInputElement>document.getElementById("rotate-deg2");
  var imgCMU = <HTMLCanvasElement>document.getElementById("cmu");
  var imgISR = <HTMLCanvasElement>document.getElementById("isr");
  
  let updateImg = function () {
    var state: GroupState = clientGroup.getState();
    console.log("updating image...");
    console.log(state);
    // imgCMU!.style.transform = `translate(${state.X1}px,${state.Y1}px) rotate(${state.rotate1}deg) scaleY(${state.reflectX1}) scaleX(${state.reflectY1})`;
    imgISR!.style.transform = `translate(${state.X2}px,${state.Y2}px) rotate(${state.rotate2}deg) scaleY(${state.reflectX2}) scaleX(${state.reflectY2})`;
  };

  clientGroup.on("Change", () => {
    updateImg();
  });

  clientGroup.on("Translate", () => {
    console.log("translating image");
  });

  clientGroup.on("ReflectY", () => {
    console.log("reflecting y");
  })

  // Perform specified operation on the CMU image
  $(ops1).on("click", function (e: JQuery.ClickEvent) {
    switch (e.target.id) {
      case "reflectX1":
        clientGroup.reflectX(1);
        break;

      case "reflectY1":
        clientGroup.reflectY(1);
        break;

      case "rotateCW1":
        clientGroup.rotate(parseInt(deg1!.value) || 0, 1);
        break;

      case "rotateCCW1":
        clientGroup.rotate(-1 * parseInt(deg1!.value) || 0, 1);
        break;
    }
  });

  // Perform specified operation on the ISR image
  $(ops2).on("click", function (e: JQuery.ClickEvent) {
    switch (e.target.id) {
      case "reflectX2":
        clientGroup.reflectX(2);
        break;

      case "reflectY2":
        clientGroup.reflectY(2);
        break;

      case "rotateCW2":
        console.log("rotating")
        clientGroup.rotate(parseInt(deg2!.value) || 0, 2);
        break;

      case "rotateCCW2":
        clientGroup.rotate(-1 * parseInt(deg2!.value) || 0, 2);
        break;
    }
  });

  
  var offsetY = document.getElementById("header")!.offsetHeight || 100;
  clientGroup.translate(imgCMU.offsetLeft, offsetY - imgCMU.offsetHeight, 1);
  clientGroup.translate(imgISR.offsetLeft, offsetY - imgISR.offsetHeight, 2);
  // Move CMU image around screen
  var isDown1 = false;
  $(imgCMU)
    .on("mousedown", function () {
      isDown1 = true;
    })
    .on("mousemove", function (e: JQuery.MouseMoveEvent) {
      if (isDown1) {
        clientGroup.translate(
          e.pageX - imgCMU.offsetWidth / 2,
          e.pageY - offsetY - imgCMU.offsetHeight / 2,
          1
        );
      }
    })
    .on("mouseup", function () {
      isDown1 = false;
    });

  // Move ISR image around screen
  var isDown2 = false;
  $(imgISR)
    .on("mousedown", function () {
      console.log("starting to move ISR");
      isDown2 = true;
    })
    .on("mousemove", function (e: JQuery.MouseMoveEvent) {
      console.log("not moving ISR");
      if (isDown2) {
        console.log("moving ISR");
        clientGroup.translate(
          e.pageX - imgISR.offsetWidth / 2,
          e.pageY - offsetY - imgISR.offsetHeight / 2,
          2
        );
      }
    })
    .on("mouseup", function () {
      isDown2 = false;
    });
})();
