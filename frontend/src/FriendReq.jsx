import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from "@mui/material";

function FriendReq(){
   
    let {username}=useParams();
    const [user,setUser]=useState('');
    
     return <div>
      Enter Username: 
        <input onChange={(e)=>{setUser(e.target.value)}}></input>
        <button onClick={()=>{
         fetch('http://localhost:3000/sendingfriendreq',{
            method:'POST',
            headers:{
               'Content-Type':'application/json',
               'sender':username,
               'reciever':user 
            }
         }).then((data)=>{return data.json() }).then((value)=>{
            console.log(value);
         })
        }}>ADD</button>{username}<br/><br/>
        {/* <UserCard user={user}/> */}
     </div>
}

function UserCard(props){
   return <div style={{border:'1px solid black',height:'100px',width:'270px'}}>
      {props.user}
   </div>
}

export default FriendReq;