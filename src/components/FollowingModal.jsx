import { Modal } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const FollowingModal = ({ openModal, setOpenModal, following }) => {
  const { user: authUser } = useContext(AuthContext);

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
                    <Link
                      className="flex"
                      to={
                        authUser._id !== user._id
                          ? `/users/${user._id}`
                          : "/profile"
                      }
                    >
                      <img
                        className="rounded-full w-6 h-6 ml-5 mb-2"
                        src={user.profileImage}
                      />
                      <span className="ml-2">{user.username}</span>
                    </Link>
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
