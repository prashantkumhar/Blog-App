import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './SideBar.css'
const SideBar = () =>{
    const [cat,setCats] = useState([]);
    useEffect(()=>{
        const fetchCat = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        }
        fetchCat();
    },[]);
    return (
        <div className='sidebar'>
            <div className='sideBarItem'>
                <span className='sideBarTitle'>ABOUT ME</span>
                <img src = "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt = ""/>
                <p>
                Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className='sideBarItem'>
                <span className='sideBarTitle'>CATEGORIES</span>
                <ul className='sideBarList'>
                    {cat.map((c,i)=>(
                            <li className='sideBarListItem' key={i}>
                                <Link className='link' to = {`/?cat=${c.name}`}>{c.name}</Link>
                            </li>
                    ))}
                </ul>
            </div>
            <div className='sideBarItem'>
                <span className='sideBarItemTitle'>FOLLOW US</span>
                <div className='sideBarSocial'>
                <i className='fab fa-facebook-square sideBarIcon'></i>
                <i className='fab fa-twitter-square sideBarIcon'></i>
                <i className='fab fa-pinterest-square sideBarIcon'></i>
                <i className='fab fa-instagram-square sideBarIcon'></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar;