import { useContext, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import CreatePostModal from "./components/CreatePostModal";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/auth.context";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OthersProfile from "./pages/OthersProfile";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const { getToken } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const IsLoggedIn = () => {
    return getToken() ? (
      <>
        <Navbar setOpenModal={setOpenModal} />
        <CreatePostModal openModal={openModal} setOpenModal={setOpenModal} />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <Routes>
        <Route element={<IsLoggedOut />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<IsLoggedIn />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:userId" element={<OthersProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
