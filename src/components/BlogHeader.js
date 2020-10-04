import React from "react";

const BlogHeader = (props) => {
    return (
        <div
            className="blog_header_wrap fade-in"
            style={{ backgroundImage: `url(${props.blog.headerUrl})` }}
        >
            <div className="blog_header_inner">
                <img
                    src={props.blog.imageUrl}
                    alt="user-avatar"
                    className="blog_header_avatar"
                />
                <div className="blog_header_details">
                    <h2>{props.blog.userName}</h2>
                    <p>{props.blog.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogHeader;
