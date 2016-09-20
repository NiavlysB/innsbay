var cM, cO;
var running;
var n;
var w, h;
var d;
var now, then;
var keysDown = {};
var px;
var imgBg, imgSp;
var posBg;
var chute = 0.22;
var xDir = 0;
var sp;
var enemies;

function Spz()
{
	this.v = 0.42;
	this.vX = 0;
	this.vY = 0;
	this.vMax = 0.80;
	this.x = 0;
	this.y = 0;
	this.accel = 0.075;
	this.decel = 0.065;
	this.moving = false;
}

function init()
{
	cM = $("#canvasMain")[0].getContext("2d");
	cO = $("#canvasOverlay")[0].getContext("2d");
	cO.globalAlpha = 0.3;
	cB = $("#canvasBg")[0].getContext("2d");
	
	w = $("#canvasMain")[0].width;
	h = $("#canvasMain")[0].height;
	
	sp = new Spz();
	sp.x = 400;
	sp.y = h/2;
	
	
	n = 0;
	px = 5; // taille de pixel
	
	posBg = 0;

	// Handle keyboard controls
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
	
	$(window).blur(function()
	{
		log("Pause… "+posBg);
		running = false;
	});
	$(window).focus(function()
	{
		log("Reprise… "+posBg);
		running = true;
	});
	
	enemies = new Array();
	
	// Chargement des images
	imgBg = new Image();
	imgBg.src = "img/bg.png";
	
	imgSp = new Image();
	imgSp.src = "img/anim_sp_new.png";
	sp.img = imgSp;
	
	imgEnemy = new Image();
	imgEnemy.src = "img/anim_sp_new_red.png";
}

var lastEnemy = 0;
function addEnemy()
{
	if(Date.now()-lastEnemy > 300)
	{
		var newEnemy = new Spz();
		newEnemy.moving = true;
		newEnemy.vX = newEnemy.vMax/2;
		newEnemy.x = -245;
		newEnemy.y = (Math.random()*450)|0;
		log("New enemy in "+newEnemy.x+","+newEnemy.y);
		newEnemy.img = imgEnemy;
		enemies.push(newEnemy);
		lastEnemy = Date.now();
	}
}

function reset()
{
	init(); // trouver mieux ?
}

function clear(c)
{
	c.clearRect(0,0,w,h);
}

function randRgb()
{
	var r = 255-parseInt(Math.random()*40);
	return 'rgb('+r+','+r+','+r+')'; 
}

function updateSpPlayer(d)
{
	sp.moving = false;
	
	if((37 in keysDown || 81 in keysDown || 65 in keysDown) && sp.x >= 50) // gauche
	{
		if(sp.vX>-sp.vMax)
			sp.vX -= sp.accel;
		sp.moving = true;
	}
	if((39 in keysDown || 68 in keysDown) && sp.x <= w-50) // droite
	{
		if(sp.vX<sp.vMax)
			sp.vX += sp.accel;
		sp.moving = true;
	}
	if((38 in keysDown || 90 in keysDown || 87 in keysDown) && sp.y >= 50) // haut
	{
		if(sp.vY>-sp.vMax)
			sp.vY -= sp.accel;
		sp.moving = true;
	}
	if((40 in keysDown || 83 in keysDown) && sp.y <= h-50) // bas
	{
		if(sp.vY<sp.vMax)
			sp.vY += sp.accel;
		sp.moving = true;
	}
}

function drawSp(spz, d)
{
	var newX, newY;
	
	newX = spz.x + spz.vX*d;
	newY = spz.y + spz.vY*d;
	
	if((newX < spz.x && newX > 0) || (newX > spz.x && newX < w))
		spz.x = newX;
	if((newY < spz.y && newY > 0) || (newY > spz.y && newY < h))
		spz.y = newY;
	
	if(!spz.moving)
	{
		if(spz.vX<-spz.decel)
			spz.vX += spz.decel;
		else if(spz.vX>spz.decel)
			spz.vX -= spz.decel;
		else if(spz.vX>=-spz.decel && spz.vX <=spz.decel)
			spz.vX = 0;
		
		
		if(spz.vY<-spz.decel)
			spz.vY += spz.decel;
		else if(spz.vY>spz.decel)
			spz.vY -= spz.decel;
		else if(spz.vY>=-spz.decel && spz.vY <=spz.decel)
			spz.vY = 0;
	}
	spz.vX = Math.round(spz.vX*100)/100;
	spz.vY = Math.round(spz.vY*100)/100;
	// $("#accel").html("vX : "+spz.vX+"<br />vY : "+spz.vY);
	
	// « Chute » vers la gauche
	spz.x = spz.x - chute*d;
	
	if(n%25 == 0)
	{
		n = 0;
		// log("spz.vX = "+spz.vX);
	}
	n++;
	
	if(f >= 9) f = 0;
	// (f>3 ? 35 : 0)
	//log("f="+f);
	cM.drawImage(spz.img, 0, ((f/3)|0)*35, 245, 35, (spz.x-(140/2))|0, (spz.y-(70/2))|0, 245, 35);
	//        img_elem, sx,sy,   sw,  sh, dx, dy, dw, dh)
	
}

function drawEnemies(d)
{
	for(e in enemies)
	{
		drawSp(enemies[e], d);
	}
}

function drawBg(d)
{
	if(typeof d == 'undefined')
		d = 10;
	var v = 0.2;

	posBg -= (d*v)|0;
	if(posBg < -w)
		posBg = 0;
	
	cB.drawImage(imgBg, posBg, 0);
	cB.drawImage(imgBg, posBg+w, 0);
}

function drawOverlay()
{
	var i, j;
	var px = 5;
	var b, rgb;
	
	for(i=0; i<h; i+=px)
	{
		b = 256-Math.round(256*Math.abs(Math.pow(Math.cos(i*Math.PI/450),2)));
		rgb = "rgb("+b+","+b+","+b+")";
		cO.fillStyle = rgb;
		cO.fillRect(0, i, w, px);
	}
}

function log(msg, nl)
{
	if(typeof nl == 'undefined')
		nl = true;
	
	setTimeout(function()
	{
		$("#log").append(msg + (nl ? '\n':''));
		$("#log").scrollTop($("#log")[0].scrollHeight);
	}, 0); 
}

function main()
{
	init();
	
	drawBg();
	drawOverlay();
	
	running = true;
	then = Date.now();
	update();
}

var f = 0;
function draw(d)
{
	clear(cM);
	drawBg(d);
	
	// joueur
	updateSpPlayer(d);
	drawSp(sp, d);
	
	// ennemis
	drawEnemies(d);
	
	f++;
}

function update()
{
	now = Date.now();
	
	if(running)
	{
		draw(now-then);
		
		if(32 in keysDown)
		{
			addEnemy();
		}
	}
	
	setTimeout(update, 20); // 40 pour 25i/s ? useless
	then = now;
}
