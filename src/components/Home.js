import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
    return (
        <div className="home_wrap row valign center-block">
            <div className="col s12 m4 l8">
                <h1>Sign up for another micro-blogging platform</h1>
                <Link to="/register">
                    <button className="waves-effect waves-light btn-large pink accent-3">
                        <i className="material-icons left">public</i>Sign Up
                    </button>
                </Link>
                <Link to="/login">
                    <button className="waves-effect waves-light btn-large cyan darken-1">
                        <i className="material-icons left">person</i>Log In
                    </button>
                </Link>
                {props.isLoggedIn && <p>You are logged in</p>}
            </div>
        </div>
    );
};

export default Home;
