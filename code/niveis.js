"use strict";

(function()
{   
    window.addEventListener("load", main);
}());



function main()
{
	var botao;
	var btnome;
	var jogador = JSON.parse(sessionStorage.getItem("jogador"));
	var niveis = jogador.levels;
	for(let i = 0; i < niveis; i++){
		btnome = "b" + (i+1).toString(); 
		botao = document.getElementById(btnome);
		botao.addEventListener("click",allButtonsHandler);
		botao.style.background = "url(../resources/" + (i+1).toString() + ".png)";
		botao.style["background-size"] = "45px 45px";
	}

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
			mainWindow.postMessage("Niveis-Menu","*");
			break;
		
		case "b1":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","1");
			break; 
		case "b2":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","2");
			break;
		case "b3":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","3");
			break;
		case "b4":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","4");
			break;
		case "b5":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","5");
			break;
		case "b6":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","6");
			break;
		case "b7":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","7");
			break;
		case "b8":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","8");
			break;
		case "b9":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","9");
			break;
		case "b10":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","10");
			break;
		case "b11":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","11");
			break;
		case "b12":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","12");
			break;
		case "b13":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","13");
			break;
		case "b14":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","14");
			break;
		case "b15":
			mainWindow.postMessage("Niveis-Jogar","*");
			sessionStorage.setItem("level","15");
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