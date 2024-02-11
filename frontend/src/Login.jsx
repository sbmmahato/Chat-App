import {useState,useEffect} from 'react';

function Login(){
    const [name,setName]=useState('');

    return <div>
        <input onChange={(e)=>{setName(e.target.value)}}/><br/>
        <button onClick={()=>{
            window.location='/ui/'+name;
        }}>SEND</button>
    </div>
}

export default Login;