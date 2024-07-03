document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const playAgainButton = document.getElementById("playAgain");
    const playerSelect = document.getElementById("players");
    let board, currentPlayer, gameActive, numPlayers, gridSize;
    const players = ["X", "O", "Y"];

    const winningCombinations = {
        3: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        4: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [0, 5, 10, 15],
            [3, 6, 9, 12]
        ]
    };

    const initializeBoard = () => {
        boardElement.innerHTML = '';
        board = Array(gridSize * gridSize).fill(null);
        currentPlayer = "X";
        gameActive = true;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            boardElement.appendChild(cell);
        }
        boardElement.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
        boardElement.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
        message.textContent = "";
    };

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());
        checkResult();
        currentPlayer = players[(players.indexOf(currentPlayer) + 1) % numPlayers];
    };

    const checkResult = () => {
        for (let combo of winningCombinations[gridSize]) {
            const cells = combo.map(index => board[index]);
            if (cells.every(cell => cell === currentPlayer)) {
                gameActive = false;
                message.textContent = `Player ${currentPlayer} Wins!`;
                return;
            }
        }
        if (!board.includes(null)) {
            gameActive = false;
            message.textContent = "It's a Tie!";
            return;
        }
    };

    const resetGame = () => {
        initializeBoard();
    };

    playerSelect.addEventListener("change", () => {
        numPlayers = parseInt(playerSelect.value, 10);
        gridSize = numPlayers === 2 ? 3 : 4;
        resetGame();
    });

    resetButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", resetGame);

    // start with first
    numPlayers = parseInt(playerSelect.value, 10);
    gridSize = numPlayers === 2 ? 3 : 4;
    initializeBoard();
});
