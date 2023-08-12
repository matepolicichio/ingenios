const images = [
    '../../static/webapp/img/game/image1.svg',
    '../../static/webapp/img/game/image2.svg',
    '../../static/webapp/img/game/image3.svg',
    '../../static/webapp/img/game/image4.svg',
    '../../static/webapp/img/game/image5.svg',
    '../../static/webapp/img/game/image6.svg',
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createLogo(imageUrl) {
    const logoElement = document.createElement('div');
    logoElement.classList.add('plogo', 'col-md-2', 'col-4');

    const logoInnerElement = document.createElement('div');
    logoInnerElement.classList.add('plogo-inner');

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;

    logoInnerElement.appendChild(imgElement);
    logoElement.appendChild(logoInnerElement);

    return logoElement;
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
                            alert('Buen trabajo!!!');
                        }, 500); // Delay to allow last card to flip
                        initialize();
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


function removeAllChildElements(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}


function Jugar() {

    removeAllChildElements(logoContainer);
    removeAllChildElements(gameContainer);

    const gameShuffledImages = shuffle([...images, ...images]);
    gameShuffledImages.forEach(imageUrl => {
        const card = createCard(imageUrl);
        gameContainer.appendChild(card);
    });

    logoContainer.classList.add('ocultar');
    gameContainer.classList.remove('ocultar');
}

function initialize() {

    matchedPairs = 0;

    const logoContainer = document.getElementById('logo-container');
    const gameContainer = document.getElementById('game-container');
    removeAllChildElements(logoContainer);
    removeAllChildElements(gameContainer);

    const logoShuffledImages = shuffle(images);
    logoShuffledImages.forEach(imageUrl => {
        const logo = createLogo(imageUrl);
        logoContainer.appendChild(logo);
    });

    logoContainer.classList.remove('ocultar');
    gameContainer.classList.add('ocultar');
}


let flippedCards = [];
let matchedPairs;

const logoContainer = document.getElementById('logo-container');
const gameContainer = document.getElementById('game-container');

initialize();

// const btnJugar = document.getElementById('btn-jugar');
// btnJugar.addEventListener('click', () => {
//     Jugar();
// });