import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const FollowingModal = ({ openModal, setOpenModal, following }) => {
  return (
    <div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        dismissible
        popup
      >
        <Modal.Header>Following</Modal.Header>
        <Modal.Body>
          <div>
            {following.length === 0 ? (
              <span>You are not following anyone at the moment</span>
            ) : (
              <div className="flex flex-col">
                {following.map((user, index) => (
                  <div key={index} className="flex">
                    <img
                      className="rounded-full w-48 h-48"
                      src={user.profileImage}
                    />
                    <span>{user.username}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FollowingModal;
