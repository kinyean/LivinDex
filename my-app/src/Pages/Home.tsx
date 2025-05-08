import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import List from "../Components/List";
import '../Styles/Home.css';

const Home = () => {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  return ( 
    <>
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
      </div>
    </>
  );
};

export default Home;