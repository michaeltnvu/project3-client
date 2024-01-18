import { createContext, useContext, useState } from "react";
import { get } from "../services/authService";
import { AuthContext } from "./auth.context";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchLoggedInUser = () => {
    get(`/users/${user._id}`)
      .then((foundUser) => setLoggedInUser(foundUser.data))
      .catch((error) => console.error("Error fetching logged-in user:", error));
  };

  const fetchUser = (userId) => {
    get(`/users/${userId}`)
      .then((foundUser) => setSelectedUser(foundUser.data))
      .catch((error) => console.error("Error fetching selected user:", error));
  };

  const unfollowUser = () => {
    const updateFollowers = selectedUser.followers.filter(
      (user) => user._id !== loggedInUser._id
    );
    const updateFollowing = loggedInUser.following.filter(
      (user) => user._id !== selectedUser._id
    );
    put(`/users/${selectedUser._id}`, { followers: updateFollowers })
      .then((updatedUser) => setSelectedUser(updatedUser.data))
      .then(() => {
        put(`/users/${loggedInUser._id}`, { following: updateFollowing })
          .then((updatedUser) => setLoggedInUser(updatedUser.data))
          .catch((error) =>
            console.error(
              "Error removing selected user from following list:",
              error
            )
          );
      })
      .catch((error) => console.error("Error unfollowing user:", error));
  };

  console.log("selectedUser", selectedUser);

  return (
    <UserContext.Provider
      value={{
        fetchLoggedInUser,
        fetchUser,
        loggedInUser,
        selectedUser,
        unfollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
