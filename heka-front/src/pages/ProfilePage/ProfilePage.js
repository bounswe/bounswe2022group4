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
import "./profilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { MessageChat } from "../../components/Chat/MessageChat";

const userData = [
  {
    id: "0",
    name: "Haley Howard",
    userName: "mrcmlzgrt",
    followers: [2, 3],
    following: [1, 4],
    posts: [1, 2, 3],
    comments: [1, 2, 3, 4, 5],
    postLikes: [4, 7, 8],
    email: "mrcmlzgrt@test.com",
  },
  {
    id: "1",
    name: "Batuhan Malazgirt",
    userName: "mrcmlzgrt",
    followers: [2, 3],
    following: [3, 4],
    posts: [1, 2, 3],
    comments: [1, 2, 3, 4, 5],
    postLikes: [4, 7, 8],
    email: "mrcmlzgrt@test.com",
  },
  {
    id: "2",
    name: "Berat Damar",
    userName: "brtdmr",
    followers: [3, 4],
    following: [1, 3, 4],
    posts: [4, 5, 6],
    comments: [6, 7, 8, 9, 10],
    postLikes: [1, 7, 8, 9],
    email: "brtdmr@test.com",
  },
  {
    id: "3",
    name: "Umut Deniz",
    userName: "umtdnz",
    followers: [1, 2, 4],
    following: [1, 2],
    posts: [7, 8],
    comments: [11, 12, 13, 14, 15],
    postLikes: [1, 2, 3, 6, 9],
    email: "umdnz@test.com",
  },
  {
    id: "4",
    name: "Melih Aktaş",
    userName: "mlhakts",
    followers: [1, 2],
    following: [1, 2, 3],
    posts: [9, 10],
    comments: [16, 17, 18, 19, 20],
    postLikes: [2, 5, 6, 7],
    email: "mlhakts@test.com",
  },
];

const posts = [
  {
    id: "0",
    header: "Post0",
    text: "post0",
    img: null,
    comments: [1, 2],
    likers: [2, 3],
    owner: "1",
  },
  {
    id: "1",
    header: "Post1",
    text: "post1",
    img: null,
    comments: [1, 2],
    likers: [2, 3],
    owner: "1",
  },
  {
    id: "2",
    header: "Post2",
    text: "post2",
    img: null,
    comments: [1, 2],
    likers: [3, 4],
    owner: "1",
  },
  {
    id: "3",
    header: "Post3",
    text: "post3",
    img: null,
    comments: [1, 2],
    likers: [3],
    owner: "1",
  },
  {
    id: "4",
    header: "Post4",
    text: "post4",
    img: null,
    comments: [1, 2],
    likers: [1],
    owner: "2",
  },
  {
    id: "5",
    header: "Post5",
    text: "post5",
    img: null,
    comments: [1, 2],
    likers: [4],
    owner: "2",
  },
  {
    id: "6",
    header: "Post6",
    text: "post6",
    img: null,
    comments: [1, 2],
    likers: [3, 4],
    owner: "2",
  },
  {
    id: "7",
    header: "Post7",
    text: "post7",
    img: null,
    comments: [1, 2],
    likers: [1, 2, 4],
    owner: "3",
  },
  {
    id: "8",
    header: "Post8",
    text: "post8",
    img: null,
    comments: [1, 2],
    likers: [1, 2],
    owner: "3",
  },
  {
    id: "9",
    header: "Post9",
    text: "post9",
    img: null,
    comments: [1, 2],
    likers: [2, 3],
    owner: "4",
  },
  {
    id: "10",
    header: "Post10",
    text: "post10",
    img: null,
    comments: [1, 2],
    likers: [],
    owner: "4",
  },
];

const comments = [
  { id: "0", text: "comment1", owner: "1" },
  { id: "1", text: "comment1", owner: "1" },
  { id: "2", text: "comment2", owner: "1" },
  { id: "3", text: "comment3", owner: "1" },
  { id: "4", text: "comment4", owner: "1" },
  { id: "5", text: "comment5", owner: "1" },
  { id: "6", text: "comment6", owner: "2" },
  { id: "7", text: "comment7", owner: "2" },
  { id: "8", text: "comment8", owner: "2" },
  { id: "9", text: "comment9", owner: "2" },
  { id: "10", text: "comment10", owner: "2" },
  { id: "11", text: "comment11", owner: "3" },
  { id: "12", text: "comment12", owner: "3" },
  { id: "13", text: "comment13", owner: "3" },
  { id: "14", text: "comment14", owner: "3" },
  { id: "15", text: "comment15", owner: "3" },
  { id: "16", text: "comment16", owner: "4" },
  { id: "17", text: "comment17", owner: "4" },
  { id: "18", text: "comment18", owner: "4" },
  { id: "19", text: "comment19", owner: "4" },
  { id: "20", text: "comment20", owner: "4" },
];

const ProfilePage = ({ isLogged, authenticationToken, loggedInUser }) => {
  //

  ///
  //
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

  return (
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
                <Modal isOpen={postModelOpen} toggle={() => onClose3()}>
                  <ModalHeader>Posts</ModalHeader>

                  <ModalBody>
                    {userData[id].posts.map((post) => {
                      return <div> {posts[post].header}</div>;
                    })}
                  </ModalBody>
                </Modal>
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
                  size: 4,
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <h3 style={{ float: "center" }}>Latest Posts</h3>
                </div>
              </Col>
            </Row>
            <Row style={{ padding: "30px" }}>
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
                      My blood pressure is too high
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Cardiology
                    </CardSubtitle>
                    <CardText>
                      I have a very high blood pressure. What could be the
                      reason of that? Should I see a doctor?
                    </CardText>
                    <Button>See Post</Button>
                  </CardBody>
                </Card>
              </Col>
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
                      My friend thinks that she is a bird!
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Psychology
                    </CardSubtitle>
                    <CardText>
                      She is completely out of her mind! How can I convince her
                      about she is not a bird?
                    </CardText>
                    <Button>See Post</Button>
                  </CardBody>
                </Card>
              </Col>
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
                      Which covid vaccine should I choose?
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Immunology
                    </CardSubtitle>
                    <CardText>
                      Which vaccine is the best in terms of short and long term
                      side effects? What do you suggest?
                    </CardText>
                    <Button>See Post</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={3}>
                <Card
                  style={{
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                  <CardBody>
                    <CardTitle tag="h5">I feel powerless</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Psychiatry
                    </CardSubtitle>
                    <CardText>
                      I feel powerless. I feel meaningless. I feel hopelessness.
                      I have deep depression followed by suicidal thoughts.
                    </CardText>
                    <Button>See Post</Button>
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
        }}
        // Commit.
      >
        <MessageChat
          authenticatonToken={authenticationToken}
          isLogged={isLogged}
          loggedInUser={loggedInUser}
          styles={{
            width: "320px",
            height: "40px",
            maxHeight:"400px",
          }}
        />
      </div>
    </div>
  );
};
export default ProfilePage;
