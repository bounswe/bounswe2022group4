import React, { useState } from 'react';
import Post from '../Post/Post';
import './PostBox.css';

const PostBox = () => {
  const [posts, setPosts] = useState([
    //get posts from backend
    {
      title: 'Post 1',
      user: 'User 1',
      content:
        'This is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a post',
      time: '23:59',
    },
    {
      title: 'Post 2',
      user: 'User 2',
      content:
        'This is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a post',

      time: '23:59',
    },
    {
      title: 'Post 3',
      user: 'User 3',
      content:
        'This is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a postThis is a post This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post \n This is a post This is a post This is a post This is a post This is a post',

      time: '23:59',
    },
  ]);

  return (
    <div style={{ padding: 14 }}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post
          title={post.title}
          user={post.user}
          content={post.content}
          time={post.time}
        />
      ))}
    </div>
  );
};

export default PostBox;
