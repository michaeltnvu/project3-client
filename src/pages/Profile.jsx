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
    <div className="user-profile">
      <div className="user-banner">
        <img src={bannerImage} alt="banner image" />
        <div className="user-image">
          <img src={profileImage} alt="profile image" />
        </div>
      </div>

      <div className="user-info">
        <div className="user-name">
          {`${firstName} ${lastName}`}
          <div className="user-handle">@{username}</div>
        </div>
        <div className="user-stats-posts">{posts.length} Posts</div>
        <div className="user-stats-followers">{followers.length} Followers</div>
        <div className="user-stats-following">{following.length} Following</div>
      </div>

      <div className="user-bio">{bio}</div>

      <div className="user-posts">{posts.map((post) => {})}</div>
    </div>
  );
};

export default Profile;
