function createGame() {

    let board = ["","","","","","","","",""];
    
    function getBoard() {
        return [...board];
    }

    function displayBoard() {
        console.log(`${board[0]}|${board[1]}|${board[2]}`);
        console.log("------------");
        console.log(`${board[3]}|${board[4]}|${board[5]}`);
        console.log("------------");
        console.log(`${board[6]}|${board[7]}|${board[8]}`);
    }

    function placeMarker(index, player) {
        if (board[index] === "") {
            board[index] = player;
            return true;
        }

        return false;

    }

    function checkWinner(player) {
        const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    const win = wins.some(combo =>
      combo.every(i => board[i] === player)
    );
    if (win) {
        console.log(`${player} wins`)
        gameActive = false;
        alert(`${player} wins!`);
        return true;
    }
    }
    //  if (!getBoard().includes("")) {
    //     gameActive = false;
    //     alert(`draw`);
    //     return true;
    // }


    return {
        getBoard,
        displayBoard,
        placeMarker,
        checkWinner
    }
}

function createPlayer(symbol) {
        return {
        getSymbol: () => symbol
        };
}

let game = createGame();
const player1 = createPlayer("X");
const player2 = createPlayer("O");

// game.placeMarker(0, player1.getSymbol()); 
// game.placeMarker(2, player2.getSymbol()); 
// game.placeMarker(3, player1.getSymbol()); 
// game.placeMarker(5, player2.getSymbol()); 
// game.placeMarker(4, player1.getSymbol()); 
// game.placeMarker(8, player2.getSymbol()); 
// game.displayBoard();
// game.checkWinner(player1.getSymbol());
// game.checkWinner(player2.getSymbol());


const box = document.querySelectorAll(".box");
let currentPlayer = player1;
let gameActive = true;
box.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (!gameActive) return;

        const active = game.placeMarker(index, currentPlayer.getSymbol());
        if (active) {
            cell.textContent = currentPlayer.getSymbol();
            if (game.checkWinner(currentPlayer.getSymbol())) {
                box.forEach(c => c.style.pointerEvents = "none");
                
        return;
            } else if (!game.getBoard().includes("")) {
        gameActive = false;
        alert(`It's a draw!`);
        box.forEach(c => c.style.pointerEvents = "none");
        return;
    }
           
            currentPlayer = currentPlayer === player1 ? player2: player1;
        }
    });
});

