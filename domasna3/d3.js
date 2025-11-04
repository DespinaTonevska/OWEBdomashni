const board = document.getElementById('board');
const attemptsSpan = document.getElementById('attempts');
const message = document.getElementById('message');

// Симболи за празнични карти
let symbols = ['🎅','🎄','❄️','🎁','⛄','🕯️'];
symbols = [...symbols, ...symbols]; // секој симбол двапати

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matches = 0;

// Функција за мешање на картите
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Креирање на таблата
function createBoard() {
    const shuffled = shuffle(symbols);
    shuffled.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Функција за кликање на карта
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('open');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsSpan.textContent = attempts;

    checkForMatch();
}

// Проверка за совпаѓање
function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;
        resetCards();
        if (matches === symbols.length / 2) {
            message.textContent = `Браво! Ги најде сите парови за ${attempts} обиди.`;
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetCards();
        }, 1000);
    }
}

// Ресетирање на променливите
function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

createBoard();