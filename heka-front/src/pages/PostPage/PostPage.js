import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import Post from '../../components/Post/Post';
import { BackendApi } from '../../api';

const PostPage = ({
  userName,
  isLogged,
  changeInPost,
  setChangeInPost,
  authenticationToken,
}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const response = await BackendApi.getPost(id, authenticationToken);
      if (response.status >= 200 && response.status < 300) {
        setPost(response.data);
        console.log(response.data);
      }
      setIsLoading(false);
    };
    getPosts();
  }, [id, changeInPost]);

  return (
    <div className='post-page'>
      {isLoading && (
        <div
          className='loader'
          style={{
            marginTop: '10vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GridLoader color='rgb(255, 230, 250)' size={80} />
        </div>
      )}
      {post && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Post
            title={post.title}
            user={isLogged ? post.username : 'Anonymous'}
            content={post.body}
            time={post.updated_at}
            category={post.category}
            upvote={post.upvote}
            downvote={post.downvote}
            isExpert={post.is_expert}
            isUpvoted={post.is_upvoted}
            isDownvoted={post.is_downvoted}
            location={post.location}
            image={post.image}
            isLogged={isLogged}
            slug={post.slug}
            authenticationToken={authenticationToken}
            changeInPost={changeInPost}
            setChangeInPost={setChangeInPost}
            userName={userName}
          />
        </div>
      )}
    </div>
  );
};
export default PostPage;
