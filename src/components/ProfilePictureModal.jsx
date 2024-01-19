import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import { put } from "../services/authService";
import { fileChange } from "../services/fileChange";

const ProfilePictureModal = ({ editPicture, setEditPicture }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { changeProfilePic } = useContext(UserContext);

  const handleFileChange = (e) => {
    setButtonDisabled(true);
    fileChange(e)
      .then((response) => {
        console.log("Cloundinary response", response.data);
        setSelectedImage(response.data.image);
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(true);
        console.error("Error while uploading the file:", err);
      });
  };

  const handleEditSubmit = () => {
    changeProfilePic(selectedImage);
    setEditPicture(false);
  };

  return (
    <Modal
      dismissible
      popup
      show={editPicture}
      size="lg"
      onClose={() => setEditPicture(false)}
    >
      <Modal.Header className="mb-3 text-lg font-black">
        Set your profile picture
      </Modal.Header>
      <Modal.Body className="shadow-2xl">
        <div>
          <Label htmlFor="profilePicture" value="Upload file" />

          <FileInput
            id="profilePicture"
            sizing="sm"
            helperText="SVG, PNG, JPG, JPEG, or GIF"
            onChange={(e) => handleFileChange(e)}
            required
          />
          <div className="flex justify-end">
            <Button
              disabled={buttonDisabled}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20"
              onClick={handleEditSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfilePictureModal;
