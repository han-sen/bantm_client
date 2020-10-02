import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const DashPost = (props) => {
    dayjs.extend(relativeTime);
    return (
        <div className="dash_post_wrap">
            <div className="dash_post_user_row">
                <img
                    src={props.post.imageUrl}
                    alt="user-avatar"
                    className="user_avatar"
                />
                <p key={props.post.userName}>{props.post.userName}</p>
            </div>
            <div className="dash_post_postBody">
                <p key={props.post.postBody}>{props.post.postBody}</p>
                <p key={props.post.createdAt}>
                    {dayjs(props.post.createdAt).fromNow()}
                </p>
            </div>
            <div className="dash_post_reactions">
                <p key={props.post.likes}>
                    <i className="material-icons left">thumb_up</i>{" "}
                    {props.post.likes}
                </p>
                <p key={props.post.comments}>
                    <i className="material-icons left">sms</i>{" "}
                    {props.post.comments}
                </p>
            </div>
        </div>
    );
};

export default DashPost;
