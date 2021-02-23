
"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var playBtn = document.getElementById("playBtn");
	var settingsBtn = document.getElementById("settingsBtn"); 
	var helpBtn = document.getElementById("helpBtn");
	var scoreBtn = document.getElementById("scoreBtn");
	var creditsBtn = document.getElementById("creditsBtn");
	var soundBtn = document.getElementById("audioBtn");
	soundBtn.addEventListener("click",allButtonsHandler);
	playBtn.addEventListener("click",allButtonsHandler);
	settingsBtn.addEventListener("click",allButtonsHandler);
	helpBtn.addEventListener("click",allButtonsHandler);
	scoreBtn.addEventListener("click",allButtonsHandler);
	creditsBtn.addEventListener("click",allButtonsHandler);
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
	

	switch (name){
		case "playBtn":
			mainWindow.postMessage("Menu-Play","*");
			break;
		case "settingsBtn":
		mainWindow.postMessage("Menu-Settings","*");
			break;
		case "helpBtn":
			mainWindow.postMessage("Menu-Help", "*");
			break;
		case "scoreBtn":
			mainWindow.postMessage("Menu-Scoreboard","*");
			break;
		case "creditsBtn":
			mainWindow.postMessage("Menu-Credits", "*");
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
