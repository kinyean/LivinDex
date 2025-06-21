import React from 'react';
import '../Styles/Slider.css';
import Cards from './Posts/Cards';
import { SlideItem } from './SlideItem';

interface SlideCardsProps {
  slides: SlideItem[];
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
          {slides.map((slide) => (
            <div className="slider-card" key={slide.id}>
              <Cards
                image={slide.image}
                alt={slide.name}
                title={slide.name}
                description="Explore this category"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCards;
