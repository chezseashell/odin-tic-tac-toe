const gameTiles = document.querySelector('#game-tiles-container');
const playButton = document.querySelector('#play-btn');
const gameOuterDiv = document.querySelector('#game-outer-div')
const gameInnerDiv = document.querySelector('#game-inner-div');

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

function gameboard(player1, player2) {
    return function GameboardGrid() {
        gameboardArray = [];
        for (let i = 0; i < 9; i++) {
            var tile = document.createElement('div');
            gameboardArray.push("");
            tile.innerHTML = `<div class="game-tile" tile-id="${i}"></div>`;
            gameTiles.appendChild(tile);
            tile.classList.add('tile-outer-container');
        }
        console.log(gameboardArray);
        return gameboardArray;
    };
}   
const game1 = gameboard();
game1();

function player(name, marker) {
    const playerName = name;
    const markerChar = marker;
    
    return function playerMove(tileSelection, tileId) {
        tileSelection.innerHTML = `${markerChar}`;
        console.log("tileSelection: " + tileSelection.innerHTML);
        gameboardArray[tileId] = markerChar;
        return gameboardArray; 
    };
}

const player1 = player('Scott', 'X');
const player2 = player('Bob', 'O');
const players = [player1, player2];

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
                console.log("current player " + currentPlayerIndex);

                currentPlayerDiv.innerHTML = `<p>Player ${currentPlayerIndex+1}</p>`
                gameOuterDiv.appendChild(currentPlayerDiv)
                
                currentPlayer(tileElement, tileId); // Call move with tile and id
                console.log("Current board: " + gameboardArray);
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 

                // Check for winner
                const { xMoves, oMoves } = convertArray(gameboardArray)(); 
                const winner = checkforWinner(xMoves, oMoves)(); 
                if (winner) {
                    console.log("Winner: " + winner);



                }
            }
        });
    });
}

function convertArray(gameArray) {
    const arrayToConvert = gameArray;

    return function moves() {
        const xMoves = [];
        const oMoves = [];

        for (let i = 0; i < arrayToConvert.length; i++) {
            if (arrayToConvert[i] === 'X') {
                xMoves.push(i);
            } else if (arrayToConvert[i] === 'O') {
                oMoves.push(i);  
            } 
        }
    
        return { xMoves, oMoves }; // Return both arrays as an object
    };
}

function checkforWinner(array1, array2) {
    const arrayX = array1;
    const arrayO = array2;

    return function checkcombos() {
        for (let i = 0; i < winningCombos.length; i++) { 
            const combo = winningCombos[i];

            const xWins = combo.every(num => arrayX.includes(num));
            if (xWins) {
                console.log("X wins with combo: " + combo);


                const winnerDiv = document.createElement('div');
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 1 WON!</p>`
                gameInnerDiv.innerHTML = ``;
                gameInnerDiv.appendChild(winnerDiv);

                return "X";



            }
            const oWins = combo.every(num => arrayO.includes(num));
            if (oWins) {
                console.log("O wins with combo: " + combo);

                const winnerDiv = document.createElement('div');
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 2 WON!</p>`
                gameInnerDiv.innerHTML = ``;
                gameInnerDiv.appendChild(winnerDiv);


                return "O";
            }
        }

        console.log("No winner yet");
        return null; 
    };
}

addMarkerEventListeners();