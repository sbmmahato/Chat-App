import react from 'react';
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';

export default function SelectRoom(){
    
    const [room,setRoom]=useState('');

    return <div>
        ENTER ROOM<br/>
        <input onChange={(e)=>{
            setRoom(e.target.value);
        }} />
        <button onClick={()=>{
            window.location='/chatroom/'+room;
        }}>SEND</button>
    </div>
}