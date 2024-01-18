import { useContext, useEffect, useState } from "react";
import PostContext from "../context/post.context.jsx";

const Home = () => {
  const { posts, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort(
    (a, b) => b.likes.length - a.likes.length
  );
  // Function to shuffle an array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const trendingPosts = sortedPosts.slice(0, 4);
  const otherPosts = shuffleArray(sortedPosts.slice(4));

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="my-8">
        <h3 className="text-3xl mb-4 font-amarillo flex flex-wrap justify-center tracking-wider mt-6">
          Featured Posts
        </h3>
        <div className="flex flex-wrap justify-center gap-10">
          {trendingPosts.map((post) => (
            <div
              className="flex flex-col px-4 pt-4 pb-3 shadow-2xl"
              key={post._id}
            >
              <img className="w-80 h-80" src={post.media[0].url} />
              <div className="flex justify-between">
                <span className="mb-2">{post.location}</span>
                <div className="flex gap-1">
                  <img className="w-5 h-5" src="../src/assets/heart.png" />
                  <span>{post.likes.length}</span>
                </div>
              </div>
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
        <div className="flex flex-col items-center mt-6">
          <h3 className="text-3xl font-amarillo tracking-wider">
            Posts from other Pathfindrs
          </h3>
          <div className="flex flex-wrap justify-center gap-10 my-8">
            {posts &&
              otherPosts.map((post) => (
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
                    <div className="flex gap-1">
                      <img className="w-5 h-5" src="../src/assets/heart.png" />
                      <span>{post.likes.length}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
