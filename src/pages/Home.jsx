import { useContext, useEffect, useState } from "react";
import PostContext from "../context/post.context.jsx";

const Home = () => {
  const { posts, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-10">
        {posts &&
          posts.map((post) => (
            <div
              className="flex flex-col px-4 pt-4 pb-3 shadow-2xl"
              key={post._id}
            >
              <img className="w-80 h-80" src={post.media[0].url} />
              <span className="mb-2">{post.location}</span>
              <div className="flex items-center">
                <img
                  className="w-6 h-6 mr-1 rounded-full"
                  src={post.createdByUser.profileImage}
                />
                <span>{post.createdByUser.username}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
