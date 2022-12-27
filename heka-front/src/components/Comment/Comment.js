import React, { useEffect } from 'react';
import { Avatar, Button } from '@material-ui/core';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Delete,
} from '@mui/icons-material';
import {
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { BackendApi } from '../../api';
const Comment = ({
  user,
  content,
  time,
  index,
  changeInComments,
  setChangeInComments,
  upvote,
  downvote,
  isExpert,
  isUpvoted,
  isDownvoted,
  slug,
}) => {
  const [authToken, setAuthToken] = React.useState('');
  const [loggedUser, setLoggedUser] = React.useState('');
  useEffect(() => {
    setLoggedUser(localStorage['user']);
  }, [localStorage['user']]);
  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [localStorage['authToken']]);
  const regularUserPhoto =
    'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';
  const doctorPhoto = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
  const handleUpvote = async () => {
    const response = await BackendApi.postUpvoteComment(slug, index, authToken);
    setChangeInComments(!changeInComments);
  };
  const handleDownvote = async () => {
    const response = await BackendApi.postDownvoteComment(
      slug,
      index,
      authToken
    );
    setChangeInComments(!changeInComments);
  };
  const handleDeleteComment = async () => {
    const response = await BackendApi.postDeleteComment(slug, index, authToken);
    setChangeInComments(!changeInComments);
  };
  return (
    <div
      style={{
      
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,1) 0%, rgba(200,242,251,1) 100%)",
        border: "solid",
        borderWidth: isExpert ? '3px' : '0px',
        borderColor:"yellow",
        marginBottom: '2vh',
        borderRadius: '2vh',
        boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px"
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt='Unknown Profile Picture'
            src={isExpert ? doctorPhoto : regularUserPhoto}
          />
        }
        title={user}
        subheader={time}
        action={
          <div>
            <Button startIcon={<ThumbUpIcon />} onClick={handleUpvote}>
              {upvote}
            </Button>

            <Button startIcon={<ThumbDownIcon />} onClick={handleDownvote}>
              {downvote}
            </Button>
          </div>
        }
      />

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        {authToken && user === loggedUser && (
          <Button
            startIcon={<Delete />}
            onClick={handleDeleteComment}
            data-testid={'comment-button-' + index}
            // style={{ fontFamily: 'inherit' }}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </div>
  );
};
export default Comment;
