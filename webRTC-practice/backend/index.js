const express = require('express');
const app = express();
// const PORT = 4000;


const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());

function checkIds(data,array){
    let found=false;
    for(let i=0;i<array.length;i++){
        if(array[i].name===data.name){
            array[i]=data;
            found=true;
            break;
        }
        if(!found){
            array.push(data)
        }
    }
}

function findRecipient(value,array){
    for(let i=0;i<array.length;i++){
        if(array[i].name===value.to){
            return array[i].id;
        }
    }
}

const friendList=[{index:0 ,name:"Subham",chats:[]},{index:1 ,name:"Sattwik",chats:[]},{index:2 ,name:"Ayush",chats:[]},{index:3 ,name:"Sharvil",chats:[]},{index:4 ,name:"Naveen",chats:[]}]; 

const socketIds=[];

// const chats= [{name:'Subham',message:"hello hru"},{name:'Ayush',message:"kya kr he ho"},{name:'Subham',message:"hello hru"},{name:'Subham',message:"hello hru"},{name:'Subham',message:"hello hru"},{name:'Subham',message:"hello hru"},{name:'Subham',message:"hello hru"}];

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.get('/',(req,res)=>{
    res.send("yoo");
})

app.get('/users',(req,res)=>{
    res.send(friendList);
})

app.get('/chats',(req,res)=>{
    res.send(chats);
})

// io.on("connection",(socket)=>{
//     console.log(`User connected ${socket.id}`);
//     socket.on('join-room',(value)=>{
//         // roomID=value;
//         socket.join(value);
//     })
//     socket.on('message',({message,room})=>{
//         console.log(message);
        
//         io.to(room).emit('receive-message',message);
//     })  

// })

io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`);
    socket.on('sending-mssg',((data)=>{
        let datas={"name":data.from,"id":data.id}
        checkIds(datas,socketIds);

        let destination=findRecipient(data,socketIds);
        io.to(destination).to(data.id).emit('recieve-message',{"from":data.from,"to":data.to,"message":data.message});
        console.log(data)
        //after emit, in client side,  recieve message and push to message data where from =user name;

        //update database
    }))
})

http.listen(3000,()=>{console.log("server running on port 3000")});

