import React, { useEffect,useState } from 'react';
import Sidebar  from '../../Components/sideBar/SideBar';
import Header from '../../Components/header/header'
import Posts from '../../Components/posts/posts';
import './Home.css';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
const Home=()=>{
    const [posts,setPosts] = useState([]);
    const {search} = useLocation();
    useEffect(()=>{
        const fetchPost = async () => {
            const res = await axios.get("posts/"+search);
            setPosts(res.data);
        }
        fetchPost();
    },[search]);
    return <div>
        <Header/>
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
    </div>
}

export default Home;