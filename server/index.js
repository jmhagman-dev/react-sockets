const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log('sending message to client', data);
    const status = ['building', 'placing', 'finishing', 'done'];
    socket.emit('messageResponse', {
      message: 'received build request'
    })
    let i = 0;
    let interval = setInterval(function () {
      
      if (i === 3) {
        clearInterval(interval);
      }
      socket.emit('messageResponse', {
        status: status[i]
      })
      i++
    }, 4000);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/api', (req, res, next) => {
  res.status(200).send({ message: 'welcome' });
});

server.listen(port, () => {
  console.log('server running on ' + port);
});
