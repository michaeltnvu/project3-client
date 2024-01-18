import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const ProfilePictureModal = ({ editPicture, setEditPicture }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleEditSubmit = () => {
    e.preventDefault();

    put(`/users/${userId}`, selectedImage)
      .then(() => {
        setEditPicture(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      dismissible
      popup
      show={editPicture}
      position="center"
      onClose={() => setEditPicture(false)}
    >
      <Modal.Body className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 w-96 max-h-full shadow-2xl">
        <Modal.Header className="font-bold">Edit Profile Picture</Modal.Header>
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="profilePicture" value="Profile Picture" />
            </div>
            
            <FileInput
              id="profilePicture"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <div className="w-full space-x-4 flex justify-center gap-10">
            <Button className="bg-sky-500 w-20 mb-8" onClick={handleEditSubmit}>
              Update
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfilePictureModal;
