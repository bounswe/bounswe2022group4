import React from 'react';
import PostBox from '../../components/PostBox/PostBox';
import SideBar from '../../components/SideBar/SideBar';
import Comment from '../../components/Comment/Comment';
import CommentBox from '../../components/CommentBox/CommentBox';
import SearchBar from '../../components/SearchBar/SearchBar';
import { MessageChat } from '../../components/Chat/MessageChat';

import './HomePage.css';
const HomePage = ({
  isLogged,
  authenticationToken,
  userName,
  loggedInUser,
  changeInPost,
  setChangeInPost,
}) => {
  console.log(userName, 'xd');
  return (
    <>
      <div className='home-container'>
        <div className='welcome-text'>Welcome to HEKA</div>
        <PostBox
          isLogged={isLogged}
          loggedInUser={loggedInUser}
          authenticationToken={authenticationToken}
          userName={userName}
          changeInPost={changeInPost}
          setChangeInPost={setChangeInPost}
        />
        {/* <CommentBox isLogged={isLogged} /> */}
      </div>
      <SearchBar />
      <SideBar />

      {authenticationToken && isLogged && authenticationToken && (
        <div
          style={{
            position: 'fixed',
            bottom: '280px',
            right: '0px',
            zIndex: '214783647',
            width: '320px',
            height: '40px',
            maxHeight: '400px',
          }}
        >
          <MessageChat
            authenticatonToken={authenticationToken}
            isLogged={isLogged}
            loggedInUser={loggedInUser}
            styles={{
              width: '320px',
              height: '40px',
              maxHeight: '400px',
            }}
          />
        </div>
      )}
    </>
  );
};
export default HomePage;
