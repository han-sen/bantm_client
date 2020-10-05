import React, { useEffect, useState } from "react";
import {
    projectStorage,
    projectFirestore,
    timestamp,
} from "../firebase/config";
import Modal from "react-modal";
import Progress from "./Progress";
import axios from "axios";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1A237E",
        border: "1px solid #039be5",
        boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    },
    bg: {
        overlay: {
            background: "#1A237E",
        },
    },
};

const NewPost = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [postContent, setPostContent] = React.useState("");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const openModal = () => {
        setIsOpen(true);
    };
    useEffect(() => {
        // references
        if (file) {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection("images");

            storageRef.put(file).on(
                "state_changed",
                (snap) => {
                    let percentage =
                        (snap.bytesTransferred / snap.totalBytes) * 100;
                    setProgress(percentage);
                },
                (err) => {
                    setError(err);
                },
                async () => {
                    const url = await storageRef.getDownloadURL();
                    const createdAt = timestamp();
                    await collectionRef.add({ url, createdAt });
                    setUrl(url);
                }
            );
        }
    }, [file]);

    const closeModal = () => {
        setIsOpen(false);
    };
    const handleFile = (event) => {
        let selected = event.target.files[0];
        console.log(selected);
        setFile(selected);
    };

    const handleInput = (event) => {
        setPostContent(event.target.value);
    };
    const handleAddPost = (newPost) => {
        props.updatePosts([newPost, ...props.posts]);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_BASE_API}/posts`,
                {
                    postImg: url,
                    postBody: postContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                handleAddPost(response.data);
            })
            .then(() => {
                closeModal();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <button
                onClick={openModal}
                className="waves-effect waves-light btn post_button"
            >
                <i className="material-icons">palette</i>
                Post
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="New Post"
                overlayClassName="modal_overlay fade-in"
                ariaHideApp={false}
            >
                <button
                    onClick={closeModal}
                    className="waves-effect waves-light btn red darken-1"
                >
                    <i className="material-icons">close</i>
                </button>
                {progress > 0 && progress < 100 && (
                    <Progress progress={progress} />
                )}
                <form className="modal_form">
                    <label htmlFor="postBody">Image</label>
                    <input
                        className="input white-text"
                        type="file"
                        name="postImg"
                        onChange={handleFile}
                        required={true}
                        autoComplete="off"
                    />
                    <label htmlFor="postBody">Text</label>
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
        </>
    );
};

export default NewPost;
