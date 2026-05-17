import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const { resultImage, image, setImage, setResultImage } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!image && !resultImage) {
      navigate("/");
    }
  }, [image, resultImage, navigate]);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border"
              src={image ? URL.createObjectURL(image) : assets.image_w_bg}
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold text-gray-500 mb-2">
              Background Removed
            </p>
            <img
              className={`rounded-md border border-gray-200 transition-all duration-700 ease-out ${resultImage ? "" : "blur-md animate-pulse"} `}
              src={
                resultImage
                  ? resultImage
                  : image
                    ? URL.createObjectURL(image)
                    : assets.image_wo_bg
              }
              alt=""
            />
          </div>
        </div>
        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
            <button
              onClick={() => {
                setImage(false);
                setResultImage(false);
                navigate("/");
              }}
              className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer"
            >
              Try another image
            </button>
            <a
              className="px-8 py-2.5 text-sm text-white bg-linear-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
              href={resultImage}
              download
            >
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
