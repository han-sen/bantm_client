import React from "react";

function SignUpForm(props) {
    return (
        <div className="signUp_wrap">
            <h2>Sign Up</h2>
            <form>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        onChange={props.handleInput}
                        required={true}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">User Name</label>
                    <input
                        className="input"
                        type="text"
                        name="userName"
                        onChange={props.handleInput}
                        required={true}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label>
                    <input
                        className="input"
                        type="text"
                        name="password"
                        onChange={props.handleInput}
                        required={true}
                    />
                </div>
                <input
                    className="button"
                    value="Submit"
                    type="submit"
                    onClick={props.handleSignUp}
                />
            </form>
        </div>
    );
}

export default SignUpForm;
