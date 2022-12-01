import React from 'react';
import Header from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [authenticationToken, setAuthenticationToken] = React.useState('');
  return (
    <div>
      <Router>
        <Header isLogged={isLogged} />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Routes>
          <Route
            path='/profile'
            element={<ProfilePage isLogged={isLogged} />}
          />
        </Routes>
        <Routes>
          <Route
            path='/sign-in'
            element={
              <SignInPage
                setIsLogged={setIsLogged}
                setAuthenticationToken={setAuthenticationToken}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
