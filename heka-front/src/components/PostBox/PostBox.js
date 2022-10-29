import React, { useState } from 'react';
import Post from '../Post/Post';
import './PostBox.css';

const PostBox = () => {
  const [posts, setPosts] = useState([
    //get posts from backend
    {
      title: 'Headache For Two Days',
      user: 'umutdenizsenerr',
      content:
        'I have ache for two days at left of my head and it is getting worse day by day. \n I dont know what to do. \n I make some research on internet and now i am suspicios about brain tumor please help me.',
      time: '28.10.2022 14:43',
    },
    {
      title: 'Sprained Ankle',
      user: 'beratdamar',
      content:
        'In the football match I played with my friends 3 days ago, the ball hit my foot very hard and my foot was sprained. It still hurts a lot while walking.',

      time: '25.10.2022 19:11',
    },
    {
      title: 'Focus Problem',
      user: 'mbatuhanmalazgirt',
      content:
        'Since my exam schedule is very busy these days, I study at the library every day, but I check my phone every five minutes. I am open to any advice.',

      time: '29.10.2022 09.27',
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
