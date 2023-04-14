//const SocketService = require("./service/socketService.js");

function test() {
    let response = fetch('http://127.0.0.1:3000/ducks/api/channel');
    console.log(response);
};
/*
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    SocketService.emit('send-chat-message', message)
    messageInput.value = ''
})
*/