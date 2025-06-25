import React from 'react';
import '../Styles/Slider.css';
import PostsCards from '../Components/Posts/PostsCards';
import { Post } from './Posts/GetPosts';

interface SlideCardsProps {
  slides: Post[];
}

const SlideCards: React.FC<SlideCardsProps> = ({ slides }) => {
  return (
    <div id="main-slider-container">
      <div className="slider-header">
        <h2 className="slider-title">Find what's right for you</h2>
        <p className="slider-subtitle">Get the latest insights and trends</p>
      </div>

      <div className="slider-wrapper">
        <div id="slider">
          {slides.map((post) => (
            <div className="slider-card" key={post.id}>
              <PostsCards post={post} width="300px" /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCards;
