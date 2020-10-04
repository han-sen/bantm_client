import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeButton = (props) => {
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        if (liked === false) {
            axios
                .post(
                    `${process.env.REACT_APP_BASE_API}/posts/${props.post.id}/like`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                        },
                    }
                )
                .then((response) => {
                    const likeStatus = !liked;
                    setLiked(likeStatus);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post(
                    `${process.env.REACT_APP_BASE_API}/posts/${props.post.id}/unlike`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                        },
                    }
                )
                .then((response) => {
                    const likeStatus = !liked;
                    setLiked(likeStatus);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <button onClick={handleLike} className="btn">
            <i className="material-icons left">favorite</i> {props.post.likes}
        </button>
    );
};

export default LikeButton;
