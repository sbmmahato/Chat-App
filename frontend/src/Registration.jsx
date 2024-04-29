import {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Registration(){

    const [password,setPassword]=useState('');
    const [name,setName]=useState('');

    return <center style={{paddingTop:'20vh'}}><div style={{width:'40vh',height:'35vh',border:'1px solid gray',paddingLeft:'2vh',paddingRight:'2vh',paddingTop:'10vh',paddingBottom:'10vh',borderRadius:'1vh' }}>
        {/* Name:<input onChange={(e)=>{
            setName(e.target.value);
        }} /><br/>
        Password:<input onChange={(e)=>{
            setPassword(e.target.value);
        }} /><br/> */}
        <h2>Create Account</h2>

        <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
        <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
        <Button variant="contained" onClick={()=>{
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
        }}>Create Account</Button>
    </div></center>
}

export default Registration;

