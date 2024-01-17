import { useContext, useEffect, useState } from "react";
import EditPostModal from "../components/EditPostModal";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import PostDetailsModal from "../components/PostDetailsModal";
import { AuthContext } from "../context/auth.context";
import PostContext from "../context/post.context";
import { get } from "../services/authService";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { posts: postsContext } = useContext(PostContext);
  const [userProfile, setUserProfile] = useState(null);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState({});
  const [editingPost, setEditingPost] = useState({
    media: {
      type: "image",
      url: "",
    },
    location: "",
    caption: "",
  });

  const handleOpenPostDetailsModal = (postId) => {
    const foundPost = userProfile.posts.find((post) => post._id === postId);
    setSelectedPost(foundPost);
    setOpenPostDetailsModal(true);
  };

  const handleOpenModal = (postId) => {
    const foundPost = userProfile.posts.find((post) => post._id === postId);
    setEditingPost(foundPost);
    setOpenModal(true);
  };

  useEffect(() => {
    user &&
      get(`/users/${user._id}`)
        .then((foundUser) => setUserProfile(foundUser.data))
        .catch((err) => console.error("Error fetching user:", err));
  }, [postsContext]);

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
    <div>
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

          <div className="user-info bg-gray-500 mt-4 p-4 rounded-lg">
            <div className="user-name flex gap-20">
              <div>
                <div>
                  {firstName} {lastName}
                </div>
                <div className="user-handle">@{username}</div>
              </div>

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
            <div className="user-bio mt-5">Hi, my name is {firstName}!</div>
          </div>
          <div className="flex justify-center flex-wrap gap-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="post-container relative"
                onMouseEnter={() => setHoveredPost(post._id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="flex flex-col p-4 shadow-2xl" key={post._id}>
                  <img
                    className="w-80 h-80"
                    src={post.media[0].url}
                    alt="post images"
                    onClick={() => handleOpenPostDetailsModal(post._id)}
                  />
                  <div className="flex justify-between">
                    <span>{post.location}</span>
                    <span>Likes: {post.likes.length}</span>
                  </div>
                  {hoveredPost === post._id && (
                    <button
                      className="hover-button px-4 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2"
                      onClick={() => handleOpenModal(post._id)}
                    >
                      <img
                        src="../src/assets/pen.png"
                        alt="Button Image"
                        className="w-10 h-10 mr-2"
                      />
                    </button>
                  )}
                  <span className="text-center mt-3 mb-1">
                    "{post.caption}"
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
      <EditPostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <PostDetailsModal
        openModal={openPostDetailsModal}
        setOpenModal={setOpenPostDetailsModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};

export default Profile;
