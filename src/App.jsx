import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/auth.context";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<IsLoggedOut />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<IsLoggedIn />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
