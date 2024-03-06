import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from "@mui/material";

function FriendReq(){

   let {username}=useParams();
   const [name,setName]=useState([]);

   useEffect(()=>{
      fetch('http://localhost:3000/gettingreqsreceived',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'name':username
         }
      }).then((data)=>{return data.json()}).then((x)=>{
         setName(x);
         console.log(x);
      })
   },[]) 
   
    const [user,setUser]=useState('');
    
     return <div><div>
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
     <div>
      {name && name.map((x,index)=>(<UserCard key={index} user={x}/>))}
      </div></div>
}

function UserCard(props){
   return <div style={{border:'1px solid black',height:'100px',width:'270px'}}>
      {props.user.sender}<br/>
      <button  onClick={()=>{
         fetch('http://localhost:3000/acceptingfriendreq',{
            method:'POST',
            headers:{
               'Content-Type':'application/json',
               'sender':props.user.sender,
               'reciever':props.user.reciever
            }
         }).then((data)=>{return data.json()}).then((value)=>{console.log(value)})
      }}>Accept</button>
   </div>
}

export default FriendReq;