import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";



const Navbar = () => {
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
            <img
              className="w-6 h-6 flex"
              src="../src/assets/explore-icon.png"
            />
            Explore
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <img className="w-6 h-6 flex" src="../src/assets/create-icon.png" />
            Create Post
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <img
              className="w-6 h-6 flex"
              src="../src/assets/profile-icon.png"
            />
            Profile
          </Link>
          <button
            className="flex flex-col items-center justify-center"
            onClick={logOutUser}
          >
            <img className="w-6 h-6 flex" src="../src/assets/logout-icon.png" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
