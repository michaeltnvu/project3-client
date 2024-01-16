import { useContext, useEffect, useState } from "react";
import PostContext from "../context/post.context.jsx";

const Home = () => {
  const { posts, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="home-posts flex flex-row items-center justify-center gap-10">
        {posts &&
          posts.map((post) => {
            return (
              <img
                className="w-80 h-80 p-8 shadow-2xl"
                key={post._id}
                src={post.media[0].url}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
