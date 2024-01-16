import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { EditPost } from "../components/EditPost";
import { Button, Label, Modal, TextInput } from "flowbite-react";

const Profile = () => {
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

  return (
    <div className="user-profile flex flex-col items-center justify-center">
      {user && (
        <div className="w-full h-96">
          <div className="user-banner relative h-64">
            <img
              className="w-full h-full object-cover"
              src={user.bannerImage}
              alt="banner image"
            />
            <div
              className="user-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              alt="profile image"
            >
              <img
                className="w-20 h-20 rounded-full border-4 border-white"
                src={user.profileImage}
                alt="profile image"
              />
            </div>
          </div>

          <div className="user-info bg-gray-500 mt-4 p-4 rounded-lg">
            <div className="user-name flex gap-20">
              {`${user.firstName} ${user.lastName}`}
              <div>{user.posts.length} Posts</div>
              <div>{user.followers.length} Followers</div>
              <div>{user.following.length} Following</div>
            </div>
            <div className="user-handle">@{user.username}</div>
            <div className="user-bio mt-5">
              Hi, my name is {user.firstName}!
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-10">
            {user.posts.map((post) => (
              <div key={post._id}>
                <div
                  className="post-image-container p-8"
                  onClick={() => handleOpenModal(post)}
                >
                  <img
                    className="post image w-80 h-80 p-8 shadow-2xl"
                    src={post.media[0].url}
                  />
                  <span className="">{post.location}</span>
                </div>
              </div>
            ))}
          </div>
          <EditPost
            openModal={openModal}
            setOpenModal={setOpenModal}
            editedPost={editedPost}
            setEditedPost={setEditedPost}
            postId={setSelectedPostId}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
