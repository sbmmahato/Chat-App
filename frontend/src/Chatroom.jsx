// import * as React from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
import {useState,useEffect} from 'react';

 let id=0;
// const messages=[];

// let { roomID } = useParams();

function Chatroom() {
    const [chat,setChat]=useState('');
    const [messages,setMessages]=useState([]);
 
    useEffect(()=>{
        socket.on("chat-recieved",(value)=>{
            messages.push({value});
            
            console.log(messages);
        }) 
    },[])

    
    return <div>
        <div style={{width:'50vh', height:'50vh', border:'2px solid black'}}>
    </div>
    <input onChange={(e)=>{
        setChat(e.target.value);
    }}></input>
    <button onClick={()=>{
        socket.emit('chat',chat);
        id++;                   
    }}>SEND</button>
    {/* {messages[0]} */}
    
    {/* <Chats messages={messages} /> */}

    <ul>
        {messages.map(message => (
          <div>{message.value}</div>
        ))}
      </ul>
    </div>
}

export default Chatroom

function Chats(props){
    
    // props.messages.map(x=>{
    //     return <div>{x}</div>
    // })
    for(let i=0;i<props.messages.length;i++){
        return <div>
            {props.messages[i]}
        </div>
    }
    
}