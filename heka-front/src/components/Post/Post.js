import React, { useState } from 'react';
import { Divider, Avatar, Grid, Paper, Button } from '@material-ui/core';
import {
  Delete,
  Edit,
  Comment,
  Close,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import './Post.css';
const imgLink =
  'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';

const Post = ({ title, user, content, time }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <Paper style={{ padding: '40px 20px', marginTop: 100 }}>
      <Grid container wrap='nowrap' spacing={2}>
        <Grid item>
          <Avatar alt='Unknown Profile Picture' src={imgLink} />
        </Grid>
        <Grid justifyContent='left' item xs zeroMinWidth>
          <h2 style={{ margin: 0, textAlign: 'left' }}>{title}</h2>

          <h4 style={{ marginTop: '5vh', textAlign: 'left', color: 'grey' }}>
            {user}
          </h4>
          <p style={{ textAlign: 'left' }}>{content}</p>
          <p style={{ textAlign: 'left', color: 'gray' }}>posted at {time}</p>
        </Grid>
      </Grid>
      <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
      <div className='post-footer-container'>
        <div
          style={{
            display: 'flex',
            gap: '2vh',
          }}
        >
          <Button
            variant='outlined'
            startIcon={showCommentBox ? <Comment /> : <Close />}
            onClick={() => {
              setShowCommentBox(!showCommentBox);
            }}
          >
            {showCommentBox ? 'Comment' : 'Close'}
          </Button>
          <Button
            variant='outlined'
            startIcon={showComments ? <Visibility /> : <VisibilityOff />}
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {showComments ? 'Show Comments' : 'Close Comments'}
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '2vh',
          }}
        >
          <Button
            variant='outlined'
            startIcon={<Delete />}
            onClick={() => {
              alert(
                'Delete functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
          >
            Delete
          </Button>
          <Button
            variant='outlined'
            startIcon={<Edit />}
            onClick={() => {
              alert(
                'Edit functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default Post;
