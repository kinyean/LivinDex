import React from "react";
import Navbar from "../Components/Navbar"; 

const Profile: React.FC = () => {
  return (
    <>
      <Navbar/>
      <div style={{ padding: "20px" }}>
        <h1>Profile Page</h1>
        <p>This is your profile.</p>
      </div>
    </>
  );
};

export default Profile;
