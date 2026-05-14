import React from "react";
import mainIcon from "../assets/main.png";
import arrowIcon from "../assets/arrow_icon.svg";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { useEffect } from "react";
import App from "../App";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex justify-between items-center mx-4 py-3 lg:mx-44">
      <Link to="/">
        <div className="flex items-center gap-2 sm:gap-3 w-32 sm:w-44">
          <img
            className="h-10 w-10 sm:h-10 sm:w-10"
            src={mainIcon}
            alt="Icon"
          />
          <h2 className="text-lg sm:text-2xl font-bold">MagicMask</h2>
        </div>
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 sm:gap-3 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700">
            <img className="w-5" src={assets.credit_icon} alt="" />
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Credits : {credit}
            </p>
          </button>
          <p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-zinc-800 text-white flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm rounded-full"
        >
          Get started <img className="w-3 sm:w-4" src={arrowIcon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
