import React from "react";
import axios from "axios";

const DeleteButton = (props) => {
    const handleDelete = () => {
        axios
            .delete(
                `${process.env.REACT_APP_BASE_API}/posts/${props.post.id}`,
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
        <div className="delete_button_wrap">
            <button
                onClick={handleDelete}
                className="waves-effect waves-light btn red darken-1"
            >
                <i className="material-icons">cancel</i>
            </button>
        </div>
    );
};

export default DeleteButton;
