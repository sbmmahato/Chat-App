import {useState,useEffect} from 'react';

function Registration(){

    const [username,setUsername]=useState('');
    const [name,setName]=useState('');

    return <div>
        Name:<input onChange={(e)=>{
            setName(e.target.value);
        }} /><br/>
        Username:<input onChange={(e)=>{
            setUsername(e.target.value);
        }} /><br/>
        <button onClick={()=>{
            fetch('http://localhost:3000/adduser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'name':name
                }
            }).then((data)=>{data.json()}).then((value)=>{
                console.log(value);
            })
        }}>Submit</button>
    </div>
}

export default Registration;