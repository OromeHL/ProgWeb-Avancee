var fps = 15;

var interval = 1000/fps;

var isWalking = false;
var pieceExists = true;

var animation;
var isTimedOut;

var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

var cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
			
var canvas = document.getElementById("canvas");  

var rect = canvas.getBoundingClientRect();

canvas.addEventListener('mouseup',doMouseUp,false);
window.addEventListener('keydown', doKeyDown, true);    
window.addEventListener('keyup', doKeyUp, true);


var ctx=canvas.getContext("2d");
 

//informations concernant le character
var character = new Image();
character.src = "images/littleCharacter.png";

var characterWidth=128;		//Largeur de la sélection
var characterHeight=128;	//Longueur de la sélection

var characterLine=2;		//Ligne de sélection
var characterColumn=0;		//Colonne de sélection

var charX=220;		//Abscisse de placement
var charY=180; 		//Ordonnée de placement
var width=64; 		//Largeur
var height=64; 	//Longueur


//informations concernant la piece
var coin = new Image();
coin.src = "images/coin.png";

var coinColumn=0;			//Colonne de la sélection
var coinLine=0;		//Ordonnée de sélection

var coinWidth=100;		//Largeur de la sélection
var coinHeight=100;	//Longueur de la sélection

var coinX=240;		//Abscisse de placement
var coinY=20; 		//Ordonnée de placement
var coinW=30; 		//Largeur
var coinH=30; 		//Longueur


var tab=[];
var key=0;


var xToReach;
var yToReach;
var xStep;
var yStep;
var diffX;
var diffY;


init();
loopGame();

function init()	//initialisation du tableau des touches pressées
{
	for(var i=0; i<4;i++)
	{
		tab[i]=0;
	}
	characterActu();
}

//########################################################################
//########################################################################
//						Repérer interactions utilisateur
//########################################################################
//########################################################################

function doMouseUp(evt)
{
	clearTimeout(isTimedOut);	//stop les éventuels déplacements auto en cours
	if(!isWalking)	//si le personnage marche déjà, on ne détecte pas le clic
	{
		var mousePos = getMousePos(canvas, evt);
		
		//on regarde les positions à atteindre
		
		xToReach = mousePos.x;		
		yToReach = mousePos.y;		
		
		/* ajustement des positions à atteindre pour que le personnage soit un minimum centré sur le clic*/
		
		xToReach-=32;
		yToReach-=60;

		diffX = xToReach-charX;
		diffY = yToReach-charY;
		
		//on commence le déplacement
		autoMove();
	}
}

function doKeyDown(e) //si une touche est pressée
{ 
	clearTimeout(isTimedOut);	//stop les éventuels déplacements auto en cours
    if( e.keyCode>35 && e.keyCode<41)	//et que c'est une flèche
    {
     	e.preventDefault();	
				
		var isIn = false;	
		
		for(var i=0; i<tab.length; i++)	//on vérifie si elle n'est pas déjà pressée (pour éviter de n'avoir un tableau rempli que de cette touche)
		{
			if(e.keyCode == tab[i])
			{
				isIn = true;
			}
		}
		if(tab[0] == 0)	// si tab[0] == 0, par construction du tableau, aucune touche n'est pressée 
		{
			tab[0] = e.keyCode;
		}
		else if( isIn == false)	//sinon, si la touche n'était pas déjà pressée, on décale le tableau (pour sauvegarder les touches déjà pressées) et on enregistre la nouvelle touche pressée
		{
			for(var i = 2; i>=0; i--)
			{
				tab[i+1]=tab[i];
			}
			tab[0] = e.keyCode;
		}
		
	}
		
    //Space is 32, Enter is 13, Tab is 9, esc is 27, backspace is 8... 
    // A to Z is 65 to 90
}

function doKeyUp(e)		//en cas de touche relâchée
{
	for(var i = 0; i<4; i++)
	{
		if( e.keyCode == tab[i] )	//on décale le reste du tableau et la dernière case du tableau passe à 0
		{
			e.preventDefault();
			for(var j=i+1; j<4; j++)
			{
				tab[j-1]=tab[j];
			}
			tab[tab.length-1]=0;
		}
	}
}

function getMousePos(canvas, evt) 	//on récupère les coordonnées du clic (par rapport au canvas)
{
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


//########################################################################
//########################################################################
//							Changer l'univers
//########################################################################
//########################################################################


function loopGame()
{
	key = tab[0];

	if( key!= 0)
	{
		isWalking = true;
	}
		
	//	THE down-arrow KEY
	if (key == 40) 
	{
		if( charY< 422)
		{
			charY = charY + 10;
		}
		else if( charY<433 )
		{
			charY = 432;
		}
		characterLine = 2;
	}	
	//	THE up-arrow KEY
	if (key == 38) 
	{
		if( charY>25)
		{
			charY = charY - 10;
		}
		else if ( charY>15 )
		{
			charY = 16;
		}
		characterLine = 3;
	}
	//	THE left-arrow KEY
	if (key == 37) 
	{
		if( charX>-7)
		{
			charX = charX-10;
		}
		else if( charX>-17)
		{
			charX = -16;
		}
		characterLine = 0;
	}
	//	THE right-arrow KEY
	if (key == 39) 
	{
		if(charX< 442)
		{
			charX = charX + 10;
		}
		else if(charX< 452)
		{
			charX = 451;
		}
		characterLine = 1;
	}
	
	if(key != 0 && isWalking)	//si on marche et que l'on continue de marcher
	{
		characterActu();
	}
	else
	{
		if(isWalking)	//si on était en train de marcher et qu'il n'y a plus de déplacement demandé, on arrête la marche et on affiche le personnage en position de "non-marche"
		{
			isWalking = false;
			
			switch(characterLine)
			{
				case 0:
					characterColumn=2;
					break;
				case 1:
					characterColumn=2;
					break;
				case 2:
					characterColumn=1;
					break;
				case 3:
					characterColumn=1;
					break;
			}
			
		}
	}
	
	coinColumn = (coinColumn+1)%10;
	
	
	/*==============================*/
	/*	Affichage de l'univers		*/
	/*==============================*/
	draw();
	
	setTimeout("animation=animFrame(loopGame)",interval);	
}

function characterActu()
{
	characterColumn = (characterColumn+1)%4;
}

function autoMove()
{
	//on effectue d'abord le déplacement le plus court
	if( diffX!=0 && Math.abs(diffX)<Math.abs(diffY))	//si on doit se déplacer selon x
	{
		isWalking = true;
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveH)",interval);
	}
	else if( diffY!=0 && Math.abs(diffY)<Math.abs(diffX))	//si on doit se déplacer selon y
	{
		isWalking = true;
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveV)",interval);
	}
}

function autoMoveH()
{
	diffX = xToReach-charX;
	
	if(Math.abs(diffX) < 11 )	//on regarde de combien on doit encore se déplacer pour évaluer la longueur du futur déplacement
	{
		xStep = Math.abs(diffX);
	}
	else
	{
		xStep = 10;
	}
	
	if(diffX > -1)	//on regarde dans quel sens on doit se déplacer
	{
		if(charX<452)	//si on est dans le canvas
		{
			charX = charX + xStep;
		}
		else	//sinon, on a atteint notre destination
		{
			xToReach=charX;
		}
		characterLine = 1;
	}
	else
	{
		if( charX>-10)
		{
			charX = charX-xStep;
		}
		else
		{
			xToReach=charX;
		}
		characterLine = 0;
	}
		
	diffX = xToReach-charX;
	
	if( diffX!=0 )	//si on a pas atteint notre destination, on effectue à nouveau un déplacement horizontal
	{
		characterActu();
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveH)",interval);
	}
	else if( diffY!=0)
	{
		characterActu();
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveV)",interval);
	}
	else
	{
		isWalking = false;
			
		switch(characterLine)
		{
			case 0:
				characterColumn=2;
				break;
			case 1:
				characterColumn=2;
				break;
			case 2:
				characterColumn=1;
				break;
			case 3:
				characterColumn=1;
				break;
		}
	}
}

function autoMoveV()
{
	diffY = yToReach-charY;
	
	if(Math.abs(diffY) < 11 )
	{
		yStep = Math.abs(diffY);
	}
	else
	{
		yStep = 10;
	}
	
	
	if(diffY > -1)
	{
		if( charY<433)
		{
			charY = charY + yStep;
		}
		else
		{
			yToReach=charY;
		}
		characterLine = 2;
	}
	else
	{
		if( charY>16)
		{
			charY = charY - yStep;
		}
		else
		{
			yToReach=charY;
		}
		characterLine = 3;
	}
	diffY = yToReach-charY;
	if( diffY!=0)
	{
		characterActu();
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveV)",interval);
	}
	else if( diffX!=0)
	{
		characterActu();
		isTimedOut=setTimeout("animAuto=animFrame(autoMoveH)",interval);
	}
	else
	{
		isWalking = false;
			
		switch(characterLine)
		{
			case 0:
				characterColumn=2;
				break;
			case 1:
				characterColumn=2;
				break;
			case 2:
				characterColumn=1;
				break;
			case 3:
				characterColumn=1;
				break;
		}
	}
}

//########################################################################
//########################################################################
//							Affichage de l'univers
//########################################################################
//########################################################################

function draw()	
{
	clearCanvas();
	if(pieceExists)
	{
		ctx.drawImage(coin,coinColumn*coinWidth,coinLine,coinWidth,coinHeight,coinX,coinY,coinW,coinH); 	//On affiche la piece
	}
	ctx.drawImage(character,characterColumn*characterWidth,characterLine*characterHeight,characterWidth,characterHeight,charX,charY,width,height); 	//On affiche le personnage
}


function clearCanvas() 
{
	canvas.width = canvas.width;
}

