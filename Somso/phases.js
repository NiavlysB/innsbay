function ecranStart(num, nbEnemies, died)
{
	stopAudio();
	cOv.fillStyle = "#000";
	cOv.fillRect(0, 0, W, W);
	cOv.font = "40pt monospace";
	cOv.fillStyle = "#D00";
	cOv.fillText("Phase "+num, 50, 250);
	cOv.font = "20pt monospace";
	cOv.fillText("Targets: "+nbEnemies, 50, 300);
	
	cOv.font = "10pt monospace";
	cOv.fillText("- Click to continue -", 50, 400);
	
	$("#canvasOverlay").mouseup(function(e)
	{
		clear(cOv);
		mouseX = e.pageX-$("#canvasBg").offset().left;
		mouseY = e.pageY-$("#canvasBg").offset().top;
		//log(mouseX + "," + mouseY);
		phaseGame(num, nbEnemies);
	});
}
function ecranDead(num, nbEnemies, a)
{
	if(a<1)
	{
		cOv.fillStyle = "rgba(0, 0, 0, "+a+")";
		cOv.fillRect(0, 0, W, W);
		//log("ecranDead "+a);
		setTimeout(function()
		{
			ecranDead(num, nbEnemies, a+0.2);
		}, 40);
	} else {
		//log("restart");
		startPhase(num, nbEnemies, true);
	}
}


function startPhase(num, nbEnemies, died)
{
	ecranStart(num, nbEnemies, died);
}

function phaseGame(num, nbEnemies)
{
	$("#canvasOverlay").unbind("mouseup");
	startAudio();
	game(num, nbEnemies);
}
