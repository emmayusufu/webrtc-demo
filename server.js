const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve the index.html file when the root URL is accessed
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle WebSocket connections using Socket.IO
io.on("connection", (socket) => {
  // When an "offer" signal is received from a client
  socket.on("offer", (data) => {
    // Broadcast the "offer" signal to all other connected clients (except the sender)
    socket.broadcast.emit("offer", data);
  });

  // When an "answer" signal is received from a client
  socket.on("answer", (data) => {
    // Broadcast the "answer" signal to all other connected clients (except the sender)
    socket.broadcast.emit("answer", data);
  });

  // When a "candidate" signal is received from a client
  socket.on("candidate", (data) => {
    // Broadcast the "candidate" signal to all other connected clients (except the sender)
    socket.broadcast.emit("candidate", data);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("listening on *:3000");
});
