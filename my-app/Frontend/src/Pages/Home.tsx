import HomeCardGrid from "../Components/Posts/HomeCardGrid";
import FilterNavbar from "../Components/FilterNavbar";
import Navbar from "../Components/Navbar"; 
import React, { useEffect, useState } from 'react';
import SlideCards from '../Components/SlideCards';
import { data as listData } from "../Components/ListItem";
import { Autocomplete, TextField } from '@mui/material';
import { getAllPosts as getAllPostsApi } from '../Components/Posts/GetPosts';
import { Post } from '../Components/Posts/GetPosts';
import '../Styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPostsApi();
      // Sort by date and take latest 6
      const sorted = allPosts
        .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPosts(sorted);
    };

    fetchPosts();


  }, []);


  return ( 
    <>
    <Navbar/>
      <div className="main">
        <div className="top">
        <div className="search">
        <Autocomplete
          options={posts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4)
            .map((post) => post.header)}
          fullWidth
          freeSolo
          value={searchQuery}
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
          filterOptions={(options, state) =>
            options.filter(option =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            )
          }
          renderInput={(params) => (
            <TextField {...params} className="home_search_bar" label="Search" variant="outlined" />
          )}
        />


      </div>
          <FilterNavbar selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>

          <div className = "userProfile">
          </div>
          <div className="slide_section">
            <h2 className="slide_title">Find what's right for you</h2>
            <p className="slide_subtitle">Get the latest insights and trends</p>
            <SlideCards slides={posts.slice(0, 6)} />
          </div>
          <div className = "home-section">
            <h2 className="home-title">All the skills you need in one place</h2>
            <p className="home-subtitle">
              From critical skills to technical topics, LivinDex supports your professional development.
            </p>
            <HomeCardGrid posts={
              posts
                .filter(post =>
                  post.header.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .filter(post =>
                  selectedTags.length === 0 ||
                  post.tags?.some(tag => selectedTags.includes(tag))
                )
            } />
          </div>
          
        </div>
      </div> 
    </>
  );
};

export default Home;