import React from 'react';
import './posts.css'
import Post from '../post/post';

const Posts = ({posts}) =>{
    return (
        <div className='posts'>
            {posts.map((post,i) => (
                <div key={i}><Post post = {post}/></div>
            ))}
        </div>
    )
}

export default Posts;