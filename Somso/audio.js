var cAudio, oscillator;
var boingBuffer, timeoutBuffer, pocBuffer, crichBuffer;

function initAudio()
{
	if(typeof webkitAudioContext != "undefined")
	{
		cAudio = new webkitAudioContext();
		loadBoing();
		loadTimeout();
		loadPoc();
		loadCrich();
	}
	
}
//if(typeof webkitAudioContext != "undefined"){
function loadBoing()
{
	var req = new XMLHttpRequest();
	req.open('GET', "snd/boinc.wav", true);
	req.responseType = "arraybuffer";
	req.onload = function(buffer)
	{
		cAudio.decodeAudioData(req.response, function(buffer) {
    	  	boingBuffer = buffer;
		}, onError);
  	};
  	req.send();
}  
function loadTimeout()
{
	var req = new XMLHttpRequest();
	req.open('GET', "snd/timeout.wav", true);
	req.responseType = "arraybuffer";
	req.onload = function(buffer)
	{
		cAudio.decodeAudioData(req.response, function(buffer) {
    	  	timeoutBuffer = buffer;
		}, onError);
  	};
  	req.send();
}
function loadPoc()
{
	var req = new XMLHttpRequest();
	req.open('GET', "snd/poc.wav", true);
	req.responseType = "arraybuffer";
	req.onload = function(buffer)
	{
		cAudio.decodeAudioData(req.response, function(buffer) {
    	  	pocBuffer = buffer;
		}, onError);
  	};
  	req.send();
}
function loadCrich()
{
	var req = new XMLHttpRequest();
	req.open('GET', "snd/crich.wav", true);
	req.responseType = "arraybuffer";
	req.onload = function(buffer)
	{
		cAudio.decodeAudioData(req.response, function(buffer) {
    	  	crichBuffer = buffer;
		}, onError);
  	};
  	req.send();
}

function onError() {alert("Error ?");}

function startAudio()
{
	if(typeof webkitAudioContext != "undefined")
	{
		if(oscillator)
			oscillator.disconnect();
		oscillator = cAudio.createOscillator();
		oscillator.type = 3;
		oscillator.frequency.value = 400;
		
		oscillator.connect(cAudio.destination);
		oscillator.noteOn(0);
    }
}

function stopAudio()
{
	//log("stopAudio",false);
	if(oscillator)
	{
		oscillator.disconnect();
		//log(" 1");
	}
	// TODO: faire chuter la fréquence avant
}

function play(buffer)
{
	if(typeof webkitAudioContext != "undefined")
	{
		var source = cAudio.createBufferSource();
		source.buffer = buffer;
	  	source.connect(cAudio.destination);
	  	source.noteOn(0);
  	}
}

function boing()
{
	play(boingBuffer);
}
