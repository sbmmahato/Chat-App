import {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    return <center style={{paddingTop:'20vh'}}><div style={{width:'40vh',height:'35vh',border:'1px solid gray',paddingLeft:'2vh',paddingRight:'2vh',paddingTop:'10vh',paddingBottom:'10vh',borderRadius:'1vh' }}>
        <h2>Login to your Account</h2>
        {/* Username: <input onChange={(e)=>{setName(e.target.value)}}/><br/> */}
        {/* Password: <input onChange={(e)=>{setPassword(e.target.value)}}/><br/> */}
        <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
        <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>

        <Button variant="contained" onClick={()=>{
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

        }}>LOG IN</Button>
    </div></center>
}

export default Login;