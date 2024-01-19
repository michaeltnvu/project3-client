import { createContext, useContext, useState } from "react";
import { get, put } from "../services/authService";
import { AuthContext } from "./auth.context";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pictureChanged, setPictureChanged] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchLoggedInUser = async () => {
    try {
      if (!user) {
        return;
      }
      await get(`/users/${user._id}`)
        .then((foundUser) => setLoggedInUser(foundUser.data))
        .catch((error) =>
          console.error("Error fetching logged-in user:", error)
        );
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  };

  const fetchUser = (userId) => {
    get(`/users/${userId}`)
      .then((foundUser) => setSelectedUser(foundUser.data))
      .catch((error) => console.error("Error fetching selected user:", error));
  };

  const changeProfilePic = (selectedImage) => {
    put(`/users/${loggedInUser._id}`, { profileImage: selectedImage })
      .then((updatedUser) => setLoggedInUser(updatedUser.data))
      .then(() => setPictureChanged((prev) => !prev))
      .catch((err) => console.error("Error changing profile picture:", err));
  };

  const unfollowUser = async () => {
    try {
      const updateFollowers = await selectedUser.followers.filter(
        (user) => user._id !== loggedInUser._id
      );
      const updateFollowing = await loggedInUser.following.filter(
        (user) => user._id !== selectedUser._id
      );

      await put(`/users/${selectedUser._id}`, { followers: updateFollowers })
        .then((updatedUser) => {
          setSelectedUser(updatedUser.data);
        })
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
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  const followUser = async () => {
    try {
      const addFollower = await [
        ...selectedUser.followers,
        {
          _id: loggedInUser._id,
          profileImage: loggedInUser.profileImage,
          username: loggedInUser.username,
        },
      ];
      const addFollowing = await [
        ...loggedInUser.following,
        {
          _id: selectedUser._id,
          profileImage: selectedUser.profileImage,
          username: selectedUser.username,
        },
      ];

      await put(`/users/${selectedUser._id}`, { followers: addFollower })
        .then((updatedUser) => {
          setSelectedUser(updatedUser.data);
        })
        .then(() => {
          put(`/users/${loggedInUser._id}`, { following: addFollowing })
            .then((updatedUser) => setLoggedInUser(updatedUser.data))
            .catch((error) =>
              console.error(
                "Error adding selected user to following list:",
                error
              )
            );
        })
        .catch((error) =>
          console.error(
            "Error adding logged-in user from followers list:",
            error
          )
        );
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchLoggedInUser,
        fetchUser,
        loggedInUser,
        selectedUser,
        unfollowUser,
        followUser,
        changeProfilePic,
        pictureChanged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
