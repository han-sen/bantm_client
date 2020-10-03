import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
    },
    bg: {
        overlay: {
            background: "transparent",
        },
    },
};

const DashUserProfile = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [postBody, setPostBody] = React.useState("");
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const handleInput = (event) => {
        setPostBody({
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_BASE_API}/posts`,
                {
                    postBody: postBody.postBody,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="dash_user_profile fade-in" id="dash_profile">
            <img
                src={props.user.imageUrl}
                alt="user-pic"
                className="user_avatar"
            />
            <p className="dash_profile_detail">{props.user.userName}</p>
            <p className="dash_profile_detail">{props.user.location}</p>
            <p className="dash_profile_detail">{props.user.bio}</p>
            <button
                onClick={openModal}
                className="waves-effect waves-light btn"
            >
                <i className="material-icons left">cloud</i>
                New Post
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button
                    onClick={closeModal}
                    className="waves-effect waves-light btn red darken-1"
                >
                    <i className="material-icons">close</i>
                </button>
                <div>Make a new post</div>
                <form>
                    <label htmlFor="postBody">Post</label>
                    <input
                        className="input white-text"
                        type="text"
                        name="postBody"
                        onChange={handleInput}
                        required={true}
                        autoComplete="off"
                    />
                    <button
                        className="waves-effect waves-light btn cyan darken-1"
                        value="Submit"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default DashUserProfile;
