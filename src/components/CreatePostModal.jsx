import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import PostContext from "../context/post.context";

const CreatePostModal = ({ openModal, setOpenModal }) => {
  const [reqBody, setReqBody] = useState({
    media: [
      {
        type: "image",
        url: "",
      },
    ],
    location: "",
    caption: "",
  });

  const { addPost } = useContext(PostContext);

  function onCloseModal() {
    setOpenModal(false);
    setReqBody({
      media: [
        {
          type: "image",
          url: "",
        },
      ],
      location: "",
      caption: "",
    });
  }

  const handleMediaChange = (key, value) => {
    setReqBody((prevReqBody) => ({
      ...prevReqBody,
      media: [
        {
          ...prevReqBody.media[0],
          [key]: value,
        },
      ],
    }));
  };

  const handleLocationChange = (event) => {
    setReqBody((prevReqBody) => ({
      ...prevReqBody,
      location: event.target.value,
    }));
  };

  const handleCaptionChange = (event) => {
    setReqBody((prevReqBody) => ({
      ...prevReqBody,
      caption: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost(reqBody);
      onCloseModal();
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  };

  return (
    <>
      <Modal dismissible popup show={openModal} onClose={onCloseModal}>
        <Modal.Body className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 w-96 max-h-full shadow-2xl">
        <Modal.Header>Create Post</Modal.Header>
          <div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mediaUrl" value="Image URL" />
                <TextInput
                  id="mediaUrl"
                  onChange={(event) =>
                    handleMediaChange("url", event.target.value)
                  }
                  value={reqBody.media.url}
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                onChange={handleLocationChange}
                value={reqBody.location}
                placeholder="City (optional), State (optional), Country"
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
                value={reqBody.caption}
                required
              />
            </div>
            <div className="w-full">
              <Button className="text-black" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePostModal;
