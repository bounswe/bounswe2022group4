import React from "react";
import Header from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ForgotPasswordForm from "./pages/ForgotPassword/ForgotPassword";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./components/EditProfile/EditProfile";

const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [authenticationToken, setAuthenticationToken] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [loggedInUser, setLoggedInUser] = React.useState("");
  return (
    <div>
      <Router>
        <Header isLogged={isLogged} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
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
            path="/profile"
            element={
              <ProfilePage
                isLogged={isLogged}
                loggedInUser={loggedInUser}
                authenticationToken={authenticationToken}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/editprofile"
            element={
              <EditProfile
                isLogged={isLogged}
                loggedInUser={loggedInUser}
                authenticationToken={authenticationToken}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/sign-in"
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
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
