/*
function isKeyDown(numKeyArray)
{
	var i;
	for(i in keysDown)
	{
		log(i);
		if(i in numKeyArray)
		{
			log(i,false);
			return true;
		}
	}
}*/

function update()
{
	frame = (frame+1)%50;
	
	now = Date.now();
	
	if(running)
	{
		updateMain(now-then);
		updateGentils(now-then);
		updateTimeout(now-then);
		draw();
	}
	
	//setTimeout(update, 40); // 40 pour 25i/s ? useless
	requestAnimFrame(update);
	then = now;
}

function clear(c)
{
	c.clearRect(0,0,W,H);
}

function draw()
{
	clear(cMa);
	drawBg();
	drawGentils();
	drawMain();
	drawTimeout();
}

function main()
{
	cBg = $("#canvasBg")[0].getContext("2d");
	cMa = $("#canvasMain")[0].getContext("2d");
	cOv = $("#canvasOverlay")[0].getContext("2d");
	W = $("#canvasBg")[0].width;
	H = $("#canvasBg")[0].height;
	initAudio();
	
	imgBall = new Image();
	imgBall.src = "img/ball.png";
	
	nbEprev = 0;
	startPhase(0, 1);
}

function game(num, nbEnemies)
{
	log("Starting…");
	numPhase = num;
	nbE = nbEnemies;
	
	started = true;
	frame = 0;
	
	timeOut = false;
	t = tTotal = duration(nbEnemies);

	init();
	
	running = true;
	then = Date.now();
	update();
}


function log(msg, nl) // nl = false → pas de LF à la fin
{
	if(typeof nl == 'undefined')
		nl = true;
	
	setTimeout(function()
	{
		$("#log").append(msg + (nl ? '\n':''));
		$("#log").scrollTop($("#log")[0].scrollHeight);
	}, 0); 
}

// Compatibilité (requestAnimFrame)
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
