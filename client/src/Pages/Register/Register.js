import React,{useState} from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,SetError]=useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            SetError(false);
            const res = await axios.post("/auth/register",{username,email,password});
            res.data && window.location.replace('/login')
        }
        catch(err){
            SetError(1);
        }
    }
    return (
        <div className='register'>
            <span className='registerTitle'>Registor</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>UserName</label>
                <input 
                    type="text" 
                    placeholder='Enter your name...' 
                    className='registerInput'
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder='Enter your Email...' 
                    className='registerInput'
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder='Enter your Password...' 
                    className='registerInput'
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button className='registerButton' type="submit">Register</button>
                {error && <p style={{"color":"red"}}>Username or Email already exists</p>}
            </form>
            <button className='registerLoginButton' type = "submit">
                <Link className='link' to='/login'>Login</Link>
            </button>
        </div>
    )
}

export default Register;