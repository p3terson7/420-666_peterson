import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupView from "./views/Signup";
import {CLIENT_PREFIX} from "./constants/apiPrefixes";
import AppHeader from "./components/AppHeader";
import ClientView from "./views/Student/ClientView";

function App() {
  return (
      <Router>
          <div className="App">
              <AppHeader />
              <Routes>
                  <Route path={`${CLIENT_PREFIX}/signup`} element={<SignupView />} />
                  <Route path={`${CLIENT_PREFIX}/`} element={<ClientView />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
