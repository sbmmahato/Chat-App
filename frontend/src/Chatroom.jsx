// import * as React from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
import {useState,useEffect} from 'react';

// let { roomID } = useParams();

function Chatroom() {
    const [chat,setChat]=useState('');
 
    useEffect(()=>{
        socket.on("message",(value)=>{
            console.log(value);
        })
    },[])

    
    return <div>
        <div style={{width:'50vh', height:'50vh', border:'2px solid black'}}>
    </div>
    <input onChange={(e)=>{
        setChat(e.target.value);
    }}></input>
    {/* <button onClick={()=>{
        fetch('http://localhost:4000/roomID',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "room":roomID
            }
        }).then((data)=>{return data.json()}).then((value)=>{console.log(value)});
    }}>SEND</button> */}

    <button onClick={()=>{
        // socket.emit('join-room',)
    }}>SEND</button>
    </div>
}

export default Chatroom