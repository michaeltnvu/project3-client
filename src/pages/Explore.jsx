import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import PostContext from "../context/post.context";
import { get } from "../services/authService";
import LoadingSvg from "../assets/loading.svg";
import { Link } from "react-router-dom";

const Explore = () => {
  const { user } = useContext(AuthContext);
  const { posts: postsContext } = useContext(PostContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, postsContext]);

  if (loading) {
    return (
      <img
        className="h-screen w-screen flex items-center justify-center"
        src={LoadingSvg}
        alt="loading"
      />
    );
  }

  return (
    <div>
      <h3 className="text-3xl font-amarillo flex flex-wrap justify-center tracking-wider mt-20">
        Explore Pathfindr Profiles
      </h3>
      {users.map((currentUser) => (
        <div key={currentUser._id} className="user details flex flex-col justify-center items-center">
          <div className="user details flex flex-col justify-center items-center my-20 py-8 outline outline-2 outline-offset-2 outline-gray-300 shadow-2xl w-80 h-80 ">
            <div className="image">
              <Link to={`/users/${currentUser._id}`}>
                <img
                  className="w-20 h-20 rounded-full border-4 border-white drop-shadow-lg "
                  src={currentUser.profileImage}
                  alt="profile image"
                />
              </Link>
            </div>
            <div className="user-info font-black">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="user-handle">@{currentUser.username}</div>
            <div className="bg-slate-600 rounded-md text-white outline-4 px-4 my-4">
              Following: {currentUser.following.length}
            </div>
            <div className="bg-slate-600 rounded-md text-white outline-4 px-4">
              Followers: {currentUser.followers.length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;