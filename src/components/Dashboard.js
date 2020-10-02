import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import DashPost from "./DashPost";
import axios from "axios";

const Dashboard = (props) => {
    const [posts, updatePosts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_API}/posts`
                );
                const data = await response.data;
                console.log(data);
                updatePosts(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    return (
        <div>
            <h2>Dashboard</h2>
            {posts.length > 0 ? (
                posts.map((post, i) => {
                    return <DashPost post={post} key={i} />;
                })
            ) : (
                <Loader text="Loading the latest posts..."></Loader>
            )}
        </div>
    );
};

export default Dashboard;
