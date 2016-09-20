var cM, cO;
var running;
var n;
var w, h;
var d;
var now, then;
var keysDown = {};
var px;
var imgBg, imgSp, imgEnemy, imgDead;
var posBg;
var chute = 0.42;
var xDir = 0;
var sp;
var enemies, phases;

function Spz()
{
	this.vX = 0;
	this.vY = 0;
	this.vMax = 0.90;
	this.x = 0;
	this.y = 0;
	this.accel = 0.075;
	this.decel = 0.025; // 0.065
	this.moving = false;
	this.userControlled = false;
	this.enemy = false;
	this.alive = true;
	this.kill = function()
	{
		/**/
		this.alive = false;
		this.vX = 0;
		this.vY = (Math.random()+0.5)|0 ? -1.5 : 1.5; // essayer avec disparition quand sort de l’écran
		this.vY = 0;
		
		//this.accel = 1;
		//this.decel = 0;
		this.moving = true;
		this.img = imgDead;
		/**/
		
		var audioPlop = "#audioPlop"+((Math.random()+1.5)|0);
		$(audioPlop).get(0).play();
		/*
		var audioDie = "#audioDie"+Math.ceil(Math.random()*9);
		$(audioDie).get(0).play();*/
		
		if(this.enemy)
		{
			killsPhase++;
			score++;
		}
	}
}

function drawScore()
{
	//log("Score : "+score);
	cM.font = "20pt monospace";
	cM.fillStyle = "green";
	cM.fillText("Score : "+score, 10, 30);
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
	sp.userControlled = true;
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
	imgBg.src = "img/bg2.png";
	
	imgSp = new Image();
	//imgSp.src = "img/anim_sp_new.png";
	imgSp.src = "img/animSpzBase.png";
	sp.img = imgSp;
	
	imgEnemy = new Image();
	imgEnemy.src = "img/animSpzBaseEnnemi.png";
	
	imgDead = new Image();
	imgDead.src = "img/animSpzBaseDead.png"; // TODO: à changer
	
	initPhases();
}

var lastEnemy = 0;
function addEnemy(vMoy)
{
	if(Date.now()-lastEnemy > 200)
	{
		var newEnemy = new Spz();
		newEnemy.moving = true;
		//newEnemy.moving = false;
		newEnemy.enemy = true;
		newEnemy.vX = (newEnemy.vMax/1.5);//+.5*(Math.random()-.5);
		newEnemy.x = -245;
		//newEnemy.x = (Math.random()*700)|0;
		newEnemy.y = (Math.random()*350+50)|0;
		log("New enemy at "+newEnemy.x+","+newEnemy.y);
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

function updateSpz(spz, d)
{
	if(spz.userControlled && spz.alive)
	{
		//cM.fillStyle = "red";
		//cM.fillRect(spz.x, spz.y, 245, 35);
		
		// Gestion contrôles
		spz.moving = false;
	
		if((37 in keysDown || 81 in keysDown || 65 in keysDown) && spz.x >= 50) // gauche
		{
			if(spz.vX>-spz.vMax)
				spz.vX -= spz.accel;
			spz.moving = true;
		}
		if((39 in keysDown || 68 in keysDown) && spz.x <= w-50) // droite
		{
			if(spz.vX<spz.vMax)
				spz.vX += spz.accel;
			spz.moving = true;
		}
		if((38 in keysDown || 90 in keysDown || 87 in keysDown)) // haut
		{
			/*if(spz.y < 100)
			{
				spz.vY -= (spz.accel*.5 *(100-spz.y)/100)*spz.vY;
			}
			else */if(spz.vY>-spz.vMax)
				spz.vY -= spz.accel*.5;
			/*
			if(spz.vY>-spz.vMax)
				spz.vY -= (spz.y<100 ? spz.accel*(100-spz.y)/100 : spz.accel*.5);*/
			spz.moving = true;
		}
		if((40 in keysDown || 83 in keysDown)) // bas
		{
			if(spz.vY<spz.vMax)
				spz.vY += spz.accel*.5;
			spz.moving = true;
		}
		if(f%100000)$("#accel").html(spz.vY);
	
	}
	
	if(spz.x >700)
	{
		if(spz.userControlled)
			spz.kill();
		else
		{
			lose();
		}
	}
	if(spz.userControlled && spz.x < -150)
		lose();
	
	// Calcul nouvelle position	
	
	var newX, newY;
	
	newX = spz.x + spz.vX*d;
	newY = spz.y + spz.vY*d;
			/*if(spz.y < 100)
			{
				spz.vY -= (spz.accel*.5 *(100-spz.y)/100)*spz.vY;
			}	*/
	if((newX < spz.x && newX > 0) || (newX > spz.x && newX < w))
		spz.x = newX;
	if((newY < spz.y && newY > 0) || (newY > spz.y && newY < h-35))
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
	spz.x = spz.x - phases[phase].vChute*d;
	
	if(n%25 == 0)
	{
		n = 0;
		// log("spz.vX = "+spz.vX);
	}
	n++;
	
	if(f >= 8) f = 0;
	// (f>3 ? 35 : 0)
	//log("f="+f);
	
	if(spz.alive)
		cM.drawImage(spz.img, 0, ((f/2)|0)*35, 245, 35, (spz.x-spz.x%px)|0, (spz.y-spz.y%px)|0, 245, 35);
	else
		cM.drawImage(spz.img, 0, ((f/6)|0)*35, 245, 35, (spz.x-spz.x%px)|0, (spz.y-spz.y%px)|0, 245, 35);
	//        img_elem, sx,sy,   sw,  sh, dx, dy, dw, dh)
	
	// Gestion collisions
	if(spz.enemy && spz.alive)
	{
		var dxQueue = 200;
		var tx = sp.x + dxQueue, ty = sp.y;
		var txE = spz.x + dxQueue, tyE = spz.y;
		var tw = 35, th = 35;
		var off = 5;
		/**
		cM.beginPath();
		cM.moveTo(txE, tyE);
		cM.lineTo(txE+tw, tyE);
		cM.lineTo(txE+tw, tyE+th);
		cM.lineTo(txE, tyE+th);
		cM.lineTo(txE, tyE)
		
		cM.moveTo(txE+off, tyE+off);
		cM.lineTo(txE-off+tw, tyE+off);
		cM.lineTo(txE-off+tw, tyE+th-off);
		cM.lineTo(txE+off, tyE+th-off);
		cM.lineTo(txE+off, tyE+off)
		
		cM.closePath();
		cM.stroke();
		/**/
		if( (txE+off >= tx+2*off-tw) && (txE+off <= tx+tw-off) && (tyE+off >= ty+2*off-th) && (tyE+off <= ty+th-off) )
		//if( (txE >= tx-(tw) && txE <= tx+(tw) && (tyE >= ty-(th) && tyE <= ty+th) ))
		{
			spz.kill();
		}
		/**
		cM.beginPath();
		cM.moveTo(tx, ty);
		cM.lineTo(tx+tw, ty);
		cM.lineTo(tx+tw, ty+th);
		cM.lineTo(tx, ty+th);
		cM.lineTo(tx, ty);
		
		cM.moveTo(tx+off, ty+off);
		cM.lineTo(tx-off+tw, ty+off);
		cM.lineTo(tx-off+tw, ty+th-off);
		cM.lineTo(tx+off, ty+th-off);
		cM.lineTo(tx+off, ty+off)
		cM.closePath();
		cM.stroke();/**/
	}
	
}

function lose()
{
	//running = false;
	sp.kill();
	log("Perdu !");
}

function updateAllSpz(d)
{
	for(e in enemies)
	{
		updateSpz(enemies[e], d);
	}
	updateSpz(sp, d);
}

function drawBg(d)
{
	if(typeof d == 'undefined')
		d = 10;
	var v = 0.5;

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

function Phase(nbE, vMoy, dt)
{
	this.nbE = nbE;
	this.vMoy = vMoy;
	this.dt = dt;
	this.vChute = 0.42;//*nbE/10;
	this.start = function()
	{
		addRandEnemies(nbE, vMoy, dt);
	};
}

function initPhases()
{
	phases = new Array();
	phase = 0;
	phases.push(new Phase(5, sp.vMax/1.5, 2000));
	//phases.push(new Phase(50, sp.vMax/1.4, 500));
	phases.push(new Phase(10, sp.vMax/1.4, 1500));
	phases.push(new Phase(15, sp.vMax/1.3, 1200));
	phases.push(new Phase(20, sp.vMax/1.2, 1000));
	phases.push(new Phase(25, sp.vMax/1.1, 500));
	phases.push(new Phase(50, sp.vMax/1.0, 100));
}

var phases, phase;
var killsPhase = 0;
var score = 0;
function updatePhases(d)
{
	if(killsPhase>=phases[phase].nbE)
	{
		phase++;
		log("phase++ -> "+phase); 
		
		setTimeout(phases[phase].start, 4000);
		
		killsPhase = 0;
		
		//log("Phase "+phase);
	}
}

function addRandEnemies(nbE, vMoy, dt)
{
	//log("addRandEnemies("+nbE+","+vMoy+","+dt+");");
	if(nbE>0)
	{
		addEnemy(vMoy);
		var dt2 = dt+10*(Math.random()-.5);
		//log("timeout " + (dt+50*(Math.random()-.5)));
		setTimeout(function(){ log("TimeOut !"); addRandEnemies(nbE-1, vMoy, dt); }, dt2);
	} else
	{
		//log("Plus d’ennemis à rajouter");
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


var f = 0;
function draw(d)
{
	clear(cM);
	drawBg(d);
	drawScore();
	
	updatePhases(d);
	updateAllSpz(d);
		
	f++;
}

function update()
{
	now = Date.now();
	
	if(running)
	{
		draw(now-then);
		/*
		if(32 in keysDown)
		{
			addEnemy();
		}*/
	}
	
	//setTimeout(update, 00); // 40 pour 25i/s ? useless
	requestAnimFrame(update);
	then = now;
}

function main()
{
	init();
	
	drawBg();
	//drawOverlay();
	phases[phase].start();
	
	running = true;
	then = Date.now();
	update();
}
if(typeof window.requestAnimFrame == 'undefined')
{
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
		        window.webkitRequestAnimationFrame ||
		        window.mozRequestAnimationFrame    ||
		        window.oRequestAnimationFrame      ||
		        window.msRequestAnimationFrame     ||
		        function( callback ){
		          window.setTimeout(callback, 1000 / 60);
		        };
	})();
}
