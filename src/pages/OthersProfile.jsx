import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import { get } from "../services/authService";

const OthersProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    get(`/users/${userId}`)
      .then((foundUser) => setUserProfile(foundUser.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

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
    bio,
  } = userProfile;

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      {userProfile && (
        <div>
          <div className="relative h-64">
            <img
              className="w-full h-full object-cover"
              src={bannerImage}
              alt="banner image"
            />
            <div className="user-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                className="w-40 h-40 rounded-full border-4 border-white"
                src={profileImage}
                alt="profile image"
              />
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
            <div className="user-bio mt-5">{bio}</div>
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

export default OthersProfile;
