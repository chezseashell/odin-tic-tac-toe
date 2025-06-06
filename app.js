const gameTiles = document.querySelector('#game-tiles-container');
const playButton = document.querySelector('#play-btn');
const gameOuterDiv = document.querySelector('#game-outer-div')
const gameInnerDiv = document.querySelector('#game-inner-div');
const gameContainer = document.querySelector('#game-container')

const xIcon = `<i id="xIcon" class="material-symbols-outlined">planet</i>`
const oIcon = `<i id="oIcon" class="material-symbols-outlined">rocket</i>`
let currentPlayerIndex = 0;
let gameboardArray = []; 

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


class Gameboard {
    constructor() {
        this.gameboardArray = [];
    }

    createGrid() {
        this.gameboardArray = [];
        gameTiles.innerHTML = ''
        for (let i = 0; i < 9; i++) {
            var tile = document.createElement('div');
            gameboardArray.push("");
            tile.innerHTML = `<div class="game-tile" tile-id="${i}"></div>`;
            gameTiles.appendChild(tile);
            tile.classList.add('tile-outer-container');
        }
        console.log(gameboardArray);
        return gameboardArray;
    }
}
 

class Player {
    constructor(playerName, markerIcon, marker) {
        this.playerName = playerName;
        this.markerIcon = markerIcon;
        this.marker = marker;
    }

    makeMove(tileSelection, tileId) {
        tileSelection.innerHTML = this.markerIcon;
        console.log("tileSelection: " + tileSelection.innerHTML);
        gameboardArray[tileId] = this.marker;
        return gameboardArray;    
    }
}


class MoveConverter {
    constructor(gameArray) {
        this.gameArray = gameboardArray;
    }

    getMoves() {
        const xMoves = [];
        const oMoves = [];
        for (let i =0; i< this.gameArray.length; i++) {
            if (this.gameArray[i] === 'X') {
                xMoves.push(i);
            } else if(this.gameArray[i] === 'O') {
                oMoves.push(i);
            }
        }
        return { xMoves, oMoves };
    }
}


class WinnerCheck {
    constructor(arrayX, arrayO) {
        this.arrayX = arrayX;
        this.arrayO = arrayO;
    }

    checkCombos() {
        for (let i=0; i < winningCombos.length; i ++) {
            const combo = winningCombos[i];
            const xWins = combo.every(num => this.arrayX.includes(num));
            const oWins = combo.every(num => this.arrayO.includes(num));

            if (xWins) {
                console.log("X wins with combo: " + combo);
                const winnerDiv = document.createElement('div');
                winnerDiv.id = 'winnerDiv';
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 1 WONS!</p>`;
                gameContainer.classList.add('hide');
                gameInnerDiv.appendChild(winnerDiv);
                return 'X';
            }

            if (oWins) {
                console.log("O wins with combo: " + combo);
                const winnerDiv = document.createElement('div');
                winnerDiv.id = 'winnerDiv';
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 2 WON!</p>`;
                gameContainer.classList.add('hide');
                gameInnerDiv.appendChild(winnerDiv);
                return "O";                
            }
        }
        console.log("No winner yet");
        return null;
    }
}




/* Initialize game */
const game1 = new Gameboard();
game1.createGrid();

const player1 = new Player('Scott',xIcon, 'X');
const player2 = new Player('Bob', oIcon, 'O');
const players = [player1, player2];


function resetGame() {
    const currentPlayerDiv = document.querySelector('#player-div')
    const resetGameBtn = document.createElement('button');
    
    resetGameBtn.id = 'resetBtn';
    gameOuterDiv.innerHTML = '';
    resetGameBtn.innerHTML = `Play Again`;
    gameOuterDiv.appendChild(resetGameBtn);

    const resetBtn = document.querySelector('#resetBtn');

    resetBtn.addEventListener('click', () => {

        console.log("reset button clicked")
        gameOuterDiv.innerHTML = ``;
        gameOuterDiv.classList.remove('show');


        const winnerDivs = document.querySelectorAll('#winnerDiv');
        winnerDivs.forEach(div => div.remove() ) 
                    
        gameContainer.classList.remove('hide')
        gameTiles.innerHTML = ``;

        currentPlayerIndex = 0;
        gameboardArray = []; 
                        
        const newGame = new Gameboard();
        gameboardArray = newGame.createGrid();

        addMarkerEventListeners();
    })
}


function addMarkerEventListeners() {
    const tiles = document.querySelectorAll('[tile-id]');
    tiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            const tileId = e.target.closest('div').getAttribute('tile-id');
            const tileElement = e.target.closest('div');

            const currentPlayerDiv = document.createElement('div');

            if (gameboardArray[tileId] === '') { // Only allow move if tile is empty
                gameOuterDiv.innerHTML =``;
                const currentPlayer = players[currentPlayerIndex];

                currentPlayerDiv.innerHTML = `Player ${currentPlayerIndex+1} Turn`
                currentPlayerDiv.id="player-div"
                gameOuterDiv.appendChild(currentPlayerDiv)
                gameOuterDiv.classList.add('show');
                
                currentPlayer.makeMove(tileElement, tileId); // Call move with tile and id
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 

                // Check for winner
                const moveConverter = new MoveConverter(gameboardArray);
                const { xMoves, oMoves } = moveConverter.getMoves(); 
                const winnerChecker = new WinnerCheck(xMoves, oMoves);
                const winner = winnerChecker.checkCombos();

                if (winner) {
                    console.log("Winner: " + winner);
                               
                    const resetGameBtn = document.createElement('button');
                    resetGameBtn.id = 'resetBtn';
                    gameOuterDiv.removeChild(currentPlayerDiv);
                    resetGameBtn.innerHTML = `Play Again`;
                    gameOuterDiv.appendChild(resetGameBtn);

                    resetGame();
                }  
                
                if (!gameboardArray.includes("") && !winner) {
                    console.log("gameboardArray full and no winner")

                    setTimeout(function() {
                        const winnerDiv = document.createElement('div');
                        winnerDiv.id = 'winnerDiv'
                        winnerDiv.innerHTML = `<p> NO WINNER, PLAYER 1 AND 2 TIED!</p>`
                        gameContainer.classList.add('hide')
                        gameInnerDiv.appendChild(winnerDiv);

                    }, 1000)                   
                    resetGame(); 
                }
                console.log("winner variable status: " + winner)
            }
        });
    });
}


addMarkerEventListeners();
