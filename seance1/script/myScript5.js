var isPlayed = false;

//position des carres
var position = [0,0,0,0,0,0,0,0,0,0];
var carres = [document.getElementById("carre1"),document.getElementById("carre2"),document.getElementById("carre3"),document.getElementById("carre4"),document.getElementById("carre5"),document.getElementById("carre6"),document.getElementById("carre7"),document.getElementById("carre8"),document.getElementById("carre9"),document.getElementById("carre10")]

var clock;

var waitingTime = 0;

var tailleCarre = 50; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function init()
{
	waitingTime = 0;
	for(var i=0; i<carres.length; i++)
	{
		position[i]=0;
		carres[i].style.left= "0px";
	}
}

function deplacer()
{
	
	waitingTime+=100;
	for(var i=0; i<carres.length; i++)
	{
		if(waitingTime >= 4000 + i*1000)
		{
			if(position[i] < finalPos)
			{
				position[i]+=10;
				carres[i].style.left= position[i] +"px";
			}		
		}
	}
	
	if( position[position.length-1] >= finalPos )
	{
		clearInterval(clock);
		isPlayed = false;
		buttonUpdate();	
		init();
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

