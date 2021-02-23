(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	window.addEventListener("message", messageHandler);
	showPage("html/first.html");
	var som = document.getElementById("music");
	som.volume = parseFloat(sessionStorage.getItem("volbg"));
    som.play();
}


function showPage(page)
{

	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = page;

}


function messageHandler(ev){
	var pag = ev.data;
	var som = document.getElementById("music");
	switch(pag){
		case "START":
			showPage("html/choose.html");
			break;
		case "Menu-Options":
			showPage("html/opçoes.html");
			break;
		case "Menu-Play":
			showPage("html/niveis.html");
			break;
		case "Niveis-Jogar":
			if(som.paused === false){
				som.pause();
				som.src = "resources/2.mp3";
				som.play();
			}
			else{
				som.src = "resources/2.mp3";
			}
			showPage("html/mapa.html");
			break;
		case "Jogar-Niveis":
			if(som.paused === false){
				som.pause();
				som.src = "resources/mission.mp3";
				som.play();
			}
			else{
				som.src = "resources/mission.mp3";
			}
			showPage("html/niveis.html");
			break;	
		case "Options-Menu":
			showPage("html/menu.html");
			break;
		case"Niveis-Menu":
			showPage("html/menu.html");
			break;
		case "Menu-Help":
			showPage("html/help.html");
			break;
		case "Help-Menu":
			showPage("html/menu.html");
			break;
		case "Menu-Credits":
			showPage("html/credits.html");
			break;
		case "Credits-Menu":
			showPage("html/menu.html");
			break;
		case "Jogar-Jogar":
			showPage("html/mapa.html");
			break;
		case "Scoreboard-Menu":
			showPage("html/menu.html");
			break;
		case "Menu-Scoreboard":
			showPage("html/scoreboard.html");
			break;
		case "Menu-Settings":
			showPage("html/settings.html");
			break;
		case "Settings-Menu":
			showPage("html/menu.html");
			break;
		case "Jogar-Exame":
			showPage("html/quiz.html");
			break;
		case "Exame-Jogar":
			showPage("html/mapa.html");
			break;
		case "Exame-Niveis":
			showPage("html/niveis.html");
			break;
		case "Diploma-Menu":
			showPage("html/menu.html");
			break;
		case "Exame-Diploma":
			if(som.paused === false){
				som.pause();
				som.src = "resources/mission.mp3";
				som.play();
			}
			else{
				som.src = "resources/mission.mp3";
			}
			showPage("html/diploma.html");
			break;
		case "Choose-Menu":
			showPage("html/menu.html");
			break;



	}
}
