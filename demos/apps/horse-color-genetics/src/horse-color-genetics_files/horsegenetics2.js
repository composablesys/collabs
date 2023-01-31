/*
	Equine Genetics JS
	by Jennifer Hoffman - http://www.jenniferhoffman.net

	Functions
	- mouseY(evt)
	- folow(evt)

	- showhidehelp()
	- showTip(tipText)
	- hideTip()
	- togglecolorinfo()
	- animateTransparency(layer)

	- reverseAllele(allele)
	- evaluateGenetics()
	- updateDisplay(newColor, isGrey, isRoan, isRabicano, isSooty, isTobiano, isOvero, isSplashed, isVarnish)
	- updateName(color)
	- updateDescription(color)

	- randomhorse()
*/

import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";
// CSS

//set file path constant, if required
export const path = "";
// export const path="horse-color-genetics_files/";
// export const path="http://horse.jenniferhoffman.net/";

let hpath = path;
//hpath=path+'half/';

//initialize global variables
let color = "";
let grey = 0;
let roan = 0;
let rabicano = 0;
let sooty = 0;
let tobiano = 0;
let overo = 0;
let sabino = 0;
let splashed = 0;
let paint = 0;
let tovero = 0;
let varnish = 0;
let leopard = 0;
let blanket = 0;
let spotSize = 0;

let randomOrder = "";
let currRandom = 0;

let loaded = 0;
let imageArray = new Array();

//////////////////////////////////////////////////////////////////////////
//follow the mouse script
var divName = "genehelp"; // div that is to follow the mouse
// (must be position:absolute)
export function mouseY(evt) {
  if (!evt) evt = window.event;
  if (evt.pageY) return evt.pageY;
  else if (evt.clientY)
    return (
      evt.clientY +
      (document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop)
    );
  else return 0;
}
export function follow(evt) {
  if (document.getElementById(divName)) {
    var obj = document.getElementById(divName).style;
    obj.top = parseInt(mouseY(evt)) - 60 + "px";
  }
}
document.onmousemove = follow;

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//toggles help on/off, when "on" help will only display during mouseover
export function showhidehelp() {
  if (document.getElementById("showhidehelp").innerHTML == "show help")
    document.getElementById("showhidehelp").innerHTML = "hide help";
  else document.getElementById("showhidehelp").innerHTML = "show help";
}

//displays gene tips
export function showTip(tipText) {
  if (document.getElementById("showhidehelp").innerHTML == "hide help") {
    document.getElementById("genehelp").innerHTML = tipText;
    document.getElementById("genehelp").style.display = "block";
  }
}

//hides gene tips
export function hideTip() {
  document.getElementById("genehelp").style.display = "none";
}

//toggles on/off coat color information
export function togglecolorinfo() {
  if (document.getElementById("colorinfo").style.display == "block") {
    document.getElementById("colorinfo").style.display = "none";
    document.images["arrow"].src = imageSrc(path + "arrow_down.png");
  } else {
    document.getElementById("colorinfo").style.display = "block";
    document.images["arrow"].src = imageSrc(path + "arrow_up.png");
  }
}
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// reverseAllele(allele)
//input: an HTML Image Object representing an allele
// reverses the image and therefore value of the given allele
export function reverseAllele(allele) {
  // debugReader.innerHTML = 'Being passed '+allele+' of source "'+allele.src+'"<br>';
  // var tempArray = allele.src.split("/");
  // var thisType = tempArray[tempArray.length-1];
  // thisType = thisType.substring(0,thisType.length-4);
  var thisType = alleles[allele.name].value;
  var thisAllele = allele.name.slice(-1);
  var newType = "";
  // debugReader.innerHTML += tempArray[tempArray.length-1]+' image belongs to allele '+thisType+'<br>';
  switch (thisType[0]) {
    case "_":
      switch (thisType) {
        case "_a":
          newType = "at";
          break;
        case "_cr":
          newType = "cr";
          break;
        case "_rn":
          newType = "rn";
          alleles["sb" + thisAllele].value = "_sb";
          alleles["w" + thisAllele].value = "_w";
          alleles["to" + thisAllele].value = "_to";
          break;
        case "_sb":
          newType = "sb";
          alleles["rn" + thisAllele].value = "_rn";
          alleles["w" + thisAllele].value = "_w";
          alleles["to" + thisAllele].value = "_to";
          break;
        case "_w":
          newType = "w";
          alleles["rn" + thisAllele].value = "_rn";
          alleles["sb" + thisAllele].value = "_sb";
          alleles["to" + thisAllele].value = "_to";
          break;
        case "_to":
          newType = "to";
          alleles["rn" + thisAllele].value = "_rn";
          alleles["sb" + thisAllele].value = "_sb";
          alleles["w" + thisAllele].value = "_w";
          break;
        default:
          newType = thisType.slice(1);
      }
      break;
    default:
      switch (thisType) {
        case "a":
          newType = "a+";
          break;
        case "a+":
          newType = "_a";
          break;
        case "at":
          newType = "a";
          break;
        case "cr":
          newType = "prl";
          break;
        case "prl":
          newType = "_cr";
          break;
        default:
          newType = "_" + thisType;
      }
  }
  alleles[allele.name].value = newType;
  debugReader.innerHTML +=
    "for allele " +
    thisAllele +
    " turning " +
    thisType +
    " to " +
    newType +
    '<br>returning path "' +
    path +
    newType +
    ".png";
  +'"';

  // Called by Collab event listeners instead.
  // evaluateGenetics();
}
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//evaluateGenetics()
//computes the final horse coloration from its current allele set
export function evaluateGenetics() {
  //store current color, to avoid unneccessary image refreshing later
  let oldColor = color;
  let oldGrey = grey;
  let oldRoan = roan;
  let oldRabicano = rabicano;
  let oldSooty = sooty;
  let oldTobiano = tobiano;
  let oldOvero = overo;
  let oldSabino = sabino;
  let oldSplashed = splashed;
  let oldVarnish = varnish;
  let oldLeopard = leopard;
  let oldBlanket = blanket;
  let oldSpotSize = spotSize;

  //lethal white
  alleles["w1"].value === "w";
  if (alleles["w1"].value === "w" && alleles["w2"].value === "w") {
    color = "lwa";
    //lethal overo
  } else if (alleles["o1"].value === "o" && alleles["o2"].value === "o") {
    color = "lwo";
    //relgular white
  } else if (alleles["w1"].value === "w" || alleles["w2"].value === "w") {
    color = "white";
    grey = roan = rabicano = sooty = tobiano = overo = sabino = varnish = 0;
    grey = 0;
    splashed = 0;
    splashed += alleles["spl1"].value === "spl" ? 1 : 0;
    splashed += alleles["spl2"].value === "spl" ? 1 : 0;
  } else {
    //rabicano
    rabicano =
      alleles["rb1"].value === "rb" || alleles["rb2"].value === "rb" ? 1 : 0;
    //sooty?
    sooty =
      alleles["sty1"].value === "sty" || alleles["sty2"].value === "sty"
        ? 1
        : 0;

    //black, chestnut, bay, or seal brown?
    //ee levels affect patn1 levels
    if (alleles["e1"].value === "e" || alleles["e2"].value === "e") {
      if (alleles["a1"].value === "a+" || alleles["a2"].value === "a+") {
        color = "wild_bay";
        spotSize = 2;
      } else if (alleles["a1"].value === "a" || alleles["a2"].value === "a") {
        color = "bay";
        spotSize = 2;
      } else if (alleles["a1"].value === "at" || alleles["a2"].value === "at") {
        color = "sealbrown";
        spotSize = 3;
      } else {
        color = "black";
        spotSize = 3;
      }
    } else {
      color = "chestnut";
      spotSize = 1;
    }

    //cream dilution
    //double cream
    if (alleles["cr1"].value === "cr" && alleles["cr2"].value === "cr") {
      if (color == "wild_bay") color = "bay_cream2";
      else color += "_cream2";
      spotSize -= 2;
      //double pearl
    } else if (
      alleles["cr1"].value === "prl" &&
      alleles["cr2"].value === "prl"
    ) {
      if (color == "wild_bay") color = "pearl_bay";
      else color = "pearl_" + color;
      spotSize -= 2;
      //cream pearl
    } else if (
      (alleles["cr1"].value === "prl" && alleles["cr2"].value === "cr") ||
      (alleles["cr1"].value === "cr" && alleles["cr2"].value === "prl")
    ) {
      if (color == "wild_bay") color = "creampearl_bay";
      else color = "creampearl_" + color;
      spotSize -= 1;
      //single cream
    } else if (alleles["cr1"].value === "cr" || alleles["cr2"].value === "cr") {
      color += "_cream1";
      spotSize -= 1;
    }

    //champagne dilution?
    if (alleles["ch1"].value === "ch" || alleles["ch2"].value === "ch") {
      switch (color) {
        case "black":
          color = "champagne_classic";
          break;
        case "sealbrown":
          color = "champagne_sable";
          break;
        case "chestnut":
          color = "champagne_gold";
          break;
        case "bay":
        case "wild_bay":
          color = "champagne_amber";
          break;
        case "chestnut_cream1":
        case "chestnut_cream2":
        case "creampearl_chestnut":
          color = "champagne_gold_cream";
          break;
        case "wild_bay_cream1":
        case "wild_bay_cream2":
        case "bay_cream1":
        case "bay_cream2":
        case "creampearl_bay":
          color = "champagne_amber_cream";
          break;
        case "black_cream1":
        case "black_cream2":
        case "creampearl_black":
          color = "champagne_classic_cream";
          break;
        case "sealbrown_cream1":
        case "sealbrown_cream2":
        case "creampearl_sealbrown":
          color = "champagne_sable_cream";
          break;
        case "pearl_chestnut":
          color = "champagne_gold_pearl";
          break;
        case "pearl_black":
          color = "champagne_classic_pearl";
          break;
        case "pearl_sealbrown":
          color = "champagne_sable_pearl";
          break;
        case "pearl_bay":
          color = "champagne_amber_pearl";
          break;
        //default:
        //console.debug('Could not add champagne dilution to: '+color);
      }
      spotSize -= 1;
    }

    //dun dilution?
    if (alleles["d1"].value === "d" || alleles["d2"].value === "d") {
      switch (color) {
        case "champagne_gold_cream":
        case "champagne_sable_cream":
        case "champagne_amber_cream":
        case "champagne_classic_cream":
          break;
        case "sealbrown_cream1":
          color = "dun_sealbrown";
          break;
        case "wild_bay":
          color = "dun_bay";
          break;
        case "wild_bay_cream1":
          color = "dun_bay_cream1";
          break;
        case "wild_bay_cream2":
        case "sealbrown_cream2":
        case "champagne_amber_cream":
        case "creampearl_sealbrown":
        case "creampearl_bay":
        case "creampearl_wild_bay":
          color = "dun_bay_cream2";
          break;
        case "champagne_gold_pearl":
          color = "pseudocream_gold";
          break;
        case "champagne_classic_pearl":
          color = "pseudocream_classic";
          break;
        case "champagne_sable_pearl":
          color = "pseudocream_sable";
          break;
        case "champagne_amber_pearl":
          color = "pseudocream_amber";
          break;
        case "champagne_classic_cream":
        case "creampearl_black":
          color = "dun_black_cream2";
          break;
        case "creampearl_chestnut":
          color = "dun_chestnut_cream2";
          break;
        default:
          color = "dun_" + color;
      }
      spotSize -= 1;

      //any silver dapple?
    }
    if (alleles["z1"].value === "z" || alleles["z2"].value === "z")
      switch (color) {
        case "chestnut":
        case "chestnut_cream1":
        case "chestnut_cream2":
        case "dun_chestnut":
        case "dun_chestnut_cream1":
        case "dun_chestnut_cream2":
        case "pearl_chestnut":
        case "creampearl_chestnut":
        case "dun_pearl_chestnut":
        case "champagne_gold":
        case "champagne_gold_cream":
        case "champagne_gold_pearl":
        case "dun_champagne_gold_pearl":
        case "champagne_classic_cream":
        case "champagne_sable_cream":
        case "champagne_amber_cream":
        case "pseudocream_classic":
        case "pseudocream_sable":
        case "pseudocream_amber":
        case "pseudocream_gold":
          break;
        case "black_cream1":
          color = "silver_black";
          break;
        case "dun_black_cream1":
          color = "silver_dun_black";
          break;
        case "sealbrown_cream1":
          color = "silver_sealbrown_cream1";
          break;
        case "dun_bay":
        case "dun_sealbrown":
          color = "silver_dun";
          break;
        default:
          color = "silver_" + color;
          break;
      }

    //homo silver dapple = full opacity
    if (alleles["z1"].value === "z" && alleles["z2"].value === "z") {
      switch (color) {
        case "chestnut":
        case "chestnut_cream1":
        case "chestnut_cream2":
        case "dun_chestnut":
        case "dun_chestnut_cream1":
        case "dun_chestnut_cream2":
        case "pearl_chestnut":
        case "creampearl_chestnut":
        case "dun_pearl_chestnut":
        case "champagne_gold":
        case "champagne_gold_cream":
        case "champagne_gold_pearl":
        case "dun_champagne_gold_pearl":
        case "champagne_classic_cream":
        case "champagne_sable_cream":
        case "champagne_amber_cream":
        case "pseudocream_classic":
        case "pseudocream_sable":
        case "pseudocream_amber":
        case "pseudocream_gold":
          self.document.images["silver"].style.display = "none";
          break;
        default:
          self.document.images["silver"].style.display = "block";
      }
    } else self.document.images["silver"].style.display = "none";

    //flaxen chestnut / dun?
    if (alleles["f1"].value === "_f" && alleles["f2"].value === "_f") {
      switch (color) {
        case "chestnut":
          color = "flaxen";
          break;
        case "dun_chestnut":
          color = "flaxen_dun";
          break;
        case "champagne_gold":
          color = "flaxen_champagne";
          break;
        case "pearl_chestnut":
          color = "flaxen_pearl";
          break;
        case "dun_pearl_chestnut":
          color = "flaxen_dun_pearl";
          break;
        case "champagne_gold_pearl":
          color = "flaxen_gold_pearl";
          break;
      }
    }

    //grey?
    grey = alleles["g1"].value === "g" || alleles["g2"].value === "g" ? 1 : 0;

    //paint?
    tobiano =
      alleles["to1"].value === "to" || alleles["to2"].value === "to" ? 1 : 0;
    overo = alleles["o1"].value === "o" || alleles["o2"].value === "o" ? 1 : 0;
    sabino = 0;
    sabino += alleles["sb1"].value === "sb" ? 1 : 0;
    sabino += alleles["sb2"].value === "sb" ? 1 : 0;
    splashed = 0;
    splashed += alleles["spl1"].value === "spl" ? 1 : 0;
    splashed += alleles["spl2"].value === "spl" ? 1 : 0;
    if (splashed || sabino) tovero = 0;
    else tovero = tobiano + overo;
    paint = tobiano + overo;
    paint += splashed ? 1 : 0;
    paint += sabino ? 1 : 0;

    //appaloosa?
    varnish = 0;
    varnish += alleles["lp1"].value === "lp" ? 1 : 0;
    varnish += alleles["lp2"].value === "lp" ? 1 : 0;
    leopard = 0;
    leopard += alleles["patn11"].value === "patn1" ? 1 : 0;
    leopard += alleles["patn12"].value === "patn1" ? 1 : 0;
    blanket =
      alleles["patn21"].value === "patn2" || alleles["patn22"].value === "patn2"
        ? 1
        : 0;
    spotSize = spotSize > 2 ? 2 : spotSize;
    spotSize = spotSize < 1 ? 1 : spotSize;

    //roan?
    if (varnish == 1 && (leopard || blanket)) {
      self.document.images["roan"].src = imageSrc(
        hpath + "roan_appaloosa" + spotSize + ".png"
      );
      self.document.images["rabicano"].src = imageSrc(
        hpath + "rabicano_appaloosa" + spotSize + ".png"
      );
    } else {
      self.document.images["roan"].src = imageSrc(hpath + "roan.png");
      self.document.images["rabicano"].src = imageSrc(hpath + "rabicano.png");
    }
    roan =
      alleles["rn1"].value === "rn" || alleles["rn2"].value === "rn" ? 1 : 0;
  }

  //only reload images if something's changed
  if (
    oldColor != color ||
    oldGrey != grey ||
    oldRoan != roan ||
    oldRabicano != rabicano ||
    oldSooty != sooty ||
    oldTobiano != tobiano ||
    oldOvero != overo ||
    oldSplashed != splashed ||
    oldVarnish != varnish ||
    oldLeopard != leopard ||
    oldBlanket != blanket ||
    oldSabino != sabino
  ) {
    updateDisplay(
      color,
      grey,
      roan,
      rabicano,
      sooty,
      tobiano,
      overo,
      splashed,
      varnish,
      leopard,
      blanket,
      sabino
    );

    //if some special marking, give info on marking rather than base color
    if (color == "lwa") {
      updateName("lwa");
      updateDescription("lwa");
    } else if (color == "lwo") {
      updateName("lwo");
      updateDescription("lwo");
    } else if (color == "white") {
      updateName("white");
      updateDescription("white");
    } else if (grey) {
      updateName("grey");
      updateDescription("grey");
    } else if (tovero > 1) {
      updateName("tovero");
      updateDescription("tovero");
    } else if (paint > 1) {
      updateName("paint");
      updateDescription("paint");
    } else if (tobiano) {
      updateName("tobiano");
      updateDescription("tobiano");
    } else if (overo) {
      updateName("overo");
      updateDescription("overo");
    } else if (splashed > 1) {
      updateName("splashed");
      updateDescription("splashed");
    } else if (sabino) {
      updateName("sabino");
      updateDescription("sabino");
    } else if (varnish) {
      if (varnish == 1) {
        if (leopard) {
          updateName("appaloosa_leopard");
          updateDescription("appaloosa_leopard");
        } else if (blanket) {
          updateName("appaloosa_blanket");
          updateDescription("appaloosa_blanket");
        } else {
          updateName("appaloosa_varnish");
          updateDescription("appaloosa_varnish");
        }
      } else {
        if (leopard) {
          updateName("appaloosa_fewspot");
          updateDescription("appaloosa_fewspot");
        } else if (blanket) {
          updateName("appaloosa_snowcap");
          updateDescription("appaloosa_snowcap");
        } else {
          updateName("appaloosa_varnish");
          updateDescription("appaloosa_varnish");
        }
      }
    } else if (roan) {
      switch (color) {
        case "chestnut":
        case "flaxen":
        case "flaxen_dun":
        case "flaxen_dun_pearl":
        case "dun_chestnut":
          updateName("roan_red");
          updateDescription("roan_red");
          break;
        case "black":
        case "dun_black":
          updateName("roan_blue");
          updateDescription("roan_blue");
          break;
        default:
          updateName("roan");
          updateDescription("roan");
      }
    } else if (rabicano) {
      updateName("rabicano");
      updateDescription("rabicano");
    } else if (sooty) {
      updateName("sooty");
      updateDescription("sooty");
    } else {
      updateName(color);
      updateDescription(color);
    }
  } else isLoaded();
}
//////////////////////////////////////////////////////////////////////////

export function cursorWait() {
  //self.document.body.style.cursor="wait";
}
export function isLoaded() {
  self.document.body.style.cursor = "default";
}
//////////////////////////////////////////////////////////////////////////
//updateDisplay
//input: color string, booleans for various white modifiers
//changes the display image to match the new color
export function updateDisplay(
  newColor,
  isGrey,
  isRoan,
  isRabicano,
  isSooty,
  isTobiano,
  isOvero,
  isSplashed,
  isVarnish,
  isLeopard,
  isBlanket,
  isSabino
) {
  if (newColor != "lwa" && newColor != "lwo") {
    //display overlays
    document.getElementById("horse").style.display = "block";

    document.getElementById("roan").style.display = isRoan ? "block" : "none";
    document.getElementById("rabicano").style.display = isRabicano
      ? "block"
      : "none";
    document.getElementById("sooty").style.display = isSooty ? "block" : "none";
    document.getElementById("tobiano").style.display = isTobiano
      ? "block"
      : "none";
    document.getElementById("overo").style.display = isOvero ? "block" : "none";
    document.getElementById("splashedwhite").src = imageSrc(
      hpath + "splash" + isSplashed + ".png"
    );
    document.getElementById("splashedwhite").style.display = isSplashed
      ? "block"
      : "none";
    document.getElementById("sabino").src = imageSrc(
      hpath + "sabino" + isSabino + ".png"
    );
    document.getElementById("sabino").style.display = isSabino
      ? "block"
      : "none";
    document.getElementById("white").style.display =
      newColor == "white" ? "block" : "none";

    if (isVarnish) {
      var appTemp = hpath + "appaloosa_varnish" + isVarnish;
      if (isLeopard) {
        appTemp += "_leopard" + isLeopard;
        if (isVarnish < 2) appTemp += "_" + spotSize;
      } else if (isBlanket) {
        appTemp += "_blanket";
        if (isVarnish < 2) appTemp += "_" + spotSize;
      }

      self.document.images["appaloosa"].src = imageSrc(appTemp + ".png");
    }
    document.getElementById("appaloosa").style.display = isVarnish
      ? "block"
      : "none";

    let grayLayer = document.getElementById("grey");
    if (isGrey) {
      grayLayer.style.display = "block";
      grayLayer.style.webkitAnimationPlayState = "running";
      grayLayer.style.MozAnimationPlayState = "running";
    } else grayLayer.style.display = "none";
  } else document.getElementById("horse").style.display = "none";

  //	self.document.body.style.cursor = "wait";
  var tempImage = new Image();
  tempImage.onload = function () {
    isLoaded();
  };
  var tempSrc;

  switch (newColor) {
    case "lwa":
    case "lwo":
    case "white":
      tempSrc = hpath + "white.png";
      break;
    case "dun_chestnut_cream2":
    case "creampearl_chestnut":
      tempSrc = hpath + "chestnut_cream2.png";
      break;
    case "champagne_gold_cream":
    case "pseudocream_gold":
      tempSrc = hpath + "champagne_gold_cream.png";
      break;
    case "creampearl_black":
      tempSrc = hpath + "black_cream2.png";
      break;
    case "champagne_classic_cream":
    case "pseudocream_classic":
      tempSrc = hpath + "champagne_classic_cream.png";
      break;
    case "creampearl_bay":
      tempSrc = hpath + "bay_cream2.png";
      break;
    case "champagne_amber_cream":
    case "pseudocream_amber":
      tempSrc = hpath + "champagne_amber_cream.png";
      break;
    case "creampearl_wild_bay":
      tempSrc = hpath + "wild_bay_cream2.png";
      break;
    case "champagne_sable_cream":
    case "pseudocream_sable":
      tempSrc = hpath + "champagne_sable_cream.png";
      break;
    case "creampearl_sealbrown":
      tempSrc = hpath + "sealbrown_cream2.png";
      break;
    case "silver_sealbrown":
      tempSrc = hpath + "silver_sealbrown.png";
      break;
    case "silver_sealbrown_cream1":
      tempSrc = hpath + "silver_sealbrown_cream1.png";
      break;
    case "silver_creampearl_black":
      tempSrc = hpath + "silver_black_cream2.png";
      break;
    case "silver_creampearl_sealbrown":
      tempSrc = hpath + "silver_sealbrown_cream2.png";
      break;
    case "silver_creampearl_bay":
      tempSrc = hpath + "silver_bay_cream2.png";
      break;
    default:
      tempSrc = hpath + newColor + ".png";
  }

  tempImage.src = imageSrc(tempSrc);
  //if (tempImage.complete && typeof(tempImage.naturalWidth) != 'undefined' && tempImage.naturalWidth == 0)
  //console.debug('Cound not find base coat to display for: '+newColor);
  self.document.images["basecoat"].src = imageSrc(tempSrc);
}
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//updateName
//input: color string
//changes the large display name to match the new coat color
export function updateName(newColor) {
  switch (newColor) {
    case "lwa":
      document.getElementById("colorname").innerHTML = "Embryonic Lethal";
      break;
    case "lwo":
      document.getElementById("colorname").innerHTML = "Lethal White Syndrome";
      break;
    case "white":
      document.getElementById("colorname").innerHTML = "White";
      break;
    case "grey":
      document.getElementById("colorname").innerHTML = "Grey";
      break;
    case "chestnut":
      document.getElementById("colorname").innerHTML = "Chestnut";
      break;
    case "black":
      document.getElementById("colorname").innerHTML = "Black";
      break;
    case "bay":
      document.getElementById("colorname").innerHTML = "Bay";
      break;
    case "wild_bay":
      document.getElementById("colorname").innerHTML = "Wild Bay";
      break;
    case "sealbrown":
      document.getElementById("colorname").innerHTML = "Seal Brown";
      break;
    case "chestnut_cream1":
      document.getElementById("colorname").innerHTML = "Palomino";
      break;
    case "black_cream1":
      document.getElementById("colorname").innerHTML = "Smoky Black";
      break;
    case "wild_bay_cream1":
      document.getElementById("colorname").innerHTML = "Wild Buckskin";
      break;
    case "bay_cream1":
      document.getElementById("colorname").innerHTML = "Buckskin";
      break;
    case "wild_bay_cream1":
      document.getElementById("colorname").innerHTML = "Wild Buckskin";
      break;
    case "sealbrown_cream1":
      document.getElementById("colorname").innerHTML = "Seal Brown Cream";
      break;
    case "chestnut_cream2":
      document.getElementById("colorname").innerHTML = "Cremello";
      break;
    case "black_cream2":
      document.getElementById("colorname").innerHTML = "Smoky Cream";
      break;
    case "bay_cream2":
      document.getElementById("colorname").innerHTML = "Perlino";
      break;
    case "wild_bay_cream2":
      document.getElementById("colorname").innerHTML = "Wild Perlino";
      break;
    case "sealbrown_cream2":
      document.getElementById("colorname").innerHTML = "Seal Brown Cream";
      break;
    case "champagne_classic":
      document.getElementById("colorname").innerHTML = "Classic Champagne";
      break;
    case "champagne_amber":
      document.getElementById("colorname").innerHTML = "Amber Champagne";
      break;
    case "champagne_gold":
      document.getElementById("colorname").innerHTML = "Gold Champagne";
      break;
    case "champagne_sable":
      document.getElementById("colorname").innerHTML = "Sable Champagne";
      break;
    case "silver_champagne_classic":
      document.getElementById("colorname").innerHTML =
        "Silver Classic Champagne";
      break;
    case "silver_champagne_amber":
      document.getElementById("colorname").innerHTML = "Silver Amber Champagne";
      break;
    case "silver_champagne_classic_pearl":
    case "silver_champagne_sable_pearl":
    case "silver_champagne_amber_pearl":
      document.getElementById("colorname").innerHTML = "Silver Champagne Pearl";
      break;
    case "silver_champagne_sable":
      document.getElementById("colorname").innerHTML = "Silver Sable Champagne";
      break;
    case "champagne_classic_cream":
      document.getElementById("colorname").innerHTML = "Classic Cream";
      break;
    case "champagne_amber_cream":
      document.getElementById("colorname").innerHTML = "Amber Cream";
      break;
    case "champagne_gold_cream":
      document.getElementById("colorname").innerHTML = "Gold Cream";
      break;
    case "champagne_sable_cream":
      document.getElementById("colorname").innerHTML = "Sable Cream";
      break;
    case "pseudocream_classic":
      document.getElementById("colorname").innerHTML = "Champagne Dun Pearl";
      break;
    case "pseudocream_amber":
      document.getElementById("colorname").innerHTML = "Amber Dun Pearl";
      break;
    case "pseudocream_gold":
      document.getElementById("colorname").innerHTML = "Gold Dun Pearl";
      break;
    case "pseudocream_sable":
      document.getElementById("colorname").innerHTML = "Sable Dun Pearl";
      break;
    case "dun_bay":
      document.getElementById("colorname").innerHTML = "Classic Dun";
      break;
    case "dun_chestnut":
      document.getElementById("colorname").innerHTML = "Red Dun";
      break;
    case "dun_black":
      document.getElementById("colorname").innerHTML = "Grulla";
      break;
    case "dun_sealbrown":
      document.getElementById("colorname").innerHTML = "Brown Dun";
      break;
    case "dun_chestnut_cream1":
      document.getElementById("colorname").innerHTML = "Dunalino";
      break;
    case "dun_chestnut_cream2":
      document.getElementById("colorname").innerHTML = "Cremello";
      break;
    case "dun_bay_cream1":
      document.getElementById("colorname").innerHTML = "Dunskin";
      break;
    case "dun_bay_cream2":
      document.getElementById("colorname").innerHTML = "Perlino Dun";
      break;
    case "dun_black_cream1":
      document.getElementById("colorname").innerHTML = "Smokey Grulla";
      break;
    case "dun_black_cream2":
      document.getElementById("colorname").innerHTML = "Cream Grulla";
      break;
    case "dun_champagne_gold":
      document.getElementById("colorname").innerHTML = "Gold Dun";
      break;
    case "dun_champagne_sable":
      document.getElementById("colorname").innerHTML = "Sable Dun";
      break;
    case "dun_champagne_amber":
      document.getElementById("colorname").innerHTML = "Amber Dun";
      break;
    case "dun_champagne_classic":
      document.getElementById("colorname").innerHTML = "Champagne Dun";
      break;
    case "flaxen":
      document.getElementById("colorname").innerHTML = "Flaxen Chestnut";
      break;
    case "flaxen_dun":
      document.getElementById("colorname").innerHTML = "Flaxen Dun";
      break;
    case "flaxen_champagne":
      document.getElementById("colorname").innerHTML = "Flaxen Gold Champagne";
      break;
    case "flaxen_pearl":
      document.getElementById("colorname").innerHTML = "Flaxen Apricot";
      break;
    case "flaxen_dun_pearl":
      document.getElementById("colorname").innerHTML = "Flaxen Apricot Dun";
      break;
    case "flaxen_gold_pearl":
      document.getElementById("colorname").innerHTML =
        "Flaxen Apricot Champagne";
      break;
    case "silver_black":
      document.getElementById("colorname").innerHTML = "Silver Dapple";
      break;
    case "silver_black_cream2":
      document.getElementById("colorname").innerHTML = "Silver Smoky Cream";
      break;
    case "silver_bay":
      document.getElementById("colorname").innerHTML = "Silver Dapple Bay";
      break;
    case "silver_wild_bay":
      document.getElementById("colorname").innerHTML = "Silver Dapple Wild Bay";
      break;
    case "silver_sealbrown":
    case "silver_sealbrown_cream1":
      document.getElementById("colorname").innerHTML = "Silver Dapple Brown";
      break;
    case "silver_sealbrown_cream2":
      document.getElementById("colorname").innerHTML =
        "Silver Seal Brown Cream";
      break;
    case "silver_wild_bay_cream1":
      document.getElementById("colorname").innerHTML = "Silver Wild Buckskin";
      break;
    case "silver_bay_cream1":
      document.getElementById("colorname").innerHTML = "Silver Dapple Buckskin";
      break;
    case "silver_bay_cream2":
      document.getElementById("colorname").innerHTML = "Silver Dapple Perlino";
      break;
    case "silver_dun_bay_cream1":
      document.getElementById("colorname").innerHTML = "Silver Dapple Dunskin";
      break;
    case "silver_dun_bay_cream2":
      document.getElementById("colorname").innerHTML =
        "Silver Dapple Perlino Dun";
      break;
    case "silver_dun":
      document.getElementById("colorname").innerHTML = "Silver Dapple Dun";
      break;
    case "silver_dun_black_cream2":
      document.getElementById("colorname").innerHTML =
        "Silver Dapple Cream Grulla";
      break;
    case "silver_dun_sealbrown":
      document.getElementById("colorname").innerHTML = "Silver Dapple Dun";
      break;
    case "silver_dun_black":
      document.getElementById("colorname").innerHTML = "Silver Dapple Grulla";
      break;
    case "silver_dun_champagne_sable":
      document.getElementById("colorname").innerHTML = "Silver Sable Dun";
      break;
    case "silver_dun_champagne_amber":
      document.getElementById("colorname").innerHTML = "Silver Amber Dun";
      break;
    case "silver_dun_champagne_classic":
      document.getElementById("colorname").innerHTML = "Silver Champagne Dun";
      break;
    case "tovero":
      document.getElementById("colorname").innerHTML = "Tovero";
      break;
    case "paint":
      document.getElementById("colorname").innerHTML = "Pinto";
      break;
    case "tobiano":
      document.getElementById("colorname").innerHTML = "Tobiano Pinto";
      break;
    case "overo":
      document.getElementById("colorname").innerHTML = "Overo Pinto";
      break;
    case "splashed":
      document.getElementById("colorname").innerHTML = "Splashed White Pinto";
      break;
    case "sabino":
      document.getElementById("colorname").innerHTML = "Sabino";
      break;
    case "roan_red":
      document.getElementById("colorname").innerHTML = "Strawberry Roan";
      break;
    case "roan_blue":
      document.getElementById("colorname").innerHTML = "Blue Roan";
      break;
    case "roan":
      document.getElementById("colorname").innerHTML = "Roan";
      break;
    case "rabicano":
      document.getElementById("colorname").innerHTML = "Rabicano";
      break;
    case "sooty":
      document.getElementById("colorname").innerHTML = "Sooty";
      break;
    case "appaloosa_varnish":
      document.getElementById("colorname").innerHTML = "Varnish Roan Appaloosa";
      break;
    case "appaloosa_blanket":
      document.getElementById("colorname").innerHTML = "Blanket Appaloosa";
      break;
    case "appaloosa_leopard":
      document.getElementById("colorname").innerHTML = "Leopard Appaloosa";
      break;
    case "appaloosa_snowcap":
      document.getElementById("colorname").innerHTML = "Snowcap Appaloosa";
      break;
    case "appaloosa_fewspot":
      document.getElementById("colorname").innerHTML = "Fewspot Appaloosa";
      break;
    case "pearl_chestnut":
      document.getElementById("colorname").innerHTML = "Apricot";
      break;
    case "pearl_bay":
    case "pearl_black":
    case "pearl_sealbrown":
      document.getElementById("colorname").innerHTML = "Pearl";
      break;
    case "creampearl_chestnut":
    case "creampearl_black":
    case "creampearl_sealbrown":
    case "creampearl_bay":
      document.getElementById("colorname").innerHTML = "Cream Pearl";
      break;
    case "silver_creampearl_black":
    case "silver_creampearl_sealbrown":
    case "silver_creampearl_bay":
      document.getElementById("colorname").innerHTML = "Silver Cream Pearl";
      break;
    case "dun_pearl_chestnut":
      document.getElementById("colorname").innerHTML = "Apricot Dun";
      break;
    case "dun_pearl_black":
    case "dun_pearl_sealbrown":
    case "dun_pearl_bay":
      document.getElementById("colorname").innerHTML = "Dun Pearl";
      break;
    case "silver_dun_pearl_black":
    case "silver_dun_pearl_sealbrown":
    case "silver_dun_pearl_bay":
      document.getElementById("colorname").innerHTML = "Silver Dun Pearl";
      break;
    case "champagne_gold_pearl":
    case "champagne_amber_pearl":
    case "champagne_sable_pearl":
    case "champagne_classic_pearl":
      document.getElementById("colorname").innerHTML = "Champagne Pearl";
      break;
    case "silver_pearl_bay":
    case "silver_pearl_black":
    case "silver_pearl_sealbrown":
      document.getElementById("colorname").innerHTML = "Silver Dapple Pearl";
      break;
    //default:
    //console.log('Could not find name to display for: '+newColor);
  }
}
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//updateDescription
//input: color string
//changes the long description to match the new coat color
export function updateDescription(newColor) {
  switch (newColor) {
    case "lwa":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Dominant white homozygosity is lethal, and a WW fetus will be naturally aborted by the mare early in gestation.<br><br>This differs from Overo Lethal White Syndrome in which outwardly healthy appearing foals will be born only to die within their first days.";
      break;
    case "lwo":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Also called Overo Lethal White Syndrome (OLWS) or Lethal White Overo (LWO).<br><br>The frame overo gene is linked to a mutation which in its homozygous state will cause a malformed colon.<br><br>Such foals will die painfully within a few days of birth, and are usually humanely euthanized as soon as they are identified.<br><br>This differs from the lethality of homozygous dominant whites, in which the fetus is naturally aborted by the mare early in gestation.";
      break;
    case "white":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A truly white horse has pink skin and white hair, with blue or light-colored eyes.  Unlike greys that appear white, a true white's coat will be white from birth.<br><br>Dominant white is an allele of the KIT gene, making white mutually exclusive from homozygous tobiano, roan, and sabino.";
      break;
    case "grey":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A grey horse will be born looking like any ordinary colored horse.  Gradually over time, more and more white hairs will appear in their coat until eventually they are stark white.  How quickly the greying occurs varys dramatically from horse to horse.  Some will show signs at 3 to 4 months, while others show no sign until several years of age.<br><br>A grey horse that was born a dark color can still be indentified after it has faded to pure white by its underlying skin color.  This is especially true of horses with unique skin patterns such as appaloosa or champagne.<br><br>Lipizzaner stallions have made this grey coloration famous.";
      break;
    case "chestnut":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Chestnut is one of the most common horse coat colors, seen in almost every breed.  Chestnut consists of a red or brownish coat, with a mane and tail the same or lighter in color than the coat.";
      break;
    case "black":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Black is a relatively uncommon coat color in horses, though not so unusual as to be considered rare. For a horse to be considered black, it must be completely black except for white markings.<br><br>A visible difference between a true black and a dark chestnut or bay is seen in the fine hairs around the eyes and muzzle; on a true black these hairs remain black even if the horse is sun-bleached, while on other colors they will be lighter.";
      break;
    case "bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Bay coloring is a very common coat color in horses.  It is characterized by a reddish brown body with black &quot;points.&quot;  These points include the mane, tail, lower legs, and sometimes the tips of the ears.  Bay horses have black skin under their coat, except beneath white markings.";
      break;
    case "wild_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Bay coloring is a very common coat color in horses.  It is characterized by a reddish brown body with black &quot;points.&quot;  One alternative form of the Agouti gene will result in a wild type bay with a lighter body and very little black on its legs.";
      break;
    case "sealbrown":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Also called &quot;black and tan&quot; in some countries, a seal brown horse has an alternative form of the Agouti gene which restricts its black pigment from the soft areas of its body.";
      break;
    case "chestnut_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut with a single cream gene, the palomino is a golden colored horse with nearly white mane and tail.  The lightest palominos can be described as ivory colored, and many palominos are lighter in winter than in summer.<br><br>An ivory palomino can be distinguished from a cremello by the color of its skin.";
      break;
    case "black_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "When a black horse has a cream gene, its color gets diluted to a dark brown.  Thus, a smoky black is visibly indistinguishable from a dark chestnut.  However, a smoky black can produce a double-cream foal whereas a chestnut cannot.";
      break;
    case "bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A single cream gene acting on a bay horse affects only the reddish hair of the body, lightening it to gold.  The stark black &quot;points&quot; are left undiluted.  Buckskins are often confused with duns, which have a similar coat color.  However, buckskins lack the &quot;primitive&quot; markings of the dun.";
      break;
    case "wild_bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A single cream gene acting on a bay horse affects only the reddish hair of the body, lightening it to gold.  The stark black &quot;points&quot; are left undiluted.<br><br>One alternative form of the Agouti gene will result in a wild type buckskin with very little black on its legs.<br><br>Buckskins are often confused with duns, which have a similar coat color.  However, buckskins lack the &quot;primitive&quot; markings of the dun.";
      break;
    case "sealbrown_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Also called &quot;black and tan&quot; in some countries, a seal brown horse has an alternative form of the Agouti gene which restricts its black pigment from the soft areas of its body.  These red areas can be affected by the cream gene.";
      break;
    case "chestnut_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut with two cream alleles, the cremello is a cream colored horse with a white mane and tail.  It has pink skin, blue eyes, and often fades to pure white as an adult.<br><br>A cremello can be differentiated from an ivory palomino by the color of its skin.";
      break;
    case "black_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Two cream genes will dilute a black horse's coat to near white.  With pink skin, blue eyes, and often fading to pure white as an adult, a smoky cream can be very difficult to tell apart from a true white, despite the fact that it came from a black horse.";
      break;
    case "bay_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A bay horse with two cream genes, the perlino has a cream colored body and a yellowish or tan cast to its mane and tail.  It has pink skin and blue eyes.";
      break;
    case "wild_bay_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A bay horse with two cream genes, the perlino has a cream colored body and a yellowish or tan cast to its mane and tail.  It has pink skin and blue eyes.<br><br>One alternative form of the Agouti gene will result in a wild type perlino with very little dark on its legs.";
      break;
    case "sealbrown_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Two cream genes will dilute a seal brown horse's coat to near white.  With pink skin, blue eyes, and often fading to pure white as an adult, a smoky cream can be very difficult to tell apart from a true white, despite the fact that it came from a dark horse.";
      break;
    case "champagne_classic":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a black horse receives a champagne gene, its coat is diluted to a light, brownish grey which can appear to have a purplish cast due to the pink skin underneath.";
      break;
    case "champagne_amber":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a bay horse receives a champagne gene, it will look similar to a buckskin with a golden body and darker points.  However, the points are brownish rather than black, and often the legs are not particularly dark.";
      break;
    case "champagne_gold":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a chestnut horse receives a champagne gene, it will look very much like a palomino with a golden body and a mane and tail that are either gold or white.  A gold champagne can be distinguished from a palomino by its pink skin and freckling.";
      break;
    case "champagne_sable":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a seal brown horse receives a champagne gene, it will look like a cross between a classic champagne and an amber champagne.";
      break;
    case "silver_champagne_classic":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a black horse receives a champagne gene, its coat is diluted to a light, brownish grey which can appear to have a purplish cast due to the pink skin underneath.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.";
      break;
    case "silver_champagne_amber":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a bay horse receives a champagne gene, it will look similar to a buckskin with a golden body and darker points.  However, the points are brownish rather than black, and often then legs are not particularly dark.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.";
      break;
    case "silver_champagne_sable":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a seal brown horse receives a champagne gene, it will look like a cross between a classic champagne and an amber champagne.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.";
      break;
    case "champagne_classic_cream":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a black horse receives a champagne gene and a cream gene, it is called a classic cream.";
      break;
    case "champagne_amber_cream":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a bay horse receives a champagne gene and a cream gene, it is called an amber cream.";
      break;
    case "champagne_gold_cream":
      document.getElementById("colorinfo").children[0].innerHTML =
        "When a chestnut horse receives a champagne gene and a cream gene, it is either called a gold cream or an ivory champagne.  The term ivory champagne grew popular before the cream gene and champagne genes were understood, and it was believed that this was merely a different kind of champagne horse.";
      break;
    case "champagne_sable_cream":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Champagne horses have pink, freckled skin and eyes often described as hazel.  When a seal brown horse receives a champagne gene and a cream gene, it is called a sable cream.";
      break;
    case "dun_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.<br><br>The classic dun is often confused with a buckskin, as both have black points and a light colored body.  However, a buckskin is usually more golden rather than tan, and a buckskin won't have primitive markings.";
      break;
    case "dun_chestnut":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.<br><br>These markings are sometimes faint on a red dun and thus at a glance the red dun can be confused with a chestnut.  Closer inspection will differentiate the two.";
      break;
    case "dun_black":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Also called grullo or blue dun.  Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.<br><br>A grullo's coat will not fade with age and does not have white hairs mixed in as a roan does.  Its grey coloring is solid.";
      break;
    case "dun_sealbrown":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A seal brown dun can be difficult to differentiate from a bay dun.  Both have dull tan to brown coats with black &quot;primitive markings.&quot;  These primitive markings include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.";
      break;
    case "dun_chestnut_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut with a single cream gene and a dun gene, the dunalino has the golden coat and white mane and tail of the palomino, but red &quot;primitive markings.&quot;";
      break;
    case "dun_chestnut_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut with two cream genes, the cremello is a cream colored horse with a white mane and tail.  It has pink skin, blue eyes, and often fades to pure white as an adult.<br><br>A cremello can be differentiated from an ivory palomino by the color of its skin.  Primitive markings on a cremello are so faint as to be practically invisible.";
      break;
    case "dun_bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "When a bay horse gets a cream gene and a dun gene, first the cream gene lightens the horse's body to gold.  Then, the dun gene puts black back onto its body in the form of &quot;primitive markings.&guot;  Dunskins thus help to further confuse the differnce between a buckskin and a dun.";
      break;
    case "dun_bay_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A bay horse with two cream genes, the perlino has a cream colored body and a yellowish or tan cast to its mane and tail.  Adding in a dun gene will reveal &quot;primitive markings&quot; in the same yellowish color as the mane and tail.";
      break;
    case "dun_black_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A black horse with a single cream gene will produce a dark chocolate colored horse.  Adding in a dun gene dilutes the body color to a dull tan while darkening the &quot;primitive markings&quot; back to their original black.<br><br>These primitive markings include leg barring and a dorsal stripe.  Less common markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.";
      break;
    case "dun_black_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A black horse with two cream genes and a dun gene will look much like a perlino dun, with a cream colored body and a yellowish or tan cast to its mane, tail, and &quot;primitive markings.&quot;";
      break;
    case "dun_champagne_gold":
    case "dun_champagne_sable":
    case "dun_champagne_amber":
    case "dun_champagne_classic":
      document.getElementById("colorinfo").children[0].innerHTML =
        'Champagne horses have pink, freckled skin and eyes often described as hazel.<br><br>Duns are characterized by a lighter body color and "primitive" markings which include leg barring and a dorsal stripe. Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light "guard hairs" on the edges of the mane and tail.<br><br>When a horse is both champagne and dun its body becomes very light, but it retains its dun primitive markings and champagne freckled skin.';
      break;
    case "flaxen_dun":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, and a lower face mask.<br><br>These markings are sometimes faint on a red dun and thus at a glance the red dun can be confused with a chestnut.  Closer inspection will differentiate the two.<br><br>One possible variation on a dun is the lightening of the mane and tail caused by the flaxen gene.  A flaxen dun is sometimes confused with a dunalino because they both have light manes and tails and primitive markings.  A dun may appear less brilliantly golden than a palomino, but sometimes only breeding or pedigree may differentiate the two.";
      break;
    case "flaxen_champagne":
    case "flaxen_pearl":
    case "flaxen_dun_pearl":
    case "flaxen_gold_pearl":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A red based horse that is homozygous for flaxen will have its mane and tail lightened.  A flaxen horse that also recieves another dilution modifier can be difficult to differentiate from a palomino.  Sometimes a subtle difference in the body tone may be discerned.  Other times one may need to rely on pedigree.";
      break;
    case "flaxen":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut is one of the most common horse coat colors, seen in almost every breed.  Chestnut consists of a red or brownish coat, with a mane and tail the same or lighter in color than the coat.<br><br>One common color variation on a chestnut which is caused by a gene beyond the basic &quot;ee,&quot; is the lightening of the mane and tail caused by the flaxen gene.  A flaxen chestnut is sometimes confused with a palomino because they both have light manes and tails.  However, a flaxen chestnut is still a chestnut: its body is red rather than golden.";
      break;
    case "flaxen":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A chestnut is one of the most common horse coat colors, seen in almost every breed.  Chestnut consists of a red or brownish coat, with a mane and tail the same or lighter in color than the coat.<br><br>One common color variation on a chestnut which is caused by a gene beyond the basic &quot;ee,&quot; is the lightening of the mane and tail caused by the flaxen gene.  A flaxen chestnut is sometimes confused with a palomino because they both have light manes and tails.  However, a flaxen chestnut is still a chestnut: its body is red rather than golden.";
      break;
    case "silver_black":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen because of the blonde chocolate appearance it can give.";
      break;
    case "silver_black_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Two cream genes will dilute a black horse's coat to near white.  With pink skin, blue eyes, and often fading to pure white as an adult, a smoky cream can be very difficult to tell apart from a true white, despite the fact that it came from a black horse.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen because of the blonde chocolate appearance it can give.";
      break;
    case "silver_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple bay looks similar to a flaxen chestnut, but has dark brown legs.";
      break;
    case "silver_wild_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple wild bay looks very similar to a flaxen chestnut, but has dark brown near its hooves.";
      break;
    case "silver_sealbrown":
    case "silver_sealbrown_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple seal brown horse will have a brown body of various shades with a white mane and tail.";
      break;
    case "silver_sealbrown_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Two cream genes will dilute a seal brown horse's coat to near white.  With pink skin, blue eyes, and often fading to pure white as an adult, a smoky cream can be very difficult to tell apart from a true white, despite the fact that it came from a dark horse.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.";
      break;
    case "silver_bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple buckskin looks similar to a palomino, but has dark brown legs.";
      break;
    case "silver_bay_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A bay horse with two cream genes, the perlino has a cream colored body with slightly darker points.  It has pink skin and blue eyes.";
      break;
    case "silver_wild_bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple wild buckskin looks very similar to a palomino, but has dark brown on its lower legs.";
      break;
    case "silver_dun_bay_cream1":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dapple dunskin is very difficult to tell apart from a dunalino as both have dark &quot;primitive&quot; markings and a white mane and tail.";
      break;
    case "silver_dun_bay_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.<br><br>A bay horse with two cream genes, the perlino has a cream colored body and slightly darker points.  Adding in a dun gene will reveal &quot;primitive markings.&quot;";
      break;
    case "silver_dun":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dun looks similar to a silver bay; however, a silver dun will have &quot;primitive&quot; markings.";
      break;
    case "silver_dun_black_cream2":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A black horse with two cream genes and a dun gene will look much like a perlino dun, with a cream colored body.";
      break;
    case "silver_dun_sealbrown":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>A silver dun looks similar to a silver bay; however, a silver dun will have &quot;primitive&quot; markings.";
      break;
    case "silver_dun_black":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>The dun dilution gene and silver dapple gene work together to make the silver grulla truly a silver color.";
      break;
    case "silver_dun_champagne_sable":
    case "silver_dun_champagne_amber":
    case "silver_dun_champagne_classic":
      document.getElementById("colorinfo").children[0].innerHTML =
        'The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail, and is sometimes called chocolate flaxen.<br><br>Champagne horses have pink, freckled skin and eyes often described as hazel.<br><br>Duns are characterized by a lighter body color and "primitive" markings which include leg barring and a dorsal stripe. Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light "guard hairs" on the edges of the mane and tail.<br><br>When a horse is both champagne and dun its body becomes very light, but it retains its dun primitive markings and champagne freckled skin.';
      break;
    case "tovero":
      document.getElementById("colorinfo").children[0].innerHTML =
        "When pinto horse has both tobiano and overo markings, it is sometimes refered to as a tovero.  A Quarter Horse or Thoroughbred Pinto may also be called a Paint.  The flashy, spotted appearance of the Pinto is rare in the wild but has long been sought by human breeders.";
      break;
    case "paint":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A Quarter Horse or Thoroughbred Pinto may also be called a Paint.  The flashy, spotted appearance of the Pinto is rare in the wild but has long been sought by human breeders.";
      break;
    case "tobiano":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A tobiano pinto has large, white-haired, pink-skinned patches over its base coat.  The dark spots left behind are oval in shape and arranged in a vertical pattern.  A tobiano is usually white from the knees down, with a dark head and normal facial markings.<br><br>Tobiano is an allele of the KIT gene, making a homozygous tobiano mutually exclusive from roan, sabino, and dominant white.";
      break;
    case "overo":
      document.getElementById("colorinfo").children[0].innerHTML =
        "An overo pinto has small irregular white spots over its base color, usually arranged in a horizontal pattern.  The lower legs tend to be dark and the head white or bald-faced.  The tail is a solid color, usually dark.<br><br>Overo has a connection to lethal white syndrome, as all LWS foals have overo in their pedigree.  However, the link is not directly connected to the expression of the color itself.  Many overos do not carry the lethal white gene.";
      break;
    case "sabino":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Sabino is characterized by irregular white spots on the extremeties, face, and belly.  The border edges of the spots often have a roaning appearance.<br><br>In its homozygous form, sabino results in a horse that is 90% or more white.  It is common for a homozygous sabino to be pure white and have pink skin, but without blue eyes.  The eye color can distinguish a sabino from cremellos or dominant white horses.<br><br>Sabino is an allele of the KIT gene, making a homozygous sabino mutually exclusive from roan, tobiano, and dominant white.";
      break;
    case "splashed":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Splashed white pintos are recorded as being in the overo family, but are not related to the overo gene.  It resembles a reverse tobiano, with white moving from the bottom of the horse towards the top.  Often the head will look as if dunked in a bucket of paint.<br><br>Splash is an incomplete dominant trait, and frequently heterozygous splash horses go unidentified as splash.";
      break;
    case "roan":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Roan horses have a mixture of white hairs in with their base color.  Unlike a grey horse, their color will remain consistent throughout life.<br><br>Roan is an allele of the KIT gene, making a homozygous roan mutually exclusive from tobiano, sabino, and dominant white.";
      break;
    case "roan_red":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Roan horses have a mixture of white hairs in with their base color.  Unlike a grey horse, their color will remain consistent throughout life.  When a chestnut horse shows roaning, it is referred to as a strawberry roan.";
      break;
    case "roan_blue":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Roan horses have a mixture of white hairs in with their base color.  Unlike a grey horse, their color will remain consistent throughout life.  When a black horse shows roaning, it is referred to as a blue roan.";
      break;
    case "rabicano":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Rabicano horses have white hairs intermibled with their base coat color in limited areas such as the belly, flanks, legs, and edges of the tail.";
      break;
    case "sooty":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Sooty horses have black hairs mixed in with their base coat color.  These are usually denser over the back, hips, and shoulders.";
      break;
    case "appaloosa_varnish":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Appaloosas have mottled skin, a white sclera, and stripped hooves.  Varnish roan appaloosas have an uneven roaning pattern which increases with age.  The speed of the roaning may vary from horse to horse.<br><br>Varnish roan genetics are required for any other appaloosa patterning to show.";
      break;
    case "appaloosa_blanket":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Appaloosas have mottled skin, a white sclera, and stripped hooves.  Blanket appaloosa horses have a distinctive spotting pattern that is usually limited to the back, hips, and rump.";
      break;
    case "appaloosa_leopard":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Appaloosas have mottled skin, a white sclera, and stripped hooves.  Leopard appaloosa horses have a distinctive leopard spotting pattern that covers most if not all of the horse.";
      break;
    case "appaloosa_snowcap":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Appaloosas have mottled skin, a white sclera, and stripped hooves.  Blanket appaloosa horses have a distinctive spotting pattern that is usually limited to the back, hips, and rump.<br><br>When a blanket appaloosa is homozygous for the varnish roan pattern, its spots no longer form and it is called a snowcap appaloosa.";
      break;
    case "appaloosa_fewspot":
      document.getElementById("colorinfo").children[0].innerHTML =
        "Appaloosas have mottled skin, a white sclera, and stripped hooves.  Leopard appaloosa horses have a distinctive leopard spotting pattern that covers most if not all of the horse.<br><br>When a leopard appaloosa is homozygous for the varnish roan pattern, its spots no longer form and it is called a fewspot appaloosa.";
      break;
    case "pearl_chestnut":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Pearl chestnuts are often called &quot;apricot.&quot;  The name was popularized before the discovery of the pearl allele.";
      break;
    case "pearl_bay":
    case "pearl_black":
    case "pearl_sealbrown":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.";
      break;
    case "creampearl_chestnut":
    case "creampearl_black":
    case "creampearl_sealbrown":
    case "creampearl_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The pearl allele enhances a cream allele and causes the horse to look like a double dilute cream.  Thus a cream pearl is also sometimes called a pseudo double dilute.<br><br>Cream pearls are nearly impossible to differentiate from double dilute creams without genetic testing, but they have different breeding results.";
      break;
    case "silver_creampearl_black":
    case "silver_creampearl_sealbrown":
    case "silver_creampearl_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "The pearl allele enhances a cream allele and causes the horse to look like a double dilute cream.  Thus a cream pearl is also sometimes called a pseudo double dilute.<br><br>Cream pearls are nearly impossible to differentiate from double dilute creams without genetic testing, but they have different breeding results.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.";
      break;
    case "dun_pearl_chestnut":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Pearl chestnuts are often called &quot;apricot.&quot;  The name was popularized before the discovery of the pearl allele.<br><br>Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.";
      break;
    case "dun_pearl_black":
    case "dun_pearl_sealbrown":
    case "dun_pearl_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.";
      break;
    case "silver_dun_pearl_black":
    case "silver_dun_pearl_sealbrown":
    case "silver_dun_pearl_bay":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.";
      break;
    case "champagne_gold_pearl":
    case "champagne_amber_pearl":
    case "champagne_sable_pearl":
    case "champagne_classic_pearl":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Champagne horses have pink, freckled skin and eyes often described as hazel.";
      break;
    case "pseudocream_gold":
    case "pseudocream_amber":
    case "pseudocream_sable":
    case "pseudocream_classic":
      document.getElementById("colorinfo").children[0].innerHTML =
        "When a horse recieves many different dilution genes it will become very light and difficult to distinguish.<br><br>A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Champagne horses have pink, freckled skin and eyes often described as hazel.<br><br>Duns are characterized by a lighter body color and &quot;primitive&quot; markings which include leg barring and a dorsal stripe.  Less common primitive markings incude ear barring, spider-webbed forehead, a lower face mask, and light &quot;guard hairs&quot; on the edges of the mane and tail.";
      break;
    case "silver_champagne_classic_pearl":
    case "silver_champagne_sable_pearl":
    case "silver_champagne_amber_pearl":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>Champagne horses have pink, freckled skin and eyes often described as hazel.  When a seal brown horse receives a champagne gene, it will look like a cross between a classic champagne and an amber champagne.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.";
      break;
    case "silver_pearl_bay":
    case "silver_pearl_black":
    case "silver_pearl_sealbrown":
      document.getElementById("colorinfo").children[0].innerHTML =
        "A homozygous pearl horse is diluted to a warm color with its points being diluted less than its body.<br><br>The silver dapple gene is the opposite of the cream gene: it affects only black hair.  It has a disproportionate effect on the mane and tail.";
      break;
    //default:
    //console.debug('Cound not find text to display for: '+newColor);
  }
}
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//function random horse
//randomly selects from pre-determined genetic combinations
export function uniqueRandom(maxNum) {
  maxNum = typeof maxNum == "undefined" ? 0 : maxNum;
  //if the array hasn't been started, start it
  if (!randomOrder) {
    randomOrder = new Array();
    for (var i = 1; i <= maxNum; i++) {
      randomOrder.push(i);
    }
    randomOrder.sort(function () {
      return 0.5 - Math.random();
    });
    //console.log('contents of random order: \n'+randomOrder);
  }
  /*if (currRandom < maxNum)
		currRandom+=1;
	else currRandom = 0;*/
  currRandom = currRandom < maxNum ? currRandom + 1 : 0;
  //console.log('Currently displaying random #'+currRandom);
  return randomOrder[currRandom];
}
//////////////////////////////////////////////////////////////////////////
//function random horse
//randomly selects from pre-determined genetic combinations
export function randomhorse() {
  var numHorses = 32;

  //reset to default values
  alleles["e1"].value = "_e";
  alleles["e2"].value = "_e";
  alleles["a1"].value = "_a";
  alleles["a2"].value = "_a";
  alleles["w1"].value = "_w";
  alleles["w2"].value = "_w";
  alleles["g1"].value = "_g";
  alleles["g2"].value = "_g";
  alleles["cr1"].value = "_cr";
  alleles["cr2"].value = "_cr";
  alleles["d1"].value = "_d";
  alleles["d2"].value = "_d";
  alleles["ch1"].value = "_ch";
  alleles["ch2"].value = "_ch";
  alleles["f1"].value = "f";
  alleles["f2"].value = "_f";
  alleles["z1"].value = "_z";
  alleles["z2"].value = "_z";
  alleles["rn1"].value = "_rn";
  alleles["rn2"].value = "_rn";
  alleles["rb1"].value = "_rb";
  alleles["rb2"].value = "_rb";
  alleles["sty1"].value = "_sty";
  alleles["sty2"].value = "_sty";
  alleles["to1"].value = "_to";
  alleles["to2"].value = "_to";
  alleles["o1"].value = "_o";
  alleles["o2"].value = "_o";
  alleles["spl1"].value = "_spl";
  alleles["spl2"].value = "_spl";
  alleles["sb1"].value = "_sb";
  alleles["sb2"].value = "_sb";
  alleles["lp1"].value = "_lp";
  alleles["lp2"].value = "_lp";
  alleles["patn11"].value = "_patn1";
  alleles["patn12"].value = "_patn1";
  alleles["patn21"].value = "_patn2";
  alleles["patn22"].value = "_patn2";

  switch (uniqueRandom(numHorses)) {
    case 1:
      //a chestnut horse
      break;
    case 2:
      //a black horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      break;
    case 3:
      //a bay horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      break;
    case 4:
      //a brown horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "at";
      alleles["a2"].value = "at";
      break;
    case 5:
      //a grey horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["g1"].value = "g";
      alleles["g2"].value = "g";
      break;
    case 6:
      //a white horse
      alleles["w1"].value = "w";
      break;
    case 7:
      //a palomino horse
      alleles["cr1"].value = "cr";
      break;
    case 8:
      //a buckskin horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["cr1"].value = "cr";
      break;
    case 9:
      //a red dun horse
      alleles["d1"].value = "d";
      alleles["d2"].value = "d";
      break;
    case 10:
      //a grulla horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["d1"].value = "d";
      alleles["d2"].value = "d";
      break;
    case 11:
      //a classic dun horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["d1"].value = "d";
      alleles["d2"].value = "d";
      break;
    case 12:
      //a gold champagne horse
      alleles["ch1"].value = "ch";
      alleles["ch2"].value = "ch";
      break;
    case 13:
      //a strawberry roan
      alleles["rn1"].value = "rn";
      alleles["rn2"].value = "rn";
      break;
    case 14:
      //a blue roan
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["rn1"].value = "rn";
      alleles["rn2"].value = "rn";
      break;
    case 15:
      //a tobiano horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["to1"].value = "to";
      alleles["to2"].value = "to";
      break;
    case 16:
      //an overo horse
      alleles["o1"].value = "o";
      alleles["o2"].value = "_o";
      break;
    case 17:
      //a leopard appaloosa
      alleles["e1"].value = "e";
      alleles["lp1"].value = "lp";
      alleles["patn11"].value = "patn1";
      alleles["patn12"].value = "patn1";
      break;
    case 18:
      //a flaxen chestnut horse
      alleles["f1"].value = "_f";
      alleles["f2"].value = "_f";
      break;
    case 19:
      //a silver dapple horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["z1"].value = "z";
      alleles["z2"].value = "z";
      break;
    case 20:
      //a cremello horse
      alleles["cr1"].value = "cr";
      alleles["cr2"].value = "cr";
      break;
    case 21:
      //a perlino horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["cr1"].value = "cr";
      alleles["cr2"].value = "cr";
      break;
    case 22:
      //a silver grulla horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["d1"].value = "d";
      alleles["d2"].value = "d";
      alleles["z1"].value = "z";
      break;
    case 23:
      //a tri-color tovero
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["to1"].value = "to";
      alleles["to2"].value = "to";
      break;
    case 24:
      //a splashed palomino
      alleles["cr1"].value = "cr";
      alleles["spl1"].value = "spl";
      alleles["spl2"].value = "spl";
      break;
    case 25:
      //an amber champagne horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["ch1"].value = "ch";
      alleles["ch2"].value = "ch";
      break;
    case 26:
      //a classic champagne horse
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["ch1"].value = "ch";
      alleles["ch2"].value = "ch";
      break;
    case 27:
      //an apricot pearl
      alleles["cr1"].value = "prl";
      alleles["cr2"].value = "prl";
      break;
    case 28:
      //a blanket appaloosa
      alleles["sty1"].value = "sty";
      alleles["rb1"].value = "rb";
      alleles["rn1"].value = "rn";
      alleles["lp1"].value = "lp";
      alleles["patn21"].value = "patn2";
      break;
    case 29:
      //a clydesdale style sabino
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["sb1"].value = "sb";
      break;
    case 30:
      //a varnish roan appaloosa
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "at";
      alleles["a2"].value = "at";
      alleles["lp1"].value = "lp";
      break;
    case 31:
      //a snowcap appaloosa
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["a1"].value = "a";
      alleles["a2"].value = "a";
      alleles["lp1"].value = "lp";
      alleles["lp2"].value = "lp";
      alleles["patn21"].value = "patn2";
      alleles["patn22"].value = "patn2";
      break;
    case 32:
      //a fewspot appaloosa
      alleles["e1"].value = "e";
      alleles["e2"].value = "e";
      alleles["lp1"].value = "lp";
      alleles["lp2"].value = "lp";
      alleles["patn11"].value = "patn1";
      break;
  }

  evaluateGenetics();
}
//////////////////////////////////////////////////////////////////////////
export function pauseAnim() {
  var grayAnim = document.images["grey"];
  if (grayAnim.style.display == "none") {
    grayAnim.style.webkitAnimationPlayState = "paused";
    grayAnim.style.MozAnimationPlayState = "paused";
  }
}

export function prepAnims() {
  var greyLayer = self.document.images["grey"];
  if (greyLayer.addEventListener) {
    greyLayer.addEventListener(
      "webkitAnimationIteration",
      function (event) {
        pauseAnim();
      },
      false
    );
    greyLayer.addEventListener(
      "animationiteration",
      function (event) {
        pauseAnim();
      },
      false
    );
  }
}

//////////////////////////////////////////////////////////////////////////

let debugReader = undefined;
let sourceArray = undefined;
let myLoadBar = undefined;
let loadText = undefined;
let gameWindow = undefined;

export function preloader() {
  debugReader = document.getElementById("debugOutput");
  var searchString = window.location.hash;
  if (searchString == "#debug") debugReader.style.display = "block";
  //debugReader.innerHTML+='<br>Categories list: '+useCategories;

  myLoadBar = document.getElementById("loadBar");
  loadText = document.getElementById("loadBarText");
  gameWindow = document.getElementById("borderDummy");

  loadText.innerHTML = "Loading";

  collabsSetup().then(() => {
    myLoadBar.parentNode.style.visibility = "hidden";
    loadText.style.visibility = "hidden";
    gameWindow.className = "";
  });
}

// Collab stuff

const GENES = [
  "e",
  "a",
  "g",
  "cr",
  "d",
  "ch",
  "f",
  "z",
  "sty",
  "rb",
  "rn",
  "sb",
  "w",
  "to",
  "o",
  "spl",
  "lp",
  "patn1",
  "patn2",
];
const IRREGULAR_DEFAULTS = {
  f1: "f",
  f2: "f",
};

// Maps alleleName's to their controlling LWWCVariable.
let alleles = {};

// Async so we can await load.
async function collabsSetup() {
  const container = new CRDTContainer();

  for (const gene of GENES) {
    for (const num of [1, 2]) {
      const alleleName = gene + num;
      const defaultValue = IRREGULAR_DEFAULTS[alleleName] ?? "_" + gene;
      alleles[alleleName] = container.registerCollab(
        alleleName,
        (init) => new collabs.LWWCVariable(init, defaultValue)
      );
      alleles[alleleName].on("Set", () => {
        // Reflect the change in the GUI.
        document.images[alleleName].src = imageSrc(
          path + alleles[alleleName].value + ".png"
        );
      });
    }
  }

  container.on("Change", evaluateGenetics);

  await container.load();

  // Display loaded state.
  for (const gene of GENES) {
    for (const num of [1, 2]) {
      const alleleName = gene + num;
      document.images[alleleName].src = imageSrc(
        path + alleles[alleleName].value + ".png"
      );
    }
  }
  evaluateGenetics();

  // Ready.
  container.ready();
}

function imageSrc(filename) {
  return require("./" + filename);
}
