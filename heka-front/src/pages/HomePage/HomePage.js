import React, { useEffect } from 'react';
import PostBox from '../../components/PostBox/PostBox';
import SideBar from '../../components/SideBar/SideBar';
import { MessageChat } from '../../components/Chat/MessageChat';

import './HomePage.css';
const HomePage = ({ changeInPost, setChangeInPost }) => {
  const [authToken, setAuthToken] = React.useState('');
  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [localStorage['authToken']]);
  const [loggedUser, setLoggedUser] = React.useState('');
  useEffect(() => {
    setLoggedUser(localStorage['user']);
  }, [localStorage['user']]);
  return (
    <>
      <div className='home-container'>
        <div className='welcome-text'>Welcome to HEKA</div>
        <PostBox
          changeInPost={changeInPost}
          setChangeInPost={setChangeInPost}
        />
      </div>
      <SideBar />

      {authToken && (
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
