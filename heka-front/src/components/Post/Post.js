import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
import Annotation from 'react-image-annotation';
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
import EditPost from '../EditPost/EditPost';
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
  category,
  slug,
  authenticationToken,
  changeInPost,
  setChangeInPost,
  upvote,
  downvote,
  isExpert,
  location,
  userName,
  postPageButton,
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
  const [openEditModal, setOpenEditModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenCreateCommentModal = () => {
    setOpenCreateCommentModal(true);
  };
  const handleCloseCreateCommentModal = () => {
    setOpenCreateCommentModal(false);
  };
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
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
  const handleUpvote = async () => {
    const response = await BackendApi.postUpvotePost(slug, authenticationToken);
    setChangeInPost(!changeInPost);
    console.log(response);
    console.log(upvote);
  };
  const handleDownvote = async () => {
    const response = await BackendApi.postDownvotePost(
      slug,
      authenticationToken
    );
    setChangeInPost(!changeInPost);
    console.log(response);
  };

  // const handleEdit =
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
  const subheader = (
    <div>
      <Typography variant='body2' color='text.secondary'>
        {time}
      </Typography>
      {isLogged && (
        <Typography variant='body2' color='text.secondary'>
          {location}
        </Typography>
      )}
    </div>
  );
  return (
    <Card
      sx={{ maxWidth: 1000, padding: '40px 20px', marginTop: 5 }}
      style={{
        backgroundImage: 'linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%)',
        minWidth: '800px',
      }}
      data-testid='post'
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
          subheader={subheader}
          action={
            <div>
              {postPageButton && (
                <Link
                  to={'/post/' + slug}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'none',
                  }}
                >
                  <Button>Post Page</Button>
                </Link>
              )}
              <Button startIcon={<ThumbUpIcon />} onClick={handleUpvote}>
                {upvote}
              </Button>
              <Button startIcon={<ThumbDownIcon />} onClick={handleDownvote}>
                {downvote}
              </Button>
              {userName === user && (
                <>
                  <Button onClick={handleOpenEditModal}> Edit</Button>
                  <IconButton aria-label='settings' onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                </>
              )}
            </div>
          }
        />
        <CardContent>
          <Typography
            variant='sub-header'
            style={{ margin: 0, textAlign: 'left' }}
          >
            {category}
          </Typography>
        </CardContent>
        {userName === user && (
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleDelete(slug);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        )}

        <CardContent>
          <Typography style={{ margin: 0, textAlign: 'left' }}>
            {title}
          </Typography>
        </CardContent>
      </div>
      {image && (
        <Annotation
          src={image}
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
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
        >
          <Box sx={{ ...style, width: 800 }}>
            <EditPost
              imageProp={image}
              authenticationToken={authenticationToken}
              setOpenEditModal={setOpenEditModal}
              changeInPost={changeInPost}
              setChangeInPost={setChangeInPost}
              title={title}
              body={content}
              slug={slug}
              category={category}
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
            userName={userName}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default Post;
