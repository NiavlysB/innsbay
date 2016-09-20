var V;
var cBg, cMa, grd1, grdTimeout, W, H;
var keysDown;
var mouseX, mouseY, frame, t, tTotal;
var gentils, score, g, i, mocheTest, marge;
var numPhase, nbE, nbT, nbEprev = 1, newX, newY, count;
var imgBall, imgBg;


// size = rayon !
function Villain(x, y, player)
{
	if(typeof player == "undefined")
		this.playerControlled = true;
	
	if(this.playerControlled)
		this.size = 30;
	else
		this.size = 5;
	if(typeof x == "undefined")
		this.x = W/2;
	else
		this.x = x;
	if(typeof y == "undefined")
		this.y = W/2;
	else
		this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.accel = 0.01;
	this.dirX = 1;
	this.dirY = 1;
	this.moving = false;
	this.dead = false;
		
	this.die = function()
	{
		this.dead = true;
		if(this.playerControlled)
		{
			running = false;
			play(timeoutBuffer);
			ecranDead(numPhase, nbE, 0);
		} else {
			play(crichBuffer);
			checkCompleted();
		}
	};
	this.toString = function()
	{
		var s;
		if(this.playerControlled)
			s = "[> ";
		else
			s = "[# ";
		s += this.x + "," + this.y;
		return s;
	}
}

function init()
{
	// Handle keyboard controls
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		//log(e.keyCode+".",false);
	}, false);
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
	
	$(document).ready(function()
	{
		addEventListener("mousemove", function(e)
		{
			//log($("#canvasBg").get(0).clientX);
			mouseX = e.pageX-$("#canvasBg").offset().left;
			mouseY = e.pageY-$("#canvasBg").offset().top;
			
		}
		);
	});
	addEventListener("mouseup", function(e)
	{
		log(mouseX+","+mouseY+" ("+V.x+","+V.y+")");
		//log("client : "+e.clientX+","+e.clientY);
	});
	
	/**
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
	/**/
	grdTimeout = cOv.createLinearGradient(0, H, W, H);
	grdTimeout.addColorStop(1, "#00BB00");
	grdTimeout.addColorStop(0.66, "#BBBB00");
	grdTimeout.addColorStop(0.33, "#BB6500");
	grdTimeout.addColorStop(0, "#BB0000");
	

	log("W="+W+", H="+H);
	
	V = new Villain();
	//V.x = W/2-V.size/2;
	//V.y = V.x;
	if(mouseX<=V.size)
	{
		V.x = V.size;
	} else if (mouseX >= W-V.size)
	{
		V.x = W-V.size;
	} else {
		V.x = mouseX;
	}
	if(mouseY<=V.size)
	{
		V.y = V.size;
	} else if (mouseY >= W-V.size)
	{
		V.y = W-V.size;
	} else {
		V.y = mouseY;
	}
	V.vx = 0;
	V.vy = 0;
	log("V : x="+V.x+" y="+V.y);
	
	mocheTest = false;
	posBg = 0;
	score = 0;
	marge = 50;
	gentils = new Array();
	
	// placement de nbE ennemis
	for (var i=0; i<nbE; i++)
	{
		newX = Math.random()*(W-2*marge)+marge;
		newY = Math.random()*(W-2*marge)+marge;
		gentils.push(new Villain(newX, newY, false));
	}
	//log(gentils.toString());
}

function updateMain(dt)
{
	if(t<=0)
		V.die();
	
	if(oscillator)
		oscillator.frequency.value = (V.vx*V.vx+V.vy*V.vy)*50+50;
	//$("#log").html(oscillator.frequency.value);

	if(!mocheTest)
	{
		if(mouseX > V.x)
		{
			V.vx += V.accel;
		} else {
			V.vx -= V.accel;
		}
		if(mouseY > V.y)
		{
			V.vy += V.accel;
		} else {
			V.vy -= V.accel;
		}
		
		// atténuation
		//V.vy = V.vy - (V.vy/10000)*dt;
		//V.vx = V.vx - (V.vx/10000)*dt;

		newX = V.x + V.vx*dt;
		newY = V.y + V.vy*dt;
	} else {
		newX = mouseX;
		newY = mouseY;
	}
	
	if(newX-V.size < 0 || newX+V.size > W)
	{
		V.vx = -V.vx;
		V.vy = V.vy;
		boing();
	}
	else if(newY-V.size < 0 || newY+V.size > H)
	{
		V.vx = V.vx;
		V.vy = -V.vy;
		boing();
	}
	else
	{
		V.x = newX;
		V.y = newY;
	}
}

function updateGentils(dt)
{
	for(i in gentils)
	{
		g = gentils[i];
		
		// Déplacement random
		if(!mocheTest)
		{
			g.vx = ((Math.random()-0.5));
			g.vy = ((Math.random()-0.5));
			
			newX = g.x + g.vx*dt*0.2;
			newY = g.y + g.vy*dt*0.2;
		}
		else
		{
			newX = g.x;
			newY = g.y;
		}
		
		if(newX>marge && newX<W-marge && newY>marge && newY<W-marge)
		{
			g.x = newX;
			g.y = newY;
		}
		
		// Collision avec le joueur (bizarre)
		if(V.size > Math.abs(V.x-g.x) && V.size > Math.abs(V.y-g.y))
		{
			if(!g.dead)
			{
				log("Slurp!");
				g.die();
			}
		}
	}
}

function checkCompleted()
{
	completed = true;
	for(i in gentils)
	{
		g = gentils[i];
		if(!g.dead)
		{
			completed = false;
			break;
		}
	}
	if(completed)
	{
		running = false;
		
		play(pocBuffer);
		startPhase(numPhase+1, fib(numPhase+2));
	}
}

function fib(n)
{
	if(n<=1)
		return 1;
	else
		return fib(n-1)+fib(n-2);
}

function drawMain()
{
	// TODO: À améliorer, pour impression de sphère
	/*cMa.beginPath();
	cMa.fillStyle = "#550000";
	cMa.arc(V.x|0, V.y|0, V.size, 0, Math.PI*2, true); 
	cMa.closePath();
	cMa.fill();*/
	
	cMa.drawImage(imgBall, (V.x-V.size)|0, (V.y-V.size)|0);
	
	if(mocheTest)
	{
		cMa.strokeStyle = "#F00";
		cMa.strokeRect(V.x-V.size, V.y-V.size, V.size*2, V.size*2);
	}
	
	//alert(V.x+" "+V.y);
	/** // Dégradé
	grd1 = cMa.createRadialGradient(V.x, V.y, 0, V.x, V.y, V.size);	alert(grd1);
	grd1.addColorStop(0, "rgba(255,0,0,0.5)");
	grd1.addColorStop(1, "rgba(0,255,0,0.2)");
	cMa.fillStyle = grd1;
	cMa.beginPath();
	cMa.arc(V.x, V.y, V.size, 0, Math.PI*2, true); 
	cMa.closePath();
	cMa.fill();*/
}

function drawGentils()
{
	for(i=0; i<gentils.length; i++)
	{
		g = gentils[i];
		if(g.dead)
			continue;
		cMa.beginPath();
		cMa.fillStyle = "#5555FF";
		//log("dessin "+gentils[g].x+" "+gentils[g].y+" "+gentils[g].size);
		cMa.arc(g.x|0, g.y|0, g.size, 0, Math.PI*2, true); 
		cMa.closePath();
		cMa.fill();
		
		if(mocheTest)
		{
			cMa.strokeStyle = "#F00";
			cMa.strokeRect(g.x-g.size, g.y-g.size, g.size*2, g.size*2);
		}
	}
}

function drawBg()
{
	//cMa.fillStyle = "#000022";
	//cMa.fillRect(0,0,W,H);
	cMa.drawImage(imgBg, 0, 0);
}

function drawTimeout()
{
	if(running)
		clear(cOv);
	cOv.fillStyle = grdTimeout;
	cOv.fillRect(0,W-10, W*t/duration(nbE), 10);
}

function updateTimeout(dt)
{
	t -= dt;
}

function duration(nbEnemies)
{
	max = 10000;
	return max*(1-1/Math.exp(nbEnemies));
}
