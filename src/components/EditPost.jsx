import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import PostContext from "../context/post.context";

export const EditPost = ({
  openModal,
  setOpenModal,
  editedPost,
  setEditedPost,
  postId,
}) => {
  const { posts, updatePost, deletePost } = useContext(PostContext);

  //Modal Open & Close

  const onCloseModal = () => {
    setOpenModal(false);
    //setSelectedPostId(null);
  };

  // Update the editedPost state when postId changes
  useEffect(() => {
    const postDetails = posts.find((post) => post.id === postId);
    // Update the local state with the post details
    if (postDetails) {
      setEditedPost(postDetails);
    }
  }, [postId, posts, setEditedPost]);


  //Form field functions
  const handleMediaChange = (key, value) => {
    setEditedPost((prevPost) => ({
      ...prevPost,
      media: {
        ...prevPost.media,
        [key]: value,
      },
    }));
  };

  const handleLocationChange = (event) => {
    setEditedPost((prevPost) => ({
      ...prevPost,
      location: event.target.value,
    }));
  };

  const handleCaptionChange = (event) => {
    setEditedPost((prevPost) => ({
      ...prevPost,
      caption: event.target.value,
    }));
  };

  //Update and Delete (CRUD)
  const handleEditSubmit = () => {
    updatePost(postId, editedPost);
    onCloseModal();
  };

  const handleDelete = (postId) => {
    deletePost(postId);
    onCloseModal();
  };

  //Modal
  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header>
          <span className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Post
          </span>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            {/* Display existing post details */}
            <div>
              <div className="Media mb-2 block">
                <Label htmlFor="mediaType" value="Media Type" />
                <select
                  id="mediaType"
                  onChange={(event) =>
                    handleMediaChange("type", event.target.value)
                  }
                  value={editedPost.media.type}
                  required
                >
                  <option value="image">Image</option>
                </select>
              </div>
              <div className="Media mb-2 block">
                <Label htmlFor="mediaUrl" value="Media URL" />
                <TextInput
                  id="mediaUrl"
                  onChange={(event) =>
                    handleMediaChange("url", event.target.value)
                  }
                  value={editedPost.media.url}
                  required
                />
              </div>
            </div>

            <div>
              <div className="Country mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                onChange={handleLocationChange}
                value={editedPost.location}
                required
              />
            </div>

            <div>
              <div className="Caption mb-2 block">
                <Label htmlFor="caption" value="Caption" />
              </div>
              <TextInput
                id="caption"
                onChange={handleCaptionChange}
                value={editedPost.caption}
                required
              />
            </div>

            <div className="w-full space-x-4 flex justify-center gap-10">
              <Button className="bg-sky-500 w-20 mb-8"onClick={handleEditSubmit}>Update</Button>
              <Button className="bg-red-500 w-20 mb-8" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
