import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar"; 
import "../Styles/Content.css";
import ContentTab from "../Components/ContentTab";

const Content: React.FC = () => {
  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
          <ContentTab />
        </div>
      </main>
    </div>
  );
};

export default Content;