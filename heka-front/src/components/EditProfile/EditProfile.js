import React from 'react'
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardText,
  CardSubtitle,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
//import "./profilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { MessageChat } from "../../components/Chat/MessageChat";
const userData = [
    {
      id: "0",
      name: "Haley Howard",
      userName: "mrcmlzgrt",
      followers: [0,0],
      following: [0,0],
      posts: [0,0],
      comments: [0,0],
      postLikes: [0,0],
      email: "mrcmlzgrt@test.com",
    },]
export default () =>
{
    const showPosts = () => {
        setPostModelOpen(!postModelOpen);
      };
      const showFollowers = () => {
        setFollowersModelOpen(!followersModelOpen);
      };
      const showFollowings = () => {
        setFollowingModelOpen(!followingModelOpen);
      };
    
      const onClose1 = () => {
        setFollowersModelOpen(!followersModelOpen);
      };
    
      const onClose2 = () => {
        setFollowingModelOpen(!followingModelOpen);
      };
    
      const onClose3 = () => {
        setPostModelOpen(!postModelOpen);
      };
    
      const [postModelOpen, setPostModelOpen] = useState(false);
      const [followersModelOpen, setFollowersModelOpen] = useState(false);
      const [followingModelOpen, setFollowingModelOpen] = useState(false);
      const [id, setID] = useState("0");
    return(
        <div>
      <Container fluid style={{ padding: "0" }}>
        <Row style={{ height: "350px", backgroundColor: "black" }}>
          {/* <img src={bgImg} style={{ height: "400px", zIndex: "-1" }}></img> */}
        </Row>
      </Container>
      <Container fluid>
        <Card
          style={{
            margin: "16px",
            marginTop: "-75px",
            border: "0 solid rgba(122, 123, 151, 0.3)",
            borderRadius: "1rem",
            boxShadow:
              "0 0.46875rem 2.1875rem rgb(59 62 102 / 10%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 10%), 0 0.25rem 0.53125rem rgb(59 62 102 / 10%), 0 0.125rem 0.1875rem rgb(59 62 102 / 10%)",
          }}
        >
          <CardBody>
            <div
              style={{
                marginTop: "-90px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Computer Icons User Clip Art - Transparent Png Icon User, Png Download@kindpng.com"
                style={{ width: "150px", height: "150px" }}
              ></img>
            </div>

            <Row style={{ marginTop: "100px" }}>
              <Col
                sm={{
                  offset: 3,
                  order: 2,
                  size: 6,
                }}
              >
                <div style={{ padding: "10px" }}>
                  <h1 style={{ display: "inline" }}> {userData[id].name}</h1>
                  <div style={{ marginTop: "1vh", fontStyle: "italic" }}>
                    {" "}
                    Regular User
                  </div>

                  <Button
                    style={{
                      float: "right",
                      color: "blue",
                      backgroundColor: "white",
                      borderColor: "blue",
                    }}
                  >
                    Follow
                  </Button>
                </div>
                <div style={{ padding: "10px" }}>
                  <span>
                    <a className="links" onClick={showPosts}>
                      <b>{userData[id].posts.length}</b> {"Posts "}
                    </a>
                  </span>
                  <span>
                    <a className="links" onClick={showFollowers}>
                      <b>{userData[id].followers.length}</b>
                      {" Followers "}
                    </a>
                  </span>
                  <span>
                    <a className="links" onClick={showFollowings}>
                      <b>{userData[id].following.length}</b> {"Following "}{" "}
                    </a>
                  </span>
                </div>
                <Modal isOpen={followersModelOpen} toggle={() => onClose1()}>
                  <ModalHeader>Followers</ModalHeader>

                  <ModalBody>
                    {userData[id].followers.map((follower) => {
                      return <div id={follower}>{userData[follower].name}</div>;
                    })}
                  </ModalBody>
                </Modal>
                <Modal isOpen={followingModelOpen} toggle={() => onClose2()}>
                  <ModalHeader>Following</ModalHeader>

                  <ModalBody>
                    {userData[id].following.map((follow) => {
                      return <div> {userData[follow].name}</div>;
                    })}
                  </ModalBody>
                </Modal>
                {/* <Modal isOpen={postModelOpen} toggle={() => onClose3()}>
                  <ModalHeader>Posts</ModalHeader>

                  <ModalBody>
                    {userData[id].posts.map((post) => {
                      return <div> {posts[post].header}</div>;
                    })}
                  </ModalBody>
                </Modal> */}
                <div
                  style={{ padding: "10px", marginTop: "5px", color: "gray" }}
                >
                  <p>A meadow of hay which eager to learn...</p>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "75px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                sm={{
                  // offset: 2,
                  order: 1,
                  size: 2,
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <h3 style={{ float: "center" }}>Edit Your Profile</h3>
                </div>
              </Col>
            </Row>
            <Row style={{ padding: "30px", marginLeft:"770px" }}>
              <Col sm={3}>
                <Card
                  style={{
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                  <CardBody>
                    <CardTitle tag="h5">
                      Please enter
                    </CardTitle>
                    
                    <CardText>
                    <div>
                    <input value = "Change username" ></input>
                    <input value = "Change bio"></input>
                    <input value = "Change avatar"></input>

                    
                   </div>
                    </CardText>
                    <Button>Submit</Button>
                  </CardBody>
                </Card>
              </Col>
        
              
            </Row>
            
          </CardBody>
        </Card>
      </Container>
      <div
        style={{
          position: "fixed",
          bottom: "280px",
          right: "0px",
          zIndex: "214783647",
          width: "320px",
          height: "40px",
          maxHeight:"399px"
        }}>
         </div>
         
       
        </div>
    );
};