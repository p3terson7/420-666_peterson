import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignupView from "./views/Signup";
import {ADMIN_PREFIX, CLIENT_PREFIX} from "./constants/apiPrefixes";
import AppHeader from "./components/AppHeader";
import ClientView from "./views/Student/ClientView";
import AdminView from "./views/Admin/AdminView";
import {UserType} from "./model/user";
import SignInView from "./views/SignInView";
import PageNotFoundView from "./views/PageNotFoundView";
import ConnectedRoute from "./components/ConnectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";
import {Authority} from "./model/auth";

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <Routes>
                    <Route path="/signup" element={<SignupView userType={UserType.Client} />} />
                    <Route path="/pageNotFound" element={<PageNotFoundView />} />
                    <Route
                        path="/signin/*"
                        element={
                            <ConnectedRoute isConnectedRoute={false}>
                                <Routes>
                                    <Route index element={<SignInView />} />
                                    <Route path="createdUser" element={<SignInView />} />
                                    <Route path="disconnected" element={<SignInView />} />
                                    <Route path="*" element={<PageNotFoundView />} />
                                </Routes>
                            </ConnectedRoute>
                        }
                    />
                    <Route
                        path="/clients/*"
                        element={
                            <AuthorizedRoute requiredAuthority={Authority.CLIENT}>
                                <Routes>
                                    <Route index element={<ClientView />} />
                                </Routes>
                            </AuthorizedRoute>
                        }
                    />
                    <Route
                        path="/admins/*"
                        element={
                            <AuthorizedRoute requiredAuthority={Authority.ADMIN}>
                                <Routes>
                                    <Route index element={<AdminView />} />
                                </Routes>
                            </AuthorizedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
