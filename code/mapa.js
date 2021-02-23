"use strict";


// USAR ESTA PAGINA PARA CORRER CADA NIVEL, CARREGA AS IMAGENS NECESSARIAS, CARREGA O NIVEL, 
// METE O NIVEL A ANDAR
//PAGINA PRINCIPAL DA MECANICA. VER SEGUIMENTO






(function()
{   
	window.addEventListener("load", main);
}());

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var cw = canvas.width;
	var ch = canvas.height;
	var player;
	var fronteiras;
	var obstaculos;
	var board;
	var jogador;
    
	canvas.addEventListener("initend",initEndHandler);
	init(canvas,ctx,cw,ch,player,fronteiras,obstaculos,board,jogador);
    var backBtn = document.getElementById("menuBtn"); 

    backBtn.addEventListener("click",allButtonsHandler);
    var soundBtn = document.getElementById("audioBtn");
    soundBtn.addEventListener("click",allButtonsHandler);
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
	function initEndHandler(ev){
		player = ev.player;
		fronteiras = ev.fronteiras;
		obstaculos = ev.obstaculos;
		board = ev.board;
		jogador = ev.jogador;

		var keyDownHandler = function(ev){
			keyDownHandler2(ev,player);
		}
		var keyUpHandler = function(ev){
			keyUpHandler2(ev,player);
		}
		window.addEventListener('keydown',keyDownHandler, true);
		window.addEventListener('keyup',keyUpHandler,true);

		startLevel(ev, ctx, cw, ch, player, obstaculos, fronteiras,board,jogador,sessionStorage.getItem("level"));
	}



}


function allButtonsHandler(ev){
    var name = ev.currentTarget.id;
    var mainWindow = window.parent;
    switch (name){
        case "menuBtn":
            mainWindow.postMessage("Jogar-Niveis","*");
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

function keyDownHandler2(ev,player){
	var key = window.event?ev.keyCode:ev.wich;
	if(key == 37){
		player.left = true;
	}
	if(key == 38){
		player.top = true;

	}
	if(key == 39){
		player.right = true;
	}
	if(key == 40){
		player.bottom = true;
	}

}


function keyUpHandler2(ev,player){      

	var key = window.event?ev.keyCode:ev.wich;
	if(key == 37){
		player.left = false;
	}
	if(key == 38){
		player.top = false;
	}
	if(key == 39){
		player.right = false;
	}
	if(key == 40){
		player.bottom = false;
	}

}


function startLevel(ev,ctx,cw,ch,player,obstaculos,fronteiras,board,jogador,level){
    switch(level){
    	case "1":
    	board.level1(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "2":
    	board.level2(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "3":
    	board.level3(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "4":
    	board.level4(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "5":
    	board.level5(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "6":
    	board.level6(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "7":
    	board.level7(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "8":
    	board.level8(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "9":
    	board.level9(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "10":
    	board.level10(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "11":
    	board.level11(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "12":
    	board.level12(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "13":
    	board.level13(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "14":
    	board.level14(ctx,cw,ch,obstaculos,fronteiras);
    	break;
    	case "15":
    	board.level15(ctx,cw,ch,obstaculos,fronteiras);
    	break;

    }
    player.x = board.xinit;
    player.y = board.yinit;
    jogador.tempdeaths = 0;
    initMess(ctx,cw,ch,board);    
    setTimeout(function(){animLoop(ctx,cw,ch,player,obstaculos,fronteiras,board,jogador)},2000);
}

function draw(ctx,cw,ch,player,obstaculos,fronteiras,board,jogador){

	board.drawLevel(ctx,cw,ch,obstaculos,fronteiras);
    player.draw(ctx);
	ctx.fillStyle ="#000000";
	ctx.fillRect(0,0,600,30);
	ctx.font = "25px cornerstone";
	ctx.fillStyle ="#a1a1a1";
    ctx.fillText("LEVEL: " + board.nivel ,150,24);
	ctx.fillText("DEATHS: " + jogador.tempdeaths,400,24);
	ctx.fillText(board.cadeira,300,24);
	
    
}




function animLoop(ctx, cw, ch, player, obstaculos, fronteiras, board, jogador){

	var loop = function(){
		animLoop(ctx,cw,ch,player,obstaculos,fronteiras,board, jogador);
	}
	var reqId = window.requestAnimationFrame(loop);
	render(ctx,cw,ch,player,obstaculos,fronteiras,board, jogador,reqId);
}

function render(ctx,cw,ch,player,obstaculos,fronteiras,board,jogador,reqId){

	var xInit = player.x;
	var yInit = player.y;
	var xAct = xInit;
	var yAct = yInit;
	var mainWindow = window.parent;
	ctx.clearRect(0,0,cw,ch);
	if(board.win === true){
        var level = parseInt(sessionStorage.getItem("level"));
        jogador.updatedeaths(level-1);
        sessionStorage.setItem("jogador",JSON.stringify(jogador));
        window.cancelAnimationFrame(reqId);
        
        mainWindow.postMessage("Jogar-Exame","*");
        
    }
    if(player.right === true){
    	xAct += player.speed;
    }
    if(player.left === true){
    	xAct -= player.speed;
    }
    if(player.top === true){
    	yAct -= player.speed;
    }
    if(player.bottom === true){
    	yAct += player.speed;
    }
    
    player.x = xAct;
    player.y = yAct;



    
    for(let i = 0; i < fronteiras.length; i++){
        if(fronteiras[i] != null && fronteiras[i] != undefined){
            if(fronteiras[i].checkpoint === true){
                if(player.colisionBoundingBox(fronteiras[i],ctx) === true){
                    
                    board.xinit = fronteiras[i].x;
                    board.yinit = fronteiras[i].y;

                    continue;
                }
            }
        	player.x = xInit;
        	let yc = false;
        	if(player.colisionBoundingBox(fronteiras[i],ctx) == true){
                yc = true;
            }
            player.x = xAct;
            player.y = yInit;
            let xc = false;
            if(player.colisionBoundingBox(fronteiras[i],ctx) == true){
                xc = true;
                }
                player.y = yAct;
                if(yc === true || xc === true){
                	if(yc === true){
                		player.y = yInit;
                		yAct = yInit;

                	}
                	else{
                		player.x = xInit;
                		xAct = xInit;
                	}
                }

            }
            else{
                break;
            }
        }

        if (player.colisionBoarderBox(cw,ch)){
        	player.x = xInit;
        	player.y = yInit;
        }

        

        for(let i = 0; i < obstaculos.length; i++){
        	if(obstaculos[i] != null && obstaculos[i] != undefined){
                obstaculos[i].desenha();
        		if(player.colisionBoundingBox(obstaculos[i],ctx) === true){
                    
                    if(obstaculos[i].tipomov === "Apanha"){
                        board.catch++;
                        obstaculos.splice(i,1);
                        var som = mainWindow.document.getElementById("music");
                        if(som.paused === false){
                        var sfx = new Audio("../resources/beep2.mp3");
                        sfx.volume = parseFloat(sessionStorage.getItem("volsfx"));
                        sfx.play();
                    }
                        
                    }
                    else{
        			player.x = board.xinit;
        			player.y = board.yinit;
        			jogador.tempdeaths++;
        			var som = mainWindow.document.getElementById("music");
        			if(som.paused === false){
                    var sfx = new Audio("../resources/beep.mp3");
                    sfx.volume = parseFloat(sessionStorage.getItem("volsfx"));
                    sfx.play();
                }
                                    
                    }
        		}
        	}
        else{
            break;
        }
        }

        board.hasWon(cw,ch,player);

        draw(ctx,cw,ch,player,obstaculos,fronteiras,board,jogador);


    }

    function init(canvas,ctx,cw,ch,player,fronteiras,obstaculos,board,jogador){
    

    var player;
    var fronteiras = new Array(100);
    var obstaculos = new Array(100);
    var board;
    var obstaculo;
    var fronteira;
    var total = 0;
    var img = new Image();
    img.addEventListener("load",imgLoadedHandler);
    img.id = "jogador";
    img.src = "../resources/" + sessionStorage.getItem("char") + ".png";

    var img = new Image();
    obstaculo = new Obstacle(0,0,1,1,0,0,img,null,null);
    obstaculos[0] = obstaculo;
    img.addEventListener("load",imgLoadedHandler);
    img.id = "obstaculo";
    img.src = "../resources/obs.png";
    var img = new Image();
    img.addEventListener("load",imgLoadedHandler);
    img.id = "fronteira";
    img.src = "../resources/1front.png";

    var img = new Image();
    img.addEventListener("load",imgLoadedHandler);
    img.id = "apanha";
    img.src = "../resources/2obs.png";

    canvas.style.background = "url(../resources/dei.jpg";
    canvas.style["background-size"] = "cover";

    function imgLoadedHandler(ev){
    	var img = ev.target;
    	if (img.id == "jogador"){
    		player = new Character(70,70,20,20,4,0,img);
    	
    		total++;
    	}

    	if (img.id == "obstaculo"){
    		
    		total++;
    	}
        if (img.id == "fronteira"){
        	fronteira = new Border(20,20,img);
        	fronteiras[0] = fronteira;
        	total++;
        }
        
        if (img.id == "apanha"){
            obstaculos[0].img2 = img;
    
            total++;
        }
        if(total == 4){
        	var novoev = new Event("initend");
        	novoev.player = player;
        	novoev.fronteiras = fronteiras;
        	novoev.obstaculos = obstaculos;
        	board = new Board();
        	novoev.board = board;
            var temp = JSON.parse(sessionStorage.getItem("jogador"));

        	novoev.jogador = new Jogador();
            novoev.jogador.deaths = temp.deaths;
            novoev.jogador.levels = temp.levels;
            novoev.jogador.score = temp.score;
            novoev.jogador.tempdeaths = temp.tempdeaths;

        	ctx.canvas.dispatchEvent(novoev);
        }
    }



}



function initMess(ctx,cw,ch,board){
	var y = 0;
	var x = 0;
	var linhas = board.initMess.split("\n");
	var yf = Math.round(ch / (linhas.length + 1));
	y += yf;
	ctx.fillStyle ="#000000";
	ctx.fillRect(0,0,600,630);
	ctx.font = "50px cornerstone";
	ctx.fillStyle ="#a1a1a1";

	for(let i = 0; i < linhas.length; i++){
		x = (cw / 2) - Math.round(25*(linhas[i].length / 2));
		ctx.fillText(linhas[i],x,y);
		y += yf;
	}
}


