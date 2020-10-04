import React from "react";
import { Link } from "react-router-dom";
import BantmLogo from "../bantm-splash.png";

const Home = (props) => {
    return (
        <div className="home_wrap">
            <div className="home_wrap_inner">
                <img src={BantmLogo} alt="bantm_logo" />
                <p>Sign up for another micro-blogging platform</p>
                <div className="home_button_wrap">
                    <Link to="/register">
                        <button className="waves-effect waves-light btn-large pink accent-3">
                            <i className="material-icons left">public</i>Sign Up
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="waves-effect waves-light btn-large blue accent-2">
                            <i className="material-icons left">person</i>Log In
                        </button>
                    </Link>
                </div>

                {props.isLoggedIn && <p>You are logged in</p>}
            </div>
        </div>
    );
};

export default Home;
