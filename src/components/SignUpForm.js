import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

function SignUpForm(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [signUpInput, setSignUpInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
    });
    const handleInput = (event) => {
        setSignUpInput({
            ...signUpInput,
            [event.target.name]: event.target.value,
        });
    };
    // handle new user signup
    const handleSignUp = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API}/signup`,
                {
                    email: signUpInput.email,
                    password: signUpInput.password,
                    confirmPassword: signUpInput.confirmPassword,
                    userName: signUpInput.userName,
                }
            );
            console.log(response);
            console.log(response.data.userToken);
            localStorage.setItem("token", response.data.userToken);
            setIsLoading(false);
            history.push("/dashboard");
        } catch (err) {
            console.log(err.response.data);
            setIsLoading(false);
        }
    };
    return (
        <div className="signUp_wrap white-text">
            <h2>Sign Up</h2>
            {isLoading ? (
                <Loader text="Creating your account..." />
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
                        <label htmlFor="userName">User Name</label>
                        <input
                            className="input white-text"
                            type="text"
                            name="userName"
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
                    <div className="input-field col s12">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="input white-text"
                            type="text"
                            name="confirmPassword"
                            onChange={handleInput}
                            required={true}
                            autoComplete="off"
                        />
                    </div>
                    <button
                        className="waves-effect waves-light btn cyan darken-1"
                        value="Submit"
                        type="submit"
                        onClick={handleSignUp}
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default SignUpForm;