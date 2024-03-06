import {Box} from "@mui/material";
import {Outlet,useParams} from "react-router-dom";
import {useState,useEffect,useMemo} from 'react';
import {io} from "socket.io-client";

export default function Ui(){
    // const [users,setUsers]=useState(["subham","sattwik","ayush","sharvil","naveen"]);
    
    let {username}=useParams();

    const socket=useMemo(()=>io("http://localhost:3000/"),[]
    );

    const [chat,setChat]=useState([]);
    const [users,setUsers]=useState([]);
    const [selecter,setSelecter] = useState(null);
    const [message,setMessage]=useState('');


    useEffect(()=>{
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'username':username
            }
        }).then((data)=>{return data.json()}).then((value)=>{
            console.log(value)
            setUsers(value);
        })
    },[])

    // function insertChatData(value){
    //     for(let i=0;i<users.length;i++){
    //         if(users[i].name===value.from){
    //             // users[i].chats.push(value);
    //             setUsers([...users[i].chats,value])
    //         }
    //     }

    //     for(let j=0;j<users.length;j++){
    //         if(users[j].name===value.to){
    //             // users[j].chats.push(value);  
    //             setUsers([...users[j].chats,value])
    //         }
    //     }
    // }

    function insertChatData(value) {
        setUsers(prevUsers => {
            return prevUsers.map(user => {
                if (user.name === value.from || user.name === value.to) {
                    return {
                        ...user,
                        chats: [...user.chats, value]
                    };
                }
                return user;
            });
        });
    }

    useEffect(()=>{
        for(let i=0;i<users.length;i++){
            if(users[i].index===selecter){
                setChat(users[i].chats);
            }else{console.log("not")}
        }
    },[users,selecter])

    // useEffect(() => {
    //     console.log("Chat updated", chat);
    // }, [chat]);

    useEffect(()=>{
        socket.on('connect',()=>{console.log('connected: '+socket.id)
            socket.emit('sending-id',{"name":username,"id":socket.id});
        });console.log('yeahh')
        
        socket.on('recieve-message',(data)=>{
            
            insertChatData(data);console.log(users)
        })

        return ()=>{
             socket.disconnect();
        }
    },[])
    

    return <div style={{paddingLeft:"30vh",paddingRight:"10vh",display:'flex',justifyContent:"center",position:'fixed'}}>
        <div style={{overflowY:'auto'}}>
        <Box sx={{height:"100vh",width:350}}>
            <Box sx={{border:"1px solid black",height:100}}>
                {/* User details here */}
                     {username}<br/>

                    <button onClick={()=>{
                        window.location='/friendReq/'+username;
                    }} >Friend Reqs</button>

            </Box><br/>

            {users.map((user)=>(
                <Box sx={{border:"1px solid black",height:100,borderRadius:3,margin:0.5,
                '&:hover': {
                  bgcolor:'#EEEDEB',
                }}} key={user.index} onClick={()=>{setSelecter(user.index);}}>
                    {selecter===user.index ? (
                        <div style={{height:100,borderRadius:10,margin:0.5,backgroundColor:'#F5EEE6'}}>{user.name}</div>
                    ) : (
                        <div>{user.name}</div>
                    )}
                </Box>
            ))}
        </Box>
        </div>


        <div>
        <Box sx={{border:"1px solid black",height:'12.7vh',width:"100vh",borderRadius:3,margin:0.5}}>
        </Box>

        <Box sx={{border:"1px solid black",height:"70.7vh",width:"100vh",borderRadius:3,margin:0.5,overflowY:'auto'}}>
            
        {selecter != null && chat.map((x,index)=>(<div key={index}>{
            x.from===username ? (
                <div style={{justifyContent:"flex-end",display:"flex"}}> 
                    <ShowMessage mssg={x.message}/>
                </div>
            ) : (
                <div style={{justifyContent:"flex-start",display:"flex"}}>
                    <ShowMessage mssg={x.message}/>     
                </div>
            )
        }</div>))}
            
            
        </Box>

        {/* <Box sx={{border:"1px solid black",height:"9vh",width:"100vh",borderRadius:3,margin:0.5}}>

        </Box> */}
        <input style={{border:"1px solid black",height:"9vh",width:"100vh",borderRadius:12,margin:2.5}} onChange={(e)=>{setMessage(e.target.value)}}></input>
        
        <button onClick={()=>{
            socket.emit('sending-mssg',{"from":username,"to":users[selecter].name,"message":message,"id":socket.id});
        }}>send</button>
        </div> 

    </div>
}


function ShowMessage(props){
    return <div style={{border:"1px solid black",width:"25vh",height:"5vh"}}>
        {props.mssg}
    </div>
}