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
      <div className="home-posts flex flex-row gap-10">
        {posts.map((post) => {
          return <img key={post._id} src={post.media[0].url} />;
        })}
      </div>
    </div>
  );
};

export default Home;
