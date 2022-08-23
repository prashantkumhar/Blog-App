import React from 'react';
import {Link} from 'react-router-dom';
import './post.css';

const Post = ({post})=>{
    return (
        <div className='post'>
            { post.photo && <img className='postImage' src={post.photo}  slt="Pic"/>
            }
            <div className='postInfo'>
                <div className='postCats'>
                    {
                        post.categories.map((cat)=>(
                            <span className='postCat'>{cat.name}</span>
                        ))
                    }
                </div>
                <Link className="link" to = {`/post/${post._id}`}>
                    <span className='postTitle'>{post.title}</span>
                </Link>
                <hr/>
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='postDesc'>
                {post.desc}
            </p>
        </div>
    )
}
export default Post;