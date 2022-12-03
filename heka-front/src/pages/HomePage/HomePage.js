import React from 'react';
import PostBox from '../../components/PostBox/PostBox';

import './HomePage.css';
const HomePage = ({ isLogged, authenticationToken }) => {
  return (
    <div className='home-container'>
      <div className='welcome-text'>Welcome to HEKA</div>
      <PostBox isLogged={isLogged} authenticationToken={authenticationToken} />
      {/* <CommentBox isLogged={isLogged} /> */}
    </div>
  );
};
export default HomePage;
