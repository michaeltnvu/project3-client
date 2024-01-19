import { useContext, useEffect, useState } from "react";
import eye from "../assets/eye-icon.png";
import heart from "../assets/heart.png";
import LoadingSvg from "../assets/loading.svg";
import pen from "../assets/pen-icon.png";
import trash from "../assets/trash-icon.png";
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
  const { fetchLoggedInUser, loggedInUser, selectedUser, pictureChanged } =
    useContext(UserContext);

  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState({});
  const [hoverProfilePic, setHoverProfilePic] = useState(false);
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
      .then(async () => {
        const updatedComments = [
          ...selectedPost.comments,
          {
            createdByUser: {
              profileImage: loggedInUser.profileImage,
              username: loggedInUser.username,
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

    const handleScroll = () => {
      const myBtn = document.getElementById("myBtn");
      if (myBtn) {
        myBtn.style.display =
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
            ? "block"
            : "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchLoggedInUser();
  }, [postsContext, selectedUser, pictureChanged]);

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

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

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
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl"
              onMouseOver={() => setHoverProfilePic(true)}
              onMouseOut={() => setHoverProfilePic(false)}
            >
              <img
                className="w-40 h-40 rounded-full border-4 border-white"
                src={profileImage}
                alt="profile image"
              />
              {hoverProfilePic && (
                <button onClick={() => setEditPicture(true)}>
                  <img
                    src={pen}
                    className="w-8 h-8 rounded-md absolute top-0 right-0 drop-shadow-lg"
                  />
                </button>
              )}
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
              <div className="flex flex-col items-center">
                {posts?.length}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Posts
                </span>
              </div>
              <div
                className="flex flex-col items-center mr-1 cursor-pointer"
                onClick={() => setOpenFollowersModal(true)}
              >
                {followers?.length}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Followers
                </span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setOpenFollowingModal(true)}
              >
                {following?.length}
                <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                  Following
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-5 my-10">
            {posts ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="post-container relative"
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div
                    className="flex flex-col p-4 shadow-2xl outline outline-2 outline-offset-2 outline-gray-300 transition-transform transform hover:scale-105"
                    key={`1/${post._id}`}
                  >
                    <img
                      key={`2/${post._id}`}
                      className="w-80 h-80"
                      src={post.media && post.media[0] && post.media[0].url}
                      alt="post images"
                    />
                    <div key={`3/${post._id}`} className="flex justify-between">
                      <span className="mb-2" key={`4/${post._id}`}>
                        {post.location}
                      </span>
                      <div key={`5/${post._id}`} className="flex">
                        {/* <img
                          key={`6/${post._id}`}
                          className="w-5 h-5"
                          src={heart}
                        /> */}
                        <span key={`7/${post._id}`}>
                          {post.likes && post.likes.length} likes
                        </span>
                      </div>
                    </div>
                    {hoveredPost === post._id && (
                      <div key={`buttons${post._id}`}>
                        <button
                          key={`8/${post._id}`}
                          className="hover-button px-4 py-2 rounded-md absolute top-0 right-10 mt-2 mr-2 drop-shadow-lg"
                          onClick={() => handleOpenModal(post._id)}
                        >
                          <img
                            key={`9/${post._id}`}
                            src={pen}
                            alt="Button Image"
                            className="w-10 h-10"
                          />
                        </button>
                        <button
                          key={`10/${post._id}`}
                          className="hover-button px-2 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2 drop-shadow-lg bg-opacity-50"
                          onClick={() => handleDelete(post._id)}
                        >
                          <img
                            key={`11/${post._id}`}
                            src={trash}
                            alt="Button Image"
                            className="w-10 h-10"
                          />
                        </button>
                        <button
                          key={`12/${post._id}`}
                          className="bg-gray-500 bg-opacity-50 p-2 rounded-md absolute top-[175px] left-1/2 transform -translate-x-1/2 -translate-y-1/3"
                          onClick={() => handleOpenPostDetailsModal(post._id)}
                        >
                          <img
                            key={`13/${post._id}`}
                            src={eye}
                            alt="Button Image"
                            className="w-10 h-10"
                          />
                        </button>
                      </div>
                    )}
                    <span
                      key={`14/${post._id}`}
                      className="text-center mt-3 mb-1 font-kalam"
                    >
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
      <button
        onClick={scrollToTop}
        id="myBtn"
        title="Go to top"
        className="hidden fixed bottom-8 left-8 z-50 text-white text-sm bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 rounded-full px-2 py-2 cursor-pointer transition-all duration-300 ease-in-out"
      >
        <svg
          className="w-[17px] h-[17px] text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M5 13V1m0 0L1 5m4-4 4 4"
          />
        </svg>
      </button>
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
