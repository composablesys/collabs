digitExtend=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o');

//////////////////////////////////////////////////////////////////////////
//fix older IEs being dumb
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}

//////////////////////////////////////////////////////////////////////////
//encode 2 genes into a hex value
function encode2(gene1, gene2){
	var myNum=0;
	
	if (gene1) {
		if (document.images[gene1+'1'].src == path + gene1 + '.png')
			myNum += 2;
		if (document.images[gene1+'2'].src == path + gene1 + '.png')
			myNum += 1;
	}
	if (gene2) {
		if (document.images[gene2+'1'].src == path + gene2 + '.png')
			myNum += 8;
		if (document.images[gene2+'2'].src == path + gene2 + '.png')
			myNum += 4;
	}
	return(digitExtend[myNum]);
}

//////////////////////////////////////////////////////////////////////////
//decode 2 genes from a hex value
function decode2(myDigit,gene1,gene2){
	var myNum = digitExtend.indexOf(myDigit);
	
	//console.debug(myDigit+' to '+myNum+'\n'+(myNum%4 >1)+' : '+(myNum%2)+' : '+(myNum>7)+' : '+(Math.floor(myNum/4)%2));
	if (gene1) {
		if (myNum%4 > 1)
			document.images[gene1+'1'].src = path+gene1+'.png';
		else document.images[gene1+'1'].src = path+"_"+gene1+'.png';
		if (myNum%2)
			document.images[gene1+'2'].src = path+gene1+'.png';
		else document.images[gene1+'2'].src = path+"_"+gene1+'.png';
	}
	if (gene2) {
		if (myNum>7)
			document.images[gene2+'1'].src = path+gene2+'.png';
		else document.images[gene2+'1'].src = path+"_"+gene2+'.png';
		if (Math.floor(myNum/4)%2)
			document.images[gene2+'2'].src = path+gene2+'.png';
		else document.images[gene2+'2'].src = path+"_"+gene2+'.png';
	}
}

//////////////////////////////////////////////////////////////////////////
//encode a 4 allele gene into a hex value
function encode4a(gene){
	var myNum=0;
	
	switch(document.images[gene+'1'].src){
		case path+gene+'t.png':
			myNum+=1;
			break;
		case path+gene+'.png':
			myNum+=2;
			break;
		case path+gene+'+.png':
			myNum+=3;
	}
	switch(document.images[gene+'2'].src){
		case path+gene+'t.png':
			myNum+=4;
			break;
		case path+gene+'.png':
			myNum+=8;
			break;
		case path+gene+'+.png':
			myNum+=12;
	}
	
	return(digitExtend[myNum]);
}

//////////////////////////////////////////////////////////////////////////
//decode a 4 allele genes from a hex value
function decode4a(myDigit,gene){
	var myNum = digitExtend.indexOf(myDigit);
	
	//console.debug(gene+' as '+myDigit+' to '+myNum+'\n'+(myNum%4 >1)+' : '+(myNum%2)+' : '+(myNum>7)+' : '+(Math.floor(myNum/4)%2));
	
	switch (myNum%4){
		case 0:
			document.images[gene+'1'].src = path+'_'+gene+'.png';
			break;
		case 1:
			document.images[gene+'1'].src = path+gene+'t.png';
			break;
		case 2:
			document.images[gene+'1'].src = path+gene+'.png';
			break;
		case 3:
			document.images[gene+'1'].src = path+gene+'+.png';
			break;
	}
	switch (Math.floor(myNum/4)){
		case 0:
			document.images[gene+'2'].src = path+'_'+gene+'.png';
			break;
		case 1:
			document.images[gene+'2'].src = path+gene+'t.png';
			break;
		case 2:
			document.images[gene+'2'].src = path+gene+'.png';
			break;
		case 3:
			document.images[gene+'2'].src = path+gene+'+.png';
			break;
	}
}

//////////////////////////////////////////////////////////////////////////
//encode a 3 allele gene into a hex value
function encodeCR(){
	var myNum=0;
	
	switch(document.images['cr1'].src){
		case path+'cr.png':
			myNum+=1;
			break;
		case path+'prl.png':
			myNum+=2;
			break;
	}
	switch(document.images['cr2'].src){
		case path+'cr.png':
			myNum+=3;
			break;
		case path+'prl.png':
			myNum+=6;
			break;
	}
	
	return(digitExtend[myNum]);
}

//////////////////////////////////////////////////////////////////////////
//decode a 3 allele genes from a hex value
function decodeCR(myDigit){
	var myNum = digitExtend.indexOf(myDigit);
	
	//console.debug('CR as '+myDigit+' to '+myNum+'\n'+(myNum%4 >1)+' : '+(myNum%2)+' : '+(myNum>7));
	
	switch (myNum%3){
		case 0:
			document.images['cr1'].src = path+'_cr.png';
			break;
		case 1:
			document.images['cr1'].src = path+'cr.png';
			break;
		case 2:
			document.images['cr1'].src = path+'prl.png';
			break;
	}
	switch (Math.floor(myNum/3)){
		case 0:
			document.images['cr2'].src = path+'_cr.png';
			break;
		case 1:
			document.images['cr2'].src = path+'cr.png';
			break;
		case 2:
			document.images['cr2'].src = path+'prl.png';
			break;
	}
}

//////////////////////////////////////////////////////////////////////////
//encode KIT gene into a single digit value
function encodeKIT(){
	var myNum=0;
	
	if (document.images['rn1'].src == path+'rn.png') myNum+=1;
	else if (document.images['sb1'].src == path+'sb.png') myNum+=2;
	else if (document.images['w1'].src == path+'w.png') myNum+=3;
	else if (document.images['to1'].src == path+'to.png') myNum+=4;
	
	if (document.images['rn2'].src == path+'rn.png') myNum+=5;
	else if (document.images['sb2'].src == path+'sb.png') myNum+=10;
	else if (document.images['w2'].src == path+'w.png') myNum+=15;
	else if (document.images['to2'].src == path+'to.png') myNum+=20;
	
	return(digitExtend[myNum]);
}

//////////////////////////////////////////////////////////////////////////
//decode a KIT gene from a single digit value
function decodeKIT(myDigit){
	var myNum = digitExtend.indexOf(myDigit);
	
	//console.debug('KIT as '+myDigit+' to '+myNum+'\n'+(myNum%4 >1)+' : '+(myNum%2)+' : '+(myNum>7)+' : '+(Math.floor(myNum/4)%2));
	
	document.images['rn1'].src = document.images['rn2'].src = path+'_rn.png';
	document.images['sb1'].src = document.images['sb2'].src = path+'_sb.png';
	document.images['w1'].src = document.images['w2'].src = path+'_w.png';
	document.images['to1'].src = document.images['to2'].src = path+'_to.png';
	
	switch (myNum%5){
		case 1:
			document.images['rn1'].src = path+'rn.png';
			break;
		case 2:
			document.images['sb1'].src = path+'sb.png';
			break;
		case 3:
			document.images['w1'].src = path+'w.png';
			break;
		case 4:
			document.images['to1'].src = path+'to.png';
			break;
	}
	switch (Math.floor(myNum/5)){
		case 1:
			document.images['rn2'].src = path+'rn.png';
			break;
		case 2:
			document.images['sb2'].src = path+'sb.png';
			break;
		case 3:
			document.images['w2'].src = path+'w.png';
			break;
		case 4:
			document.images['to2'].src = path+'to.png';
			break;
	}
}

//////////////////////////////////////////////////////////////////////////
//update the url with the current horse's code upon allele change
function updateURL() {
	var hashString = '#'+encode2('e','g')+encode4a('a')+encodeCR()+encode2('d','ch')+encode2('f','z')+encode2('sty','rb')+encodeKIT()+encode2('o','spl')+encode2('lp','patn1')+encode2('patn2');
	
	window.location.hash = hashString;
}

//////////////////////////////////////////////////////////////////////////
//if we have a url to a specific horse, grab and display it!
//not a function, runs once first time page loads
var searchString = window.location.hash;
if (searchString && (searchString!='#debug')) {
	var myValues = searchString.split('');
	decode2(myValues[1],'e','g');
	decode4a(myValues[2],'a');
	decodeCR(myValues[3]);
	decode2(myValues[4],'d','ch');
	decode2(myValues[5],'f','z');
	decode2(myValues[6],'sty','rb');
	decodeKIT(myValues[7]);
	decode2(myValues[8],'o','spl');
	decode2(myValues[9],'lp','patn1');
	decode2(myValues[10],'patn2');
	
	evaluateGenetics();
}
