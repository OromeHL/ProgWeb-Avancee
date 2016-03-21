var interval = 16;

var isPlayed = false;
var position = 0 ;
var clock;

var nouveau = true;

var date = null;
var curDate = null;

var tailleCarre = 100; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function init()
{
	var carre = document.getElementById("carre");
	
	position=0;
	carre.style.right= "0px";
}

function deplacer()
{
	var carre = document.getElementById("carre");
	
	curDate = new Date();
	
	position+= 10*(curDate-date)/interval;
	carre.style.right= position +"px";
	date = new Date();

	if( position > finalPos )
	{
		clearInterval(clock);
		isPlayed = false;
		nouveau = true;
		buttonUpdate();
	}
}	


function buttonUpdate()
{
	var button = document.getElementById("launch");
	
	if( !isPlayed )
	{
		button.innerHTML="Démarrer";
	}
	else
	{
		button.innerHTML="Arrêter";
	}
}

function setMove()
{
	if( !isPlayed )
	{
		isPlayed = true;
		buttonUpdate();
		date = new Date();
		if (nouveau)
		{
			init();
			nouveau = false;
		}
		clock = setInterval(deplacer,interval);
	}
	else
	{
		isPlayed = false;
		buttonUpdate();
		clearInterval(clock);
	}
}

function pausecomp(millis) 
{
	var date = new Date();
	var curDate = null;
	do 
	{ 
		curDate = new Date(); 
	} while(curDate-date < millis);
} 
