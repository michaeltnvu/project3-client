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
        size="sm"
        onClose={() => setOpenModal(false)}
        dismissible
        popup
      >
        <Modal.Header className="mb-3 text-lg font-black">
          Followers
        </Modal.Header>
        <Modal.Body className="shadow-2xl">
          <div>
            {followers.length === 0 ? (
              <span>No followers available</span>
            ) : (
              <div className="flex flex-col">
                {followers.map((follower, index) => (
                  <div key={index} className="border-b-2">
                    <Link
                      className="flex my-1"
                      to={
                        user._id !== follower._id
                          ? `/users/${follower._id}`
                          : "/profile"
                      }
                    >
                      <img
                        className="rounded-full w-6 h-6 "
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
