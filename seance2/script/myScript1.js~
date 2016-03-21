var isPlayed = false;
var position = 0 ;
var clock;

var tailleCarre = 100; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function deplacer()
{
	var carre = document.getElementById("carre");
	
	position+=10;
	carre.style.right= position +"px";
	pausecomp(100);
	if( position > finalPos )
	{
		clearInterval(clock);
		isPlayed = false;
		buttonUpdate();
		position=0;
		carre.style.right= "0px";
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
		clock = setInterval(deplacer,16);
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
