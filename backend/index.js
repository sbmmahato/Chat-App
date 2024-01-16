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

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id} `);
//     socket.on('message', (value) => {
//       console.log('message: '+value);
//         io.emit('message',value);
//     });
// });

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.post('/roomID', (req,res)=>{
    io.on('connection', (socket)=>{
        console.log("yoo");
        socket.join(req.headers.room).emit('xyz',(value)=>{console.log('joined'+value)});
    })
    res.send(req.headers.room);
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



