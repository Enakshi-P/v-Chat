const socket = io('http://localhost:8000');


//Get DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('alert_tone.mp3');

//Function which will append event info to the container
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
//For audio
    if(position=='left')
    {
        audio.play();
    }
}

//Ask user his/her name and let the server know
const namee = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', namee);

//If a new user joins receive his/her name from the server
socket.on('user-joined', namee =>{
    append(`${namee} joined the chat`, 'right');
})

//If server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.namee}: ${data.message}`, 'left');
})

//If the user leaves the chat, append the info to the container
socket.on('left', namee =>{
    append(`${namee} left the chat`, 'left');
})

//If the form gets submitted, send the message to the server
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, `right`);
    socket.emit(`send`, message);
    messageInput.value = ' '
})
