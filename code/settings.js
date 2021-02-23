"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var menuBtn = document.getElementById("menuBtn");
	var soundBtn = document.getElementById("audioBtn");
	var sfxup = document.getElementById("soundUpsfx");
	var sfxdown = document.getElementById('soundDownsfx');
	var bgup = document.getElementById("soundUpbg");
	var bgdown = document.getElementById("soundDownbg");
	soundBtn.addEventListener("click",allButtonsHandler);
	menuBtn.addEventListener("click",allButtonsHandler);
	var bgv = parseFloat(sessionStorage.getItem("volbg"));
	var sfxv = parseFloat(sessionStorage.getItem("volsfx"));
	var bgdisp = document.getElementById("bgm");
	var sfxdisp = document.getElementById("sfxm");
	var tempHand = function(ev){
		soundButtonsHandler(ev,bgdisp,sfxdisp);
	}
	bgup.addEventListener("click",tempHand);
	bgdown.addEventListener("click",tempHand);
	sfxup.addEventListener("click",tempHand);
	sfxdown.addEventListener("click",tempHand);
	bgdisp.innerHTML = (bgv*100).toString() + "%";
	sfxdisp.innerHTML = (sfxv*100).toString() + "%";
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
			mainWindow.postMessage("Settings-Menu","*");
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

function soundButtonsHandler(ev,bgdisp,sfxdisp){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	var som = mainWindow.document.getElementById("music");
	var bgv = parseFloat(sessionStorage.getItem("volbg"));
	var sfxv = parseFloat(sessionStorage.getItem("volsfx"));
	switch(name){
		case "soundUpbg":
			bgv = Math.round(Math.min(1,bgv + 0.1) * 100) / 100;
			sessionStorage.setItem("volbg",bgv.toString());
			bgdisp.innerHTML = (bgv*100).toString() + "%";
			som.volume = bgv;
			break;
		case "soundDownbg":
			bgv = Math.round(Math.max(0,bgv - 0.1) * 100) / 100;
			sessionStorage.setItem("volbg",bgv.toString());
			bgdisp.innerHTML = (bgv*100).toString() + "%";
			som.volume = bgv;
			break;
		case "soundUpsfx":
			sfxv = Math.round(Math.min(1,sfxv + 0.1) * 100) / 100;
			sessionStorage.setItem("volsfx",sfxv.toString());
			sfxdisp.innerHTML = (sfxv*100).toString() + "%";
			break;
		case "soundDownsfx":
			sfxv = Math.round(Math.max(0,sfxv - 0.1) * 100) / 100;
			sessionStorage.setItem("volsfx",sfxv.toString());
			sfxdisp.innerHTML = (sfxv*100).toString() + "%";
			break;
	}

}
