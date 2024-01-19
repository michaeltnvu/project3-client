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
  const [loading, setLoading] = useState(false);
  const {
    fetchLoggedInUser,
    fetchUser,
    loggedInUser,
    selectedUser,
    unfollowUser,
    followUser,
  } = useContext(UserContext);
  const { userId } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchLoggedInUser();
      await fetchUser(userId);
      // setFollowingUser(
      //   selectedUser &&
      //     loggedInUser &&
      //     selectedUser.followers.some((user) => user._id === loggedInUser._id)
      // );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const establishFollowing = () => {
    if (selectedUser && loggedInUser) {
      console.log("Users ===>", selectedUser, loggedInUser);
      setFollowingUser(
        selectedUser.followers.some((user) => user._id === loggedInUser._id)
      );
    }
  };

  useEffect(() => {
    establishFollowing();
  }, [selectedUser, loggedInUser]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollow = async () => {
    try {
      setLoading(true);
      setFollowingUser((prev) => !prev);
      console.log("followingUser inside handleFollow", followingUser);
      followingUser ? await unfollowUser() : await followUser();
      fetchData();
    } catch (error) {
      console.error("Error during follow/unfollow:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !selectedUser) return <img src={LoadingSvg} />;

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

  console.log("followingUser", followingUser);

  return (
    <div>
      {selectedUser && (
        <div>
          <div className="relative h-64">
            <img
              className="w-full h-full object-cover"
              src={bannerImage}
              alt="banner image"
            />
            <div className="user-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl">
              <img
                className="w-40 h-40 rounded-full border-4 border-white"
                src={profileImage}
                alt="profile image"
              />
            </div>
          </div>
          <div className="user-info bg-slate-300 mt-4 p-4 rounded-lg drop-shadow-xl">
            <div className="text-center font-bold">
              <div className="text-2xl">
                {firstName} {lastName}
              </div>
              <div className="user-handle">@{username}</div>
              <div>
                <div className="flex justify-center space-x-60 mt-2 font-bold">
                  <div className="flex flex-col items-center cursor-pointer">
                    {posts.length}
                    <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                      Posts
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    onClick={() => setOpenFollowersModal(true)}
                  >
                    {followers.length}{" "}
                    <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                      Followers
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    onClick={() => setOpenFollowingModal(true)}
                  >
                    {following.length}{" "}
                    <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                      Following
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
                    onClick={handleFollow}
                  >
                    {!loading && followingUser ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5">{bio}</div>
          </div>
          <div className="flex justify-center flex-wrap gap-10 mt-10">
            {posts && posts ? (
              posts.map((post) => (
                <div className="flex flex-col p-4 shadow-2xl outline outline-2 outline-offset-2 outline-gray-300">
                  <img
                    className="w-80 h-80 transition-transform transform hover:scale-105"
                    key={post._id}
                    src={post.media && post.media[0] && post.media[0].url}
                    alt="post images"
                  />
                  <div className="flex gap-1">
                    <span>{post.location}</span>
                    <img
                      className="w-5 h-5 ml-40"
                      src="../src/assets/heart.png"
                    />
                    <span>{post.likes && post.likes.length}</span>
                  </div>
                </div>
              ))
            ) : (
              <span key="no-posts">No posts available</span>
            )}
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
