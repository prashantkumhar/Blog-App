import React, { useContext,useEffect,useState } from 'react';
import SideBar from '../../Components/sideBar/SideBar';
import { Context } from '../../Context/context';
import './Setting.css';
import axios from 'axios';
import { storage } from "../../firebase";
const Setting = () =>{
    const {user,dispatch,isFetching}=useContext(Context);
    const [file,setFile]=useState(null);
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState("");
    useEffect(()=>{
        if(user){
            setEmail(user.email);
            setUsername(user.username);
        }
    },[user]);
    const handleSubmit=async (e)=>{
        setError("");
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        if(password === ""){
            setError("Enter password!!!!");return;
        }
        const updatedUser = {
            _id:user._id,
            username,
            email,
            password,
            profilePic:user.profilePic
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic=filename;
            try{
                const uploadTask = storage.ref(`images/${filename}`).put(file);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                    },
                    error => {
                        dispatch({type:"UPDATE_FAILURE"});
                    },
                    () => {
                        storage
                        .ref("images")
                        .child(filename)
                        .getDownloadURL()
                        .then(async (url) => {
                            updatedUser.profilePic=url;
                            await axios.put(`users/${user._id}/`,updatedUser);
                            setSuccess(true);
                            dispatch({type:"UPDATE_SUCCESS",payload:updatedUser});
                        });
                    }
                );
            }catch(err){}
        }
        else{
            try{

                await axios.put(`users/${user._id}/`,updatedUser);
                setSuccess(true);
                dispatch({type:"UPDATE_SUCCESS",payload:updatedUser});
            }
            catch(err){
                dispatch({type:"UPDATE_FAILURE"});
            }
        }
    }
    return (
        <div className='settings'>
            <div className='settingWrapper'>
                <div className='settingTitles'>
                    <span className='settingUpdateTitle'>Update Your Account</span>
                    <span className='settingDeleteTitle'>Delete Account</span>
                </div>
                <form className='settingForm' onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className='settingsPP'>
                        <img src=
                        {file ? URL.createObjectURL(file)
                            :user.profilePic ? user.profilePic : "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} 
                        alt="PP" 
                        />
                        <label htmlFor='fileInput'>
                            <i className='settingPPIcon far fa-user-circle'></i>
                        </label>
                        <input id="fileInput" type="file" style={{display:"none"}} onChange={(e)=>{
                        setFile(e.target.files[0])}}/>
                    </div>
                    <label>UserName</label>
                    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label>Password</label>
                    <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className='settingButton' type="submit">Update</button>
                    {success && <p style={{color:"green",alignSelf:"center"}}>successfully updated</p>}
                    {error && <p style={{color:"red",alignSelf:"center"}}>Enter Password</p>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}


export default Setting;