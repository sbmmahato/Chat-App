import {useState,useEffect} from 'react';

function Login(){
    const [name,setName]=useState('');

    return <div>
        <input onChange={(e)=>{setName(e.target.value)}}/><br/>
        <button onClick={()=>{
            fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'name':name
                }
            }).then((data)=>{return data.json()}).then((value)=>{
                localStorage.setItem('token',value.token);
                window.location='/ui/'+name;
            })

        }}>SEND</button>
    </div>
}

export default Login;