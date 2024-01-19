import { createContext, useState } from "react";
import { axiosDelete, get, post, put } from "../services/authService";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    get(`/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const addPost = async (newPost) => {
    console.log("Add Post fuction ===>", newPost);
    try {
      const response = await post("/posts", newPost);
      const createdPost = response.data;
      console.log("Created post ====>", createdPost);
      return createdPost;
    } catch (err) {
      console.error("Error adding post in context:", err);
      throw err;
    }
  };

  const updatePost = (postId, reqBody) => {
    put(`/posts/${postId}`, reqBody)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...reqBody } : post
          )
        );
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const deletePost = (postId) => {
    axiosDelete(`/posts/${postId}`)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const deleteComment = (commentId) => {
    axiosDelete(`/comments/${commentId}`).catch((error) =>
      console.log("Error deleting comment:", error)
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPosts,
        addPost,
        updatePost,
        deletePost,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
