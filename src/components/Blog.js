import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = (props) => {
    const [blog, updateBlog] = useState({});
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const token = localStorage.token;
        axios
            .get(
                `${process.env.REACT_APP_BASE_API}/users/${props.match.params.id}`
            )
            .then((response) => {
                const data = response.data;
                console.log("user data is: ", data);
                updateBlog({
                    ...blog,
                    userId: data.userId,
                    userName: data.userName,
                    location: data.location,
                    imageUrl: data.imageUrl,
                });
                return data;
            })
            .then(() => {
                return axios.get(`${process.env.REACT_APP_BASE_API}/posts`);
            })
            .then((response) => {
                const blogPosts = response.data;
                const filteredPosts = blogPosts.filter(
                    (post) => post.userName === props.match.params.id
                );
                setPosts([...posts, ...filteredPosts]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <section>
            {Object.keys(blog).length > 0 ? (
                <div>
                    <img src={blog.imageUrl} alt="user-avatar" />
                    <p>{blog.userName}</p>
                </div>
            ) : (
                <p>Loading blog..</p>
            )}
            {posts.length > 0 ? (
                posts.map((post) => {
                    return <p>{post.postBody}</p>;
                })
            ) : (
                <p>There doesn't appear to be any posts here...</p>
            )}
        </section>
    );
};

export default Blog;
