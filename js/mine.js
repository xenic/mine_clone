var game = new Object();
game.mines = new Array();
game.clicked = new Array();
game.flagged = new Array();
game.size;
game.difficulty;
game.isNewGame;
game.isGameWon;
game.isGameLost;

// Fix bug in 40x40 on lose, only half the screen is "ended"
// fix bug in flags...  currently cannot remove them.

//You clicked on a mine. 
function gameOver()
{
	for(var i = 0; i < game.size; i++)
	{
		for(var j = 0; j < game.size; j++)
		{
			var cell = document.getElementById("cell" + i + "_" + j);
			
//			if the cell is flagged, and there is no mine, place an x.			
//			if(!game.mines[x][y] && game.flagged[x][y])
			if(cell.isFlagged && !game.mines[i][j])
			{
				cell.style.backgroundImage = "url(images/redx.gif)";
				cell.style.backgroundRepeat = "no-repeat";
				cell.style.backgroundPosition = "center";
			}
			if(!game.clicked[i][j])
			{
				clickCell(i,j);
			}
		}
	}
}

function checkWin()
{
	// If the game is already over, don't bother checking for the win
	if(game.isGameLost || game.isGameWon)
	{
		return;
	}
	
	// If any of the unclicked cells are not mines, not a win, the game is not over.
	for(var i = 0; i < game.size; i++)
	{
		for(var j = 0; j < game.size; j++)
		{
			if(!game.clicked[i][j] && !game.mines[i][j])
			{
				return;
			}
		}
	}
	
	// All the unclicked cells are mines, the game is over, the player won
	game.isGameWon = true;
	for(var i = 0; i < game.size; i++)
	{
		for(var j = 0; j < game.size; j++)
		{
			if(game.mines[i][j])
			{
				document.getElementById("cell" + i + "_" + j).style.backgroundColor = "green";
				document.getElementById("cell" + i + "_" + j).style.cursor = "default";
//				document.getElementById("cell" + i + j).style.backgroundColor = "green";
			}
		}
	}
	
}


function clickCell(x, y)
{
	var cell = document.getElementById("cell" + x + "_" + y);


	// if the game has already been won, don't do anything on click;
	if(game.isGameWon)
	{
		return;
	}
	
	// if this box has already been clicked, do nothing
	if(game.clicked[x][y])
	{
		return;
	}
	
	// if this cell has been flagged, do nothing
//	if(game.flagged[x][y])
	if(cell.isFlagged)
	{
		return;
	}
	
	// set this box as clicked
	game.clicked[x][y] = true;
	
	//If the game is a new game make sure the first click isn't a mine...  also set isNewGame to false
	if(game.isNewGame)
	{
		game.mines[x][y] = false;
		game.isNewGame = false;
	}

	// if this click was a mine, put a '*' in the box, turn it red, and end the game
	if(game.mines[x][y])
	{
		cell.style.backgroundColor = "red";
		cell.innerHTML = "*";
				
		cell.style.backgroundImage = "url(images/kaboom.gif)";
		cell.style.backgroundRepeat = "no-repeat";
		cell.style.backgroundPosition = "center";

//		document.getElementById("cell" + x + y).style.backgroundColor = "red";
//		document.getElementById("cell" + x + y).innerHTML = "*";
		game.isGameLost = true;
		gameOver();
	}
	
	//	x-1, y-1	x, y-1		x+1, y-1
	//	x-1, y		x, y		x+1, y
	//	x-1, y+1	x, y+1		x+1, y+1
	
	
	// If this cell wasn't a mine, count the mines in surrounding squares.
	var count = 0;
	if(!game.mines[x][y])
	{
		if(x > 0           &&                    game.mines[x-1][y])   { count++; }
		if(x > 0           && y > 0           && game.mines[x-1][y-1]) { count++; }
		if(x > 0           && y < game.size-1 && game.mines[x-1][y+1]) { count++; }
		if(x < game.size-1 &&                    game.mines[x+1][y])   { count++; }
		if(x < game.size-1 && y > 0           && game.mines[x+1][y-1]) { count++; }
		if(x < game.size-1 && y < game.size-1 && game.mines[x+1][y+1]) { count++; }
		if(                   y > 0           && game.mines[x]  [y-1]) { count++; }
		if(                   y < game.size-1 && game.mines[x]  [y+1]) { count++; }
	
		// If there were no mines surrounding the square, expand the click
		if(count==0)
		{
			if(x > 0                             ) { clickCell(x-1,y  ); }
			if(x > 0           && y > 0          ) { clickCell(x-1,y-1); }
			if(x > 0           && y < game.size-1) { clickCell(x-1,y+1); }
			if(x < game.size-1                   ) { clickCell(x+1,y  ); }
			if(x < game.size-1 && y > 0          ) { clickCell(x+1,y-1); }
			if(x < game.size-1 && y < game.size-1) { clickCell(x+1,y+1); }
			if(              y > 0               ) { clickCell(x,  y-1); }
			if(              y < game.size-1     ) { clickCell(x,  y+1); }
		}


//		var cell = document.getElementById("cell" + x + y);
		// Set this cell to be not clickable again, and put the correct count in the box and make it light gray
		if(count != 0)
		{
			cell.innerHTML = count;
		}
		cell.style.backgroundColor = "lightgray";
		cell.style.cursor = "default";
		cell.onClick = "none";
		cell.onContextMenu = "none";
		//at the end of each click, check to see if the game was a win.
		checkWin();
	}
}

//function unFlag(x, y)
//{
//	alert("here");
//	
//	if(game.clicked[x][y]) { return; }
//
//	cell.style.backgroundImage = "none";
//	cell.onClick = "clickCell(" + i + ", " + j + ");";
//	cell.onContextMenu = "flag(" + x + "," + y + ");";
//	cell.isFlagged = false;
//	
//}

function flag(x, y)
{
	//if this has been clicked, no flagging allowed
	if(game.clicked[x][y]) { return; }

	var cell = document.getElementById("cell" + x + "_" + y);

//	if(game.flagged[x][y])
	if(cell.isFlagged)
	{
		cell.style.backgroundImage = "none";
		cell.isFlagged = false;
//		game.flagged[x][y] = false;
	}
	else
	{
		cell.isFlagged = true;
//		game.flagged[x][y] = true;
		cell.style.backgroundImage = "url(images/flag.gif)";
		cell.style.backgroundRepeat = "no-repeat";
		cell.style.backgroundPosition = "center";
	}
}

function startGame()
{
	
	game.isNewGame = true;										// reset the isNewGame flag as we created a new game
	game.isGameLost = false;									// reset the isGameLost flag since we started a new game
	game.isGameWon = false;										// reset the isGameWon flag since we started a new game
	game.size = getRadioButtonValue(document.forms[0].gameSize);// get the selected size of the game board
	game.mines = new Array(game.size);							// create the mines array
	game.clicked = new Array(game.size);						// create the click log
//	game.flagged = new Array(game.size);						// create a flag log
	
	game.difficulty = getRadioButtonValue(document.forms[0].difficulty);//get the selected difficulty
	
	
	var gameboard = "<table class='gameGrid'><tbody>\n";
	for(var i = 0; i < game.size; i++)	// make rows
	{
		game.mines[i] = new Array(game.size);	// add the second dimension for mines
		game.clicked[i] = new Array(game.size);	// add the second dimension for click log
//		game.flagged[i] = new Array(game.size);	// add the second dimension for click log
		
		gameboard = gameboard + "<tr>\n";
		for(var j = 0; j < game.size; j++)	// make columns
		{
			game.clicked[i][j] = false;		// default the click log to all false
//			game.flagged[i][j] = false;		// default the flag log to all false

			// Great bug fix here.
			gameboard = gameboard + "<td onclick='clickCell(" + i + ", " + j + ")' id='cell" + i + "_" + j + "' oncontextmenu='flag(" + i + ", " + j + "); return false;' class='cell'></td>\n";
			//gameboard = gameboard + "<td onclick='clickCell(" + i + ", " + j + ")' id='cell" + i + j + "' class='cell'></td>\n";
			
			// populate the mines!!!
			//if(Math.floor(Math.random()*game.difficulty)/(game.difficulty-1))
			if(Math.floor(Math.random()*game.difficulty))
			{
				game.mines[i][j] = false;
			}
			else
			{
				game.mines[i][j] = true;
			}
		}
		gameboard = gameboard + "</tr>\n";
	}
	gameboard = gameboard + "</tbody></table>";

	// print the gameboard to the web page
	document.getElementById("gameBoard").innerHTML = gameboard;

}
