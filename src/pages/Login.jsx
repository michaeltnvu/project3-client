import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      className="min-h-screen py-20"
      style={{ background: "url(../src/assets/signup-background.png)" }}
    >
      <div className="container py-20 flex items-center justify-center mx-auto">
        <div className="flex w-2/12 bg-white rounded-xl shadow-xl overflow-hidden">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="text-3xl mb mt-5 flex items-center justify-center">
              <h1>Login</h1>
            </div>

            <div className="mt-7 pl-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="Email"
              >
                Email:
                <input
                  className="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleTextInput}
                />
              </label>
            </div>

            <div className="mt-7 pl-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="Password"
              >
                Password:
                <input
                  className="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleTextInput}
                />
              </label>
            </div>

            <div className="mt-7 flex items-center justify-center">
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
              >
                Login{" "}
              </button>
            </div>

            <div className="mt-7 flex items-center justify-center">
              <p>Don't have an account?</p>
            </div>
            <div className="mt-7 flex items-center justify-center pb-8">
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
