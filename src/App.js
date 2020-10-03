import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
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
    }, [isLoggedIn]);

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
                        userId: data.userId,
                        userName: data.userName,
                        location: data.location,
                        imageUrl: data.imageUrl,
                    });
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

    return (
        <UserContext.Provider value={user}>
            <div className="page_wrap indigo darken-4 white-text">
                <Nav isLoggedIn={isLoggedIn} />
                <div className="container">
                    <Switch>
                        <Route
                            path="/dashboard"
                            render={(props) => {
                                return <Dashboard user={user} />;
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
            </div>
        </UserContext.Provider>
    );
}

export default App;
