import React from "react";
import Navbar from "../Components/Navbar"; 

const Content: React.FC = () => {
  return (
    <>
      <Navbar/>
      <div style={{ padding: "20px" }}>
        <h1>Create Content</h1>
        <p>This is where user upload thier content.</p>
      </div>
    </>
  );
};

export default Content;