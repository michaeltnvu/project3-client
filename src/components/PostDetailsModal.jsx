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
        <Modal.Header>View Post</Modal.Header>
        <Modal.Body>
          <div>
            <div className="">
              {selectedPost && (
                <div>
                  <div>
                    {media && (
                      <>
                        <img className="max-w-96 h-auto" src={media[0].url} />
                        <div>
                          <span>{location}</span>
                          <span>{caption}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div>{likes && likes.length} Likes</div>
                  <div className="">
                    <h3>Comments</h3>
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
                      <Button className="text-black" type="submit">
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
