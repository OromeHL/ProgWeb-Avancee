var isPlayed = false;

var duree = 10; //en secondes

var clock;

function updateCD()
{
	document.getElementById("countdown").innerHTML = duree;
}
function decompte()
{
	var countdown = document.getElementById("countdown");
	
	if(duree>0)
	{
		duree--;
		updateCD();
	}
	else
	{
		clearInterval(clock);
		isPlayed = false;
		buttonUpdate();
		duree = 10; //on reinitialise
		updateCD();
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

function setCD()
{
	if( !isPlayed )
	{
		isPlayed = true;
		buttonUpdate();
		clock = setInterval(decompte,1000);
	}
	else
	{
		isPlayed = false;
		buttonUpdate();
		clearInterval(clock);
	}
}
