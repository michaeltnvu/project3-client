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

  const updatePost = (postId, updatedPost) => {
    // Update the post on the backend
    put(`/posts/${postId}`, updatedPost)
      .then(() => {
        // Update the post in the local state
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postId ? updatedPost : post))
        );
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const deletePost = (postId) => {
    // Delete the post on the backend
    del(`/posts/${postId}`)
      .then(() => {
        // Remove the post from the local state
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
