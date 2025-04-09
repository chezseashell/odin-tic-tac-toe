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


function player(name, markerIcon, marker) {
    const playerName = name;
    const markerChar = markerIcon;
    const makerText = marker

    
    return function playerMove(tileSelection, tileId) {
        tileSelection.innerHTML = `${markerChar}`;
        console.log("tileSelection: " + tileSelection.innerHTML);
        gameboardArray[tileId] = marker;
        return gameboardArray; 
    };
}


const player1 = player('Scott',xIcon, 'X');
const player2 = player('Bob', oIcon, 'O');
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


        const winnerDiv = document.querySelector('#winnerDiv');
        gameInnerDiv.removeChild(winnerDiv);
                    

        gameContainer.classList.remove('hide')

        const tiles = document.querySelectorAll('[tile-id]');

           
        gameTiles.innerHTML = ``;

        let currentPlayerIndex = 0;
        let gameboardArray = []; 
                        
        const game2 = gameboard();
        game2();

                        

        const player1 = player('Scott',xIcon, 'X');
        const player2 = player('Bob', oIcon, 'O');
        const players = [player1, player2];

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
                
                currentPlayer(tileElement, tileId); // Call move with tile and id
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 

                // Check for winner
                const { xMoves, oMoves } = convertArray(gameboardArray)(); 
                const winner = checkforWinner(xMoves, oMoves)(); 
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

                    const winnerDiv = document.createElement('div');
                    winnerDiv.id = 'winnerDiv'
                    winnerDiv.innerHTML = `<p> NO WINNER, PLAYER 1 AND 2 TIED!</p>`
                    gameContainer.classList.add('hide')
                    gameInnerDiv.appendChild(winnerDiv);

                    resetGame();
                }

                console.log("winner variable status: " + winner)
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
                winnerDiv.id = 'winnerDiv'
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 1 WON!</p>`
                gameContainer.classList.add('hide')
                gameInnerDiv.appendChild(winnerDiv);

                return "X";
            }

            const oWins = combo.every(num => arrayO.includes(num));
            if (oWins) {
                console.log("O wins with combo: " + combo);

                const winnerDiv = document.createElement('div');
                winnerDiv.id = 'winnerDiv'
                winnerDiv.innerHTML = `<p> CONGRATULATIONS, PLAYER 2 WON!</p>`
                gameContainer.classList.add('hide')
                gameInnerDiv.appendChild(winnerDiv);

                return "O";
            }
        }

        console.log("No winner yet");

        return null; 
    };
}


addMarkerEventListeners();

