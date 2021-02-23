"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var hb = document.getElementById("hb");
	var faju = document.getElementById("faju");
	var good = document.getElementById("good");
	var aa = document.getElementById("aa");
	var soundBtn = document.getElementById("audioBtn");
	soundBtn.addEventListener("click",allButtonsHandler);
	hb.addEventListener("click",allButtonsHandler);
	faju.addEventListener("click",allButtonsHandler);
	good.addEventListener("click",allButtonsHandler);
	aa.addEventListener("click",allButtonsHandler);
	var som = window.parent.document.getElementById("music");
	var img = new Image();
	var imgHandler = function(){
				soundBtn.firstChild.src = img.src;
			}
			img.addEventListener("load",imgHandler);
			if(som.paused == true){
				img.src = "../resources/play.png";
				
			}
			else{
				img.src = "../resources/pause.png";
				
			}

}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "hb":
			sessionStorage.setItem("char","hb");
			mainWindow.postMessage("Choose-Menu","*");
			break;
		case "faju":
			sessionStorage.setItem("char","faju");
			mainWindow.postMessage("Choose-Menu","*");
			break;
		case "good":
			sessionStorage.setItem("char","good");
			mainWindow.postMessage("Choose-Menu","*");
			break;
		case "aa":
			sessionStorage.setItem("char","aa");
			mainWindow.postMessage("Choose-Menu","*");
			break;
		case "audioBtn":
			var but = ev.currentTarget;
			var som = mainWindow.document.getElementById("music");
			var img = new Image();
			var imgHandler = function(){
				but.firstChild.src = img.src;
			}
			img.addEventListener("load",imgHandler);
			if(som.paused == true){
				img.src = "../resources/pause.png";
				som.play();
			}
			else{
				img.src = "../resources/play.png";
				som.pause();
			}
			break;

}
}
