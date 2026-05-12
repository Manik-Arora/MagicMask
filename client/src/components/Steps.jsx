import React from "react";
import uploadIcon from "../assets/upload_icon.svg";
import removeBgIcon from "../assets/remove_bg_icon.svg";
import downloadIcon from "../assets/download_icon.svg";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-20 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl pb-2 mt-4 font-semibold bg-linear-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Steps to remove background <br /> image in seconds
      </h1>
      <div className="flex justify-center items-start flex-wrap gap-4 mt-16 xl:mt-24">
        <div className="flex items-start gap-4 bg-white border border-slate-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={uploadIcon} alt="" />
          <div>
            <p className="text-xl font-medium">Upload image</p>
            <p className="text-sm text-neutral-600 mt-1">
              This is a demo text. Will remove it later
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white border border-slate-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={removeBgIcon} alt="" />
          <div>
            <p className="text-xl font-medium">Remove background</p>
            <p className="text-sm text-neutral-600 mt-1">
              This is a demo text. Will remove it later
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white border border-slate-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={downloadIcon} alt="" />
          <div>
            <p className="text-xl font-medium">Download image</p>
            <p className="text-sm text-neutral-600 mt-1">
              This is a demo text. Will remove it later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
