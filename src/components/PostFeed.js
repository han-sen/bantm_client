import React from "react";
import DashPost from "./DashPost";

const PostFeed = (props) => {
    return (
        <section className="feed_wrap">
            {props.posts.map((post, i) => {
                return <DashPost post={post} key={i} />;
            })}
        </section>
    );
};

export default PostFeed;
