import { Button } from "flowbite-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = ({ setOpenModal }) => {
  const { logOutUser, getToken } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {getToken() && (
        <div className="h-16 shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center gap-x-10 ">
          <NavLink
            to="/"
            className="flex flex-col items-center justify-center mx-8" 
            style={{ textDecoration: "none" }}
          >
            <img className="w-6 h-6" src="../src/assets/home-icon.png" />
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className="flex flex-col items-center justify-center mx-8"
          >
            <img className="w-6 h-6 " src="../src/assets/explore-icon.png" />
            Explore
            </NavLink>
          <button
            onClick={() => setOpenModal(true)}
            className="flex flex-col items-center"
          >
            <img className="w-6 h-6" src="../src/assets/create-icon.png" />
            Create Post
          </button>

          <NavLink
            to="/profile"
            className="flex flex-col items-center justify-center mx-8"
            style={{ textDecoration: "none" }}
          >
            <img className="w-6 h-6" src="../src/assets/profile-icon.png" />
            Profile
            </NavLink>
          <button
            className="flex flex-col items-center justify-center mx-8"
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
