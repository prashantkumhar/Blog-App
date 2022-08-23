import React, { useContext } from 'react';
import './TopBar.css';
import {Link} from 'react-router-dom';
import { Context } from '../../Context/context';
const TopBar = ()=>{
    const {user,dispatch}=useContext(Context);
    return <div className='top'>
        {/*
        Header Will have 3 section -> 1. left  2. Center 3. Right
        1. left -> Icon of facebook ,twitter,pinterest,instagram
        2. Center -> Some link to navigate from home page to any other page
        3. right -> search icon and profile icon 
        */}

        {/*
        
        Left Part Start
        */}
        <div className='top-left'>
            <i className='fab fa-facebook-square topIcon'></i>
            <i className='fab fa-twitter-square topIcon'></i>
            <i className='fab fa-pinterest-square topIcon'></i>
            <i className='fab fa-instagram-square topIcon'></i>
        </div>
        {/*
        Left Part end
        Center Start
        */}
        <div className='top-center'>
            <ul className='toplist'>
                <li className='top-list-item'>
                    <Link to='/' className='link'>HOME</Link>
                </li>
                <li className='top-list-item'>
                    <Link to='/' className='link'>ABOUT</Link>
                </li>
                <li className='top-list-item'>
                    <Link to='/' className='link'>CONTACT</Link>
                </li>
                <li className='top-list-item'>
                    <Link to='/write' className='link'>WRITE</Link>
                </li>
                <li className='top-list-item' onClick={()=>{
                    dispatch({type:"LOGOUT"})
                    }}>
                    {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        {/*
        Center Part end
        Right start
        */}
        <div className='top-right'>
            { user ? ( <Link className='link' to = {"/setting"}>
                <img 
                src={user.profilePic ? user.profilePic : "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} 
                alt="Top"
                className='topImage'
                /></Link>) :
                (
                    <ul className='toplist'>
                        <li className='top-list-item'>
                            <Link to='/login' className='link'>LOGIN</Link>
                        </li>
                        <li className='top-list-item'>
                            <Link to='/register' className='link'>REGISTOR</Link>
                        </li>
                    </ul>
                )
            }
            <i className='topSearchIcon fas fa-search'></i>
        </div>
        {/*
        Right End
        */}
    </div>
}

export default TopBar;