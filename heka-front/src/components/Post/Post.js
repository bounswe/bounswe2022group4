import React, { useState } from 'react';
import { Divider, Avatar, Grid, Paper, Button } from '@material-ui/core';
import {
  Delete,
  Edit,
  Comment as CommentIcon,
  Visibility,
} from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Post.css';
import CreateComment from '../CreateComment/CreateComment';
import CommentBox from '../CommentBox/CommentBox';
const imgLink =
  'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';

const Post = ({ title, user, content, time, index, isLogged }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const styleComment = {
    position: 'absolute',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openCreateCommentModal, setOpenCreateCommentModal] = useState(false);
  const handleOpenCommentModal = () => {
    setOpenCommentModal(true);
  };
  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
  };
  const handleOpenCreateCommentModal = () => {
    setOpenCreateCommentModal(true);
  };
  const handleCloseCreateCommentModal = () => {
    setOpenCreateCommentModal(false);
  };
  return (
    <Paper style={{ padding: '40px 20px', marginTop: 40 }}>
      <Grid container wrap='nowrap' spacing={2}>
        <Grid item>
          <Avatar alt='Unknown Profile Picture' src={imgLink} />
        </Grid>
        <Grid item xs zeroMinWidth style={{ justifyContent: 'left' }}>
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
            startIcon={<CommentIcon />}
            onClick={handleOpenCreateCommentModal}
            data-testid={'comment-button-' + index}
          >
            Add Comment
          </Button>
          <Modal
            open={openCreateCommentModal}
            onClose={handleCloseCreateCommentModal}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'
          >
            <Box sx={{ ...style, width: 800 }}>
              <CreateComment />
            </Box>
          </Modal>
          <Button
            variant='outlined'
            startIcon={<Visibility />}
            onClick={handleOpenCommentModal}
            data-testid={'show-comments-button-' + index}
          >
            Show Comments
          </Button>
          <Modal
            open={openCommentModal}
            onClose={handleCloseCommentModal}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'
            style={{
              position: 'absolute',
              top: '10%',
              left: '25%',
              overflow: 'scroll',
              height: '80%',
              display: 'block',
            }}
          >
            <Box sx={{ ...styleComment, width: 800 }}>
              <CommentBox isLogged={isLogged} />
            </Box>
          </Modal>
          <Button
            variant='outlined'
            startIcon={<ThumbUpIcon />}
            onClick={() => {}}
          >
            5
          </Button>

          <Button
            variant='outlined'
            startIcon={<ThumbDownIcon />}
            onClick={() => {}}
          >
            5
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
            data-testid={'delete-button-' + index}
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
            data-testid={'edit-button-' + index}
          >
            Edit
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default Post;
