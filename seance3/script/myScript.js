var fps = 15;

var interval = 1000/fps;

var isWalking = false;
var pieceExists = true;

var animation;
var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

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

var charX=200;		//Abscisse de placement
var charY=200; 		//Ordonnée de placement
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
	var mousePos = getMousePos(canvas, evt);
	
	//on regarde les positions à atteindre
	
	xToReach = mousePos.x;
	diffX = xToReach-charX;
	
	yToReach = mousePos.y;
	diffY = yToReach-charY;
	
	
	/* ajustement des positions à atteindre pour que le personnage soit un minimum centré */
	
	if(diffX > 0)
	{
		xToReach-=35;
		diffX = xToReach-charX;
	}
	else
	{
		xToReach-=30;
	}
	
	if(diffY > 0)
	{
		yToReach-=100;
		diffX = yToReach-charY;
	}
	else
	{
		yToReach-=90;
	}
	
	//on commence le déplacement
	autoMove();
}

function doKeyDown(e) //si une touche est pressée
{ 
    if( e.keyCode>35 && e.keyCode<41)	//et que c'est une flèche
    {
     	e.preventDefault();	
				
		var isIn = false;	
		
		for(var i=0; i<4; i++)	//on vérifie si elle n'est pas déjà pressée (pour éviter de n'avoir un tableau rempli que de cette touche)
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
			for(var i = 3; i>=0; i--)
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
		if( e.keyCode == tab[i] )	//on passe la case du tableau correspondante à 0 et on décale le reste du tableau
		{
			e.preventDefault();
			tab[i]=0;
			for(var j=i+1; j<3; j++)
			{
				tab[j-1]=tab[j];
			}
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
		if( charY<330)
		{
			charY = charY + 10;
		}
		characterLine = 2;
	}	
	//	THE up-arrow KEY
	if (key == 38) 
	{
		if( charY>10)
		{
			charY = charY - 10;
		}
		characterLine = 3;
	}
	//	THE left-arrow KEY
	if (key == 37) 
	{
		if( charX>-5)
		{
			charX = charX-10;
		}
		characterLine = 0;
	}
	//	THE right-arrow KEY
	if (key == 39) 
	{
		if(charX<450)
		{
			charX = charX + 10;
		}
		characterLine = 1;
	}
	
	if(key != 0)
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
					characterColumn=1;
					break;
				case 1:
					characterColumn=1;
					break;
				case 2:
					characterColumn=0;
					break;
				case 3:
					characterColumn=0;
					break;
			}
			
			characterActu();
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
	if( diffX!=0 )	//si on doit se déplacer selon charX
	{
		isWalking = true;
		autoMoveH();
	}
	else if( diffY!=0)	//si on doit se déplacer selon charY
	{
		isWalking = true;
		autoMoveV();
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
		if(charX<450)	//si on est dans le canvas
		{
			charX = charX + xStep;
		}
		else	//sinon, on a atteint notre destination
		{
			xToReach=charX;
			diffX = xToReach-charX;
		}
		characterLine = 1;
	}
	else
	{
		if( charX>-5)
		{
			charX = charX-xStep;
		}
		else
		{
			xToReach=charX;
			diffX = xToReach-charX;
		}
		characterLine = 0;
	}
	
	
	characterActu();
	
	if( diffX!=0 )	//si on a pas atteint notre destination, on effectue à nouveau un déplacement horizontal
	{
		setTimeout(autoMoveH,interval);
	}
	else if( diffY!=0)
	{
		setTimeout(autoMoveV,interval);
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
		if( charY<330)
		{
			charY = charY + yStep;
		}
		else
		{
			yToReach=charY;
			diffY = yToReach-charY;
		}
		characterLine = 2;
	}
	else
	{
		if( charY>10)
		{
			charY = charY - yStep;
		}
		else
		{
			yToReach=charY;
			diffY = yToReach-charY;
		}
		characterLine = 3;
	}
	
	
	characterActu();
	
	if( diffY!=0)
	{
		setTimeout(autoMoveV,interval);
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

