import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eye from "../assets/eye-icon.png";
import LoadingSvg from "../assets/loading.svg";
import pen from "../assets/pen-icon.png";
import trash from "../assets/trash-icon.png";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import PostDetailsModal from "../components/PostDetailsModal";
import PostContext from "../context/post.context";
import { UserContext } from "../context/user.context";
import { post } from "../services/authService";

const OthersProfile = () => {
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);
  const [followingUser, setFollowingUser] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState({});
  const [loading, setLoading] = useState(false);

  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const {
    fetchLoggedInUser,
    fetchUser,
    loggedInUser,
    selectedUser,
    unfollowUser,
    followUser,
  } = useContext(UserContext);

  const { deleteComment } = useContext(PostContext);

  const { userId } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      fetchLoggedInUser();
      fetchUser(userId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const establishFollowing = () => {
    if (selectedUser && loggedInUser) {
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
      followingUser ? await unfollowUser() : await followUser();
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPostDetailsModal = (postId) => {
    const foundPost = selectedUser.posts.find((post) => post._id === postId);
    setSelectedPost(foundPost);
    setOpenPostDetailsModal(true);
  };

  const handleClosePostDetailsModal = () => {
    setOpenPostDetailsModal(false);
    setSelectedPost({});
    setNewComment({ comment: "" });
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
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
                  onClick={handleFollow}
                >
                  {!loading && followingUser ? "Unfollow" : "Follow"}
                </button>
              </div>
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
                    {followers.length}
                    <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                      Followers
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    onClick={() => setOpenFollowingModal(true)}
                  >
                    {following.length}
                    <span className="bg-slate-600 rounded-md text-white outline-4 px-4">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">{bio}</div>
          </div>
          <div className="flex justify-center flex-wrap gap-5 my-10">
            {posts && posts ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="post-container relative"
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div
                    className="flex flex-col p-4 shadow-2xl outline outline-2 outline-offset-2 outline-gray-300 transition-transform transform hover:scale-105"
                    key={`div-${post._id}`}
                  >
                    <img
                      className="w-80 h-80"
                      key={`post-image-post._id`}
                      src={post.media && post.media[0] && post.media[0].url}
                      alt="post images"
                    />
                    <div className="flex justify-between">
                      <span key={`location-${post._id}`} className="mb-2">
                        {post.location}
                      </span>
                      <span key={`likes-${post._id}`}>
                        {post.likes && post.likes.length} likes
                      </span>
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
                          onClick={() => handleDelete(`1/${post._id}`)}
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
                          onClick={() =>
                            handleOpenPostDetailsModal(hoveredPost)
                          }
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
                      className="text-center mt-3 mb-1 font-amarillo"
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
          <PostDetailsModal
            openModal={openPostDetailsModal}
            setCloseModal={handleClosePostDetailsModal}
            selectedPost={selectedPost}
            handleCommentSubmit={handleCommentSubmit}
            newComment={newComment}
            setNewComment={setNewComment}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      )}
    </div>
  );
};

export default OthersProfile;
