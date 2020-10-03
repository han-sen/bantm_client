import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const DashPost = (props) => {
    dayjs.extend(relativeTime);
    return (
        <div className="dash_post_wrap" key={`dash_post${props.post.id}`}>
            <div
                className="dash_post_user_row"
                key={`dash_post_row${props.post.id}`}
            >
                <div
                    alt="user-avatar"
                    className="user_avatar circle responsive-img"
                    style={{
                        backgroundImage: `url(${props.post.imageUrl})`,
                    }}
                ></div>
                <p key={props.post.userName + `dash_post${props.id}`}>
                    <Link to={`/${props.post.userName}`}>
                        {props.post.userName}
                    </Link>
                </p>
            </div>
            <div
                className="dash_post_postBody"
                key={`dash_post_body${props.id}`}
            >
                <p key={props.post.postBody}>{props.post.postBody}</p>
                <p key={props.post.createdAt}>
                    {dayjs(props.post.createdAt).fromNow()}
                </p>
            </div>
            <div
                className="dash_post_reactions"
                key={`dash_post_reactions${props.id}`}
            >
                <p key={`dash_post_like${props.post.userName}`}>
                    <i className="material-icons left">thumb_up</i>{" "}
                    {props.post.likes}
                </p>
                <p key={`dash_post_comment${props.post.userName}`}>
                    <i className="material-icons left">sms</i>{" "}
                    {props.post.comments}
                </p>
            </div>
        </div>
    );
};

export default DashPost;
