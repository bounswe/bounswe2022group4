import React from "react";
import PostBox from "../../components/PostBox/PostBox";
import SideBar from "../../components/SideBar/SideBar";
import Comment from "../../components/Comment/Comment";
import CommentBox from "../../components/CommentBox/CommentBox";
import { MessageChat } from "../../components/Chat/MessageChat";

import "./HomePage.css";
const HomePage = ({ isLogged, loggedInUser, authenticationToken }) => {
  return (
    <>
      <div className="home-container">
        <div className="welcome-text">Welcome to HEKA</div>
        <PostBox
          isLogged={isLogged}
          loggedInUser={loggedInUser}
          authenticationToken={authenticationToken}
        />
        {/* <CommentBox isLogged={isLogged} /> */}
      </div>

      <SideBar />
      {authenticationToken && isLogged && authenticationToken && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            right: "20px",
            zIndex: "214783647",
            width: "320px",
            height: "224px",
          }}
        >
          <MessageChat
            authenticatonToken={authenticationToken}
            isLogged={isLogged}
            loggedInUser={loggedInUser}
            styles={{
              width: "320px",
              height: "400px",
            }}
          />
        </div>
      )}
    </>
  );
};
export default HomePage;
