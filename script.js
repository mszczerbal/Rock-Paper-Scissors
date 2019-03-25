let numbers = 0;
let wins = 0;
let draws = 0;
let losses = 0;
let playerChoice = '';
let aiChoice = '';

const choices = [...document.querySelectorAll('.select img')];

function choiceSelection() {
    playerChoice = this.dataset.option;
    choices.forEach(choice => choice.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px red';
}

function aiSelection() {
    return choices[Math.floor(Math.random()*3)].dataset.option;
}

function checkResult(player, ai) {
    if(player == ai) {
        return 'draw';
    } else if((player == 'papier' && ai == 'kamień') || (player == 'kamień' && ai == 'nożyczki') || (player == 'nożyczki' && ai == 'papier')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function publishResult (player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('.numbers span').textContent = ++numbers;

    if(result == 'win') {
        document.querySelector('.wins span').textContent = ++wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygraliśmy!';
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
    } else if (result == 'loss') {
        document.querySelector('.losses span').textContent = ++losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'Przegraliśmy!';
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
    } else {
        document.querySelector('.draws span').textContent = ++draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis';
        document.querySelector('[data-summary="who-win"]').style.color = 'gray';
    }
}

function endGame() {
    document.querySelector('[data-option="'+ playerChoice +'"]').style.boxShadow = '';
}

function startGame() {
    if(!playerChoice) return alert('Nie dokonałeś wyboru!');

    aiChoice = aiSelection();

    const gameResult = checkResult(playerChoice, aiChoice);

    publishResult(playerChoice, aiChoice, gameResult);

    endGame();
}

choices.forEach(choice => choice.addEventListener('click', choiceSelection));

document.querySelector('.start').addEventListener('click', startGame);

