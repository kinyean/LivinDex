import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import List from "../Components/List";
import Logo from '../Assets/Unknown User.jpg'
import '../Styles/Home.css';

const Home = () => {
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  return ( 
    <>
      <div className="main">
        <div className="top">
          <div className="search">
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
          <div className = "userProfile">
          <img className="avatar" onClick={() => navigate("/profile")} src={Logo} alt="Logo" />
          </div>
        </div>
        <List input={inputText} />
      </div>
    </>
  );
};

export default Home;