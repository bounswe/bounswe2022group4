import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardText,
  CardTitle,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
//import "./profilePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
const userData = [
  {
    id: '0',
    name: 'Haley Howard',
    userName: 'mrcmlzgrt',
    followers: [0, 0],
    following: [0, 0],
    posts: [0, 0],
    comments: [0, 0],
    postLikes: [0, 0],
    email: 'mrcmlzgrt@test.com',
  },
];
const EditProfilePage = () => {
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
  const [id, setID] = useState('0');
  return (
    <div>
      <Container fluid style={{ padding: '0' }}>
        <Row style={{ height: '350px', backgroundColor: 'black' }}></Row>
      </Container>
      <Container fluid>
        <Card
          style={{
            margin: '16px',
            marginTop: '-75px',
            border: '0 solid rgba(122, 123, 151, 0.3)',
            borderRadius: '1rem',
            boxShadow:
              '0 0.46875rem 2.1875rem rgb(59 62 102 / 10%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 10%), 0 0.25rem 0.53125rem rgb(59 62 102 / 10%), 0 0.125rem 0.1875rem rgb(59 62 102 / 10%)',
          }}
        >
          <CardBody>
            <div
              style={{
                marginTop: '-90px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                alt='Computer Icons User Clip Art - Transparent Png Icon User, Png Download@kindpng.com'
                style={{ width: '150px', height: '150px' }}
              ></img>
            </div>

            <Row
              style={{
                marginTop: '75px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Col
                sm={{
                  // offset: 2,
                  order: 1,
                  size: 2,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <h3 style={{ float: 'center' }}>Edit Your Profile</h3>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                padding: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Col
                sm={5}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Card
                  style={{
                    padding: '10px',
                  }}
                >
                  <CardBody>
                    <CardText>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <FormGroup>
                          <Input
                            type='email'
                            name='change_email'
                            id='change_email'
                            placeholder='email'
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type='username'
                            name='change_username'
                            id='change_username'
                            placeholder='username'
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type='name'
                            name='change_name'
                            id='change_name'
                            placeholder='name'
                          />
                        </FormGroup>
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
          position: 'fixed',
          bottom: '280px',
          right: '0px',
          zIndex: '214783647',
          width: '320px',
          height: '40px',
          maxHeight: '399px',
        }}
      ></div>
    </div>
  );
};
export default EditProfilePage;
