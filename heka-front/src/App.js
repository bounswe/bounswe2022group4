import React from 'react';
import Header from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ForgotPasswordForm from './pages/ForgotPassword/ForgotPassword';
import PostPage from './pages/PostPage/PostPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditProfile from './components/EditProfile/EditProfile';
import { Recogito } from '@recogito/recogito-js';
import '@recogito/recogito-js/dist/recogito.min.css';

const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [authenticationToken, setAuthenticationToken] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [loggedInUser, setLoggedInUser] = React.useState('');
  const [changeInPost, setChangeInPost] = React.useState(false);
  const r = new Recogito({ content: document.getElementById('root') });

  return (
    <div>
      <Router>
        <Header isLogged={isLogged} />
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                isLogged={isLogged}
                loggedInUser={loggedInUser}
                authenticationToken={authenticationToken}
                userName={userName}
                changeInPost={changeInPost}
                setChangeInPost={setChangeInPost}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/profile'
            element={
              <ProfilePage
                isLogged={isLogged}
                loggedInUser={loggedInUser}
                authenticationToken={authenticationToken}
                userName={userName}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/editprofile'
            element={
              <EditProfile
                isLogged={isLogged}
                loggedInUser={loggedInUser}
                authenticationToken={authenticationToken}
                userName={userName}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/sign-in'
            element={
              <SignInPage
                setIsLogged={setIsLogged}
                setLoggedInUser={setLoggedInUser}
                setAuthenticationToken={setAuthenticationToken}
                setUserName={setUserName}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
        <Routes>
          <Route path='/forgot-password' element={<ForgotPasswordForm />} />
        </Routes>
        <Routes>
          <Route
            path='/post/:id'
            element={
              <PostPage
                authenticationToken={authenticationToken}
                userName={userName}
                isLogged={isLogged}
                changeInPost={changeInPost}
                setChangeInPost={setChangeInPost}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
