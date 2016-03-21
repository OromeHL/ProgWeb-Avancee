var isPlayed = false;
var position = 0;
var clock;

var tailleCarre = 100; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function deplacer()
{
	var carre = document.getElementById("carre");
	
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
