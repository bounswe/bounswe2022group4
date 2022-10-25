import React from 'react';
import Header from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
        </Routes>
        <Routes>
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
