import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loader from "./Loader";
import DashUserProfile from "./DashUserProfile";
import PostFeed from "./PostFeed";

const Dashboard = (props) => {
    const user = useContext(UserContext);
    const [posts, updatePosts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_API}/posts`
                );
                const data = await response.data;
                updatePosts(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    return (
        <div className="dashboard_wrap">
            <DashUserProfile user={props.user} setUser={props.setUser} />
            {posts.length > 0 ? (
                <PostFeed user={props.user} posts={posts} />
            ) : (
                <Loader text="Loading the latest posts..."></Loader>
            )}
        </div>
    );
};

export default Dashboard;
