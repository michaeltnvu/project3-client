import { Card } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSvg from "../assets/loading.svg";
import PostContext from "../context/post.context";
import { UserContext } from "../context/user.context";
import { get } from "../services/authService";

const Explore = () => {
  const { loggedInUser } = useContext(UserContext);
  const { posts: postsContext } = useContext(PostContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/users");
        console.log("response", response);
        console.log("loggedInUser", loggedInUser);
        const filteredUsers = response.data.filter((user) => {
          return (
            user._id !== loggedInUser._id &&
            !loggedInUser.following.some(
              (followedUser) => user._id === followedUser._id
            )
          );
        });
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loggedInUser, postsContext]);

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
    <div className="flex flex-col items-center my-10">
      <h3 className="text-3xl font-amarillo flex justify-center tracking-wider mt-10 mb-6">
        Explore with more Pathfindrs
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {users.map((user) => (
          <Card
            className="w-72 max-w-72 shadow-2xl outline outline-1 outline-gray-300 transition-transform transform hover:scale-105"
            key={user._id}
          >
            <div className="flex flex-col items-center py-4">
              <img
                alt="profile image"
                src={user.profileImage}
                className="h-24 w-24 mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.followers.length} Followers
              </span>
              <div className="mt-4">
                <Link
                  to={`/users/${user._id}`}
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    // <div>
    //   <div className="flex flex-wrap gap-2">
    //         <div className="py-4 outline outline-2 outline-offset-2 outline-gray-300 shadow-2xl w-80 h-80 ">
    //           <div className="image">
    //             <Link to={`/users/${currentUser._id}`}>
    //               <img
    //                 className="w-20 h-20 rounded-full border-4 border-white drop-shadow-lg "
    //                 src={currentUser.profileImage}
    //
    //               />
    //             </Link>
    //           </div>
    //           <span className="font-black">
    //             {currentUser.firstName} {currentUser.lastName}
    //           </span>
    //           <span className="">@{currentUser.username}</span>
    //           <span className="bg-slate-600 rounded-md text-white outline-4 px-4 my-4">
    //             Following: {currentUser.following.length}
    //           </span>
    //           <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
    //             Followers: {currentUser.followers.length}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Explore;
