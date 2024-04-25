import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupView from "./views/SignUp";
import AppHeader from "./components/AppHeader";
import ClientView from "./views/Student/ClientView";
import AdminView from "./views/Admin/AdminView";
import { UserType } from "./model/user";
import PageNotFoundView from "./views/PageNotFoundView";
import ConnectedRoute from "./components/ConnectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";
import { Authority } from "./model/auth";
import HomePageView from "./views/HomePageView";
import { SnackbarProvider } from "notistack";
import AuthForm from "./components/AuthForm";
import ConversationsView from "./views/MessagingView";
import BuildFormView from "./views/BuildFormView";

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                <div className="App">
                    <AppHeader />
                    <Routes>
                        <Route path="/home" element={<HomePageView />} />
                        <Route path="/signUp" element={<SignupView userType={UserType.Client} />} />
                        <Route path="/pageNotFound" element={<PageNotFoundView />} />
                        <Route
                            path="build"
                            element={<BuildFormView />}
                        />
                        <Route
                            path="/authentication/*"
                            element={
                                <ConnectedRoute isConnectedRoute={false}>
                                    <Routes>
                                        <Route index element={<AuthForm />} />
                                        <Route path="createdUser" element={<AuthForm />} />
                                        <Route path="disconnected" element={<AuthForm />} />
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
                                        <Route
                                            path="conversations"
                                            element={<ConversationsView />}
                                        />
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
                                        <Route
                                            path="conversations"
                                            element={<ConversationsView />}
                                        />
                                    </Routes>
                                </AuthorizedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
