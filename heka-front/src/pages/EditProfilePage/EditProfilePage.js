import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardText,
  FormGroup,
  Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackendApi } from '../../api';
import { useState, useEffect } from 'react';

const EditProfilePage = () => {
  const [authToken, setAuthToken] = React.useState('');
  const [loggedUser, setLoggedUser] = React.useState('');
  useEffect(() => {
    setLoggedUser(localStorage['user']);
  }, [localStorage['user']]);
  useEffect(() => {
    setAuthToken(localStorage['authToken']);
  }, [localStorage['authToken']]);
  const [updatedUserName, setUpdatedUserName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await BackendApi.editProfile(
      email,
      loggedUser,
      updatedUserName,
      name,
      authToken
    );
  };
  return (
    <div data-testid='edit-profile'>
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
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type='username'
                            name='change_username'
                            id='change_username'
                            placeholder='username'
                            onChange={(e) => {
                              setUpdatedUserName(e.target.value);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type='name'
                            name='change_name'
                            id='change_name'
                            placeholder='name'
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </div>
                    </CardText>
                    <Button onClick={handleSubmit}>Submit</Button>
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
