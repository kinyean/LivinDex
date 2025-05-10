import React from 'react';
import '../Styles/Slider.css';

interface SlideItem {
  id: number;
  image: string;
  name: string;
}

interface SlideCardsProps {
  slides: SlideItem[];
}

const SlideCards: React.FC<SlideCardsProps> = ({ slides }) => {
  return (
    <div id="main-slider-container">
      
      <div className="slider-header">
        <h2 className="slider-title">Find what's right for you</h2>
        <p className="slider-subtitle">
          Get the latest insights and trends
        </p>
      </div>

      <div className="slider-wrapper">
        <div id="slider">
          {slides.map(slide => (
            <div className="slider-card" key={slide.id}>
              <img
                className="slider-card-image"
                src={slide.image}
                alt={slide.name}
              />
              <p className="slider-card-title">{slide.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCards;
