import React, { useState } from 'react';
import { Divider, Avatar, Button, MenuItem, Menu } from '@material-ui/core';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { BackendApi } from '../../api';
import './Post.css';
import CreateComment from '../CreateComment/CreateComment';
import CommentBox from '../CommentBox/CommentBox';
import {
  IconButton,
  Collapse,
  Card,
  Box,
  Modal,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Annotation from 'react-image-annotation';

const imgLink =
  'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg';
const doctorPhoto = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';

const Post = ({
  title,
  user,
  content,
  time,
  index,
  isLogged,
  image,
  slug,
  authenticationToken,
  changeInPost,
  setChangeInPost,
  upvote,
  downvote,
  isExpert,
  isUpvoted,
  isDownvoted,
}) => {
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
  const handleDelete = async (slug) => {
    await BackendApi.postDeletePost(slug + '/', authenticationToken);
    setChangeInPost(!changeInPost);
  };
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState({});
  const onAnnotationChange = (annotation) => {
    setCurrentAnnotation(annotation);
  };
  const onAnnotationSubmit = (annotation) => {
    const { geometry, data } = annotation;
    setAnnotations(
      annotations.concat({
        geometry,
        data: { ...data, id: Math.random() },
      })
    );
    console.log(annotations);
  };
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
  const [changeInComments, setChangeInComments] = useState(false);

  return (
    <Card
      sx={{ maxWidth: 1000, padding: '40px 20px', marginTop: 5 }}
      style={{
        backgroundImage: 'linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%)',
      }}
    >
      <div>
        <CardHeader
          avatar={
            <Avatar
              alt='Unknown Profile Picture'
              src={isExpert ? doctorPhoto : imgLink}
            />
          }
          title={user}
          subheader={time}
          action={
            <div>
              <Button startIcon={<ThumbUpIcon />} onClick={() => {}}>
                {upvote}
              </Button>

              <Button startIcon={<ThumbDownIcon />} onClick={() => {}}>
                {downvote}
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
              handleDelete(slug);
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
        // <CardMedia
        //   component='img'
        //   height='350'
        //   image={image}
        //   alt='Paella dish'
        // />
        <Annotation
          src={image}
          // alt='Two pebbles anthropomorphized holding hands'
          annotations={annotations}
          value={currentAnnotation}
          onChange={onAnnotationChange}
          onSubmit={onAnnotationSubmit}
          style={{ height: '350px' }}
        />
      )}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
      <Divider style={{ height: '4px' }} />
      <CardActions>
        {isLogged && (
          <Button
            startIcon={<CommentIcon />}
            onClick={handleOpenCreateCommentModal}
            data-testid={'comment-button-' + index}
            style={{ fontFamily: 'inherit' }}
          >
            Add Comment
          </Button>
        )}

        <Modal
          open={openCreateCommentModal}
          onClose={handleCloseCreateCommentModal}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
        >
          <Box sx={{ ...style, width: 800 }}>
            <CreateComment
              authenticationToken={authenticationToken}
              slug={slug}
              setOpenCreateCommentModal={setOpenCreateCommentModal}
              changeInComments={changeInComments}
              setChangeInComments={setChangeInComments}
            />
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
          <CommentBox
            isLogged={isLogged}
            authenticationToken={authenticationToken}
            slug={slug}
            changeInComments={changeInComments}
            setChangeInComments={setChangeInComments}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default Post;
