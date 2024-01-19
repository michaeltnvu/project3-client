import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useContext } from "react";
import PostContext from "../context/post.context";

const EditPostModal = ({
  openModal,
  setOpenModal,
  editingPost,
  setEditingPost,
}) => {
  const { updatePost } = useContext(PostContext);

  const handleLocationChange = (event) => {
    setEditingPost((prevPost) => ({
      ...prevPost,
      location: event.target.value,
    }));
  };

  const handleCaptionChange = (event) => {
    setEditingPost((prevPost) => ({
      ...prevPost,
      caption: event.target.value,
    }));
  };

  const handleEditSubmit = (postId) => {
    updatePost(postId, editingPost);
    setOpenModal(false);
  };

  return (
    <Modal
      dismissible
      popup
      size="sm"
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header className="mb-3 text-lg font-black">Edit Post</Modal.Header>
      <Modal.Body className="shadow-2xl">
        <div>
          <div className="mb-2">
            <Label htmlFor="location" value="Location" />
            <TextInput
              id="location"
              onChange={handleLocationChange}
              value={editingPost.location}
              placeholder="State (optional), Country"
              required
            />
          </div>
          <div>
            <Label htmlFor="caption" value="Caption" />
            <TextInput
              id="caption"
              onChange={handleCaptionChange}
              value={editingPost.caption}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
              onClick={() => handleEditSubmit(editingPost._id)}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
