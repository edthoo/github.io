const tiles = document.querySelectorAll('.tile');
const container = document.querySelectorAll('.tile-container');
const nextRoundBtn = document.querySelector('.next-round');
const newGameBtn = document.querySelector('.new-game');
const playerNum = document.querySelector('.player-num');
const player1Score = document.querySelector('.player-1-score');
const player2Score = document.querySelector('.player-2-score');

/*
--grid--
[0][1][2]
[3][4][5]
[6][7][8]
*/

let boardArr = ['', '', '', '', '', '', '', '', '']

// all possible win conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// PlayerTurnCount to track whose turn it is
let playerTurnCount = 0;

// To track game score
let player1ScoreCount = 0;
let player2ScoreCount = 0;

// Reload entire page to start new game
function handleNewGameBtn() {
    location.reload();
}

// Reset page to play next round
function handleNextRoundBtn() {
    boardArr = ['', '', '', '', '', '', '', '', ''];
    ;
    document.querySelector('.announcement').textContent = '';
    tiles.forEach(function (tile) {
        tile.classList.remove('stop-click', 'x-img', 'o-img')
    });
}

// To switch between players
function changePlayer() {
    if (playerTurnCount % 2 == 0) {
        playerNum.textContent = '2';
        playerTurnCount++;
    } else {
        playerNum.textContent = '1';
        playerTurnCount++;
    }
}

// To stop override previous input
function stopReclick(thisBox) {
    thisBox.classList.add('stop-click');
}

// To prevent extra player inputs in the container after winning
function stopGame() {
    tiles.forEach(function (tile) {
        tile.classList.add('stop-click');
    })
}

// To announce winner or draw
function announce(str) {
    document.querySelector('.announcement').textContent = str;

    if (str === 'Player 1 Won!') {
        player1ScoreCount++;
        player1Score.textContent = player1ScoreCount;
    } else if (str === 'Player 2 Won!') {
        player2ScoreCount++;
        player2Score.textContent = player2ScoreCount;
    }
}

function checkResults() {
    let roundWon = false
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        const a = boardArr[winCondition[0]];
        const b = boardArr[winCondition[1]];
        const c = boardArr[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            ;
            break;
        }
    }

    if (roundWon) {
        (playerTurnCount % 2 == 0 ? announce('Player 1 Won!') : announce('Player 2 Won!'));
        stopGame();
        return
    }

    if (!boardArr.includes('')) {
        announce('Game Draw');
    }
}

// To update current game board
function updateBoard(index) {
    if (playerTurnCount % 2 == 0) {
        boardArr[index] = 'X';
    } else {
        boardArr[index] = 'O';
    } console.log(boardArr);
}

// To run game when user click tic-tac-toe tiles
function handleClick(event) {

    let thisBox = event.target;
    stopReclick(thisBox);

    if (playerTurnCount % 2 == 0) {
        thisBox.classList.add('x-img');
    } else {
        thisBox.classList.add('o-img');
    }

    updateBoard(Number(thisBox.dataset.number));
    checkResults();
    changePlayer();
}


tiles.forEach(function (tile) {
    tile.addEventListener('click', handleClick)
});

nextRoundBtn.addEventListener('click', handleNextRoundBtn);

newGameBtn.addEventListener('click', handleNewGameBtn);
