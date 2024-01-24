import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
import {useState,useEffect} from 'react';

function Home(){
    const [room,setRoom]=useState('');
    return <div>
        <input onChange={(e)=>{
            setRoom(e.target.value);
        }}></input><br/><br/>
        <button onClick={()=>{
            socket.emit('join-room',room)
            
            socket.on('message',()=>{
                console.log("welcom dude")
            })
            window.location="/chatroom/"+room;
        }}>JOIN</button>

    </div>
}

export default Home