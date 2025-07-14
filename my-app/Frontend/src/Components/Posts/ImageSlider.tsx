import React, { useState } from "react";
import "../../Styles/ImageSlider.css";
interface ImageSliderProps {
  images: string[]; // array of image URLs
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!images || images.length === 0) return <div>No images</div>;

  return (
    <div>
      <div className="media-container">
        <img
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          className="media-element"
        />
      </div>

      <div className="next_prev_group">
            <button
                onClick={goToPrevious}
                className="prev_button"
                >
                Prev
            </button>
            <button
                onClick={goToNext}
                className="next_button"
                >
                Next
            </button>
        </div>

      <p className="image_index">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default ImageSlider;
