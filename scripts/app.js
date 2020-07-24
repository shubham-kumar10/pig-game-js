/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-' + 0).textContent = 'Player 0';
    document.getElementById('name-' + 1).textContent = 'Player 1';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
}



// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<b>' + dice + '</b >'

// function btn() {
//     //Do something
// }

// document.querySelector('.btn-roll').addEventListener('click', btn);

/* Anonymous Function
document.querySelector('btn-roll').addEventListener('click', function() {
    //Do something
});
*/

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1.Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = './assets/dice-' + dice + '.png';
        // 3. Add value if not 1 and display round score.
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            changeActivePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current Score to Global Score
        scores[activePlayer] += roundScore;
        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            changeActivePlayer();
        }
    }
});

function changeActivePlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);