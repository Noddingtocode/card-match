const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const cardImages = [
    'images/ai.jpg', 'images/bluesky.jpg', 'images/court.jpg', 'images/food.jpg',
    'images/bluesky.jpg', 'images/court.jpg', 'images/ai.jpg', 'images/food.jpg'
];

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let timer;
let seconds = 0;

// Initialize the game
function initializeGame() {
    cardImages.sort(() => 0.5 - Math.random()); // Shuffle images
    gameBoard.innerHTML = '';
    cards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = '00:00';
    
    for (let i = 0; i < cardImages.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = cardImages[i];
        
        const img = document.createElement('img');
        img.src = cardImages[i];
        card.appendChild(img);
        
        card.addEventListener('click', () => flipCard(card));
        
        gameBoard.appendChild(card);
        cards.push(card);
    }
    
    startTimer();
}

// Flip card function
function flipCard(card) {
    if (card === firstCard || card.classList.contains('flipped') || secondCard) return;
    
    card.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

// Check if two cards match
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedPairs++;
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
    
    moves++;
    movesDisplay.textContent = moves;
    
    if (matchedPairs === cardImages.length / 2) {
        clearInterval(timer);
        alert(`Congratulations! You've completed the game in ${moves} moves and ${formatTime(seconds)}.`);
    }
}

// Reset card selections
function resetCards() {
    firstCard = null;
    secondCard = null;
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
}

// Format time for display
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Replay button functionality
document.getElementById('replay').addEventListener('click', () => {
    clearInterval(timer); // Stop the timer
    initializeGame(); // Reset the game
});

// Initialize the game on page load
initializeGame();
