import { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { SERVER_URL } from "../services/SERVER_URL"; 


const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

      // Fetch posts from the backend API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/posts/`); // Update the URL accordingly
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // This effect runs once when the component mounts
  

     // Function to add a new post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${SERVER_URL}/posts/`, newPost); 
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  
    // Other functions related to posts (e.g., deletePost, updatePost) can be added here.
  
    return (
      <PostContext.Provider value={{ posts, addPost }}>
        {children}
      </PostContext.Provider>
    );
  };
  
  export { PostProvider, PostContext };

export default PostContext;