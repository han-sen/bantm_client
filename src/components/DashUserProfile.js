import React from "react";
import { Link } from "react-router-dom";
import EditDetails from "./EditDetails";
import NewPost from "./NewPost";

const DashUserProfile = (props) => {
    return (
        <div className="dash_user_profile fade-in" id="dash_profile">
            <div className="dash_user_profile_row avatar_row">
                <img
                    src={props.user.imageUrl}
                    alt="user-pic"
                    className="user_avatar"
                />
                <p className="dash_profile_detail">
                    <Link to={`/${props.user.userName}`}>
                        {props.user.userName}
                    </Link>
                </p>
            </div>
            <div className="dash_user_profile_row"></div>
            <p className="dash_profile_subheader">Location:</p>
            <p className="dash_profile_detail">{props.user.location}</p>
            <div className="dash_user_profile_row">
                <p className="dash_profile_subheader">Bio:</p>
                <p className="dash_profile_detail">{props.user.bio}</p>
            </div>
            <div className="dash_profile_buttons">
                <EditDetails user={props.user} setUser={props.setUser} />
                <NewPost />
            </div>
        </div>
    );
};

export default DashUserProfile;
