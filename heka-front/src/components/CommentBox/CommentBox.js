import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import { BackendApi } from '../../api';

const CommentBox = ({ slug, changeInComments, setChangeInComments }) => {
  const [comments, setComments] = useState([]);
  const [authToken, setAuthToken] = React.useState('');

  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [localStorage['authToken']]);
  useEffect(() => {
    const getComments = async () => {
      const response = await BackendApi.getComments(slug, authToken);
      if (response.status >= 200 && response.status < 300) {
        setComments(response.data);
        console.log(response.data);
        //setCommentForPost(response.data.length);
      }
    };
    getComments(slug, authToken);
  }, [changeInComments]);

  const likeSortedComments = comments.sort((a, b) => (b.upvote - b.downvote) - (a.upvote - a.downvote));

  const sortedComments = likeSortedComments.sort((a, b) => b.is_expert - a.is_expert);

  return (
    
    <div style={{ padding: 14, marginTop: '0.4vh' }}>

      {sortedComments.map((comment, index) => (

        <Comment
          index={comment.id}
          key={index}
          user={authToken ? comment.username : 'Anonymous'}
          content={comment.body}
          time={comment.updated_at}
          upvote={comment.upvote}
          downvote={comment.downvote}
          isExpert={comment.is_expert}
          changeInComments={changeInComments}
          setChangeInComments={setChangeInComments}
          isUpvoted={comment.is_upvoted}
          isDownvoted={comment.is_downvoted}
          slug={slug}
        />

      ))}
      
    </div>
  );
};

export default CommentBox;
