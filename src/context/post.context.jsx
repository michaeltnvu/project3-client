import { createContext, useState } from "react";
import { get, post } from "../services/authService";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    get(`/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const addPost = async (newPost) => {
    try {
      const response = await post("/posts", newPost);
      const createdPost = response.data;
      return createdPost;
    } catch (err) {
      console.error("Error adding post:", err);
      throw err;
    }
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
