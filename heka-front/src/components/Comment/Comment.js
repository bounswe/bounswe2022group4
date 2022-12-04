import React from 'react';
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
  isLogged,
  changeInComments,
  setChangeInComments,
  upvote,
  downvote,
  isExpert,
  isUpvoted,
  isDownvoted,
  authenticationToken,
  slug,
}) => {
  const regularUserPhoto =
    'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';
  const doctorPhoto = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
  const handleUpvote = async () => {
    const response = await BackendApi.postUpvoteComment(
      slug,
      index,
      authenticationToken
    );
    setChangeInComments(!changeInComments);
    console.log(response);
    console.log(upvote);
  };
  const handleDownvote = async () => {
    const response = await BackendApi.postDownvoteComment(
      slug,
      index,
      authenticationToken
    );
    setChangeInComments(!changeInComments);
    console.log(response);
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        marginBottom: '2vh',
        borderRadius: '2vh',
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
        {isLogged && (
          <Button
            startIcon={<Delete />}
            // onClick={handleOpenCreateCommentModal}
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
