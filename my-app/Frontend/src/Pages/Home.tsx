import CardGrid from "../Components/CardGrid";
import FilterNavbar from "../Components/FilterNavbar";
import Navbar from "../Components/Navbar"; 
import React from 'react';
import SlideCards from '../Components/SlideCards';
import { data as slideData } from "../Components/SlideItem";
import { data as listData } from "../Components/ListItem";
import { Autocomplete, TextField } from '@mui/material';
import '../Styles/Home.css';

const Home = () => {
  return ( 
    <>
    <Navbar/>
      <div className="main">
        <div className="top">
        <div className="search">
        <Autocomplete
          options={listData.map((item) => item.name)} 
          fullWidth
          freeSolo
          filterOptions={(options, state) =>
            options.filter(option =>
              option.toLowerCase().startsWith(state.inputValue.toLowerCase())
            )
          }
          renderInput={(params) => (
            <TextField {...params} className="home_search_bar" label="Search" variant="outlined" />
          )}
        />
      </div>
          
          <FilterNavbar />
          <div className = "userProfile">
          </div>

          <SlideCards slides={slideData} />
          <div>
            <h2 className="home-title">All the skills you need in one place</h2>
            <p className="home-subtitle">
              From critical skills to technical topics, LivinDex supports your professional development.
            </p>
            <CardGrid />
          </div>
          
        </div>
      </div> 
    </>
  );
};

export default Home;