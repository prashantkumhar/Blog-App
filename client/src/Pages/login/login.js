import axios from 'axios';
import React,{useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/context';
import './login.css'


const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const {isFetching , dispatch,error} = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("auth/login/",{
                username:userRef.current.value,
                password:passwordRef.current.value,
            });
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE"});
        }
    }
    return (
        <div className='login'>
            <span className='loginTitle'>Login</span>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input placeholder='Enter your Username...' className='loginInput' ref={userRef}/>
                <label>Password</label>
                <input type="password" placeholder='Enter your Password...' className='loginInput' ref={passwordRef}/>
                <button className='loginButton' type = "submit" disabled={isFetching}>Login{isFetching && "....." }</button>
                {error && <p style={{color:"red"}}>Wrong Credentials</p>}
            </form>
            <button className='loginRegisterButton'>
                <Link className='link' to='/register'>Registor</Link>
            </button>
        </div>
    )
}

export default Login;