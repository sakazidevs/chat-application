const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('send message', (data) => {
    io.emit('receive message', data);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('user typing');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
