import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const DashPost = (props) => {
    dayjs.extend(relativeTime);
    return (
        <div
            className="dash_post_wrap fade-in"
            key={`dash_post${props.post.id}`}
        >
            <div
                className="dash_post_user_row"
                key={`dash_post_row${props.post.id}`}
            >
                <div className="dash_post_user_inner">
                    <div
                        alt="user-avatar"
                        className="user_avatar circle responsive-img"
                        style={{
                            backgroundImage: `url(${props.post.imageUrl})`,
                        }}
                    ></div>
                    <p
                        key={props.post.userName + `dash_post${props.id}`}
                        className="dash_post_user"
                    >
                        <Link to={`/${props.post.userName}`}>
                            {props.post.userName}
                        </Link>
                    </p>
                </div>
                {props.post.userName === props.user.userName && (
                    <DeleteButton post={props.post} />
                )}
            </div>
            {props.post.postImg && (
                <div
                    style={{
                        background: `url(${props.post.postImg})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="dash_post_photo"
                />
            )}
            <div
                className="dash_post_postBody"
                key={`dash_post_body${props.id}`}
            >
                <p key={props.post.postBody}>{props.post.postBody}</p>
            </div>
            <div
                className="dash_post_reactions"
                key={`dash_post_reactions${props.id}`}
            >
                <LikeButton post={props.post} user={props.user} />
                {/* <p key={`dash_post_comment${props.post.userName}`}>
                    <i className="material-icons left">sms</i>{" "}
                    {props.post.comments}
                </p> */}
                <p key={props.post.createdAt}>
                    {dayjs(props.post.createdAt).fromNow()}
                </p>
            </div>
        </div>
    );
};

export default DashPost;
