import React, { useState } from "react";
import imageWithBg from "../assets/image_w_bg.png";
import imageWithoutBg from "../assets/image_wo_bg.png";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="pb-10 md:py-5 mx-2">
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl pb-2 mt-4 font-semibold bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
        Remove Back With High <br /> Quality and Accuracy
      </h1>
      <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
        <img
          src={imageWithBg}
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
          alt=""
        />
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={imageWithoutBg}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          alt=""
        />
        <input
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default BgSlider;
