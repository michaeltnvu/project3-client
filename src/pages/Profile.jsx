import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { SERVER_URL } from "../services/SERVER_URL";

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log("user ->", user);
  return (
    <div className="userProfile">
      <h1>Profile</h1>
      <div>
        <img src={""} />
        <p> First Name: {}</p>
        <p>Last Name: {}</p>
        <p>Followers: {}</p>
        <p>Following: {}</p>
        <p>Bio: {}</p>
        <img src={""} />
        <img src={""} />
        <img src={""} />
      </div>
    </div>
  );
};

export default Profile;
