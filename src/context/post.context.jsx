import { createContext, useState } from "react";
import { axiosDelete, get, post, put } from "../services/authService";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);

  const fetchPosts = () => {
    get(`/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const fetchPost = (postId) => {
    get(`/posts/${postId}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching single post:", err));
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
        fetchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
