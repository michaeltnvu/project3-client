import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSvg from "../assets/loading.svg";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import { UserContext } from "../context/user.context";

const OthersProfile = () => {
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [followingUser, setFollowingUser] = useState(null);
  const [followStatus, setFollowingStatus] = useState(null);
  const {
    fetchLoggedInUser,
    fetchUser,
    loggedInUser,
    selectedUser,
    unfollowUser,
  } = useContext(UserContext);
  const { userId } = useParams();

  const fetchData = async () => {
    try {
      await fetchLoggedInUser();
      await fetchUser(userId);
      await setFollowingUser(
        selectedUser.followers.some((user) => user._id === loggedInUser._id)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [followStatus]);

  console.log("followStatus", followStatus);

  const handleFollow = () => {
    unfollowUser();
  };

  if (!selectedUser) return <img src={LoadingSvg} />;

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
  } = selectedUser;

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      {selectedUser && (
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
          <div className="bg-gray-500">
            <div className="flex gap-20">
              <div className="flex flex-col">
                <span>
                  {firstName} {lastName}
                </span>
                <span>@{username}</span>
              </div>
              <div>
                <div className="flex justify-between w-64 mb-2">
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
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                  onClick={handleFollow}
                >
                  {followingUser ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>

            <div className="mt-5">{bio}</div>
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
