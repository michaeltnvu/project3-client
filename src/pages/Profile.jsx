import { useContext, useEffect, useState } from "react";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    user &&
      get(`/users/${user._id}`)
        .then((foundUser) => setUserProfile(foundUser.data))
        .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  const {
    bannerImage,
    profileImage,
    firstName,
    lastName,
    followers,
    following,
    username,
    posts,
  } = userProfile;

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      {userProfile && (
        <div>
          <div className="user-banner ">
            <img src={bannerImage} alt="banner image" />
            <div className="">
              <img src={profileImage} alt="profile image" />
            </div>
          </div>
          <div className="user-info bg-gray-500">
            <div className="user-name flex gap-20">
              {`${firstName} ${lastName}`}
              <div className="flex flex-col items-center">
                {posts.length} <span>Posts</span>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => setOpenFollowersModal(true)}
              >
                {followers.length} <span>Followers</span>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => setOpenFollowingModal(true)}
              >
                {following.length} <span>Following</span>
              </div>
            </div>
            <div className="user-handle">@{username}</div>
            <div className="user-bio mt-5">Hi, my name is {firstName}!</div>
          </div>

          <div className="flex flex-row gap-4 w-[25vw]">
            {posts.map((post) => (
              <img key={post._id} src={post.media[0].url} alt="post images" />
            ))}
          </div>
          <FollowersModal
            openModal={openFollowersModal}
            setOpenModal={setOpenFollowersModal}
            followers={followers}
          />
          <FollowingModal
            openModal={openFollowingModal}
            setOpenModal={setOpenFollowingModal}
            following={following}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
