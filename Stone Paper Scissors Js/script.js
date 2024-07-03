const choices = ['rock', 'paper', 'scissors'];
let userScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
let winningStreak = 0;
let currentStreak = 0;

const userScoreElement = document.querySelector('.user-score');
const computerScoreElement = document.querySelector('.computer-score');
const messageElement = document.querySelector('.msg');
const gamesPlayedElement = document.querySelector('.games-played');
const winningStreakElement = document.querySelector('.winning-streak');

document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});
document.getElementById('reset-btn').addEventListener('click', resetGame);

function playGame(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(userChoice, computerChoice);
    updateScores(result);
    updateStats(result);
    messageElement.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result.charAt(0).toUpperCase() + result.slice(1)}!`;
}

function getResult(user, computer) {
    if (user === computer) return 'draw';
    if ((user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')) return 'win';
    return 'lose';
}

function updateScores(result) {
    if (result === 'win') {
        userScore++;
        currentStreak++;
    } else if (result === 'lose') {
        computerScore++;
        currentStreak = 0;
    }
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

function updateStats(result) {
    gamesPlayed++;
    if (currentStreak > winningStreak) winningStreak = currentStreak;
    gamesPlayedElement.textContent = gamesPlayed;
    winningStreakElement.textContent = winningStreak;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    winningStreak = 0;
    currentStreak = 0;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    gamesPlayedElement.textContent = gamesPlayed;
    winningStreakElement.textContent = winningStreak;
    messageElement.textContent = 'Play your move!';
}
