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
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleTextInput}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleTextInput}
          />
        </label>

        <button type="submit">Login</button>
        <span>
          Don't have an account?
          <button onClick={() => navigate("/signup")}>Sign up</button>
        </span>
      </form>
    </div>
  );
};

export default Login;
