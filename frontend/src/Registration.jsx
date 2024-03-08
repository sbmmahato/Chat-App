import {useState,useEffect} from 'react';

function Registration(){

    const [password,setPassword]=useState('');
    const [name,setName]=useState('');

    return <div>
        Name:<input onChange={(e)=>{
            setName(e.target.value);
        }} /><br/>
        Password:<input onChange={(e)=>{
            setPassword(e.target.value);
        }} /><br/>
        <button onClick={()=>{
            fetch('http://localhost:3000/adduser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'name':name,
                    'password':password
                }
            }).then((data)=>{return data.json()}).then((value)=>{
                console.log(value);
                localStorage.setItem('token',value.token);
                
                window.location='/ui/'+name;
            })
        }}>Create Account</button>
    </div>
}

export default Registration;