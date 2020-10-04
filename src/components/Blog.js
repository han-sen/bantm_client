import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogHeader from "./BlogHeader";
import DashPost from "./DashPost";

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
                    headerUrl: data.headerUrl,
                    bio: data.bio,
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
        <section className="blog_wrap">
            {Object.keys(blog).length > 0 ? (
                <BlogHeader blog={blog} />
            ) : (
                <p>Loading blog..</p>
            )}
            <div className="blog_posts_wrap fade-in">
                {posts.length > 0 ? (
                    posts.map((post) => {
                        return <DashPost post={post} user={props.user} />;
                    })
                ) : (
                    <p>There doesn't appear to be any posts here...</p>
                )}
            </div>
        </section>
    );
};

export default Blog;
