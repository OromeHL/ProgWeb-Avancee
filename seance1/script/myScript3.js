var isPlayed = false;
var position = 0;
var clock;

var waitingTime = 0;

var tailleCarre = 100; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function deplacer()
{
	var carre = document.getElementById("carre");
	
	waitingTime+=100;
	
	if(waitingTime >= 2000)
	{	
		if(position < finalPos)
		{
			position+=10;
			carre.style.left= position +"px";
		}
		else
		{
			clearInterval(clock);
			isPlayed = false;
			buttonUpdate();
			position=0;
			carre.style.left= "0px";
			waitingTime = 0;
		}
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
		clock = setInterval(deplacer,100);	
	}
	else
	{
		isPlayed = false;
		buttonUpdate();
		clearInterval(clock);
	}
}

