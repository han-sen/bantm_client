import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";

import "./App.css";

const UserContext = React.createContext(null);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    // check for auth token
    useEffect(() => {
        let token = localStorage.token;
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            if (isLoggedIn) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BASE_API}/user`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.token}`,
                            },
                        }
                    );
                    const data = await response.data;
                    console.log("user data is: ", data);
                    setUser({
                        ...user,
                        ...data,
                    });
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [isLoggedIn]);

    const updateUser = (userDetails) => {
        setUser({
            ...user,
            ...userDetails,
        });
    };
    const logOut = () => {
        setIsLoggedIn(false);
    };
    return (
        <UserContext.Provider value={user}>
            <div className="page_wrap indigo darken-4 white-text">
                <Nav isLoggedIn={isLoggedIn} logOut={logOut} />
                <Switch>
                    <Route
                        path="/dashboard"
                        render={(props) => {
                            return <Dashboard user={user} setUser={setUser} />;
                        }}
                    />
                    <Route
                        path="/register"
                        render={(props) => {
                            return (
                                <SignUpForm
                                    setIsLoggedIn={setIsLoggedIn}
                                    updateUser={updateUser}
                                />
                            );
                        }}
                    />
                    <Route
                        path="/login"
                        render={(props) => {
                            return (
                                <LogInForm
                                    setIsLoggedIn={setIsLoggedIn}
                                    updateUser={updateUser}
                                />
                            );
                        }}
                    />
                    <Route
                        path="/:id"
                        render={(props) => {
                            return <Blog {...props} />;
                        }}
                    />
                    <Route
                        path="/"
                        render={(props) => {
                            return <Home />;
                        }}
                    />
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;
