import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-white-vertical.png";
import bg from "../assets/signup-background.png";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/auth/login", user)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container flex items-center justify-center mx-auto">
        <div className="flex w-8/12 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="w-1/2 py-16 px-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <h1 className="text-white text-2xl mb-3">
              What adventure will you share today?
            </h1>
            <img className="w-80 mt-5 pl-10 pt-20" src={logo} alt="Logo" />
          </div>

          <div className="w-1/2 py-16 px-12">
            <h1 className="text-3xl mb-4">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="mt-5">
                <label
                  htmlFor="Email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleTextInput}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="Password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleTextInput}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>

              <div className="mt-7 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 focus:outline-none"
                >
                  Login
                </button>
              </div>

              <div className="mt-7 flex items-center justify-center">
                <p>Don't have an account?</p>
              </div>

              <div className="mt-1 flex items-center justify-center pb-8">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
