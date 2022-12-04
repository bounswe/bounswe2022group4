import React, { useState, useEffect } from 'react';
import Comment from '../../components/Comment/Comment';
import { BackendApi } from '../../api';

const CommentBox = ({
  isLogged,
  slug,
  authenticationToken,
  changeInComments,
  setChangeInComments,
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
    console.log('xdd');
    getComments(slug, authenticationToken);
  }, [changeInComments]);
  return (
    <div style={{ padding: 14 }}>
      {comments.map((comment, index) => (
        <Comment
          index={index}
          key={index}
          user={isLogged ? comment.username : 'Anonymous'}
          content={comment.body}
          time={comment.updated_at}
          isLogged={isLogged}
          changeInComments={changeInComments}
          upvote={comment.upvote}
          downvote={comment.downvote}
          isExpert={comment.isExpert}
          setChangeInComments={setChangeInComments}
          isUpvoted={comment.is_upvoted}
          isDownvoted={comment.is_downvoted}
        />
      ))}
    </div>
  );
};

export default CommentBox;
