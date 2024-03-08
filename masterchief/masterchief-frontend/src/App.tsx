import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientSignupForm from "./components/ClientSignup";
import SignupView from "./views/Signup";
import {CLIENT_PREFIX} from "./constants/apiPrefixes";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path={`${CLIENT_PREFIX}/signup`} element={<SignupView />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
