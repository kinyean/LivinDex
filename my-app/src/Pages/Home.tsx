import List from "../Components/List";
import Navbar from "../Components/Navbar"; 
import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
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
    <Navbar/>
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
          </div>
        </div>
        <List input={inputText} />
      </div> 
    </>
  );
};

export default Home;