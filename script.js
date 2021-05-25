(function(){
    // all possible combinations of winning the game
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
    
    // internal representation of the gameboard
    let gameState = [
        '','','',
        '','','',
        '','',''
    ];


    // determines who the turn player is
    let currentPlayer = 'X'

    // scores for X and O for the match 
    let xScore = 0;
    let oScore = 0;

    // cashe the DOM 
    const cells = document.querySelectorAll('.game-board-cell');
    const restartButton = document.querySelector('button')
    const messageContainer = document.querySelector('.win-loss-modal')
    const xScoreContainer = document.querySelector('.score-boardX')
    const oScoreContainer = document.querySelector('.score-boardO')

    // displays the winning or tie message when game is complete
    const roundWon = function(winner) {
        messageContainer.classList.remove('hidden')

        const message = document.querySelector('p')
        message.textContent = `${winner} is the winner!`
        if(winner === 'draw'){
            message.textContent = `Game is a draw! Try Again :)`
        }
    };
    
    /* checks after every click if the game has been won or every 
       space has been filled (this being a tie) */
    const checkWin = function(){
        // variable to track if the game has playable moves left
        let roundStatus = false;
        // loops through win conditions array
        for(let i = 0; i <= 7; i++) {
            /* takes one of the win condition arrays from the complete set
            of win conditions and assigns them to the win condition variable 
            to be checked if the board state is equal to one of the win
            conditions
            */
            const winCondition = winningConditions[i];
            // these consts are the individal squares being checked for 3 in a row
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            
            // if one of the consts is empty win is impossible and flow continues
            if(a === '' || b === '' || c === ''){
                continue
            }
            /* if a, b, and c are all X's or O's than round is over and winner is
            displayed */
            if(a === b && b === c){
                roundStatus = true;
                updateMatchScore(a)
                break
            }
            /* if the gamestate array doesn't have an empty string and no winner
            has been chosen then the game is a tie */
            if (!gameState.includes('')) {
                roundWon('draw')
    
            }
            
        } 
        // calls winning/tie message if after the check roundStatus is true
        if(roundStatus){
            roundWon(currentPlayer)
        } 
    }

    /* checks to see if the space clicked is empty or not. If it's not empty
       then execution is stopped and no move can be made */
    const checkPlayedSpace = function(event){
       if(event.textContent === ''){
           return true
       } else if(event.classList.contains('hover')){
           event.classList.remove('hover')
           return true
       } else {
           return false
       }
        
    }

    // calls helper functions whenever the click event fires
    const handleCellClick = function(clickEvent){
        const cellClicked = clickEvent.target;
        const cellClickedIndex = cellClicked.getAttribute('data-cell-index')
        if(checkPlayedSpace(cellClicked)){
            gameState[cellClickedIndex] = currentPlayer;
            cellClicked.textContent = currentPlayer;
            checkWin();
            swapPlayer();
        } else {
            return
        }
       
    }

    const updateMatchScore = function(player){
        if(player === 'X'){
            xScore++
            xScoreContainer.textContent = `X: ${xScore}`
        } else if(player === 'O'){
            oScore++
            oScoreContainer.textContent = `O: ${oScore}`
        }
    }
    
    const swapPlayer = function(){
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function restartGame(){
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = '')
        messageContainer.classList.add('hidden')
    }

    // hovers the current player piece if square is empty 
    const hoverPlayerPiece = function(e){
        if(e.target.textContent === ''){
            e.target.textContent = currentPlayer;
            e.target.classList.add('hover')
        } else if(e.target.classList.contains('hover')){
            e.target.textContent = ''
            e.target.classList.remove('hover')
        }
    }

    // Event Listeners

    // adds hover effect when mouseover the square
    cells.forEach(function(cell){
        cell.addEventListener('mouseover', hoverPlayerPiece)
    })

    // removes hover effect when mouse leaves the square
    cells.forEach(function(cell){
        cell.addEventListener('mouseout', hoverPlayerPiece)
    })

    restartButton.addEventListener('click', restartGame)

    cells.forEach(function(cell){
        cell.addEventListener('click', handleCellClick)
    })

})();