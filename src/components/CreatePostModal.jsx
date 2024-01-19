import {
  Button,
  FileInput,
  FloatingLabel,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useContext, useState } from "react";
import PostContext from "../context/post.context";
import { fileChange } from "../services/fileChange";

const CreatePostModal = ({ openModal, setOpenModal }) => {
  const { addPost } = useContext(PostContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
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
        setButtonDisabled(true);
        console.log("Error while uploading the file: ", err);
      });
  };

  const handleSubmit = async () => {
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
        <Modal.Header className="mb-3 text-lg font-black">
          Create Post
        </Modal.Header>
        <Modal.Body className="shadow-2xl">
          <div>
            <div>
              <div className="block">
                <Label htmlFor="mediaUrl" value="Upload file" />
                <FileInput
                  id="mediaUrl"
                  sizing="sm"
                  helperText="SVG, PNG, JPG, JPEG, or GIF"
                  onChange={(e) => handleFileChange(e, "url")}
                  value={reqBody.media.url}
                  required
                />
              </div>
            </div>
            <div className="my-3">
              <Label htmlFor="location" value="Location" />
              <TextInput
                id="location"
                onChange={handleLocationChange}
                value={reqBody.location}
                placeholder="State (optional), Country"
                required
              />
            </div>
            <div>
              <Label htmlFor="caption" value="Caption" />
              <TextInput
                id="caption"
                onChange={handleCaptionChange}
                value={reqBody.caption}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                disabled={buttonDisabled}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
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
