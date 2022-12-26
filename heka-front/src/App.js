import React from 'react';
import Header from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ForgotPasswordForm from './pages/ForgotPassword/ForgotPassword';
import PostPage from './pages/PostPage/PostPage';
import SignUpVerificationPage from './pages/SignUpVerificationPage/SignUpVerificationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import ChatBotPage from './pages/ChatBotPage/ChatBotPage';
const App = () => {
  const [changeInPost, setChangeInPost] = React.useState(false);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                changeInPost={changeInPost}
                setChangeInPost={setChangeInPost}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path='/profile/:userName' element={<ProfilePage />} />
        </Routes>
        <Routes>
          <Route path='/edit-profile' element={<EditProfilePage />} />
        </Routes>
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
        </Routes>
        <Routes>
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>

        <Routes>
          <Route
            path='/sign-up-verification'
            element={<SignUpVerificationPage />}
          />
        </Routes>

        <Routes>
          <Route path='/forgot-password' element={<ForgotPasswordForm />} />
        </Routes>
        <Routes>
          <Route
            path='/post/:id'
            element={
              <PostPage
                changeInPost={changeInPost}
                setChangeInPost={setChangeInPost}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path='/chatbot' element={<ChatBotPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
