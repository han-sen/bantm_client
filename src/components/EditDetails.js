import React, { useEffect, useState } from "react";
import {
    projectStorage,
    projectFirestore,
    timestamp,
} from "../firebase/config";
import Modal from "react-modal";
import axios from "axios";
import Progress from "./Progress";

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

const EditDetails = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState({
        location: props.user.location,
        bio: props.user.bio,
        headerUrl: props.user.headerUrl,
        imageUrl: props.user.imageUrl,
    });
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(props.user.imageUrl);
    const [fileTwo, setFileTwo] = useState(null);
    const [urlTwo, setUrlTwo] = useState(props.user.headerUrl);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const openModal = () => {
        setIsOpen(true);
    };
    useEffect(() => {
        setUserDetails({
            ...userDetails,
            location: props.user.location,
            bio: props.user.bio,
            headerUrl: props.user.headerUrl,
            imageUrl: props.user.imageUrl,
        });
    }, [props.user.location, props.user.bio]);

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
    useEffect(() => {
        // references
        if (fileTwo) {
            const storageRef = projectStorage.ref(fileTwo.name);
            const collectionRef = projectFirestore.collection("images");

            storageRef.put(fileTwo).on(
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
                    setUrlTwo(url);
                }
            );
        }
    }, [fileTwo]);

    const closeModal = () => {
        setIsOpen(false);
    };
    const handleFile = (event) => {
        let selected = event.target.files[0];
        console.log(selected);
        setFile(selected);
    };
    const handleFileTwo = (event) => {
        let selected = event.target.files[0];
        console.log(selected);
        setFileTwo(selected);
    };
    const handleInput = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value,
        });
    };
    const updateUserState = (userObj) => {
        props.setUser({ ...props.user, ...userObj.data });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(
                `${process.env.REACT_APP_BASE_API}/users/${props.user.userId}`,
                {
                    imageUrl: url,
                    headerUrl: urlTwo,
                    location: userDetails.location,
                    bio: userDetails.bio,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }
            )
            .then((response) => {
                updateUserState(response);
                console.log(response);
                closeModal();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="dash_edit_wrap">
            <button
                onClick={openModal}
                className="waves-effect waves-light btn post_button blue darken-1"
            >
                <i className="material-icons">create</i>
                Edit
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
                <form className="modal_form">
                    {progress > 0 && progress < 100 && (
                        <Progress progress={progress} />
                    )}
                    <label htmlFor="postBody">User Pic</label>
                    <input
                        className="input white-text"
                        type="file"
                        name="imageUrl"
                        onChange={handleFile}
                        required={true}
                    />
                    <label htmlFor="postBody">Header Pic</label>
                    <input
                        className="input white-text"
                        type="file"
                        name="headerUrl"
                        onChange={handleFileTwo}
                        required={true}
                        autoComplete="off"
                    />
                    <label htmlFor="postBody">Location</label>
                    <input
                        className="input white-text"
                        type="text"
                        name="location"
                        onChange={handleInput}
                        required={true}
                        autoComplete="off"
                        value={userDetails.location}
                    />
                    <label htmlFor="postBody">Bio</label>
                    <input
                        className="input white-text"
                        type="text"
                        name="bio"
                        onChange={handleInput}
                        required={true}
                        autoComplete="off"
                        value={userDetails.bio}
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

export default EditDetails;
