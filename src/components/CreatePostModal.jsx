import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useContext, useState } from "react";
import PostContext from "../context/post.context";

import { fileChange } from "../services/fileChange";

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

  const [buttonDisabled, setButtonDisabled] = useState(false);

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

  const handleFileChange = (e, key) => {
    setButtonDisabled(true);

    fileChange(e)
      .then((response) => {
        console.log("Cloudinary response", response.data);
        setReqBody((prevReqBody) => ({
          ...prevReqBody,
          media: [
            {
              ...prevReqBody.media[0],
              [key]: response.data.image,
            },
          ],
        }));
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });
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
        <Modal.Header>Create Post</Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mediaUrl" value="Image URL" />
                <FileInput
                  id="mediaUrl"
                  onChange={(e) => handleFileChange(e, "url")}
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
              <Button
                disabled={false}
                className="text-black"
                onClick={handleSubmit}
              >
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
