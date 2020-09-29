import React, { useState, useEffect } from "react";
import axios from "axios";
import appConfig from "./appConfig.js";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signUpInput, setSignUpInput] = useState({
        email: "",
        password: "",
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
        try {
            const response = await axios.post(
                `${appConfig.BASE_API}/user/register`,
                {
                    email: signUpInput.email,
                    password: signUpInput.password,
                    userName: signUpInput.userName,
                }
            );
            console.log(response);
            // localStorage.token = response.data.token;
            setIsLoggedIn(true);
            // history.push("/portfolio");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="App">
            <SignUpForm handleInput={handleInput} handleSignUp={handleSignUp} />
        </div>
    );
}

export default App;
