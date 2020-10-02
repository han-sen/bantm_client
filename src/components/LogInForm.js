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
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API}/login`,
                {
                    email: logInInput.email,
                    password: logInInput.password,
                }
            );
            console.log(response);
            console.log(response.data.userToken);
            localStorage.setItem("token", response.data.userToken);
            setIsLoading(false);
            history.push("/dashboard");
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data.message);
            setIsLoading(false);
        }
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
