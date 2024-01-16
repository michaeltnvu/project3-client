import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState, useContext } from "react";
import PostContext from "../context/post.context";

function CreatePost({ openModal, setOpenModal }) {
  const [reqBody, setReqBody] = useState({
    media: {
      type: "image", // Set default values for type and url
      url: "",
    },
    location: "",
    caption: "",
  });

  const { addPost } = useContext(PostContext);

  function onCloseModal() {
    setOpenModal(false);
    setReqBody({
      media: {
        type: "",
        url: "",
      },
      location: "",
      caption: "",
    });
  }

  const handleMediaChange = (key, value) => {
    setReqBody((prevReqBody) => ({
      ...prevReqBody,
      media: {
        ...prevReqBody.media,
        [key]: value,
      },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(reqBody);
    onCloseModal();
  };

  console.log(reqBody);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        dismissible
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create Post
            </h3>

            <div>
              <div className="Media mb-2 block">
                <Label htmlFor="mediaType" value="Media Type" />
                <select
                  id="mediaType"
                  onChange={(event) =>
                    handleMediaChange("type", event.target.value)
                  }
                  value={reqBody.media.type}
                  required
                >
                  {/* Add your media type options here */}
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="Media mb-2 block">
                <Label htmlFor="mediaUrl" value="Media URL" />
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
              <div className="Country mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                onChange={handleLocationChange}
                value={reqBody.location}
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
}

export default CreatePost;
