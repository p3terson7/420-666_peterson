import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupView from "./views/Signup";
import {ADMIN_PREFIX, CLIENT_PREFIX} from "./constants/apiPrefixes";
import AppHeader from "./components/AppHeader";
import ClientView from "./views/Student/ClientView";
import AdminView from "./views/Admin/AdminView";

function App() {
  return (
      <Router>
          <div className="App">
              <AppHeader />
              <Routes>
                  <Route path={`${CLIENT_PREFIX}/signup`} element={<SignupView />} />
                  <Route path={`${CLIENT_PREFIX}/:id`} element={<ClientView />} />
                  <Route path={`${ADMIN_PREFIX}/:id`} element={<AdminView />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
