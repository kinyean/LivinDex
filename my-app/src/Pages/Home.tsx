import FilterNavbar from "../Components/FilterNavbar";
import List from "../Components/List";
import Navbar from "../Components/Navbar"; 
import React, { useState } from 'react';
import SlideCards from '../Components/SlideCards';
import { data as slideData } from "../Components/SlideItem";
import TextField from "@mui/material/TextField";
import '../Styles/Home.css';

const Home = () => {
  const [inputText, setInputText] = useState("");

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
          
          <FilterNavbar />
          <div className = "userProfile">
          </div>

          <SlideCards slides={slideData} />

        </div>
        <List input={inputText} />
      </div> 
    </>
  );
};

export default Home;