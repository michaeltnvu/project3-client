import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState, useEffect } from "react";
import PostContext from "../context/post.context";
import { get, post } from "../services/authService";

function PostDetails({ openModal, setOpenModal, selectedPost }) {
  const [postDetails, setPostDetails] = useState(null);
  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/posts/${selectedPost._id}/comments`, newComment)
      .then(() =>
        get(`/posts/${selectedPost._id}`).then((res) =>
          setPostDetails(res.data)
        ).catch((err) => console.log("Could not fetch post details", err))
      )
      .catch((err) => console.error("Error submitting post", err));
  };

  console.log("postDetails", postDetails);

  const { media, comments, likes, captions } = selectedPost;

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        dismissible
        popup
      >
        <Modal.Header>View Post</Modal.Header>
        <Modal.Body>
          <div>
            <div className="">
              {selectedPost && (
                <div>
                  <div>
                    {media && (
                      <img className="max-w-96 h-auto" src={media[0].url} />
                    )}
                  </div>
                  <div className="">
                    <h3>Comments</h3>
                    <ul>
                      {comments &&
                        comments.map((comment, index) => (
                          <li key={index} className="mb-1">
                            {comment}
                          </li>
                        ))}
                    </ul>
                    <form
                      className=""
                      onSubmit={handleSubmit}
                    >
                      <Label htmlFor="newComment"/>
                      <TextInput
                        id="newComment"
                        onChange={(e) => setNewComment({comment: e.target.value})}
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
