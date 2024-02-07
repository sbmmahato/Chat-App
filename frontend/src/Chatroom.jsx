
import react from 'react';
import {useParams} from 'react-router-dom';
import {useState,useEffect,useMemo} from 'react';
import {io} from "socket.io-client";


function Chatroom(){
    const socket=useMemo(()=>io("http://localhost:3000/"),[]
    );
    const [message,setMessage]=useState('');
    let {room}=useParams();

    const handleSubmit=()=>{
        // e.preventDefault();
        socket.emit('message',{message,room});
        setMessage("");
    }

    useEffect(()=>{
        socket.emit('join-room',room);
        socket.on("connect",()=>{
            console.log("connected "+ socket.id)
        }); 
        socket.on("receive-message",(value)=>{
            console.log(value);
        })

        return ()=>{
            socket.disconnect();
        }
    },[])
    
    return <div>
        <h1>ROOM: {room}</h1><br/>
        <input onChange={(e)=>{
            setMessage(e.target.value);
        }}/> 
        <button onClick={()=>{
            handleSubmit();
        }}>SEND</button>
    </div>
}

export default Chatroom