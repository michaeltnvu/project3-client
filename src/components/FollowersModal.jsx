import { Modal } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const FollowersModal = ({ openModal, setOpenModal, followers }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        dismissible
        popup
      >
        <Modal.Body className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 w-96 max-h-full shadow-2xl">
        <Modal.Header>Followers</Modal.Header>
          <div className="">
            {followers.length === 0 ? (
              <span>No followers available</span>
            ) : (
              <div className="flex flex-col">
                {followers.map((follower, index) => (
                  <div key={index}>
                    <Link
                      className="flex"
                      to={
                        user._id !== follower._id
                          ? `/users/${follower._id}`
                          : "/profile"
                      }
                    >
                      <img
                        className="rounded-full w-6 h-6 ml-5 mb-2"
                        src={follower.profileImage}
                      />
                      <span className="ml-2">{follower.username}</span>
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

export default FollowersModal;
