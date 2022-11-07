import React from 'react';
import PostBox from '../../components/PostBox/PostBox';
import './HomePage.css';
const HomePage = () => {
  return (
    <div className='home-container'>
      <div className='welcome-text'>Welcome to HEKA</div>
      <PostBox />
    </div>
  );
};
export default HomePage;
