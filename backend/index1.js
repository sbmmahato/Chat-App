const express = require('express');
const mongoose = require('mongoose');
const app = express();

// const PORT = 4000;


const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/chatDB').then(()=>{console.log('mongodb  connected')})

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


// const userList=[
//     {index:0,name:'Subham',friendList:[{index:0 ,name:"Sattwik",chats:[]},{index:1 ,name:"Ayush",chats:[]}]},
//     {index:1,name:'Sattwik',friendList:[{index:0 ,name:"Subham",chats:[]},{index:1 ,name:"Sharvil",chats:[]}]}
// ]

const userSchema=new mongoose.Schema({
    name: String,
    friendList: [{
        index: Number,name: String,chats: [{from: String,to: String,message: String}]
    }]
});

const socketIds=[];

const userlist = mongoose.model('userlist',userSchema);

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

app.post('/users',async (req,res)=>{
    let username=req.headers.username;
    let user=await userlist.findOne({name:username});console.log(user);
    if(user){
        res.send(user.friendList);
    }else{
        res.status(404).send("not found");
    }
    // console.log(x)   
    // let a=findUser(x,userList);
    // console.log(a.friendList);

    // res.send(a.friendList);
})

// app.post('/getusers',(req,res)=>{
//     const username=req.headers.
// })

app.get('/chats',(req,res)=>{
    res.send(chats);
})

let z=5;
app.post('/adduser',async (req,res)=>{
    // let user={index:z,name:req.headers.name,chats:[]};
    // friendList.push(user);
    // z++;
    // res.send('User added');
    let q=req.headers.username;
    const newUser=await userlist.create({
        name: q,
        friendList: []
    })
    return res.send("done");
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

    socket.on('sending-mssg',(async (data)=>{
        // let datas={"name":data.from,"id":data.id}
        // checkIds(datas,socketIds);
            //  console.log(socketIds);  

        // let destination=findRecipient(data,socketIds);
        // console.log(destination);

        // console.log(data.id);

        // io.to(destination).to(data.id).emit('recieve-message',{"from":data.from,"to":data.to,"message":data.message});

        // addMessage(data,userList)

        //for sender chat update in mongodb
        let sender=await userlist.findOne({name:data.from});
        if(sender){
            sender.friendList.forEach((friend)=>{
                if(friend.name===data.from){
                    friend.chats.push(data);
                }
            })
        }
        await sender.save();
        //for reciever chat update in mongodb
        let reciever=await userlist.findOne({name:data.to});
        if(reciever){
            reciever.friendList.forEach((friend)=>{
                if(friend.name===data.to){
                    friend.chats.push(data);
                }
            })
        }
        await reciever.save();

        let destination=await findRecipient(data,socketIds);

        io.to(destination).to(data.id).emit('recieve-message',{"from":data.from,"to":data.to,"message":data.message});

        // console.log(data)
        //after emit, in client side,  recieve message and push to message data where from =user name;

        //update database
    }))
})

http.listen(3000,()=>{console.log("server running on port 3000")});

