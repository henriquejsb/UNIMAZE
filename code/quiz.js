"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	
	var but = document.getElementById("audioBtn");
	var firstBtn =  document.getElementById("first");
	var fourthBtn = document.getElementById("fourth");
	var secondBtn = document.getElementById("second");
	var thirdBtn = document.getElementById("third");
	setQuestions(firstBtn,secondBtn,thirdBtn,fourthBtn);
	firstBtn.addEventListener("click",answerButtonsHandler);
	secondBtn.addEventListener("click",answerButtonsHandler);
	thirdBtn.addEventListener("click",answerButtonsHandler);
	fourthBtn.addEventListener("click",answerButtonsHandler);
	but.addEventListener("click",allButtonsHandler);
	var mainWindow = window.parent;
	var som = mainWindow.document.getElementById("music");
	var img = new Image();
	var imgHandler = function(){
		but.firstChild.src = img.src;
	}
	img.addEventListener("load",imgHandler);
	if(som.paused == true){
		img.src = "../resources/play.png";
	}
	else{
		img.src = "../resources/pause.png";
	}



}
function setQuestions(firstBtn,secondBtn,thirdBtn,fourthBtn){
	var correct;
	var level = parseInt(sessionStorage.getItem("level"));
	var res1 = document.getElementById("res1");
	var res2 = document.getElementById("res2");
	var res3 = document.getElementById("res3");
	var res4 = document.getElementById("res4");
	var pergunta = document.getElementById("pergunta");
	switch(level){
		case 1: 
			res1.innerHTML = "3";
			res2.innerHTML = "15";
			res3.innerHTML = "7";
			res4.innerHTML = "23";
			pergunta.innerHTML = "150 mod 13?";
			sessionStorage.setItem('correto','3');
			break;
		case 2:
			res1.innerHTML = "3x^2";
			res2.innerHTML = "2x^2";
			res3.innerHTML = "3x^3";
			res4.innerHTML = "2x^3";
			pergunta.innerHTML = "What's the primitive of 2 (x^3) / 3?";
			sessionStorage.setItem('correto','2');
			break;
		case 3:
			res1.innerHTML = " Tests if x is smaller/less than n.";
			res2.innerHTML = "Shifts n bits to the left.";
			res3.innerHTML = "Tests if x is greater than n.";
			res4.innerHTML = "Shifts n bits to the right.";
			pergunta.innerHTML = "x << n";
			sessionStorage.setItem('correto','2');
			break;
		case 4:
			res1.innerHTML = "srl $a0,$a0,3";
			res2.innerHTML = "sra $a0,$a0,8";
			res3.innerHTML = "div $a0,$a0,3";
			res4.innerHTML = "sra $a0,$a0,3 ";
			pergunta.innerHTML = "Consider a MIPS processor. Suppose you want to divide a number by 8?";
			sessionStorage.setItem('correto','4');
			break;
		case 5:
			res1.innerHTML = "strcmp";
			res2.innerHTML = "=";
			res3.innerHTML = "strcpy";
			res4.innerHTML = "==";
			pergunta.innerHTML = "In C language, what function/operator should you use to compare two Strings?";
			sessionStorage.setItem('correto','1');
			break;
		case 6:
			res1.innerHTML = "49";
			res2.innerHTML = "50";
			res3.innerHTML = "51";
			res4.innerHTML = "52";
			pergunta.innerHTML = "[HUFFMAN CODES] In an alphabet containing 26 symbols, what is the maximum number of nodes?";
			sessionStorage.setItem('correto','3');
			break;
		case 7:
			res1.innerHTML = "While loops";
			res2.innerHTML = "Semaphores";
			res3.innerHTML = "Message Queues";
			res4.innerHTML = "Pipes";
			pergunta.innerHTML = "You're building a program and you want to help threads work together without interfering with each other. Which one of these should you use?";
			sessionStorage.setItem('correto','2');
			break;
		case 8:
			res1.innerHTML = "Garbage Collector";
			res2.innerHTML = "Trash Remover";
			res3.innerHTML = "Garbage Handler";
			res4.innerHTML = "Trash Sweeper";
			pergunta.innerHTML = "What does Java use to get rid of objects which are not being used by a Java application anymore?";
			sessionStorage.setItem('correto','1');
			break;
		case 9:
			res1.innerHTML = "PNG typically achieves 10:1 compression";
			res2.innerHTML = "JPEG typically achieves 2:1 compression";
			res3.innerHTML = "PNG typically achieves 2:1 compression";
			res4.innerHTML = "JPEG typically achieves 10:1 compression";
			pergunta.innerHTML = "Which of these sentences is true?";
			sessionStorage.setItem('correto','4');
			break;
		case 10	:
			res1.innerHTML = " wE{0,1,4,5}";
			res2.innerHTML = "	 wE{1,2,4,5}";
			res3.innerHTML = "wE{0,1,2,3,4}";
			res4.innerHTML = "None of the previous.";
			pergunta.innerHTML = "Which angular frequencies are present in this signal? x(t) = 2+4sin(3t)*cos(2t)+ 5*sin(4t) -cons(t)";
			sessionStorage.setItem('correto','1');
			break;
		case 11 :
			res1.innerHTML = " Two subjects are chosen from 10 population";
			res2.innerHTML = " Two subjects are chosen from 1 population";
			res3.innerHTML = " Ten subjects are chosen from 1 population";
			res4.innerHTML = " Ten subjects are chosen from 10 populations";
			pergunta.innerHTML = "In a tournament selection:";
			sessionStorage.setItem('correto','2');
			break;
		case 12:
			res1.innerHTML = " UML is a programming language";
			res2.innerHTML = " UML model and UML diagram is the same";
			res3.innerHTML = "  UML diagrams are really unnecessary and disadvantageous";
			res4.innerHTML = " With UML you can design your software app and make the coding phase easier";
			pergunta.innerHTML = "  Which one's true?";
			sessionStorage.setItem('correto','4');
			break;

		
		case 13 :
			res1.innerHTML = " A TCP socket is faster than a UDP socket";
			res2.innerHTML = " With a UDP socket you know that your data reaches the destination";
			res3.innerHTML = " A UDP socket is much more reliable than a TCP socket.";
			res4.innerHTML = " A TCP socket is slower but more reliable than UDP";
			pergunta.innerHTML = "Which one's true?";
			sessionStorage.setItem('correto','4');
			break;



		case 14 :
			res1.innerHTML = " There are no languages with built-in backtracking mechanisms";
			res2.innerHTML = " The bigger the backtracking program gets, the less memory it uses";
			res3.innerHTML = " Backtracking is an easy way to implement and solve very complex problems";
			res4.innerHTML = " None of the previous";
			pergunta.innerHTML = "(Backtracking) Which one's true?";
			sessionStorage.setItem('correto','3');
			break;


		case 15 :
			res1.innerHTML = " LR(1)";
			res2.innerHTML = " SLAR";
			res3.innerHTML = " LR(0)";
			res4.innerHTML = " None of the previous";
			pergunta.innerHTML = "Which of these parsers is identical to SLR:";
			sessionStorage.setItem('correto','3');
			break;
		
		
	}

	
	
	
}
function answerButtonsHandler(ev){
	var res = ev.currentTarget.id;
	var correto = parseInt(sessionStorage.getItem('correto'));
	var jogaux = JSON.parse(sessionStorage.getItem("jogador"));
	var level = parseInt(sessionStorage.getItem("level"));
	var jogador = new Jogador();
	jogador.levels = jogaux.levels;
	jogador.deaths = jogaux.deaths;
	jogador.scoreind = jogaux.scoreind;
	var aux = document.getElementById("aux");
	if((res==="first" & correto === 1 ) || ( res==="second" & correto ===2 )|| (res==="third" & correto ===3) || (res==="fourth" & correto ===4)  ){
		aux.innerHTML ="RIGHT!";
		jogador.scoreind[level-1] = true;
	}
	else{
		jogador.scoreind[level-1] = false;
		aux.innerHTML = "WRONG!";
	}

	var firstBtn =  document.getElementById("first");
	var fourthBtn = document.getElementById("fourth");
	var secondBtn = document.getElementById("second");
	var thirdBtn = document.getElementById("third");
	var finalista = false;
	firstBtn.removeEventListener("click",answerButtonsHandler);
	secondBtn.removeEventListener("click",answerButtonsHandler);
	thirdBtn.removeEventListener("click",answerButtonsHandler);
	fourthBtn.removeEventListener("click",answerButtonsHandler);
	jogador.updatescore();
    sessionStorage.setItem("jogador",JSON.stringify(jogador));
    if(jogador.levels === level ){
    	jogador.levels = level+1;
    	sessionStorage.setItem("jogador",JSON.stringify(jogador));
        if(level === 15){
                finalista = true;
            }
        }

    var tempHand = function(ev){
    	continueHandler(ev,level,finalista);
    }
    var menuBtn = document.getElementById("menuBtn");
	menuBtn.addEventListener("click",tempHand);

}

function continueHandler(ev,level,finalista){
		if(finalista === true){
			window.parent.postMessage("Exame-Diploma","*");
			return;
		}
		if(level < 15){
    		sessionStorage.setItem("level",(level +1).toString());  		
            window.parent.postMessage("Exame-Jogar","*");
            return;
            }
    	
    	else{
    		window.parent.postMessage("Exame-Niveis","*");
    		return;
    	}
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		
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
