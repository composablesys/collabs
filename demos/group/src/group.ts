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
  var ops3 = document.getElementsByClassName("btn-ops-3");
  var deg1 = <HTMLInputElement>document.getElementById("rotate-deg1");
  var deg2 = <HTMLInputElement>document.getElementById("rotate-deg2");
  var deg3 = <HTMLInputElement>document.getElementById("rotate-deg3");
  var groupdX = <HTMLInputElement>document.getElementById("translateX3");
  var groupdY = <HTMLInputElement>document.getElementById("translateY3");
  var imgCMU = <HTMLCanvasElement>document.getElementById("cmu");
  var imgISR = <HTMLCanvasElement>document.getElementById("isr");
  var group = <HTMLCanvasElement>document.getElementById("group");
  
  let updateImg = function () {
    var state: GroupState = clientGroup.getState();
    // imgISR!.style.transform = `translate(10px,10px)`
    imgCMU!.style.transform = `translate(${state.X1}px,${state.Y1}px) rotate(${state.rotate1}deg) scaleY(${state.reflectX1}) scaleX(${state.reflectY1})`; // translate(-50%, -50%)`;
    imgISR!.style.transform = `translate(${state.X2}px,${state.Y2}px) rotate(${state.rotate2}deg) scaleY(${state.reflectX2}) scaleX(${state.reflectY2})`; // translate(-50%, -50%)`;
    // group!.style.transform = `translate(${state.X3}px,${state.Y3}px)`;
  };

  clientGroup.on("Change", () => {
    updateImg();
  });

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
        clientGroup.rotate(parseInt(deg2!.value) || 0, 2);
        break;

      case "rotateCCW2":
        clientGroup.rotate(-1 * parseInt(deg2!.value) || 0, 2);
        break;
    }
  });

    // Perform specified operation on both images
    $(ops3).on("click", function (e: JQuery.ClickEvent) {
      switch (e.target.id) {
        case "reflectX3":
          clientGroup.reflectX(3);
          break;
  
        case "reflectY3":
          clientGroup.reflectY(3);
          break;
  
        case "rotateCW3":
          clientGroup.rotate(parseInt(deg3!.value) || 0, 3);
          break;
  
        case "rotateCCW3":
          clientGroup.rotate(-1 * parseInt(deg3!.value) || 0, 3);
          break;

        case "translate3":
          clientGroup.translate(parseInt(groupdX!.value) || 0, parseInt(groupdY!.value) || 0, 3);
          break;
      }
    });

  
  var offsetY = document.getElementById("header")!.offsetHeight || 100;
  // Move CMU image around screen
  var isDown1 = false;
  var X1 : number, Y1 : number;
  $(imgCMU)
    .on("mousedown", function (e: JQuery.MouseDownEvent) {
      isDown1 = true;
      X1 = e.pageX;
      Y1 = e.pageY;
    })
    .on("mousemove", function (e: JQuery.MouseMoveEvent) {
      if (isDown1) {
        clientGroup.translate(
          e.pageX - X1,
          e.pageY - Y1,
          1
        );
        X1 = e.pageX;
        Y1 = e.pageY;
      }
    })
    .on("mouseup", function () {
      isDown1 = false;
    });

  // Move ISR image around screen
  var isDown2 = false;
  var X2 : number, Y2 : number;
  $(imgISR)
    .on("mousedown", function (e: JQuery.MouseDownEvent) {
      isDown2 = true;
      X2 = e.pageX;
      Y2 = e.pageY;
    })
    .on("mousemove", function (e: JQuery.MouseMoveEvent) {
      if (isDown2) {
        clientGroup.translate(
          e.pageX - X2,
          e.pageY - Y2,
          2
        );
        X2 = e.pageX;
        Y2 = e.pageY;
      }
    })
    .on("mouseup", function () {
      isDown2 = false;
    });
})();
