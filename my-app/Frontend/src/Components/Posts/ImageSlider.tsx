import React, { useState } from "react";

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
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <div className="relative w-full h-64 overflow-hidden rounded shadow">
        <img
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <div className="flex mt-4 space-x-4">
        <button
          onClick={goToPrevious}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Prev
        </button>
        <button
          onClick={goToNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default ImageSlider;
