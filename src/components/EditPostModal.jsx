import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useContext } from "react";
import PostContext from "../context/post.context";

const EditPostModal = ({
  openModal,
  setOpenModal,
  editingPost,
  setEditingPost,
}) => {
  const { updatePost, deletePost } = useContext(PostContext);

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

  const handleDelete = (postId) => {
    deletePost(postId);
    setOpenModal(false);
  };

  return (
    <Modal
      dismissible
      popup
      show={openModal}
      position="center"
      onClose={() => setOpenModal(false)}
    >
      <Modal.Body className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 w-96 max-h-full shadow-2xl">
      <Modal.Header className="font-bold">Edit Post</Modal.Header>
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location"  />
            </div>
            <TextInput
              id="location"
              onChange={handleLocationChange}
              value={editingPost.location}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="caption" value="Caption" />
            </div>
            <TextInput
              id="caption"
              onChange={handleCaptionChange}
              value={editingPost.caption}
              required
            />
          </div>

          <div className="w-full space-x-4 flex justify-center gap-10">
            <Button
              className="bg-sky-500 w-20 mb-8"
              onClick={() => handleEditSubmit(editingPost._id)}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
