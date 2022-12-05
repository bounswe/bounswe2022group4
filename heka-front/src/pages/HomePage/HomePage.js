import React from 'react';
import PostBox from '../../components/PostBox/PostBox';
import SideBar from '../../components/SideBar/SideBar';
import Comment from '../../components/Comment/Comment';
import CommentBox from '../../components/CommentBox/CommentBox';

import './HomePage.css';
const HomePage = ({ isLogged, authenticationToken, userName }) => {
  return (
    <>
      <div className='home-container'>
        <div className='welcome-text'>Welcome to HEKA</div>
        <PostBox
          isLogged={isLogged}
          authenticationToken={authenticationToken}
          userName={userName}
        />
        {/* <CommentBox isLogged={isLogged} /> */}
      </div>

      <SideBar />
    </>
  );
};
export default HomePage;
