import React, { useState } from 'react';
import {
  Divider,
  Avatar,
  makeStyles,
  Button,
  MenuItem,
  Menu,
} from '@material-ui/core';
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
  const handleDelete = (index) => {
    BackendApi.postDeletePost(index);
  };
  const [annotations, setAnnotations] = useState([
    {
      geometry: {
        type: 'RECTANGLE',
        x: 76.45089285714286,
        y: 27.060267857142854,
        width: 14.732142857142847,
        height: 32.85714285714286,
      },
      data: {
        text: 'jjj',
        id: 0.48996757053793494,
      },
    },
    {
      geometry: {
        type: 'RECTANGLE',
        x: 19.642857142857142,
        y: 34.348214285714285,
        width: 17.187500000000004,
        height: 26.857142857142854,
      },
      data: {
        text: 'nnn',
        id: 0.777,
      },
    },
  ]);
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
  return (
    <Card
      sx={{ maxWidth: 1000, padding: '40px 20px', marginTop: 5 }}
      style={{
        backgroundImage: 'linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%)',
      }}
    >
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
              handleDelete(1);
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
          src={imgLink}
          alt='Two pebbles anthropomorphized holding hands'
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
        <Button
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
