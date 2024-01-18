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
        <Modal.Body className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 w-96 max-h-full shadow-2xl">
        <Modal.Header>View Post</Modal.Header>
          <div>
            <div className="">
              {selectedPost && (
                <div>
                  <div>
                    {media && (
                      <>
                        <img className="max-w-80 h-auto" src={media[0].url} />
                        <div className="flex gap-20">
                          <span>{location}</span>
                          <span>{caption}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div>{likes && likes.length} Likes</div>
                  <div className="">
                    <h3 className="bg-slate-600 rounded-md text-white outline-4">Comments</h3>
                    <ul>
                      {post &&
                        post.comments.map((el, index) => (
                          <li key={index} className="flex mb-1">
                            <img
                              className="w-4 h-4 mt-2 ml-2 rounded-full"
                              src={el.createdByUser.profileImage}
                            />
                            <div className="flex ml-2">
                              <div>
                                <span>{el.createdByUser.username}</span>
                                <p>{el.comment}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteComment(el._id)}
                              >
                                x
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <form className="" onSubmit={handleCommentSubmit}>
                      <Label htmlFor="newComment" />
                      <TextInput
                        id="newComment"
                        onChange={(e) =>
                          setNewComment({ comment: e.target.value })
                        }
                        value={newComment.comment}
                        placeholder="Add a comment"
                      />
                      <div className="w-full space-x-4 flex justify-center gap-10 mt-1">
                      <Button className="bg-sky-500 w-20 mb-8" type="submit">
                        Submit
                      </Button>
                      </div>
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
