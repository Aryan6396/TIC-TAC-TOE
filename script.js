// Variables
let currentPlayer = "X"; // Player X starts the game
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const statusDisplay = document.getElementById("status");
const boxes = document.querySelectorAll(".box");

// Winning combinations (row, column, diagonal)
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Update game status text
const updateStatus = () => {
  statusDisplay.textContent = gameActive
    ? `Player ${currentPlayer}'s turn`
    : `Player ${currentPlayer} wins!`;
};

// Check if a player has won
const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    updateStatus();
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  }
};

// Handle a player's move
const handleMove = (box, index) => {
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  box.textContent = currentPlayer;

  // Check if the current player has won
  checkWinner();

  // Toggle player turn
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
};

// Add event listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleMove(box, index));
});

// Reset the game
const resetGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  boxes.forEach((box) => (box.textContent = ""));
  updateStatus();
};

// Reset button event
document.getElementById("resetBtn").addEventListener("click", resetGame);

// Initialize the status
updateStatus();
