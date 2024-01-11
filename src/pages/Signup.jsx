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

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSizeInBytes = 2048 * 2048; // 2 MB
      if (file.size > maxSizeInBytes) {
        console.error("File size exceeds the limit.");
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewUser((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="SignupPage">
        <ul className="SignupFields">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
      <ol> <label>
          Profile Image
          <input
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
          /> 
        </label> </ol>
        <ol><label>
          First Name
          <input
            name="firstName"
            type="text"
            value={newUser.firstName}
            onChange={handleTextInput}
          />
        </label> </ol>
        <ol><label>
          Last Name
          <input
            name="lastName"
            type="text"
            value={newUser.lastName}
            onChange={handleTextInput}
          />
        </label> </ol> 
        <ol><label>
          Username
          <input
            name="username"
            type="text"
            value={newUser.username}
            onChange={handleTextInput}
          />
        </label> </ol>
        <ol>  <label>
          Email
          <input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleTextInput}
          />
        </label></ol>
        <ol>  <label>
          Password
          <input
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleTextInput}
          />
        </label> </ol>

        <ol>   <button type="submit">Signup</button> </ol>
      </form>
      </ul>
    </div>
  );
};

export default Signup;
