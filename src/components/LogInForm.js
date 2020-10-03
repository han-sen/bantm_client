import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

function LogInForm(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logInInput, setLogInInput] = useState({
        email: "",
        password: "",
    });
    const handleInput = (event) => {
        setLogInInput({
            ...logInInput,
            [event.target.name]: event.target.value,
        });
    };
    // handle new user signup
    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        axios
            .post(`${process.env.REACT_APP_BASE_API}/login`, {
                email: logInInput.email,
                password: logInInput.password,
            })
            .then((response) => {
                console.log(response);
                console.log(response.data.userToken);
                localStorage.setItem("token", response.data.userToken);
                logIn();
                return response.data.userToken;
            })
            .then((token) => {
                return axios.get(`${process.env.REACT_APP_BASE_API}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            })
            .then((response) => {
                props.updateUser(response.data);
                setIsLoading(false);
                history.push("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                // setError(error);
                setIsLoading(false);
            });
    };
    const logIn = () => {
        props.setIsLoggedIn(true);
    };
    return (
        <div className="signUp_wrap white-text">
            <h2>Log In</h2>
            {isLoading ? (
                <Loader text="Logging you in..." />
            ) : (
                <form>
                    <div className="input-field col s12">
                        <label htmlFor="email">Email</label>
                        <input
                            className="input white-text"
                            type="text"
                            name="email"
                            onChange={handleInput}
                            required={true}
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="password">Password</label>
                        <input
                            className="input white-text"
                            type="text"
                            name="password"
                            onChange={handleInput}
                            required={true}
                            autoComplete="off"
                        />
                    </div>
                    <button
                        className="waves-effect waves-light btn cyan darken-1"
                        value="Submit"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Submit
                    </button>
                </form>
            )}
            {error && (
                <p>
                    <i className="material-icons left">error_outline</i>
                    {error}
                </p>
            )}
        </div>
    );
}

export default LogInForm;
