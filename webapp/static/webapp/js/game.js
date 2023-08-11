const images = [
    '../../static/webapp/img/game/image1.svg',
    '../../static/webapp/img/game/image2.svg',
    '../../static/webapp/img/game/image3.svg',
    '../../static/webapp/img/game/image4.svg',
    '../../static/webapp/img/game/image5.svg',
    '../../static/webapp/img/game/image6.svg',
];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(imageUrl) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'col-md-2', 'col-4');
    
    const cardInnerElement = document.createElement('div');
    cardInnerElement.classList.add('card-inner');
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    
    cardInnerElement.appendChild(imgElement);
    cardElement.appendChild(cardInnerElement);
    
    cardElement.addEventListener('click', () => {
        if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
            cardElement.classList.add('flipped');
            flippedCards.push(cardElement);
            
            if (flippedCards.length === 2) {
                const card1 = flippedCards[0].querySelector('img').src;
                const card2 = flippedCards[1].querySelector('img').src;
                
                if (card1 === card2) {
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === images.length) {
                        setTimeout(() => {
                            alert('Congratulations! You won!');
                        }, 500); // Delay to allow last card to flip
                    }
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => card.classList.remove('flipped'));
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
    });
    
    return cardElement;
}

function initializeGame() {
    const gameContainer = document.getElementById('game-container');
    const shuffledImages = shuffle([...images, ...images]);
    
    shuffledImages.forEach(imageUrl => {
        const card = createCard(imageUrl);
        gameContainer.appendChild(card);
    });
}

initializeGame();

