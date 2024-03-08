import {useState,useEffect} from 'react';

function Login(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    return <div>
        Username: <input onChange={(e)=>{setName(e.target.value)}}/><br/>
        Password: <input onChange={(e)=>{setPassword(e.target.value)}}/><br/>

        <button onClick={()=>{
            fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'name':name,
                    'password': password
                }
            }).then((data)=>{return data.json()}).then((value)=>{
                localStorage.setItem('token',value.token);
                window.location='/ui/'+name;
            })

        }}>SEND</button>
    </div>
}

export default Login;