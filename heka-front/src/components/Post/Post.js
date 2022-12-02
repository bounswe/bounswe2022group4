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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

const imgLink =
  'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';

const Post = ({ title, user, content, time, index, isLogged, image }) => {
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
  const [openCreateCommentModal, setOpenCreateCommentModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenCreateCommentModal = () => {
    setOpenCreateCommentModal(true);
  };
  const handleCloseCreateCommentModal = () => {
    setOpenCreateCommentModal(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // interface ExpandMoreProps extends IconButtonProps {
  //   expand: boolean;
  // }
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  return (
    <Card sx={{ maxWidth: 1000, padding: '40px 20px', marginTop: 5 }}>
      <div>
        <CardHeader
          avatar={<Avatar alt='Unknown Profile Picture' src={imgLink} />}
          title={user}
          subheader={time}
          action={
            <div>
              <Button startIcon={<ThumbUpIcon />} onClick={() => {}}>
                5
              </Button>

              <Button startIcon={<ThumbDownIcon />} onClick={() => {}}>
                5
              </Button>
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </div>
          }
        />

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              alert(
                'Edit functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              alert(
                'Delete functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
          >
            Delete
          </MenuItem>
        </Menu>
        <CardContent>
          <Typography style={{ margin: 0, textAlign: 'left' }}>
            {title}
          </Typography>
        </CardContent>
      </div>
      {image && (
        <CardMedia
          component='img'
          height='350'
          image={image}
          alt='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
      <Divider style={{ height: '4px' }} />
      <CardActions>
        <Button
          // variant='outlined'
          startIcon={<CommentIcon />}
          onClick={handleOpenCreateCommentModal}
          data-testid={'comment-button-' + index}
          style={{ fontFamily: 'inherit' }}
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

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
          style={{ fontSize: '0.875rem', fontWeight: 500 }}
        >
          SHOW COMMENTS
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <CommentBox isLogged={isLogged} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default Post;
