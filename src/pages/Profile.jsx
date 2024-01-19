import { useContext, useEffect, useState } from "react";
import LoadingSvg from "../assets/loading.svg";
import EditPostModal from "../components/EditPostModal";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import PostDetailsModal from "../components/PostDetailsModal";
import ProfilePictureModal from "../components/ProfilePictureModal";
import PostContext from "../context/post.context";
import { UserContext } from "../context/user.context";
import { post } from "../services/authService";

const Profile = () => {
  const {
    posts: postsContext,
    deleteComment,
    deletePost,
  } = useContext(PostContext);
  const { fetchLoggedInUser, loggedInUser, selectedUser } =
    useContext(UserContext);

  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState({});
  const [editPicture, setEditPicture] = useState(false);
  const [editingPost, setEditingPost] = useState({
    media: {
      type: "image",
      url: "",
    },
    location: "",
    caption: "",
  });

  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const handleDelete = (postId) => {
    deletePost(postId);
    setOpenModal(false);
  };

  const handleOpenPostDetailsModal = (postId) => {
    const foundPost = loggedInUser.posts.find((post) => post._id === postId);
    setSelectedPost(foundPost);
    setOpenPostDetailsModal(true);
  };

  const handleOpenModal = (postId) => {
    const foundPost = loggedInUser.posts.find((post) => post._id === postId);
    setEditingPost(foundPost);
    setOpenModal(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    post(`/posts/${selectedPost._id}/comments`, newComment)
      .then(() => {
        const updatedComments = [
          ...selectedPost.comments,
          {
            createdByUser: {
              profileImage: user.profileImage,
              username: user.username,
            },
            comment: newComment.comment,
          },
        ];
        setNewComment({ comment: "" });
        setSelectedPost((prev) => ({
          ...prev,
          comments: updatedComments,
        }));
      })
      .catch((err) => console.error("Error submitting post", err));
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
    const updatedComments = selectedPost.comments.filter(
      (comment) => comment._id !== commentId
    );
    setSelectedPost((prev) => ({
      ...prev,
      comments: updatedComments,
    }));
  };

  const handleClosePostDetailsModal = () => {
    setOpenPostDetailsModal(false);
    setSelectedPost({});
    setNewComment({ comment: "" });
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    fetchLoggedInUser();
  }, [postsContext, selectedUser]);

  if (!loggedInUser)
    return (
      <img
        className="h-screen w-screen flex items-center justify-center"
        src={LoadingSvg}
        alt="loading"
      />
    );

  const {
    bannerImage,
    profileImage,
    firstName,
    lastName,
    followers,
    following,
    username,
    posts,
  } = loggedInUser;

  console.log("loggedInUser", loggedInUser);

  return (
    <div>
      {loggedInUser && (
        <div>
          <div className="relative h-64">
            <img
              className="w-full h-full object-cover"
              src={bannerImage}
              alt="banner image"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl">
              <img
                className="w-40 h-40 rounded-full border-4 border-white"
                src={profileImage}
                alt="profile image"
              />
              <button className="" onClick={() => setEditPicture(true)}>
                Edit Picture
              </button>
            </div>
          </div>

          <div className="bg-slate-300 mt-4 p-4 rounded-lg drop-shadow-xl">
            <div className="text-center font-bold">
              <div className="text-2xl">
                {firstName} {lastName}
              </div>
              <div className="user-handle">@{username}</div>
            </div>

            <div className="flex justify-center space-x-60 mt-2 font-bold">
              <div className="flex flex-col items-center cursor-pointer">
                {posts.length}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Posts
                </span>
              </div>
              <div
                className="flex flex-col items-center mr-1"
                onClick={() => setOpenFollowersModal(true)}
              >
                {followers.length}{" "}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Followers
                </span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setOpenFollowingModal(true)}
              >
                {following.length}{" "}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Following
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-10 mt-10">
            {posts ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="post-container relative"
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div
                    className="flex flex-col p-4 shadow-2xl outline outline-2 outline-offset-2 outline-gray-300"
                    key={post._id}
                  >
                    <img
                      className="w-80 h-80 transition-transform transform hover:scale-105 "
                      src={post.media && post.media[0] && post.media[0].url}
                      alt="post images"
                    />
                    <div className="flex justify-between mt-2">
                      <span>{post.location}</span>
                      <div className="flex">
                        <img
                          className="w-5 h-5 ml-40"
                          src="../src/assets/heart.png"
                        />
                        <span>{post.likes && post.likes.length}</span>
                      </div>
                    </div>

                    {hoveredPost === post._id && (
                      <button
                        className="hover-button px-4 py-2 rounded-md absolute top-0 right-10 mt-2 mr-2 drop-shadow-lg"
                        onClick={() => handleOpenModal(post._id)}
                      >
                        <img
                          src="../src/assets/pen-icon.png"
                          alt="Button Image"
                          className="w-10 h-10"
                        />
                      </button>
                    )}
                    {hoveredPost === post._id && (
                      <>
                        <button
                          className="Delete Button hover-button px-2 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2 drop-shadow-lg"
                          onClick={() => handleDelete(post._id)}
                        >
                          <img
                            src="../src/assets/trash-icon.png"
                            alt="Button Image"
                            className="w-10 h-10"
                          />
                        </button>
                        <button
                          className="Post-Details-Button bg-gray-500 opacity-75 text-white px-4 py-2 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          onClick={() => handleOpenPostDetailsModal(post._id)}
                        >
                          <img
                            src="../src/assets/eye-icon.png"
                            alt="Button Image"
                            className="w-10 h-10"
                          />
                        </button>
                      </>
                    )}
                    <span className="text-center mt-3 mb-1 font-amarillo">
                      "{post.caption}"
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span key="no-posts">No posts available</span>
            )}
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
        deletePost={deletePost}
      />
      <PostDetailsModal
        openModal={openPostDetailsModal}
        setCloseModal={handleClosePostDetailsModal}
        selectedPost={selectedPost}
        handleCommentSubmit={handleCommentSubmit}
        newComment={newComment}
        setNewComment={setNewComment}
        handleDeleteComment={handleDeleteComment}
      />
      <ProfilePictureModal
        editPicture={editPicture}
        setEditPicture={setEditPicture}
      />
    </div>
  );
};

export default Profile;
