import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { get } from "../services/authService";

function PostDetails({
  openModal,
  setCloseModal,
  selectedPost,
  handleCommentSubmit,
  newComment,
  setNewComment,
  handleDeleteComment,
}) {
  const [post, setPost] = useState(null);
  const { media, likes, caption, location } = selectedPost;

  useEffect(() => {
    if (openModal)
      get(`/posts/${selectedPost._id}`).then((res) => setPost(res.data));
  }, [newComment, handleCommentSubmit, handleDeleteComment]);

  return (
    <>
      <Modal show={openModal} onClose={setCloseModal} dismissible popup>
        <Modal.Header className="mb-3 text-lg font-black">
          Viewing Post
        </Modal.Header>
        <Modal.Body className="shadow-2xl">
          <div>
            <div className="">
              {selectedPost && (
                <div className="flex flex-col items-center">
                  <div>
                    {media && (
                      <div>
                        <img className="max-w-96" src={media[0].url} />
                        <div className="flex justify-between">
                          <span>{location}</span>
                          <span>{likes && likes.length} Likes</span>
                        </div>
                        <span className="flex justify-center">{caption}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <ul>
                      {post &&
                        post.comments.map((el, index) => (
                          <li key={index} className="flex mb-1">
                            <img
                              className="w-4 h-4 mt-2 ml-2 rounded-full"
                              src={el.createdByUser.profileImage}
                            />
                            <div className="w-full">
                              <div className="flex justify-between ml-2">
                                <span>{el.createdByUser.username}</span>
                                <button
                                  onClick={() => handleDeleteComment(el._id)}
                                >
                                  x
                                </button>
                              </div>
                              <p>{el.comment}</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <form
                      className="flex justify-center"
                      onSubmit={handleCommentSubmit}
                    >
                      <TextInput
                        id="newComment"
                        className="w-[19em]"
                        onChange={(e) =>
                          setNewComment({ comment: e.target.value })
                        }
                        value={newComment.comment}
                        placeholder="Add a comment"
                      />
                      <Button className="bg-sky-500 w-20" type="submit">
                        Submit
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostDetails;
