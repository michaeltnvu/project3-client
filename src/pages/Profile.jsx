import { useContext, useEffect, useState } from "react";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
// import PostDetailsModal from "../components/PostDetailsModal";
import { EditPost } from "../components/EditPost";
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedPost, setEditedPost] = useState({
    media: {
      type: "image",
      url: "",
    },
    location: "",
    caption: "",
  });

  const [hoveredPost, setHoveredPost] = useState(null);

  const handleMouseEnter = (postId) => {
    setHoveredPost(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPost(null);
  };


  const handleOpenModal = (postId) => {
    setSelectedPostId(postId);
    // Fetch the specific post details when the modal is opened
    const postDetails = user.posts.find((post) => post.id === postId);
    setOpenModal(true);
    // Update the local state with the post details
    if (postDetails) {
      setEditedPost(postDetails);
    }
  };

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
        <div className="w-full h-96">
          <div className="relative h-64">
            <img className="w-full h-full object-cover" src={bannerImage} alt="banner image" />
            <div className="user-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img className="w-20 h-20 rounded-full border-4 border-white" src={profileImage} alt="profile image" />
            </div>
          </div>

          <div className="user-info bg-gray-500 mt-4 p-4 rounded-lg">
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
          <div className="flex items-center justify-center gap-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="post-container relative"
                onMouseEnter={() => handleMouseEnter(post._id)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="post-image-container p-8"
                >
                  <img
                    className="post image w-80 h-80 p-8 shadow-2xl"
                    src={post.media[0].url}
                    alt="post images"
                  />
                  <span className="">{post.location}</span>
                  <span>Likes: {post.likes.length}</span>
                  {hoveredPost === post._id && (
                    <button className="hover-button px-4 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2" onClick={() => handleOpenModal(true)}>
                      <img src="../src/assets/pen.png" alt="Button Image" className="w-10 h-10 mr-2" />
                    </button>
                  )}
                </div>
                </div>
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
          <EditPost
            openModal={openModal}
            setOpenModal={setOpenModal}
            editedPost={editedPost}
            setEditedPost={setEditedPost}
            postId={setSelectedPostId}
          />
            {/* <PostDetailsModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedPost={posts.find((post) => post._id === selectedPostId)}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
