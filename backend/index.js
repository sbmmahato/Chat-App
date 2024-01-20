const express = require('express');
const app = express();
const PORT = 4000;


const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} `);
    // socket.emit('message',`welcome ${socket.id}`);
    socket.on('join-room',(roomID)=>{
      socket.join(roomID);
      socket.to(roomID).emit('message');
      
    })
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

// app.post('/roomID', (req,res)=>{
//   // io.sockets.emit('joinedd')
//   socket.join(req.headers.room);
//   io.to(req.headers.room).emit('working',"its working");
//     res.send(req.headers.room);
// })

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



