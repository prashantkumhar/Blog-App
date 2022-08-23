import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import './SinglePost.css';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/context';

const SinglePost = () =>{
    const path = useParams().id;
    const [post,setPost] = useState({});
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [updateMode,setUpdateMode]=useState(false);
    const {user}=useContext(Context);
    useEffect(()=>{
        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`);
            setPost(res.data);
            setDesc(res.data.desc);
            setTitle(res.data.title);
        }
        getPost();
    },[]);
    const handleUpdate = async () => {
        try{
            await axios.put(`/posts/${path}/`,{username:user.username,title,desc});
            setUpdateMode(false);
        }
        catch(err){

        }
    }
    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${path}`,{data:{username:user.username}});
            window.location.replace("/");
        }
        catch(err){
        }
    }
    console.log(post);
    return (
        <div className='singlepost'>
            <div className='singlePostWrapper'>
                { post.photo && <img src={post.photo} alt="Image" className='singlePostImg' />}
                { updateMode ?
                    <input value = {title} className='singlePostTitleInput' autoFocus
                       onChange={(e)=>{setTitle(e.target.value)}}/>: 
                    <h1 className='singlePostTitle'>
                        {title}
                        {(user!=null&&post.username == user.username) &&<div className='singlePostEdit'>
                            <i className='singlePostIcon far fa-edit' onClick={()=>{setUpdateMode(true)}}></i>
                            <i className='singlePostIcon far fa-trash-alt' onClick = {handleDelete}></i>
                            </div>
                        }
                    </h1>
                }
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>
                        Author : 
                        <Link className="link" to = {`/?user=${post.username}`}>
                        <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode ? 
                    <textarea value = {desc} className='singlePostDescInput' onChange={(e)=>{setDesc(e.target.value)}}/> : 
                    <p className='singlePostDesc'>
                        {desc}
                    </p>
                }
                {updateMode && <button className='singlePostUpdate' onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}

export default SinglePost;