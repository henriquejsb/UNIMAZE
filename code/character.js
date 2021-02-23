"use strict";

class Objecto {

	constructor(){};


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}






	pixelColision(spiritImg, ctx)
	{
		var xi1 = Math.floor(Math.max(this.x, spiritImg.x));
		var xi2 = Math.floor(Math.min(this.x + this.width, spiritImg.x + spiritImg.width));
		var yi1 = Math.floor(Math.max(this.y, spiritImg.y));
		var yi2 = Math.floor(Math.min(this.y + this.height, spiritImg.y + spiritImg.height));
		
		for (var y = yi1; y <= yi2; y++) {
			for (var x = xi1; x <= xi2; x++) {
				var xcl = Math.round(x - this.x);
				var ycl = Math.round(y - this.y);

				var pix = ycl * this.width + xcl;
				var cel = this.imgData.data[pix * 4 + 3];

				var txc1 = Math.round(x - spiritImg.x);
				var tyc1 = Math.round(y - spiritImg.y);

				var pix2 = tyc1 * spiritImg.width + txc1;
				var cel2 = spiritImg.imgData.data[pix2 * 4 + 3]; 

				if(cel == 255 && cel2 == 255){
					return true;
				}
			}
		}
		return false;
	}

	colisionBoundingBox(spiritImg, ctx)
	{
		if ( this.x < spiritImg.x + spiritImg.width &&
			this.x + this.width > spiritImg.x &&
			this.y < spiritImg.y + spiritImg.height &&
			this.y + this.height > spiritImg.y){
			return this.pixelColision(spiritImg, ctx);
	}
	else{
		return false;
	}
}


colisionBoundingBox2(spiritImg, ctx)
{
	if ( this.x < spiritImg.x + spiritImg.width &&
		this.x + this.width > spiritImg.x &&
		this.y < spiritImg.y + spiritImg.height &&
		this.y + this.height > spiritImg.y){
		return true;
}
else{
	return false;
}
}

colisionBoarderBox(cw,ch)
{
	if(this.x<0){
		return true;
	}
	else if(this.x>cw - this.width){
		return true;
	}
	else if(this.y<0){
		return true;
	}
	else if(this.y > ch - this.height ){
		return true;
	}
	else{
		return false;
	}
}



	
}


class Jogador{
	constructor(){
		this.levels = 1;
		this.deaths = new Array(15);
		this.scoreind = new Array(15);
		this.score = 0;
		this.scoreact = 0;
		this.tempdeaths = 0;
		for(let i = 0; i < 15; i++){
			this.deaths[i] = 0;
			this.scoreind[i] = false;
		}
	}

	printd(){
		for(let i = 0; i < 15; i++){
			console.log(this.deaths[i]);
		}
	}


	updatedeaths(i){
		this.deaths[i] = this.tempdeaths;
	}

	updatescore(){
		var aux = 0;
		this.score = 0;
		this.scoreact = 0;
		for(let i = 0; i < this.levels; i++){
			if(this.scoreind[i] === true){
				aux = Math.max(20 - (this.deaths[i] * 0.3),0);
			}
			else{
				aux = Math.max(20 - (this.deaths[i] * 0.5),0);
			}
			this.score += aux;
			this.scoreact += aux;
		}
		this.score = Math.round((this.score / 15)*100) / 100;
		this.scoreact = Math.round((this.scoreact / this.levels)*100) / 100;
	}



}


class Character extends Objecto{

	constructor(x, y, w, h, speed, direcao, img)
	{
		super();
		
		this.xIni = x;  
		this.yIni = y;	
		this.speedIni = speed; 
		this.x = x;  
		this.y = y;	
		this.width = w;
		this.height = h;
		this.speed = speed; 	
		this.direcao = direcao;

		this.img = img;	
		this.imgData = null;
		this.right = false;
		this.left = false;
		this.top = false;
		this.bottom = false;
		
		var g_cv = document.createElement("canvas");
		g_cv.width = this.width;
		g_cv.height = this.height;
		var g_ctx = g_cv.getContext("2d");
		g_ctx.drawImage(this.img, 0, 0, this.width, this.height);
		this.imgData = g_ctx.getImageData(0, 0, this.width, this.height);
	}

}

class Obstacle extends Character {
	//argumentos- array x/ymax/min angulo raio
	constructor(x, y, w, h, speed, direcao, img, tipomov, argumentos)
	{
		super(x,y,w,h,speed,direcao,img);
		this.tipomov = tipomov;
		this.argumentos = argumentos;
		this.img2 = null;
	}	
	desenha(){

		switch(this.tipomov){
			case "Horizontal":
				var xmax = this.argumentos[0];
				var xmin  = this.argumentos[1];
                if(this.x >= xmax){
                    this.direcao = "Esquerda"
                }else if(this.x <= xmin){
                    this.direcao = "Direita";
                }
                switch(this.direcao){
                    case "Direita":
                        this.x += this.speed;
                        break;
                    case "Esquerda":
                        this.x -= this.speed;
                       break;
                }
                break;
			case "Vertical":
				var ymax = this.argumentos[0];
				var ymin = this.argumentos[1];
				if(this.y <= ymin){
					this.direcao = "Baixo";
				}
				if(this.y >= ymax){
					this.direcao = "Cima";
				}
				if(this.direcao == "Baixo"){
					this.y += this.speed;
				}
				if(this.direcao == "Cima"){
					this.y -= this.speed;
				}
				break;
			case "Circular":
				var angulo = this.argumentos[0];
				var raio = this.argumentos[1];
				var xcentro = this.argumentos[2];
				var ycentro = this.argumentos[3];
				
				
				switch(this.direcao){
					case "Ponteiros":
						this.speed += angulo;
						this.x = raio*Math.cos(this.speed)+xcentro;
						this.y = raio*Math.sin(this.speed)+ycentro;
						break;
					case "CPonteiros":
						this.speed -= angulo;
						this.x = raio*Math.cos(this.speed)+xcentro;
						this.y = raio*Math.sin(this.speed)+ycentro;
						break;
				}
				
				if(this.speed >=360){
					this.speed = 0;
				}
				break;
			case "Reset":
            	var max = this.argumentos[0];
            	var min = this.argumentos[1];
            	if (this.direcao == "Direita"){
	            	if(this.x >= max){
	            		this.x = this.xIni;
	            	}
	            	this.x += this.speed;
	            	break;
	            }
	            else if (this.direcao == "Esquerda"){
	            	if(this.x <= min){
            			this.x = this.xIni;
            		}
					this.x -= this.speed;
	               	break;
	            }
	            break;
		}
		

	}
}


class Border extends Objecto{
	constructor(w,h,img){
		super();
		this.x = 0;  //x no instante
		this.y = 0;	//y no instate
		this.width = w;
		this.height = h;
		this.img = img;
		this.checkpoint = false;
		
		var g_cv = document.createElement("canvas");
		g_cv.width = this.width;
		g_cv.height = this.height;
		var g_ctx = g_cv.getContext("2d");
		g_ctx.drawImage(this.img, 0, 0, this.width, this.height);
		this.imgData = g_ctx.getImageData(0, 0, this.width, this.height);		
	}
}



class Board  {
	constructor(){
		this.xinit = 0;
		this.yinit = 0;
		this.xfim = 0;
		this.yfim = 0;
		this.xfimmax = 0;
		this.yfimmax = 0;

		this.nivel = 0;
		this.mapaAct = null;

		this.win = false;

		this.question = "1234";
		this.answer = "1";
		this.cadeira = null;
		this.initMess = null;

		this.toCatch = 0;
		this.catch = 0;

	}

	
	

	initLevel(cw,ch,fronteiras){
		var mapa = this.mapaAct;
		var hfrac = (ch - 30) / mapa.length;
		var wfrac = cw / mapa[0].length;
		var k = 1;
		for (let i = 0; i < mapa.length; i++) {
			for (let j = 0; j < mapa[0].length; j++) {
				if (mapa[i][j] === "i"){
					this.xinit = j * wfrac;
					this.yinit = i * hfrac + 30;
				}
				else if (mapa[i][j] === "x") {
					let fronteira = new Border( wfrac, hfrac, fronteiras[0].img);
					fronteira.x = j * wfrac;
					fronteira.y = i * hfrac + 30;
					fronteiras[k] = fronteira;
					k++;
				}
				else if (mapa[i][j] === "b") {
					let fronteira = new Border( wfrac, hfrac, fronteiras[0].img);
					fronteira.checkpoint = true;
					fronteira.x = j * wfrac;
					fronteira.y = i * hfrac + 30;
					fronteiras[k] = fronteira;
					k++;
				}
				else if (mapa[i][j] === "f"){
					let xtemp = j * wfrac;
					let ytemp = i * hfrac + 30;
					if(this.xfim === 0 && this.yfim === 0){
						this.xfim = xtemp;
						this.xfimmax = xtemp;
						this.yfim = ytemp;
						this.yfimmax = ytemp;
					}
					if(xtemp < this.xfim)
						this.xfim = xtemp;
					if(xtemp + wfrac > this.xfimmax)
						this.xfimmax = xtemp + wfrac;
					if(ytemp < this.yfim)
						this.yfim = ytemp;
					if(ytemp + hfrac > this.yfimmax);
					this.yfimmax = ytemp + hfrac;


				}
			}
		}
	}








	drawLevel(ctx,cw,ch,obstaculos,fronteiras){
    var level = this.mapaAct;
    var hfrac = (ch - 30) / level.length;
    var wfrac = cw / level[0].length;
    for (let i = 0; i < level.length; i++) {
    	for (let j = 0; j < level[0].length; j++) {

    		if (level[i][j] === "i"){
    			
    			ctx.fillStyle = "#0f2f00";
    			ctx.fillRect(j * wfrac , 30+  i * hfrac, wfrac, hfrac);
    		}
    		else if (level[i][j] === "f" || level[i][j] === "m"){
    			ctx.fillStyle = "#ff0f00";
    			ctx.fillRect(j * wfrac , 30+  i * hfrac, wfrac, hfrac);
    		}
    		else if (level[i][j] === "b"){
    			ctx.fillStyle = "#ffff00";
    			ctx.fillRect(j * wfrac , 30+  i * hfrac, wfrac, hfrac);
    		}
    	}
    	for (let i = 1; i < fronteiras.length ; i++){
    		if(fronteiras[i] != undefined && fronteiras[i] != null){
    			if(fronteiras[i].checkpoint === false)
    			fronteiras[i].draw(ctx);
    		}
    	}
    	for (let i = 1; i < obstaculos.length ; i++){
        if(obstaculos[i] != undefined && obstaculos[i] != null){
            obstaculos[i].draw(ctx);
        	}
        }
    }

}

hasWon(cw, ch, player){
	var level = this.mapaAct;
	var hfrac = (ch - 30) / level.length;
	var wfrac = cw / level[0].length;
	if(this.xfim < player.x + player.width &&
		this.xfimmax > player.x &&
		this.yfim < player.y + player.height &&
		this.yfimmax > player.y && this.toCatch === this.catch){
		;
		this.win = true;
}
}


level2(ctx,cw,ch,obstaculos,fronteiras){
	this.nivel = 2;
	this.cadeira ="ami";
	this.initMess = "ami";
	var mapa = [
	["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
	["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "i", "i", "x"],
	["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "i", "i", "x"],
	["x", "x", "x", "x", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
	["b", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "o"],
	["o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o"], 
	["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o"],
	["o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "x", "x", "o", "o", "o", "o", "o"],
	["o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o"],
	["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o"],
	["o", "o", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","x", "o", "o", "o", "o"], 
	["o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o"], 
	["o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "x", "x", "o", "o", "o", "o", "o"], 
	["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o"], 
	["o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o"], 
	["b", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
	["x", "x", "x", "x", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"], 
	["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "f", "x"],
	["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "f", "x"], 
	["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];
	this.mapaAct = mapa;
	var img1 = obstaculos[0].img; 
	var img2 = obstaculos[0].img2;
	var i=0;
	 i= this.drawCircle(obstaculos,90,[105,325],4,0.02,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,75,[105,325],4,0.02,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,60,[105,325],4,0.02,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,35,[105,325],4,0.02,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[105,325],2,0.04,img1,"CPonteiros",10,5,i,0);
	
	 var obs1 = new Obstacle(360,91,5,5,5.5,"Direita", img1,"Horizontal",[360,270]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,97,5,5,5.5,"Direita", img1,"Horizontal",[360,270]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,103,5,5,5.5,"Direita", img1,"Horizontal",[360,270]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,109,5,5,5.5,"Direita", img1,"Horizontal",[360,270]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,115,5,5,5.5,"Direita", img1,"Horizontal",[360,270]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,60,5,5,5.5,"Direita", img1,"Horizontal",[450,360]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,66,5,5,5.5,"Direita", img1,"Horizontal",[450,360]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,72,5,5,5.5,"Direita", img1,"Horizontal",[450,360]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,78,5,5,5.5,"Direita", img1,"Horizontal",[450,360]);
	obstaculos[i]=obs1; 
	i++;
	obs1 = new Obstacle(360,84,5,5,5.5,"Direita", img1,"Horizontal",[450,360]);
	obstaculos[i]=obs1; 
	i++;
	
	

	//i= this.drawCircle(obstaculos,30,[235,200],1,0.02,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,30,[240,200],1,0.04,img1,"CPonteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[240,200],1,0.04,img1,"CPonteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,10,[240,200],1,0.04,img1,"CPonteiros",10,5,i,0);
	 //i= this.drawCircle(obstaculos,0,[240,200],1,0.04,img1,"Ponteiros",10,5,i,0);
	 
	 //terceiro
	 i= this.drawCircle(obstaculos,60,[340,320],1.5,0.045,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,40,[340,320],1.5,0.045,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[340,320],1.5,0.045,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,0,[340,320],1.5,0.045,img1,"Ponteiros",10,5,i,0);

	 	 //quarto
	 i= this.drawCircle(obstaculos,30,[240,450],1,0.04,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[240,450],1,0.04,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,10,[240,450],1,0.04,img1,"Ponteiros",10,5,i,0);
	 
	 i= this.drawCircle(obstaculos,20,[300,570],1,0.04,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[390,570],1,0.04,img1,"Ponteiros",10,5,i,0);
	 i= this.drawCircle(obstaculos,20,[480,570],1,0.04,img1,"Ponteiros",10,5,i,0);
	 //quinto
	 var apanha1 = new Obstacle(5,155,20,20,0,null,img2,"Apanha",null);
	 this.toCatch++;
	 obstaculos[i] = apanha1;
	 i++;
	 var apanha2 = new Obstacle(5,485,20,20,0,null,img2,"Apanha",null);
	 this.toCatch++;
	 obstaculos[i] = apanha2;

	 this.initLevel(cw,ch,fronteiras);

}



level1(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 1;
		this.initMess = "ED";
		this.cadeira = "ED";
		var mapa = [
            ["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "o", "o", "b", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["f", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["f", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];
        
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var img2 = obstaculos[0].img2;
		var obs1 = new Obstacle(100,80,20,20,8,"Baixo",img1,"Vertical",[530,100]);
		var obs2 = new Obstacle(150,480,20,20,8,"Cima",img1,"Vertical",[530,100]);
		var obs3 = new Obstacle(200,80,20,20,8,"Baixo",img1,"Vertical",[530,100]);
		var obs4 = new Obstacle(250,480,20,20,8,"Cima",img1,"Vertical",[530,100]);
		var obs5 = new Obstacle(300,80,20,20,8,"Baixo",img1,"Vertical",[530,100]);
		var obs6 = new Obstacle(350,480,20,20,8,"Cima",img1,"Vertical",[530,100]);
		var obs7 = new Obstacle(400,80,20,20,8,"Baixo",img1,"Vertical",[530,100]);
		var obs8 = new Obstacle(450,480,20,20,8,"Cima",img1,"Vertical",[530,100]);
		var apanha1 = new Obstacle(545,315,20,20,0,null,img2,"Apanha",null);
		obstaculos[1]=obs1;
		obstaculos[2]=obs2;
		obstaculos[3]=obs3;
		obstaculos[4]=obs4;
		obstaculos[5]=obs5;
		obstaculos[6]=obs6;
		obstaculos[7]=obs7;
		obstaculos[8]=obs8;
		obstaculos[9]=apanha1;
		this.toCatch++;
		this.initLevel(cw,ch,fronteiras);
	}

	level9(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 9;
		this.initMess = "MULT";
		this.cadeira = "MULT";
		var mapa = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "i", "i", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "f", "f", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"], 
            ["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "b", "b", "b", "x", "x", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];
        
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var img2 = obstaculos[0].img2;
		var obs1 = new Obstacle(50,130,20,20,10,"Direito",img1,"Horizontal",[530,50]);
		var obs2 = new Obstacle(50,210,20,20,10,"Direito",img1,"Horizontal",[530,50]);
		var obs3 = new Obstacle(50,290,20,20,10,"Direito",img1,"Horizontal",[530,50]);
		var obs4 = new Obstacle(50,370,20,20,10,"Direito",img1,"Horizontal",[530,50]);
		var obs5 = new Obstacle(50,450,20,20,10,"Direito",img1,"Horizontal",[530,50]);
		var obs6 = new Obstacle(70,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs7 = new Obstacle(130,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs8 = new Obstacle(190,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs9 = new Obstacle(250,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs10 = new Obstacle(310,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs11 = new Obstacle(370,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs12 = new Obstacle(430,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs13 = new Obstacle(490,90,20,20,10,"Cima",img1,"Vertical",[530,90]);
		var obs14 = new Obstacle(50,530,22,22,10,"Direito",img1,"Horizontal",[530,50]);
		var apanha1 = new Obstacle(275,575,20,20,0,null,img2,"Apanha",null);
		obstaculos[1]=obs1;
		obstaculos[2]=obs2;
		obstaculos[3]=obs3;
		obstaculos[4]=obs4;
		obstaculos[5]=obs5;
		obstaculos[6]=obs6;
		obstaculos[7]=obs7;
		obstaculos[8]=obs8;
		obstaculos[9]=obs9;
		obstaculos[10]=obs10;
		obstaculos[11]=obs11;
		obstaculos[12]=obs12;
		obstaculos[13]=obs13;
		obstaculos[14]=obs14;
		obstaculos[15]=apanha1;
		this.toCatch++;
		
		this.initLevel(cw,ch,fronteiras);
	}


	level6(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 6;
		this.cadeira = "TI";
		this.initMess = "TI";
		var mapa = [
            ["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
           	["i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];  
       	
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var i =1;
		var aux=75;
		    for(let j=0; j<15; j++){
		    	if(j%2 ===0){
		    		var obs1 = new Obstacle(300,aux,20,20,4,"Direita",img1,"Horizontal",[570,30]);
		    	}
		    	else{
		    		var obs1 = new Obstacle(300,aux,20,20,4,"Esquerda",img1,"Horizontal",[570,30]);
		    	}
		    	obstaculos[i]=obs1;
		    	i++;
		    	aux+=35;
		    }
	
			    var aux1= 50;
		for(let j=0; j<5; j++){
		  	if(j%2 ===0){
		  		var obs1 = new Obstacle(aux1,300,20,20,3,"Baixo",img1,"Vertical",[570,60]);
		    	}
		  	else{
		   		var obs1 = new Obstacle(aux1,300,20,20,3,"Cima",img1,"Vertical",[570,60]);
		   	}
		   	obstaculos[i]=obs1;
		   	i++;
		   	aux1+=115;
		   }
		   this.initLevel(cw,ch,fronteiras);
		}


	level12(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 12;
		this.cadeira = "ES";
		this.initMess = "ES";
		var mapa = [
            ["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "i", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "i", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "o"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o",  "o", "o", "o", "o", "o","o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
       	
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		    var i= this.drawCircle(obstaculos,75,[110,160],3,0.027,img1,"Ponteiros",10,10,1);
		    i= this.drawCircle(obstaculos,50,[110,160],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,25,[110,160],3,0.027,img1,"Ponteiros",10,10,i);
		    i = this.drawCircle(obstaculos,75,[110,320],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,50,[110,320],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,25,[110,320],3,0.027,img1,"Ponteiros",10,10,i);
		    i = this.drawCircle(obstaculos,75,[110,480],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,50,[110,480],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,25,[110,480],3,0.027,img1,"Ponteiros",10,10,i);
		    i= this.drawCircle(obstaculos,23,[240,85],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[320,85],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[400,85],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[480,85],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[240,565],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[320,565],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[400,565],1,0.035,img1,"Ponteiros",10,5,i);
		    i= this.drawCircle(obstaculos,23,[480,565],1,0.035,img1,"Ponteiros",10,5,i);
		  
		    this.initLevel(cw,ch,fronteiras);
		  }


	

	level3(ctx,cw,ch,obstaculos,fronteiras){
		//TI
			this.nivel = 3;
			this.cadeira = "IPRP";
			this.initMess = "IPRP";
			var mapa = [
	            ["x", "x", "x", "x","x", "x", "x", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
	            ["x", "i", "x", "o", "x", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "f"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "f"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x", "x", "x", "o","x", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o" , "x", "o", "o", "o", "o", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "o", "x", "o", "o", "o", "o", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "x", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "x", "x", "x", "x",  "x", "o", "x", "o", "o","o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "o", "x", "x", "o", "x"], 
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
	            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
	            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
	       	
			this.mapaAct = mapa;
			var img1 = obstaculos[0].img;
			var i = 1;
			i= this.drawCircle(obstaculos,65,[95,170],5,0.03,img1,"Ponteiros",10,10,i,Math.PI/5);
			i= this.drawCircle(obstaculos,65,[95,360],5,0.03,img1,"Ponteiros",10,10,i,Math.PI/5);
			var obs1 = new Obstacle(200,360,15,15,9,"Baixo", img1,"Vertical",[575,360]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(230,575,15,15,9,"Cima", img1,"Vertical",[575,360]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(270,360,15,15,9,"Baixo", img1,"Vertical",[575,360]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(310,575,15,15,9,"Cima", img1,"Vertical",[575,360]);
		    obstaculos[i]=obs1; 
		    i++;
		   
		    var obs1 =  new Obstacle(390,450,15,15,3,"Direito",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(375,435,15,15,3,"Direito",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(360,420,15,15,3,"Direito",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(345,405,15,15,3,"Direito",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(500,225,15,15,3,"Esquerda",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(485,210,15,15,3,"Esquerda",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(470,195,15,15,3,"Esquerda",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(455,180,15,15,3,"Esquerda",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(500,315,15,15,3,"Esquerda",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(390,345,15,15,3,"Direita",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(390,285,15,15,3,"Direita",img1,"Horizontal",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(335,210,15,15,3,"",img1,"",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    var obs1 =  new Obstacle(545,210,15,15,3,"",img1,"",[500,390]);
		    obstaculos[i]= obs1;
		    i++;
		    this.initLevel(cw,ch,fronteiras);

		}
	level8(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 8;
		this.cadeira = "POO";
		this.initMess = "POO";
		var mapa = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
           	["i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "x"],
            ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x"],
            ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x"],
            ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "x", "o", "o", "x"], 
            ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
       	
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var i= this.drawCircle(obstaculos,50,[130,170],3,0.03,img1,"Ponteiros",10,10,1);
		i= this.drawCircle(obstaculos,30,[130,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[130,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,50,[260,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,30,[260,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[260,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,50,[390,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,30,[390,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[390,170],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,50,[130,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,30,[130,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[130,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,50,[260,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,30,[260,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[260,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,50,[390,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,30,[390,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[390,475],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[200,300],2,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[300,300],3,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,0,[400,300],4,0.03,img1,"Ponteiros",10,10,i);
		i= this.drawCircle(obstaculos,23,[540,327],1,0.05,img1,"Ponteiros",10,10,i);
		this.initLevel(cw,ch,fronteiras);
	}
	level5(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 5;
		this.cadeira = "PPP";
		this.initMess = "PPP";
		var mapa = [
            ["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
           	["x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "x", "x"],
            ["x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "x", "o", "x"],
            ["i", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "x", "o", "o", "b"],
            ["x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "x", "o", "o", "o", "x"],
            ["x", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "x"], 
            ["x", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "x"],
            ["x", "o", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "o", "o", "x", "o", "o", "x"],
            ["x", "o", "o", "o", "x", "o", "o", "o", "x", "x", "x", "x", "o", "o", "o", "x", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o",  "o", "o", "o", "x", "o","o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["b", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];  
        
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var img2 = obstaculos[0].img2;
		var i = 1;
		//Lado baixo esquerdo
		var obs1 = new Obstacle(60,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(90,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(120,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(150,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(180,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(210,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		//Lado baixo Direito
		var obs1 = new Obstacle(370,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(400,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(430,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(460,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(490,500,15,15,4,"Cima", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(520,500,15,15,4,"Baixo", img1,"Vertical",[575,430]);
		obstaculos[i]=obs1; 
		i++;
		//lado esquerdo cima
		var obs1 = new Obstacle(70,145,10,10,3,"Baixo", img1,"Vertical",[195,120]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(130,205,10,10,3,"Baixo", img1,"Vertical",[255,180]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(190,265,10,10,3,"Baixo", img1,"Vertical",[315,240]);
		obstaculos[i]=obs1; 
		i++;
		//lado direito cima
		var obs1 = new Obstacle(520,145,10,10,3,"Baixo", img1,"Vertical",[195,120]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(460,205,10,10,3,"Baixo", img1,"Vertical",[255,180]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(400,265,10,10,3,"Baixo", img1,"Vertical",[315,240]);
		obstaculos[i]=obs1; 
		i++;
		//Horizontal
		
		var obs1 = new Obstacle(60,190,10,10,3,"Direito", img1,"Horizontal",[140,60]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(120,250,10,10,3,"Direito", img1,"Horizontal",[200,120]);
		obstaculos[i]=obs1; 
		i++;

		var obs1 = new Obstacle(450,190,10,10,3,"Direito", img1,"Horizontal",[530,450]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(395,250,10,10,3,"Direito", img1,"Horizontal",[470,395]);
		obstaculos[i]=obs1; 
		i++;
		//Circulo centro
		i= this.drawCircle(obstaculos,50,[295,370],3,0.035,img1,"Ponteiros",15,15,i);
		//i= this.drawCircle(obstaculos,50,[295,500],3,0.02,img1,"Ponteiros",15,15,i);
		var apanha1 = new Obstacle(5,545,20,20,0,null,img2,"Apanha",null);
	    this.toCatch++;
	    obstaculos[i] = apanha1;
	    i++;
	    var apanha2 = new Obstacle(575,125,20,20,0,null,img2,"Apanha",null);
	 	this.toCatch++;
	 	obstaculos[i] = apanha2;

		this.initLevel(cw,ch,fronteiras);
	}

	
	level13(ctx,cw,ch,obstaculos,fronteiras){
		this.cadeira = "SD";
		this.initMess = "SD";
		this.nivel = 13;
		var mapa = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "", "o", "o", "o", "o", "o", "o", "x"],
           	["x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x"],
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o" , "o", "x", "o", "o", "o", "o", "o", "x"],
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "x"],
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x", "o", "o", "x", "o", "o", "x"],
            ["o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "x", "o", "x"],
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "x", "x"],
            ["o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "x", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x", "o", "o", "x", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"], 
            ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"], 
            ["o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
        this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var img2 = obstaculos[0].img2;
		var i = 1;
		i= this.drawCircle(obstaculos,70,[205,130],3,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,50,[205,130],3,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,30,[205,130],3,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,10,[205,130],6,0.1,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,0,[205,130],6,0.03,img1,"CPonteiros",10,10,i,0);
		//circulo baixo
		i= this.drawCircle(obstaculos,70,[205,480],4,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,50,[205,480],4,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,30,[205,480],4,0.02,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,10,[205,480],5,0.1,img1,"CPonteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,0,[205,480],5,0.3,img1,"CPonteiros",10,10,i,0);
		
		var obs1 = new Obstacle(300,240,15,15,4,"Cima", img1,"Vertical",[245,180]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(335,210,15,15,1,"Baixo", img1,"Vertical",[245,210]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(300,360,15,15,4,"Baixo", img1,"Vertical",[425,360]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(335,420,15,15,1,"Cima", img1,"Vertical",[395,360]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(450,305,15,15,2,"Direito", img1,"Horizontal",[535,450]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(535,315,15,15,2,"Esquerda", img1,"Horizontal",[535,450]);
		obstaculos[i]=obs1; 
		i++;

		var x1 = 365;
		var y1 = 580;
		for( let k = 0; k<11; k++){
			var obs1 = new Obstacle(x1,y1,15,15,2,"", img1,"",[535,450]);
			obstaculos[i]=obs1; 
			i++;
			x1+=15;
			y1-=5;
		}
		var obs1 = new Obstacle(430,435,15,15,2,"Baixo", img1,"Vertical",[535,445]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(460,425,15,15,3,"Baixo", img1,"Vertical",[545,425]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(490,405,15,15,4,"Baixo", img1,"Vertical",[535,405]);
		obstaculos[i]=obs1; 
		i++;
		var apanha1 = new Obstacle(365,245,20,20,0,null,img2,"Apanha",null);
		this.toCatch++;
		obstaculos[i]=apanha1;
		i++;
		var apanha2 = new Obstacle(365,365,20,20,0,null,img2,"Apanha",null);
		this.toCatch++;
		obstaculos[i]=apanha2;


	
        this.initLevel(cw,ch,fronteiras);
    }
    level15(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 15;
		this.cadeira = "COMP";
		this.initMess = "COMPILADORES";
		var mapa = [
            ["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
           	["f", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["i", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["i", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "x", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "x", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "x", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x"],
            ["x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x"],
            ["x", "o", "x", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "o", "x", "o", "x"], 
            ["x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x"], 
            ["x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "m"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "m"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "m"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "x", "x", "x", "x", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];  
       
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var i =1;
		var obs1 = new Obstacle(105,270,22,22,6,"Cima", img1,"Vertical",[375,150]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(145,270,22,22,6,"Baixo", img1,"Vertical",[375,150]);
		obstaculos[i]=obs1; 
		i++;
		//obs1 = new Obstacle(90,220,20,20,3,"Direito", img1,"Horizontal",[165,90]);
		//obstaculos[i]=obs1; 
		//i++;
		obs1 = new Obstacle(90,315,22,22,6,"Direito", img1,"Horizontal",[495,90]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(510,355,22,22,6,"Esquerda", img1,"Horizontal",[495,90]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(475,271,22,22,6,"Baixo", img1,"Vertical",[495,305]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(435,511,22,22,6,"Cima", img1,"Vertical",[495,305]);
		obstaculos[i]=obs1; 
		i++;
				
        this.initLevel(cw,ch,fronteiras);
     }
     level10(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 10;
		this.cadeira = "ATD";
		this.initMess = "ATD";
		var mapa = [
            ["o", "o", "o", "o","o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o"],
           	["o", "o", "o", "o", "o", "o", "x", "i", "i", "i", "i", "i" , "i", "x", "o", "o", "o", "o", "o", "o"],
       		["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o"], 
            ["x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"],
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"],
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"],
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o",  "o", "o", "o", "o", "o","o", "o", "o", "b", "x"], 
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"], 
            ["x", "f", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "b", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x"], 
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"], 
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"], 
            ["o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o" , "o", "x", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "x", "b", "b", "b", "b", "b", "b", "x", "o", "o", "o", "o", "o", "o"], 
            ["o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o"]];  
       	
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var i = 1;
		var obs1 = new Obstacle(375,240,15,15,6,"", img1,"",[495,305]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(210,240,15,15,6,"", img1,"",[495,305]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(375,410,15,15,6,"", img1,"",[495,305]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(210,410,15,15,6,"", img1,"",[495,305]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(460,405,15,15,4,"Cima", img1,"Vertical",[405,240]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(490,240,15,15,4,"Baixo", img1,"Vertical",[405,240]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(90,405,15,15,4,"Cima", img1,"Vertical",[405,240]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(120,240,15,15,4,"Baixo", img1,"Vertical",[405,240]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(210,510,15,15,4,"Direito", img1,"Horizontal",[390,210]);
		obstaculos[i]=obs1; 
		i++;
		var obs1 = new Obstacle(390,480,15,15,4,"Esquerda", img1,"Horizontal",[390,210]);
		obstaculos[i]=obs1; 
		i++;
		i= this.drawCircle(obstaculos,110,[290,320],4,0.02,img1,"Ponteiros",20,20,i,0);
		i= this.drawCircle(obstaculos,70,[290,320],4,0.02,img1,"Ponteiros",20,20,i,0);
		i= this.drawCircle(obstaculos,35,[290,320],4,0.02,img1,"Ponteiros",20,20,i,0);
		i= this.drawCircle(obstaculos,0,[290,320],0,0.02,img1,"Ponteiros",20,20,i,0);
		this.initLevel(cw,ch,fronteiras);
	}


level7(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 7;
		this.cadeira = "SO";
		this.initMess = "SO";
		var mapa = [
			["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
			["x", "x", "x", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x"],
			["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x"],
			["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "o", "o","x", "b",  "x"],
			["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "o", "x"], 
			["x", "b", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x"],
			["x", "x", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "o", "x", "o", "x"],
			["o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x", "o", "x"],
			["o", "o", "x", "o", "x", "o", "x", "x", "x", "x", "x", "x", "o", "x", "o", "x", "o", "x", "o", "x"],
			["o", "o", "x", "o", "x", "o", "x", "f", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "o", "x", "f", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "o", "x", "f", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "b", "o", "o", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x"], 
			["o", "o", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x"],
			["o", "o", "x", "b", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];
			
		    this.mapaAct = mapa;
		    var img1 = obstaculos[0].img;
		    var i=1;
		    i= this.drawCircle(obstaculos,100,[272.5,350],2.5,0.03,img1,"Ponteiros",20,20,i,0);
		    i= this.drawCircle(obstaculos,170,[272.5,350],2.5,0.03,img1,"Ponteiros",20,20,i,0);
		    i= this.drawCircle(obstaculos,240,[272.5,350],2.5,0.03,img1,"Ponteiros",20,20,i,0);
		    i= this.drawCircle(obstaculos,310,[272.5,350],2.5,0.03,img1,"Ponteiros",20,20,i,0);
		    i= this.drawCircle(obstaculos,380,[272.5,350],2.5,0.03,img1,"Ponteiros",20,20,i,0);

		  this.initLevel(cw,ch,fronteiras);}

	level11(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 11;
		this.initMess = "IA";
		this.cadeira = "IA";
		var mapa = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "f", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
      
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var obs1 = new Obstacle(160,130,20,20,6,"Direita",img1,"Reset",[430,160]);
		var obs2 = new Obstacle(160,180,20,20,10,"Direita",img1,"Reset",[430,160]);
		var obs3 = new Obstacle(160,230,20,20,4,"Direita",img1,"Reset",[430,160]);
		var obs4 = new Obstacle(430,280,20,20,6,"Esquerda",img1,"Reset",[430,160]);
		var obs5 = new Obstacle(430,330,20,20,10,"Esquerda",img1,"Reset",[430,160]);
		var obs6 = new Obstacle(430,380,20,20,4,"Esquerda",img1,"Reset",[430,160]);
		obstaculos[1]=obs1;
		obstaculos[2]=obs2;
		obstaculos[3]=obs3;
		obstaculos[4]=obs4;
		obstaculos[5]=obs5;
		obstaculos[6]=obs6;

		var i = 7;
		i= this.drawCircle(obstaculos,55,[220,480],2,0.08,img1,"Ponteiros",20,20,i,0);
		i= this.drawCircle(obstaculos,55,[365,480],2,0.08,img1,"Ponteiros",20,20,i,0);

		this.initLevel(cw,ch,fronteiras);
	}


level4(ctx,cw,ch,obstaculos,fronteiras){
		this.nivel = 4;
		this.cadeira = "AC";
		this.initMess = "AC";
		var mapa = [
			["x", "x", "x", "x","x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "x", "x", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "x", "x", "x"],
			["o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "o", "o", "o"],
			["o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o" , "o", "o", "x", "o", "x", "o", "o", "o"],
			["x", "x", "x", "x", "o", "x", "x", "x", "x", "o", "o", "x", "x", "x", "x", "o", "x", "x", "x", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"],
			["x", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "x"], 
			["x", "x", "x", "x", "b", "x", "x", "x", "x", "o", "o", "x", "x", "f", "x", "x", "x", "i", "x", "x"]];
			
		    this.mapaAct = mapa;
		    var img1 = obstaculos[0].img;
		    var img2 = obstaculos[0].img2;
		    var i= this.drawCircle(obstaculos,80,[455,450],4,0.03,img1,"Ponteiros",20,20,1);

		    var obs1 = new Obstacle(450,310,20,20,2.5,"Direita", img1,"Horizontal",[525,375]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(450,280,20,20,2.5,"Esquerda", img1,"Horizontal",[525,375]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(450,250,20,20,2.5,"Direita", img1,"Horizontal",[525,375]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(450,220,20,20,2.5,"Esquerda", img1,"Horizontal",[525,375]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(40,60,7,7,3.5,"Direita", img1,"Horizontal",[560,40]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(120,80,7,7,3.5,"Direita", img1,"Horizontal",[560,40]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(200,60,7,7,3.5,"Direita", img1,"Horizontal",[560,40]);
		    obstaculos[i]=obs1; 
		    i++;
		    var obs1 = new Obstacle(280,80,7,7,3.5,"Direita", img1,"Horizontal",[560,40]);
		    obstaculos[i]=obs1; 
		    i++;
		    //i=this.drawCircle(obstaculos,35,[80,260],3,0.02,img1,"Ponteiros",10,10,i);
		   //i=this.drawCircle(obstaculos,35,[180,260],3,0.02,img1,"CPonteiros",10,10,i);

		    var aux=240;
		    var aux1= 70;
		    for(let j=0; j<11; j++){
		    	if(j%2 ===0){
		    		var obs1 = new Obstacle(127,aux,20,20,7.5,"Direita",img1,"Horizontal",[215,40]);
		    	}
		    	else{
		    		var obs1 = new Obstacle(127,aux,20,20,7.5,"Esquerda",img1,"Horizontal",[215,40]);
		    	}
		    	obstaculos[i]=obs1;
		    	i++;
		    	aux+=30;
		    }
		    var apanha1 = new Obstacle(125,605,20,20,0,null,img2,"Apanha",null);
		    obstaculos[i] = apanha1;
		    this.toCatch++;
		  

			this.initLevel(cw,ch,fronteiras);
		    }

level14(ctx,cw,ch,obstaculos,fronteiras){
		this.cadeira = "LPA";
		this.initMess = "LPA";
		this.nivel = 14;
		var mapa = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "o", "o", "o", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "x", "o", "x", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
           	["x", "o", "o", "x", "o", "o", "x", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "x", "o", "o", "x", "o", "x", "o", "o", "o" , "o", "o", "o", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "x", "i", "i", "x", "m", "x", "o", "o", "x", "x", "x", "x", "x", "x", "x", "o", "x"], 
            ["x", "o", "o", "x", "x", "x", "x", "x", "x", "o", "o", "x", "o", "o", "o", "o", "o", "x", "f", "x"],
            ["x", "o", "o", "x", "x", "o", "x", "o", "x", "o", "o", "x", "x", "o", "o", "o", "o", "x", "x", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "x", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "o", "o", "o", "o", "x"],
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "o", "o", "x", "o", "x"], 
            ["x", "o", "o", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "o", "x", "o", "o", "x", "o", "x"], 
            ["x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "x", "x", "x", "x"], 
            ["x", "o", "o", "x", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "o", "", "o", "o", "x"], 
            ["x", "o", "o", "x", "x", "x", "x", "x", "o", "o", "x", "o", "x", "o", "x", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "o", "o", "x", "o", "x", "o", "x", "o", "o", "o", "o", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "m", "m", "x", "o", "x", "o", "x", "o", "x", "x", "x", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "o", "x", "o", "x", "o", "o", "o", "m", "x"], 
            ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "o", "o", "o", "m", "x"], 
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]]; 
       	
		this.mapaAct = mapa;
		var img1 = obstaculos[0].img;
		var i = 1;
		i= this.drawCircle(obstaculos,20,[50,120],0,0.1,img1,"Ponteiros",15,15,i,0);
		var obs1 = new Obstacle(30,190,10,10,2,"Direito", img1,"Horizontal",[75,30]);
		obstaculos[i]=obs1; 
		i++;
		i= this.drawCircle(obstaculos,20,[50,250],0,0.1,img1,"Ponteiros",15,15,i,0);
		//Mov circular meio
		i= this.drawCircle(obstaculos,30,[130,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,15,[130,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,0,[130,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,30,[210,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,15,[210,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,0,[210,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,30,[290,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,15,[290,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		i= this.drawCircle(obstaculos,0,[290,310],2,0.03,img1,"Ponteiros",10,10,i,0);
		obs1 = new Obstacle(270,210,10,10,3,"Direito", img1,"Horizontal",[315,270]);
		obstaculos[i]=obs1; 
		i++;
		//superior direito
		obs1 = new Obstacle(360,170,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(380,165,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(480,170,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(500,165,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(420,170,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(440,165,10,10,2,"Cima", img1,"Vertical",[170,120]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(205,85,5,5,6,"Direito", img1,"Horizontal",[550,210]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(200,75,5,5,6,"Direito", img1,"Horizontal",[550,210]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(195,65,5,5,6,"Direito", img1,"Horizontal",[550,210]);
		obstaculos[i]=obs1; 
		i++;
	
		i= this.drawCircle(obstaculos,20,[50,410],0,0.1,img1,"Ponteiros",15,15,i,0);
		i= this.drawCircle(obstaculos,50,[140,530],6,0.05,img1,"CPonteiros",10,10,i,Math.PI/6);
		i= this.drawCircle(obstaculos,20,[330,415],2,0.07,img1,"Ponteiros",5,5,i,Math.PI/2);
		i= this.drawCircle(obstaculos,20,[450,240],2,0.07,img1,"Ponteiros",5,5,i,Math.PI/2);
		obs1 = new Obstacle(450,345,5,5,6,"Direito", img1,"Horizontal",[510,450]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(450,355,5,5,6,"Direito", img1,"Horizontal",[510,450]);
		obstaculos[i]=obs1; 
		i++;
		obs1 = new Obstacle(450,365,5,5,6,"Direito", img1,"Horizontal",[510,450]);
		obstaculos[i]=obs1; 
		i++;
		i= this.drawCircle(obstaculos,30,[510,460],5,0.03,img1,"CPonteiros",10,10,i,Math.PI/5);
		this.initLevel(cw,ch,fronteiras);

	}







	drawCircle(obstaculos,raio,arrayCentro,variacao,speed,img1,direcao,w,h,ind,ang){
		var angulo = 0;
		while(angulo <=2*Math.PI){
		   if((ang!==0 & ang === angulo)){
		    	angulo +=Math.PI/variacao;
		    continue;
		    }
		    var y1 = (raio*Math.sin(angulo)+350);
		   	var x1 = (raio*Math.cos(angulo)+350);
		   	var obs1 = new Obstacle(x1,y1,w,h,angulo,direcao,img1,"Circular",[speed,raio,arrayCentro[0],arrayCentro[1]]);
		   	obstaculos[ind]=obs1;
		   	angulo +=Math.PI/variacao;
		   	ind++;
		}
		return ind;
	}






}