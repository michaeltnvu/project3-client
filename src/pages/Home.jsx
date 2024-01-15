import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PostContext from "../context/post.context.jsx"; 


const Home = () => {
    const { posts, addPost } = useContext(PostContext);
  return (
    <div>
      <h1>Post Explore Page</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
      {/* <button onClick={() => addPost({ content: 'New Post' })}>
        Add New Post
      </button>*/}
    </div> 
  );
};

export default Home;
