import { Avatar, Dropdown, Navbar as Nav } from "flowbite-react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo-white-horizontal.png";
import { AuthContext } from "../context/auth.context";
import { UserContext } from "../context/user.context";
import FloatingButton from "./FloatingButton";

const Navbar = ({ setOpenModal }) => {
  const { logOutUser, getToken } = useContext(AuthContext);
  const { loggedInUser, fetchLoggedInUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const isActiveLink = (path) => location.pathname === path;

  return (
    getToken() &&
    loggedInUser && (
      <Nav
        fluid
        className="shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500"
      >
        <Nav.Brand>
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Pathfindr Logo" />
        </Nav.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar
                alt="User settings"
                img={loggedInUser.profileImage}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {loggedInUser.firstName} {loggedInUser.lastName}
              </span>
              <span className="block truncate text-sm font-medium">
                @{loggedInUser.username}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOutUser}>Sign out</Dropdown.Item>
          </Dropdown>
          <Nav.Toggle />
        </div>
        <Nav.Collapse>
          <Nav.Link
            href="/"
            active={isActiveLink("/")}
            style={{ color: isActiveLink("/") ? "white" : "" }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="/explore"
            active={isActiveLink("/explore")}
            style={{ color: isActiveLink("/explore") ? "white" : "" }}
          >
            Explore
          </Nav.Link>
          <Nav.Link
            href="/profile"
            active={isActiveLink("/profile")}
            style={{ color: isActiveLink("/profile") ? "white" : "" }}
          >
            Profile
          </Nav.Link>
        </Nav.Collapse>
        <FloatingButton onClick={() => setOpenModal(true)} />
      </Nav>
    )
    // <nav className="navbar">
    //   {getToken() && (
    //     <div className="h-16 shadow-xl bg-gradient-to-r from-cyan-700 to-blue-500 text-white flex items-center justify-center gap-x-10 ">
    //       <NavLink
    //         to="/"
    //         className="flex flex-col items-center justify-center mx-8"
    //         style={{ textDecoration: "none" }}
    //       >
    //         <img className="w-6 h-6" src="../src/assets/home-icon.png" />
    //         Home
    //       </NavLink>
    //       <NavLink
    //         to="/explore"
    //         className="flex flex-col items-center justify-center mx-8"
    //       >
    //         <img className="w-6 h-6 " src="../src/assets/explore-icon.png" />
    //         Explore
    //         </NavLink>
    //       <button
    //         onClick={() => setOpenModal(true)}
    //         className="flex flex-col items-center"
    //       >
    //         <img className="w-6 h-6" src="../src/assets/create-icon.png" />
    //         Create Post
    //       </button>

    //       <NavLink
    //         to="/profile"
    //         className="flex flex-col items-center justify-center mx-8"
    //         style={{ textDecoration: "none" }}
    //       >
    //         <img className="w-6 h-6" src="../src/assets/profile-icon.png" />
    //         Profile
    //         </NavLink>
    //       <button
    //         className="flex flex-col items-center justify-center mx-8"
    //
    //       >
    //         <img className="w-6 h-6" src="../src/assets/logout-icon.png" />
    //         Logout
    //       </button>
    //     </div>
    //   )}
    // </nav>
  );
};

export default Navbar;
