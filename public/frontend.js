const SocketService = require("./service/socketService.js");
const messageForm = document.getElementById('send-contaier')
const messageInput = document.getElementById('message-input')

SocketService.on('chat-message', data => {
    console.log(data)
})
/*
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    SocketService.emit('send-chat-message', message)
    messageInput.value = ''
})
*/