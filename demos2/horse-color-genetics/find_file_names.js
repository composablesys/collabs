"use strict";

let spotSize=0;

let files = new Set();
// let path = "/";
// // Need to add /, 1 or 2, and .png
// const choices = [...Object.entries({
// 	e: ["e", "_e"],
// 	a: ["at", "a", "a+", "_a"],
// 	g: ["g", "_g"],
// 	cr: ["cr", "prl", "_cr"],
// 	d: ["d", "_d"],
// 	ch: ["ch", "_ch"],
// 	f: ["f", "_f"],
// 	z: ["z", "_z"],
// 	sty: ["sty", "_sty"],
// 	rb: ["rb", "_rb"],
// 	rn: ["rn", "_rn"],
// 	sb: ["sb", "_sb"],
// 	w: ["w", "_w"],
// 	to: ["to", "_to"],
// 	o: ["o", "_o"],
// 	spl: ["spl", "_spl"],
// 	lp: ["lp", "_lp"],
// 	patn1: ["patn1", "_patn1"],
// 	patn2: ["patn2", "_patn2"]
// })]


let a = [0, 0, 0, 0, 0, 0, 0];
for (a[0] = 0; a[0] < 4; a[0]++) {
	for (a[1] = 0; a[1] < 5; a[1]++) {
		for (a[2] = 0; a[2] < 5; a[2]++) {
			for (a[3] = 0; a[3] < 2; a[3]++) {
				for (a[4] = 0; a[4] < 2; a[4]++) {
					for (a[5] = 0; a[5] < 2; a[5]++) {
						for (a[6] = 0; a[6] < 2; a[6]++) {
							let color = getColor(a);
							for (let splashed of [0, 1, 2]) {
								for (let varnish of [0, 1, 2]) {
									for (let leopard of [0, 1, 2]) {
										for (let blanket of [0, 1]) {
											for (let sabino of [0, 1, 2]) {
												updateDisplay(color, splashed, varnish, leopard, blanket, sabino);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

for (let file of files) {
	console.log(file);
}


function getColor(a) {
	let color = "";
	if (a[0] !== 3) color = ["lwa", "lwo", "white"][a[0]];
	else {
		color = ["wild_bay", "bay", "sealbrown", "black", "chestnut"][a[1]];
		spotSize = [2, 2, 3, 4, 1][a[1]];

		//cream dilution
		//double cream
		if (a[2] === 0) {
			if (color == 'wild_bay') color = "bay_cream2";
			else color+='_cream2';
			spotSize-=2;
		//double pearl
		} else if (a[2] === 1) {
			if (color == "wild_bay") color = "pearl_bay";
			else color = "pearl_"+color;
			spotSize-=2;
		//cream pearl
		} else if (a[2] === 2) {
				if (color == "wild_bay") color = "creampearl_bay";
				else color = "creampearl_"+color;
				spotSize-=1;
		//single cream
		} else if (a[2] === 3) {
			color+='_cream1';
			spotSize-=1;
		}

		//champagne dilution?
		if (a[3]) {
			switch (color)
			{
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
			spotSize-=1;
		}

		//dun dilution?
		if (a[4]) {
			switch (color)
			{
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
					color="dun_bay_cream2";
					break;
				case "champagne_gold_pearl":
					color="pseudocream_gold";
					break;
				case "champagne_classic_pearl":
					color="pseudocream_classic";
					break;
				case "champagne_sable_pearl":
					color="pseudocream_sable";
					break;
				case "champagne_amber_pearl":
					color="pseudocream_amber";
					break;
				case "champagne_classic_cream":
				case "creampearl_black":
					color="dun_black_cream2";
					break;
				case "creampearl_chestnut":
					color="dun_chestnut_cream2";
					break;
				default:
					color='dun_'+color;
			}
			spotSize-=1;
		}

		//any silver dapple?
		if (a[5]) {
			switch (color)
			{
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
					color='silver_'+color;
					break;
			}
		}

		//flaxen chestnut / dun?
		if (a[6]) {
			switch(color){
				case 'chestnut':
					color = "flaxen";
					break;
				case 'dun_chestnut':
					color = "flaxen_dun";
					break;
				case 'champagne_gold':
					color = "flaxen_champagne";
					break;
				case 'pearl_chestnut':
					color = "flaxen_pearl";
					break;
				case 'dun_pearl_chestnut':
					color="flaxen_dun_pearl";
					break;
				case 'champagne_gold_pearl':
					color="flaxen_gold_pearl";
					break;
			}
		}

		spotSize = (spotSize>2) ? 2 : spotSize;
		spotSize = (spotSize<1) ? 1 : spotSize;
	}
	return color;
}

function updateDisplay(newColor, isSplashed, isVarnish, isLeopard, isBlanket, isSabino)
{
	var hpath = "";
	if (newColor != 'lwa' && newColor != 'lwo') { files.add("splash"+isSplashed+".png");
		files.add("sabino"+isSabino+".png");

		if (isVarnish){
			var appTemp = 'appaloosa_varnish'+isVarnish;
			if (isLeopard) {
				appTemp += '_leopard'+isLeopard;
				if (isVarnish<2) appTemp += '_'+spotSize;
			} else if (isBlanket) {
				appTemp += '_blanket';
				if (isVarnish<2) appTemp += '_'+spotSize;
			}

			files.add(appTemp+'.png');
		}
	}

	var tempSrc;

	switch (newColor)
	{
	case 'lwa':
	case 'lwo':
	case 'white':
		tempSrc = hpath + 'white.png';
		break;
	case 'dun_chestnut_cream2':
	case 'creampearl_chestnut':
		tempSrc = hpath + 'chestnut_cream2.png';
		break;
	case 'champagne_gold_cream':
	case 'pseudocream_gold':
		tempSrc = hpath + 'champagne_gold_cream.png';
		break;
	case 'creampearl_black':
		tempSrc = hpath + 'black_cream2.png';
		break;
	case 'champagne_classic_cream':
	case 'pseudocream_classic':
		tempSrc = hpath + 'champagne_classic_cream.png';
		break;
	case 'creampearl_bay':
		tempSrc = hpath + 'bay_cream2.png';
		break;
	case 'champagne_amber_cream':
	case 'pseudocream_amber':
		tempSrc = hpath + 'champagne_amber_cream.png';
		break;
	case 'creampearl_wild_bay':
		tempSrc = hpath + 'wild_bay_cream2.png';
		break;
	case 'champagne_sable_cream':
	case 'pseudocream_sable':
		tempSrc = hpath + 'champagne_sable_cream.png';
		break;
	case 'creampearl_sealbrown':
		tempSrc = hpath + 'sealbrown_cream2.png';
		break;
	case 'silver_sealbrown':
		tempSrc = hpath + 'silver_sealbrown.png';
		break;
	case 'silver_sealbrown_cream1':
		tempSrc = hpath + 'silver_sealbrown_cream1.png';
		break;
	case 'silver_creampearl_black':
		tempSrc = hpath + 'silver_black_cream2.png';
		break;
	case 'silver_creampearl_sealbrown':
		tempSrc = hpath + 'silver_sealbrown_cream2.png';
		break;
	case 'silver_creampearl_bay':
		tempSrc = hpath + 'silver_bay_cream2.png';
		break;
	default:
		tempSrc = hpath + newColor+".png";

	}

	files.add(tempSrc);
}



// let images = {};
// function doChoice(index) {
// 	if (index === 5) {
// 		console.log("at 5");
// 	}
// 	if (index === choices.length) {
// 		// Done
// 		evaluateGenetics();
// 		return;
// 	}
// 	let gene = choices[index][0];
// 	for (let option1 of choices[index][1]) {
// 		images[gene + "1"] = {src: path + option1 + ".png"};
// 		for (let option2 of choices[index][1]) {
// 			images[gene + "2"] = {src: path + option2 + ".png"};
// 			doChoice(index + 1);
// 		}
// 	}
// }

//
// function evaluateGenetics()
// {
// 	//lethal white
// 	if ((images['w1'].src.endsWith(path + "w.png")) && (images['w2'].src.endsWith(path + "w.png"))) {
// 		color = "lwa";
// 	//lethal overo
// 	} else if ((images['o1'].src.endsWith(path+ "o.png")) && (images['o2'].src.endsWith(path+ "o.png"))) {
// 		color = "lwo";
// 	//relgular white
// 	} else if ((images['w1'].src.endsWith(path + "w.png")) || (images['w2'].src.endsWith(path + "w.png"))) {
// 		color = "white";
// 		grey=roan=rabicano=sooty=tobiano=overo=sabino=varnish = 0;
// 		grey=0;
// 		splashed = 0;
// 		splashed += (images['spl1'].src.endsWith(path + "spl.png")) ? 1:0;
// 		splashed += (images['spl2'].src.endsWith(path + "spl.png")) ? 1:0;
// 	} else {
// 		//rabicano
// 		rabicano = ((images['rb1'].src.endsWith(path + "rb.png")) || (images['rb2'].src.endsWith(path + "rb.png"))) ? 1:0;
// 		//sooty?
// 		sooty = ((images['sty1'].src.endsWith(path + "sty.png")) || (images['sty2'].src.endsWith(path + "sty.png"))) ? 1:0;
//
// 		//black, chestnut, bay, or seal brown?
// 		//ee levels affect patn1 levels
// 		if ((images['e1'].src.endsWith(path + "e.png")) || (images['e2'].src.endsWith(path + "e.png"))) {
// 			if ((images['a1'].src.endsWith(path + "a+.png")) || (images['a2'].src.endsWith(path + "a+.png"))) {
// 				color = "wild_bay";
// 				spotSize=2;
// 			} else if ((images['a1'].src.endsWith(path + "a.png")) || (images['a2'].src.endsWith(path + "a.png"))) {
// 				color = "bay";
// 				spotSize=2;
// 			} else if ((images['a1'].src.endsWith(path + "at.png")) || (images['a2'].src.endsWith(path + "at.png"))) {
// 				color = "sealbrown";
// 				spotSize=3;
// 			} else {
// 				color = "black";
// 				spotSize=3;
// 			}
// 		} else {
// 			color = "chestnut";
// 			spotSize=1;
// 		}
//
// 		//cream dilution
// 		//double cream
// 		if ((images['cr1'].src.endsWith(path + "cr.png")) && (images['cr2'].src.endsWith(path + "cr.png"))) {
// 			if (color == 'wild_bay') color = "bay_cream2";
// 			else color+='_cream2';
// 			spotSize-=2;
// 		//double pearl
// 		} else if ((images['cr1'].src.endsWith(path + "prl.png")) && (images['cr2'].src.endsWith(path + "prl.png"))) {
// 			if (color == "wild_bay") color = "pearl_bay";
// 			else color = "pearl_"+color;
// 			spotSize-=2;
// 		//cream pearl
// 		} else if (((images['cr1'].src.endsWith(path + "prl.png")) && (images['cr2'].src.endsWith(path + "cr.png")))
// 			|| ((images['cr1'].src.endsWith(path + "cr.png")) && (images['cr2'].src.endsWith(path + "prl.png")))) {
// 				if (color == "wild_bay") color = "creampearl_bay";
// 				else color = "creampearl_"+color;
// 				spotSize-=1;
// 		//single cream
// 		} else if ((images['cr1'].src.endsWith(path + "cr.png")) || (images['cr2'].src.endsWith(path + "cr.png"))) {
// 			color+='_cream1';
// 			spotSize-=1;
// 		}
//
// 		//champagne dilution?
// 		if ((images['ch1'].src.endsWith(path + "ch.png")) || (images['ch2'].src.endsWith(path + "ch.png"))) {
// 			switch (color)
// 			{
// 			case "black":
// 				color = "champagne_classic";
// 				break;
// 			case "sealbrown":
// 				color = "champagne_sable";
// 				break;
// 			case "chestnut":
// 				color = "champagne_gold";
// 				break;
// 			case "bay":
// 			case "wild_bay":
// 				color = "champagne_amber";
// 				break;
// 			case "chestnut_cream1":
// 			case "chestnut_cream2":
// 			case "creampearl_chestnut":
// 				color = "champagne_gold_cream";
// 				break;
// 			case "wild_bay_cream1":
// 			case "wild_bay_cream2":
// 			case "bay_cream1":
// 			case "bay_cream2":
// 			case "creampearl_bay":
// 				color = "champagne_amber_cream";
// 				break;
// 			case "black_cream1":
// 			case "black_cream2":
// 			case "creampearl_black":
// 				color = "champagne_classic_cream";
// 				break;
// 			case "sealbrown_cream1":
// 			case "sealbrown_cream2":
// 			case "creampearl_sealbrown":
// 				color = "champagne_sable_cream";
// 				break;
// 			case "pearl_chestnut":
// 				color = "champagne_gold_pearl";
// 				break;
// 			case "pearl_black":
// 				color = "champagne_classic_pearl";
// 				break;
// 			case "pearl_sealbrown":
// 				color = "champagne_sable_pearl";
// 				break;
// 			case "pearl_bay":
// 				color = "champagne_amber_pearl";
// 				break;
// 			//default:
// 				//console.debug('Could not add champagne dilution to: '+color);
// 			}
// 			spotSize-=1;
// 		}
//
// 		//dun dilution?
// 		if ((images['d1'].src.endsWith(path + 'd.png')) || (images['d2'].src.endsWith(path + 'd.png'))) {
// 			switch (color)
// 			{
// 				case "champagne_gold_cream":
// 				case "champagne_sable_cream":
// 				case "champagne_amber_cream":
// 				case "champagne_classic_cream":
// 					break;
// 				case "sealbrown_cream1":
// 					color = "dun_sealbrown";
// 					break;
// 				case "wild_bay":
// 					color = "dun_bay";
// 					break;
// 				case "wild_bay_cream1":
// 					color = "dun_bay_cream1";
// 					break;
// 				case "wild_bay_cream2":
// 				case "sealbrown_cream2":
// 				case "champagne_amber_cream":
// 				case "creampearl_sealbrown":
// 				case "creampearl_bay":
// 				case "creampearl_wild_bay":
// 					color="dun_bay_cream2";
// 					break;
// 				case "champagne_gold_pearl":
// 					color="pseudocream_gold";
// 					break;
// 				case "champagne_classic_pearl":
// 					color="pseudocream_classic";
// 					break;
// 				case "champagne_sable_pearl":
// 					color="pseudocream_sable";
// 					break;
// 				case "champagne_amber_pearl":
// 					color="pseudocream_amber";
// 					break;
// 				case "champagne_classic_cream":
// 				case "creampearl_black":
// 					color="dun_black_cream2";
// 					break;
// 				case "creampearl_chestnut":
// 					color="dun_chestnut_cream2";
// 					break;
// 				default:
// 					color='dun_'+color;
// 			}
// 			spotSize-=1;
//
// 		//any silver dapple?
// 		} if ((images['z1'].src.endsWith(path + 'z.png')) || (images['z2'].src.endsWith(path + 'z.png')))
// 			switch (color)
// 			{
// 				case "chestnut":
// 				case "chestnut_cream1":
// 				case "chestnut_cream2":
// 				case "dun_chestnut":
// 				case "dun_chestnut_cream1":
// 				case "dun_chestnut_cream2":
// 				case "pearl_chestnut":
// 				case "creampearl_chestnut":
// 				case "dun_pearl_chestnut":
// 				case "champagne_gold":
// 				case "champagne_gold_cream":
// 				case "champagne_gold_pearl":
// 				case "dun_champagne_gold_pearl":
// 				case "champagne_classic_cream":
// 				case "champagne_sable_cream":
// 				case "champagne_amber_cream":
// 				case "pseudocream_classic":
// 				case "pseudocream_sable":
// 				case "pseudocream_amber":
// 				case "pseudocream_gold":
// 					break;
// 				case "black_cream1":
// 					color = "silver_black";
// 					break;
// 				case "dun_black_cream1":
// 					color = "silver_dun_black";
// 					break;
// 				case "sealbrown_cream1":
// 					color = "silver_sealbrown_cream1";
// 					break;
// 				case "dun_bay":
// 				case "dun_sealbrown":
// 					color = "silver_dun";
// 					break;
// 				default:
// 					color='silver_'+color;
// 					break;
// 			}
//
// 		//flaxen chestnut / dun?
// 		if ((images['f1'].src.endsWith(path + '_f.png')) && (images['f2'].src.endsWith(path + '_f.png'))) {
// 			switch(color){
// 				case 'chestnut':
// 					color = "flaxen";
// 					break;
// 				case 'dun_chestnut':
// 					color = "flaxen_dun";
// 					break;
// 				case 'champagne_gold':
// 					color = "flaxen_champagne";
// 					break;
// 				case 'pearl_chestnut':
// 					color = "flaxen_pearl";
// 					break;
// 				case 'dun_pearl_chestnut':
// 					color="flaxen_dun_pearl";
// 					break;
// 				case 'champagne_gold_pearl':
// 					color="flaxen_gold_pearl";
// 					break;
// 			}
// 		}
//
// 		//grey?
// 		grey = ((images['g1'].src.endsWith(path + "g.png")) || (images['g2'].src.endsWith(path + "g.png"))) ? 1:0;
//
// 		//paint?
// 		tobiano = ((images['to1'].src.endsWith(path + "to.png")) || (images['to2'].src.endsWith(path + "to.png"))) ? 1:0;
// 		overo = ((images['o1'].src.endsWith(path + "o.png")) || (images['o2'].src.endsWith(path + "o.png"))) ? 1:0;
// 		sabino = 0;
// 		sabino += (images['sb1'].src.endsWith(path + "sb.png")) ? 1:0;
// 		sabino += (images['sb2'].src.endsWith(path + "sb.png")) ? 1:0;
// 		splashed = 0;
// 		splashed += (images['spl1'].src.endsWith(path + "spl.png")) ? 1:0;
// 		splashed += (images['spl2'].src.endsWith(path + "spl.png")) ? 1:0;
// 		if (splashed || sabino) tovero = 0;
// 		else tovero = tobiano + overo;
// 		paint = tobiano + overo;
// 		paint += splashed ? 1:0;
// 		paint += sabino ? 1:0;
//
// 		//appaloosa?
// 		varnish = 0;
// 		varnish += (images['lp1'].src.endsWith(path + "lp.png")) ? 1 : 0;
// 		varnish += (images['lp2'].src.endsWith(path + "lp.png")) ? 1 : 0;
// 		leopard = 0;
// 		leopard += (images['patn11'].src.endsWith(path + "patn1.png")) ? 1 : 0;
// 		leopard += (images['patn12'].src.endsWith(path + "patn1.png")) ? 1 : 0;
// 		blanket = ((images['patn21'].src.endsWith(path + "patn2.png")) || (images['patn22'].src.endsWith(path + "patn2.png"))) ? 1 : 0;
// 		spotSize = (spotSize>2) ? 2 : spotSize;
// 		spotSize = (spotSize<1) ? 1 : spotSize;
//
// 	}
//
// 	updateDisplay(color, grey, roan, rabicano, sooty, tobiano, overo, splashed, varnish, leopard, blanket, sabino);
// }
