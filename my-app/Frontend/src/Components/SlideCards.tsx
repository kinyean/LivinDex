import React, { useRef } from 'react';
import '../Styles/Slider.css';
import PostsCards from '../Components/Posts/PostsCards';
import { Post } from './Posts/GetPosts';
import { useNavigate } from "react-router-dom";
import { recordPostView as recordPostViewApi } from "./Posts/GetView"; 

interface SlideCardsProps {
  slides: Post[];
}

const SlideCards: React.FC<SlideCardsProps> = ({ slides }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleClick = async (postId: string) => {
    try {
      await recordPostViewApi(postId); // 🔼 Record the view
    } catch (err) {
      console.error("View record failed:", err);
    } finally {
      navigate(`/post/${postId}`); // 🔁 Navigate after recording
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-container">
      <button className="nav-btn nav-left" onClick={() => scroll('left')}>&#10094;</button>
      
      <div className="slider-wrapper" ref={sliderRef}>
        <div id="slider">
          {slides.map((post) => (
            <div
              className="slider-card"
              key={post.id}
              onClick={() => handleClick(post.id)}
              style={{ cursor: 'pointer' }}
            >
              <PostsCards post={post} width="100%" />
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn nav-right" onClick={() => scroll('right')}>&#10095;</button>
    </div>
  );
};

export default SlideCards;
