import axios from 'axios';
import React,{useContext, useState} from 'react';
import { Context } from '../../Context/context';
import './write.css';
import { storage } from "../../firebase";
const Write = () => {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [file,setFile]=useState("");
    const [progress,setProgress]=useState(0);
    const {user}=useContext(Context);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const newPost = {
            username:user.username,
            desc,
            title
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo=filename;
            try{
                const uploadTask = storage.ref(`images/${filename}`).put(file);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        storage
                        .ref("images")
                        .child(filename)
                        .getDownloadURL()
                        .then(async (url) => {
                            newPost.photo=url;
                            const res = await axios.post("posts/",newPost);
                            window.location.replace("/post/"+res.data._id);
                        });
                    }
                );
            }
            catch(err){}
        }
    }
    return (
        <div className='write'>
            {file && <img src={URL.createObjectURL(file)} alt="" className='writeImg' />}
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor='fileInput'>
                        <i className='fas fa-plus writeIcon'></i>
                    </label>
                    <input type="file" id="fileInput" className='fileInput' onChange={(e)=>setFile(e.target.files[0])}/>
                    <input type="text" placeholder="Title" className='writeInput' autoFocus={true} onChange={(e)=>{setTitle(e.target.value)}} />
                </div>
                <div className='writeFormGroup'>
                    <textarea placeholder="tell your story...." type="text" className='writeText writeInput' onChange={(e)=>{setDesc(e.target.value)}}>
                    </textarea>
                </div>
                <button className='writeSubmit' type = "submit">Publish</button>
            </form>
        </div>
    )
}

export default Write;

