import React from 'react';
import PostBox from '../../components/PostBox/PostBox';
import SideBar from '../../components/SideBar/SideBar';
import Comment from '../../components/Comment/Comment';
import CommentBox from '../../components/CommentBox/CommentBox';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';
import { Category } from '@mui/icons-material';
const HomePage = ({ isLogged, authenticationToken }) => {
  return (
    <>
      <div className='home-container'>
        <div className='welcome-text'>Welcome to HEKA</div>
        <PostBox
          isLogged={isLogged}
          authenticationToken={authenticationToken}
        />
        {/* <CommentBox isLogged={isLogged} /> */}
      </div>
      <SearchBar />
      <SideBar />
      
      
    </>
  );
};
export default HomePage;
