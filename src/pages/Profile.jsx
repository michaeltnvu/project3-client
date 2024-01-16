import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    get(`/users/${user._id}`)
      .then((userData) => {
        setUserProfile(userData);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const {
    bannerImage,
    profileImage,
    firstName,
    lastName,
    username,
    posts,
    followers,
    following,
    bio,
  } = userProfile.data;

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      <div className="user-banner ">
        <img className="py-10" src={bannerImage} alt="banner image" />
        <div className="user-image ">
          <img
            className="top-30 left-50"
            src={profileImage}
            alt="profile image"
          />
        </div>
      </div>

      <div className="user-info bg-gray-500">
        <div className="user-name flex flex-row gap-20">
          {`${firstName} ${lastName}`}
          <div className="user-stats-posts mt-20 bg-gray-600">
            {posts.length} Posts
          </div>
          <div className="user-stats-followers">
            {followers.length} Followers
          </div>
          <div className="user-stats-following">
            {following.length} Following
          </div>
        </div>
        <div className="user-handle">@{username}</div>
      </div>
      <div className="user-bio mt-20  bg-gray-600">
        Hi, my name is {firstName}
      </div>

      <div className="flex flex-row gap-20 h-400">
        {posts.map((post) => {
          return (
            <img className="w-80 h-80 p-8 shadow-2xl" key={post._id} src={post.media[0].url} alt="post images" />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
