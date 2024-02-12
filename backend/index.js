const express = require('express');
const mongoose = require('mongoose');
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
    }
    if(!found){
        array.push(data)
    }
}

function findRecipient(value,array){
    for(let i=0;i<array.length;i++){
        if(array[i].name===value.to){
            return array[i].id;
        }
    }
}

function findUser(value,arr){
    for(let i=0;i<arr.length;i++){
        if(value===arr[i].name){
            return arr[i];
        }
    }
    return null;
}
//adding message to database below
function addMessage(data,array){
    
    for(let i=0;i<array.length;i++){
        if(array[i].name===data.from){
            // addMessage(data.to,array[i].friendList)
            for(let z=0;z<array[i].friendList.length;z++){
                if(data.to===array[i].friendList.name){
                    array[i].friendList.chats.push(data);
                }
            }
        }
    }
}

// const friendList=[{index:0 ,name:"Subham",chats:[]},{index:1 ,name:"Sattwik",chats:[]},{index:2 ,name:"Ayush",chats:[]},{index:3 ,name:"Sharvil",chats:[]},{index:4 ,name:"Naveen",chats:[]}]; 

const userList=[
    {index:0,name:'Subham',friendList:[{index:0 ,name:"Sattwik",chats:[]},{index:1 ,name:"Ayush",chats:[]}]},
    {index:1,name:'Sattwik',friendList:[{index:0 ,name:"Subham",chats:[]},{index:1 ,name:"Sharvil",chats:[]}]}
]

const userSchema=new mongoose.Schema({
    index: mongoose.Schema.Types.ObjectId,
    name: String,
    friendList: [{
        index: mongoose.Schema.Types.ObjectId,name: String,chats: [{from: String,to: String,message: String}]
    }]
});

const socketIds=[];

const User = mongoose.model('User',userSchema);

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

app.post('/users',(req,res)=>{
    let x=req.headers.username;
    // console.log(x)
    let a=findUser(x,userList);
    console.log(a.friendList);
    res.send(a.friendList);
})

// app.post('/getusers',(req,res)=>{
//     const username=req.headers.
// })

app.get('/chats',(req,res)=>{
    res.send(chats);
})

let z=5;
app.post('/adduser',(req,res)=>{
    let user={index:z,name:req.headers.name,chats:[]};
    friendList.push(user);
    z++;
    res.send('User added');
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

    socket.on('sending-id',(info)=>{
        checkIds(info,socketIds);
        console.log(socketIds);
    })

    socket.on('sending-mssg',((data)=>{
        let datas={"name":data.from,"id":data.id}
        // checkIds(datas,socketIds);
            //  console.log(socketIds);     
        let destination=findRecipient(data,socketIds);
        console.log(destination);
        // console.log(data.id);
        io.to(destination).to(data.id).emit('recieve-message',{"from":data.from,"to":data.to,"message":data.message});
        addMessage(data,userList)
        // console.log(data)
        //after emit, in client side,  recieve message and push to message data where from =user name;

        //update database
    }))
})

http.listen(3000,()=>{console.log("server running on port 3000")});

