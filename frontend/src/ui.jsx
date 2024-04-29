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
    // http://localhost:3000/users
    
    useEffect(()=>{
        fetch('http://localhost:3000/users',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'username':username,
                'authorization':'Bearer '+localStorage.getItem('token')
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
            if(i===selecter){
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
    

    return <div style={{paddingLeft:"30vh",paddingRight:"30vh",display:'flex',justifyContent:"center",position:'fixed',backgroundColor:'#252837',top:
    '0px',left:'0px', right:'0px'}}>
        <div style={{overflowY:'auto'}}>
        <Box sx={{height:"100vh",width:350}}>
            <Box sx={{border:"1px solid black",height:100,backgroundColor:'#303346'}}>
                {/* User details here */}
                     {username}<br/>

                    <button onClick={()=>{
                        window.location='/friendReq/'+username;
                    }} >Friend Reqs</button>

            </Box><br/>

            {users.map((user,index)=>(
                <Box sx={{border:"1px solid black",height:70,borderRadius:3,margin:0.5,color:'white',textAlign:'center', fontSize: '1.5em',
                '&:hover': {
                  bgcolor:'#2f3241',
                }}} key={index} onClick={()=>{setSelecter(index);}}>
                    {selecter===index ? (
                        <div style={{height:70,borderRadius:10,backgroundColor:'#6785ff'}}>{user.name}</div>
                    ) : (
                        <div>{user.name}</div>
                    )}
                </Box>
            ))}
        </Box>
        </div>


        <div>
        <Box sx={{border:"1px solid black",height:'12.7vh',width:"100vh",borderRadius:3,margin:0.5,backgroundColor:'#303346'}}>
        </Box>

        <Box sx={{border:"1px solid black",height:"70.7vh",width:"100vh",borderRadius:3,margin:0.5,overflowY:'auto',backgroundColor:'#1d1f2b'}}>
            
        {selecter != null && chat.map((x,index)=>(<div key={index}>{
            x.from===username ? (
                <div style={{justifyContent:"flex-end",display:"flex",padding:'0.5vh'}}> 
                    <ShowMessage mssg={x.message} color={'#6785ff'}/>
                </div>
            ) : (
                <div style={{justifyContent:"flex-start",display:"flex",padding:'0.5vh'}}>
                    <ShowMessage mssg={x.message} color={'#303346'
}/>     
                </div>
            )
        }</div>))}
            
            
        </Box>

        {/* <Box sx={{border:"1px solid black",height:"9vh",width:"100vh",borderRadius:3,margin:0.5}}>

        </Box> */}
        <input style={{border:"1px solid black",height:"7vh",width:"92vh",borderRadius:12,margin:2.5,backgroundColor:'#303346',color:'white'}} onChange={(e)=>{setMessage(e.target.value)}}></input>
        
        <button style={{height:'7vh',width:'7vh',borderRadius:'2vh',backgroundColor:'#6785ff',color:'white'}} onClick={()=>{
            socket.emit('sending-mssg',{"from":username,"to":users[selecter].name,"message":message,"id":socket.id});
        }}><b>SEND</b></button>
        </div> 

    </div>
}


function ShowMessage(props){
    return <div style={{border:"1px solid black",backgroundColor:props.color,padding:'2vh',borderRadius:'1vh',color:'#FFFFFF'}}>
        {props.mssg}
    </div>
}

//2