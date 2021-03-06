var interval = 16;

var animation;

var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;
            
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    
var nouveau = true;

var date = null;
var curDate = null;

var isPlayed = false;
var position = 0 ;

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
	if( curDate-date < 10*interval)
	{
		position+= 10*(curDate-date)/interval;
		carre.style.right= position +"px";
	}
	
	date = new Date();
	
	if( position > finalPos )
	{
		cancelAnimationFrame( animation );
		isPlayed = false;
		nouveau = true;
		buttonUpdate();
	}
};


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

var recursiveAnim = function() 
{
        deplacer();
        if( isPlayed )
        {
     	   animation = animFrame(recursiveAnim);
     	}
};
 
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
		animation = animFrame(recursiveAnim);
	}
	else
	{
		isPlayed = false;
		cancelAnimationFrame(animation);
		buttonUpdate();
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
