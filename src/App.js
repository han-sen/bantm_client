import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";

import "./App.css";

let token = localStorage.token;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="page_wrap indigo darken-4 white-text">
            <Nav />
            <div className="container">
                <Switch>
                    <Route
                        path="/dashboard"
                        render={(props) => {
                            return <Dashboard isLoggedIn={isLoggedIn} />;
                        }}
                    />
                    <Route
                        path="/register"
                        render={(props) => {
                            return <SignUpForm />;
                        }}
                    />
                    <Route
                        path="/login"
                        render={(props) => {
                            return <LogInForm />;
                        }}
                    />
                    <Route
                        path="/"
                        render={(props) => {
                            return <Home isLoggedIn={isLoggedIn} />;
                        }}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;
