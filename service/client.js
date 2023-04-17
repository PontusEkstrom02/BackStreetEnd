const Socket = io("ws://127.0.0.1:3000", {
  extraHeaders: {
    username: "Greta"
  }
}); //clientSocket


Socket.on("connection", resp => {
  console.log(resp);
});

Socket.on("public", msg => {
  console.log("Bob Public", msg)
})

Socket.on("private", msg => {
  console.log("Bob Private", msg);
})