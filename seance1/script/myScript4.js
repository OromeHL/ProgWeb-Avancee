var isPlayed = false;

//position des carres
var position1 = 0;
var position2 = 0;
var position3 = 0;

var clock;

var waitingTime = 0;

var tailleCarre = 100; // en pixel
var finalPos = document.body.clientWidth - tailleCarre; 

function deplacer()
{
	var carre1 = document.getElementById("carre1");
	var carre2 = document.getElementById("carre2");
	var carre3 = document.getElementById("carre3");
	
	waitingTime+=100;

	if(waitingTime >= 4000)
	{
		if(position1 < finalPos)
		{
			position1+=10;
			carre1.style.left= position1 +"px";
		}

		if(waitingTime >= 5000)
		{
			if(position2 < finalPos)
			{
				position2+=10;
				carre2.style.left= position2 +"px";
			}
		}

		if(waitingTime >= 6000)
		{
			if(position3 < finalPos)
			{
				position3+=10;
				carre3.style.left= position3 +"px";
			}
			else
			{
				clearInterval(clock);
				isPlayed = false;
				buttonUpdate();
				position1=0;
				carre1.style.left= "0px";
				position2=0;
				carre2.style.left= "0px";
				position3=0;
				carre3.style.left= "0px";
				waitingTime = 0;
			}
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

