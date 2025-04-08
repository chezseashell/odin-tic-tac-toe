# odin-tic-tac-toe

A simple, browser-based Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS. Players take turns marking tiles with "X" or "O" until one wins or the game ends in a tie. Features a reset option to play again after a win.

## Features
- Two-player gameplay (Player 1: "X", Player 2: "O")
- Dynamic game board created with JavaScript
- Win detection for all standard Tic Tac Toe combinations
- Turn indicator showing the current player
- "Play Again" button to reset the game after a win
- Console logging for debugging moves and wins

## How to Play
1. Open the game in a web browser.
2. Click on any empty tile to place your marker ("X" or "O").
3. Players alternate turns until someone wins or all tiles are filled.
4. When a player wins, a message appears with a "Play Again" button.
5. Click "Play Again" to start a new game.

## Setup
1. Clone or download this repository.
2. Open `index.html` in a web browser.
3. Ensure the following files are in the same directory:
   - `index.html` (your HTML file)
   - `app.js` (the JavaScript file with the game logic)
   - `styles.css` (for added styling)

## File Structure
- `index.html`: Contains the basic HTML structure with divs for the game board and UI.
- `app.js`: The game logic, including board creation, player moves, win checking, and reset functionality.
- `styles.css` : Contains styles and layout display pattern for game.

## Code Highlights
- **Game Board**: Dynamically generated with 9 tiles, each with a `tile-id` attribute.
- **Players**: Factory function creates player objects with names and markers.
- **Win Detection**: Checks against 8 winning combinations after each move.
- **Reset**: Clears the board and state, reattaches event listeners for a new game.


## Live Preview
[Play it here] (https://htmlpreview.github.io/?https://github.com/chezseashell/odin-tic-tac-toe/blob/main/index.html)

## Future Improvements
- Add a tie detection message.
- Enhance UI with better styling (e.g., grid layout, marker animations).
- Include a start screen or player name input.
- Prevent further moves after a win until reset.

## License
This project is open-source and free to use or modify.