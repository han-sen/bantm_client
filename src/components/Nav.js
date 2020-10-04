import React from "react";
import { Link } from "react-router-dom";
import BantmLogo from "../bantm-logo.png";

const Nav = (props) => {
    const handleLogout = () => {
        localStorage.clear();
        props.logOut();
    };
    const navBarItems = [];
    if (props.isLoggedIn) {
        navBarItems.push(
            <li key={3}>
                <Link to="/dashboard">Dashboard</Link>
            </li>,
            <li onClick={handleLogout} key={4}>
                <Link to="/">Logout</Link>
            </li>
        );
    } else {
        navBarItems.push(
            <li key={1}>
                <Link to="/register">Register</Link>
            </li>,
            <li key={2}>
                <Link to="/login">Login</Link>
            </li>
        );
    }
    return (
        <nav>
            <div className="nav-wrapper indigo darken-3">
                <Link to="/" className="brand-logo">
                    <img
                        src={BantmLogo}
                        className="bantm_logo"
                        alt="bantm logo"
                    />
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {navBarItems}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
