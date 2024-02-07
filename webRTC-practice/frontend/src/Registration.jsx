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
        <button>Submit</button>
    </div>
}

export default Registration;