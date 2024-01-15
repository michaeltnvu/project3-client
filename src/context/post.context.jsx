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

  const addPost = (newPost) => {
    post(`/posts`, newPost)
      .then((response) => setPosts([newPost, ...posts]))
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
