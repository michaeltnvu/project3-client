import { post } from "../services/authService";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
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
        <div className="flex w-8/12 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="w 1/2 py-16 px-12 bg-gradient-to-r from-cyan-500 to-blue-500">
            <h1 className="text-white">
              Welcome to Pathfindr. The start of your next adventure.
            </h1>
            <img
              className="w-80 mt-5 pl-10 pt-20 "
              src="../src/assets/logo-white-vertical.png"
            />
          </div>

          <div className="w 1/2 py-16 px-12">
            <h1 className="text-3xl mb">Signup</h1>
            <p className="mt-5">Create your free account today.</p>
            <div>
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="First Name"
                  >
                    First Name:
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="firstName"
                      type="text"
                      value={newUser.firstName}
                      onChange={handleTextInput}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Last Name"
                  >
                    Last Name:
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="lastName"
                      type="text"
                      value={newUser.lastName}
                      onChange={handleTextInput}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Last Name"
                  >
                    Username:
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="username"
                      type="text"
                      value={newUser.username}
                      onChange={handleTextInput}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Email"
                  >
                    Email:
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="email"
                      type="email"
                      value={newUser.email}
                      onChange={handleTextInput}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Password"
                  >
                    Password:
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="password"
                      type="password"
                      value={newUser.password}
                      onChange={handleTextInput}
                    />
                  </label>
                </div>

                <div className="mt-5 flex justify-center gap-x-10">
                  <div>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => navigate("/login")}
                    >
                      Back
                    </button>
                  </div>

                  <div>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Signup
                    </button>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
