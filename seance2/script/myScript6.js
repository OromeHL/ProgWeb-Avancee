var interval = 1000;

var animation;

var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;
            
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    

var isPlayed = false;

var elem = document.getElementById("piece");

//informations concernant le sprite
var spriteCount = 0;
var spriteX=0;			//Abscisse de sélection
var spriteY=0;		//Ordonnée de sélection
var spriteWidth=100;		//Largeur de la sélection
var spriteHeight=100;	//Longueur de la sélection

//informations sur le canvas
var x=90;		//Abscisse de placement
var y=0; 		//Ordonnée de placement
var width=120; 		//Largeur
var height=120; 	//Longueur


function draw()
{
	if (spriteCount == 10)
	{
		spriteCount = 0;
	}
	var canvas = document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	ctx.clearRect(x,y,width,height); 	//On réinitialise le canvas
	spriteX=spriteCount*100;
	ctx.drawImage(elem,spriteX,spriteY,spriteWidth,spriteHeight,x,y,width,height); 	//On affiche une nouvelle image
	spriteCount++;
}

function buttonUpdate()
{
	var button = document.getElementById("launch");
	
	if( !isPlayed )
	{
		button.innerHTML="D&eacute;marrer";
	}
	else
	{
		button.innerHTML="Arr&ecirc;ter";
	}
}

 
var recursiveAnim = function() 
{
	draw();
	setTimeout( animation = animFrame(recursiveAnim),interval);
};
 
function setMove()
{
	if( !isPlayed )
	{
		isPlayed = true;
		buttonUpdate();
		animation = animFrame(recursiveAnim);
	}
	else
	{
		isPlayed = false;
		cancelAnimationFrame(animation);
		buttonUpdate();
	}
}
