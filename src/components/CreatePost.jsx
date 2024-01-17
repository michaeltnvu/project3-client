import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import {Flowbite} from 'flowbite-react'; 
import { useContext, useState } from "react";
import PostContext from "../context/post.context";

function CreatePost({ openModal, setOpenModal }) {

  const customTheme = {
    button: {
      color: {
        primary: 'bg-red-500 hover:bg-red-600',
      },
    },
  };

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
      const createdPost = await addPost(reqBody);
      onCloseModal();
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  };

  return (
    <Flowbite theme={customTheme}>
      <Modal
        show={openModal}
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
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

export default CreatePost;
