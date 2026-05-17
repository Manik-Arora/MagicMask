import React, { useContext } from "react";
import uploadImage from "../assets/upload_btn_icon.svg";
import headerImage from "../assets/header_img.png";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="flex  items-center justify-center gap-10 lg:gap-20 max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      <div className="max-sm:text-center">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" /> images for free.
        </h1>
        <p className="my-6 text-[15px] text-gray-600">
          By uploading an image you agree to our Terms of Service. To learn more
          check our Privacy Policy.
        </p>
        <div>
          <input
            onChange={(e) => removeBg(e.target.files[0])}
            type="file"
            accept="image/*"
            id="upload"
            hidden
          />
          <label
            htmlFor="upload"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border cursor-pointer bg-linear-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700
            "
          >
            <img width={20} src={uploadImage} alt="" />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>
      <div className="w-full max-w-md">
        <img src={headerImage} alt="" />{" "}
      </div>
    </div>
  );
};

export default Header;
