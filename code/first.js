"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var jogador = new Jogador();
	//jogador.levels = 15;
	//tirar de comentario para desbloquear ate ao ultimo nivel
	sessionStorage.setItem("jogador",JSON.stringify(jogador));
	sessionStorage.setItem("volsfx","0.5");
	sessionStorage.setItem("volbg","0.5");

	var startBtn = document.getElementById("startBtn"); 
	
	startBtn.addEventListener("click",allButtonsHandler);
	var soundBtn = document.getElementById("audioBtn");
	soundBtn.addEventListener("click",soundHandler);


}

function showPage(page)
{
	//carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = window.parent.document.getElementsByTagName("iframe")[0];
	frm.src = page;

}

function hidePage(page)  //não é necessário (excepto se páginas diferentes tivessem zonas de navegação diferentes)
{
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = page;
}
function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	mainWindow.postMessage("START", "*");
}

function soundHandler(ev){
	var but = ev.currentTarget;
	var som = window.parent.document.getElementById("music");
	var img = new Image();
	var imgHandler = function(){
		but.firstChild.src = img.src;
	}
	img.addEventListener("load",imgHandler);
	if(som.paused === true){
		img.src = "../resources/pause.png";
		som.play();
	}
	else{
		img.src = "../resources/play.png";
		som.pause();
	}
}

