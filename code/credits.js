"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var menuBtn = document.getElementById("menuBtn");
	var soundBtn = document.getElementById("audioBtn");
	soundBtn.addEventListener("click",allButtonsHandler);
	menuBtn.addEventListener("click",allButtonsHandler);
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
		case "menuBtn":
			mainWindow.postMessage("Credits-Menu","*");
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
