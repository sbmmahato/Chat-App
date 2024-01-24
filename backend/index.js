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

var roomid;

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} `);
    // socket.emit('message',`welcome ${socket.id}`);
    socket.on('join-room',(roomID)=>{
      // xyz=roomID;
      socket.join(roomID);
      roomid=roomID;
      socket.to(roomID).emit('message');
      // socket.on('chat',(data)=>{console.log(data)})
      console.log(roomid)
    })
    
    socket.join(roomid);
    socket.on('chat',(data)=>{
       socket.to(roomid).emit('chat-recieved',data);
    })
});

// io.on('chat',(socket)=>{
//   console.log('reached io.on 2nd')
//   socket.on('chat',(data)=>{
//     socket.to(roomid).emit('chat-recieved',data)
//   })
// })

// console.log(xyz);
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



