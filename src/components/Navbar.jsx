import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { logOutUser, getToken } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {getToken() && (
        <div className="navbar-container">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            Create Post
          </Link>
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
