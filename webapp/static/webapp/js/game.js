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

            if (!isPlaying) {
                isPlaying = true;
                startTimer();
            }

            cardElement.classList.add('flipped');
            flippedCards.push(cardElement);

            if (flippedCards.length === 2) {
                const card1 = flippedCards[0].querySelector('img').src;
                const card2 = flippedCards[1].querySelector('img').src;

                incrementRounds();

                if (card1 === card2) {
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === images.length) {
                        stopTimer();
                        const seconds = getTimerValue(); // Get the total time interval in seconds
                        setTimeout(() => {
                            alert(`Felicitaciones! Lo hiciste en ${totalRounds} rondas y ${seconds} segundos!!`);
                        }, 500); // Delay to allow last card to flip
                        gameContainer.classList.add('ocultar');
                        gameChat.classList.remove('ocultar'); 
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

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = `Tiempo: ${seconds} segundos`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function getTimerValue() {
    const timerElement = document.getElementById('timer');
    const timerText = timerElement.textContent;
    const seconds = parseInt(timerText.split(' ')[1]); // Extract the seconds value
    return seconds;
}

function resetTimerAndRounds() {
    stopTimer();
    document.getElementById('timer').textContent = 'Tiempo: 0 segundos';
    totalRounds = 0; // Reset the number of rounds
    const roundsElement = document.getElementById('rounds');
    roundsElement.textContent = 'Rondas: 0'; // Update the rounds display
}

function incrementRounds() {
    totalRounds++;
    const roundsElement = document.getElementById('rounds');
    roundsElement.textContent = `Rondas: ${totalRounds}`;
}


function Jugar() {

    matchedPairs = 0;
    isPlaying = false; // Reset the isPlaying variable
    resetTimerAndRounds(); // Reset the timer when initializing the game

    removeAllChildElements(logoContainer);
    removeAllChildElements(gameContainer);

    const gameShuffledImages = shuffle([...images, ...images]);
    gameShuffledImages.forEach(imageUrl => {
        const card = createCard(imageUrl);
        gameContainer.appendChild(card);
    });

    logoContainer.classList.add('ocultar');
    gameContainer.classList.remove('ocultar');
    gameScore.classList.remove('ocultar');
    gameChat.classList.add('ocultar');
}

function initialize() {

    matchedPairs = 0;
    isPlaying = false;
    resetTimerAndRounds();

    // const logoContainer = document.getElementById('logo-container');
    // const gameContainer = document.getElementById('game-container');
    removeAllChildElements(logoContainer);
    removeAllChildElements(gameContainer);

    const logoShuffledImages = shuffle(images);
    logoShuffledImages.forEach(imageUrl => {
        const logo = createLogo(imageUrl);
        logoContainer.appendChild(logo);
    });

    logoContainer.classList.remove('ocultar');
    gameContainer.classList.add('ocultar');
    gameScore.classList.add('ocultar');
    gameChat.classList.add('ocultar');
    
}

let flippedCards = [];
let matchedPairs;

let timerInterval; // Variable to store the timer interval
let totalRounds = 0;
let isPlaying = false; // Boolean variable to track if the game is being played

const logoContainer = document.getElementById('logo-container');
const gameContainer = document.getElementById('game-container');
const gameScore = document.getElementById('game-score');
const gameChat = document.getElementById('game-chat');

initialize();

const btnJugar = document.getElementById('btn-jugar');
btnJugar.addEventListener('click', () => {
    Jugar();
});


//CODEX code-------------------------------------------------------------------

const SERVER_DELAY = 2000; // 2 seconds (adjust as needed)

const form = document.querySelector('#game-chat form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''
    loadInterval = setInterval(() => {
        // update the text content of the loading indicator
        element.textContent += '.';

        //if the loading indicator has reached 3 dots, reset
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let i = 0

    let interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i)
            i++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? '../../static/webapp/img/bot/bot.svg' : '../../static/webapp/img/bot/user.svg'} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)
    //user's chatstripe
    //chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    //to clear the textarea input
    form.reset()

    //bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)
    // messageDiv.innerHTML = "..."
    loader(messageDiv)


    // Simulate server response with a delay
    setTimeout(async () => {
        const response = {
            ok: true,
            json: async () => ({ bot: "¡Gracias por jugar y disfrutar del juego de memoria! La manera en que participamos en este desafío revela aspectos fascinantes de nuestra personalidad. Reducir al máximo el número de rondas y completar la partida en el menor tiempo posible es un desafío verdaderamente complicado.\n      \nSe requiere un enfoque excepcional y la capacidad de utilizar nuestra memoria a corto plazo, todo mientras enfrentamos decisiones cruciales bajo presión.\n        \nCada partida es una oportunidad para medir nuestra agudeza mental y resiliencia en situaciones exigentes.\n    \n¡Sigue jugando y superándote a ti mismo!" }), // Simulated response data
        };

        // Your original code to handle the response after the server delay
        clearInterval(loadInterval);
        messageDiv.innerHTML = " ";

        if (response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'
            typeText(messageDiv, parsedData);
        } else {
            const err = await response.text();
            messageDiv.innerHTML = "Something went wrong";
            alert(err);
        }
    }, SERVER_DELAY);
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
})
