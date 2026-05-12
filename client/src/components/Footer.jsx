import React from "react";
import mainIcon from "../assets/main.png";
import facebookIcon from "../assets/facebook_icon.svg";
import twitterIcon from "../assets/twitter_icon.svg";
import googleIcon from "../assets/google_plus_icon.svg";

const Footer = () => {
  return (
    <div className="flex items-center justify-around gap-4 px-4 lg:px-44 py-3">
      <div className="flex items-center gap-2 sm:gap-3 w-32 sm:w-44">
        <img className="h-10 w-10 sm:h-10 sm:w-10" src={mainIcon} alt="Icon" />
        <h2 className="text-lg sm:text-2xl font-bold">MagicMask</h2>
      </div>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-600 max-sm:hidden">
        All right reserved. Copright @MagicMask
      </p>
      <div className="flex gap-1">
        <img width={40} src={facebookIcon} alt="" />
        <img width={40} src={twitterIcon} alt="" />
        <img width={40} src={googleIcon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
