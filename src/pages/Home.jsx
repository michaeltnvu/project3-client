import { useContext, useEffect, useState } from "react";
import PostContext from "../context/post.context.jsx";

const Home = () => {
  const { posts, fetchPosts, addPost } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="home-posts flex flex-wrap items-center justify-center gap-10">
        {posts.map((post) => (
          <div className="p-8 shadow-2xl">
          <img className="w-80 h-80" key={post._id} src={post.media[0].url} />
          <span className="">{post.location}</span>
          </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
