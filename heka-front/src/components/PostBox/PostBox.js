import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import './PostBox.css';
import { Button } from '@material-ui/core';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreatePost from '../../components/CreatePost/CreatePost';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BackendApi } from '../../api';

const PostBox = ({ isLogged, authenticationToken }) => {
  const [openPostModal, setOpenPostModal] = useState(false);

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
  const [posts, setPosts] = useState([
    //get posts from backend
    {
      title: 'Headache For Two Days',
      user: 'umutdenizsenerr',
      content:
        'I have ache for two days at left of my head and it is getting worse day by day. \n I dont know what to do. \n I make some research on internet and now i am suspicios about brain tumor please help me.',
      time: '28.10.2022 14:43',
      image: 'https://picsum.photos/200/300',
    },
    {
      title: 'Sprained Ankle',
      user: 'beratdamar',
      content:
        'In the football match I played with my friends 3 days ago, the ball hit my foot very hard and my foot was sprained. It still hurts a lot while walking.',

      time: '25.10.2022 19:11',
    },
    {
      title: 'Focus Problem',
      user: 'mbatuhanmalazgirt',
      content:
        'Since my exam schedule is very busy these days, I study at the library every day, but I check my phone every five minutes. I am open to any advice.',

      time: '29.10.2022 09.27',
    },
    {
      title: 'Neck Pain',
      user: 'yigitcanozkaya',
      content:
        'Since constantly i work with a computer, my neck have been suffering from looking to it. Doing sports has always been a blessing but it started to not be enough for it',

      time: '30.10.2022 23.27',
    },
  ]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await BackendApi.getPosts(authenticationToken);
      if (response.status >= 200 && response.status < 300) {
        setPosts(response.data);
        console.log(response.data);
      }
    };
    getPosts(authenticationToken);
  }, []);
  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };
  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };
  return (
    <div style={{ padding: 14 }}>
      {isLogged && (
        <Button
          variant='outlined'
          startIcon={<PostAddIcon />}
          style={{ marginTop: 20 }}
          onClick={handleOpenPostModal}
        >
          Create Post
        </Button>
      )}

      <Modal
        open={openPostModal}
        onClose={handleClosePostModal}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 800 }}>
          <CreatePost
            authenticationToken={authenticationToken}
            setOpenPostModal={setOpenPostModal}
          />
        </Box>
      </Modal>
      {posts &&
        posts.map((post, index) => (
          <Post
            index={index}
            key={index}
            title={post.title}
            user={isLogged ? post.user : 'Anonymous'}
            content={post.body}
            time={post.time}
            image={post.image}
            isLogged={isLogged}
          />
        ))}
    </div>
  );
};

export default PostBox;
