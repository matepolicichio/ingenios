const SERVER_DELAY = 2000; // 2 seconds (adjust as needed)

const form = document.querySelector('form')
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
            json: async () => ({ bot: "Hello, I am the bot!" }), // Simulated response data
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
        handleSubmit(e)
    }
})






