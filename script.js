
/* 1. Select the HTML elements */
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart-button");

/* 2. Set up the game variables */
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

/* 3. Define all possible winning combinations */
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* 4. Handle a cell click */
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = Array.from(cells).indexOf(clickedCell);

    // Ignore clicks if the cell is occupied or the game has ended
    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Place the current player's symbol
    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check whether the current player has won
    checkResult();
}

/* 5. Check for a win or draw */
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check whether all cells are occupied
    if (!gameState.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

/* 6. Restart the game */
function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
    });
}

/* 7. Add click event listeners */
cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
