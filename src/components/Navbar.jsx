import { Button } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = ({ setOpenModal }) => {
  const { logOutUser, getToken } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {getToken() && (
        <div className="h-16 shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center gap-x-10 ">
          <Link
            to="/"
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <img className="w-6 h-6" src="../src/assets/home-icon.png" />
            Home
          </Link>
          <Link
            to="/explore"
            className="flex flex-col items-center justify-center"
          >
            <img className="w-6 h-6 " src="../src/assets/explore-icon.png" />
            Explore
          </Link>
          <div className="flex flex-col items-center">
            <img className="w-6 h-6" src="../src/assets/create-icon.png" />
            <Button class="outline-none" onClick={() => setOpenModal(true)}>
              Create Post
            </Button>
          </div>

          <Link
            to="/profile"
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <img className="w-6 h-6" src="../src/assets/profile-icon.png" />
            Profile
          </Link>
          <button
            className="flex flex-col items-center justify-center"
            onClick={logOutUser}
          >
            <img className="w-6 h-6" src="../src/assets/logout-icon.png" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
