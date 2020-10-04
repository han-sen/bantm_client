import React from "react";
import DashPost from "./DashPost";

const PostFeed = (props) => {
    return (
        <section className="feed_wrap fade-in">
            {props.posts.map((post, i) => {
                return <DashPost post={post} key={i} user={props.user} />;
            })}
        </section>
    );
};

export default PostFeed;
