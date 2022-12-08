import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import { BackendApi } from '../../api';

const CommentBox = ({
  isLogged,
  slug,
  authenticationToken,
  changeInComments,
  setChangeInComments,
  userName,
}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const response = await BackendApi.getComments(slug, authenticationToken);
      if (response.status >= 200 && response.status < 300) {
        setComments(response.data);
        console.log(response.data);
      }
    };
    getComments(slug, authenticationToken);
  }, [changeInComments]);
  return (
    <div style={{ padding: 14, marginTop: '0.4vh' }}>
      {comments.map((comment, index) => (
        <Comment
          index={comment.id}
          key={index}
          user={isLogged ? comment.username : 'Anonymous'}
          content={comment.body}
          time={comment.updated_at}
          isLogged={isLogged}
          upvote={comment.upvote}
          downvote={comment.downvote}
          isExpert={comment.is_expert}
          changeInComments={changeInComments}
          setChangeInComments={setChangeInComments}
          isUpvoted={comment.is_upvoted}
          isDownvoted={comment.is_downvoted}
          authenticationToken={authenticationToken}
          slug={slug}
          userName={userName}
        />
      ))}
    </div>
  );
};

export default CommentBox;
