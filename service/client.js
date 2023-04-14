//idk ifall jag använder detta
const bobSocket = io("ws://127.0.0.1:3000", {
  extraHeaders: {
    username: "Bob"
  }
}); //clientSocket

const gretaSocket = io("ws://127.0.0.1:3000", {
  extraHeaders: {
    username: "Greta"
  }
}); //clientSocket


bobSocket.on("connection", resp => {
  console.log(resp);
});

bobSocket.on("public", msg => {
  console.log("Bob Public", msg)
})

bobSocket.on("private", msg => {
  console.log("Bob Private", msg);
})

gretaSocket.on("public", msg => {
  console.log("Greta Public", msg)
})

gretaSocket.on("private", msg => {
  console.log("Greta Private", msg);
})