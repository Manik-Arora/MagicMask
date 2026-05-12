import React from "react";
import { plans } from "../assets/assets";
import mainIcon from "../assets/main.png";

const Pricing = () => {
  return (
    <div className="pt-14 mb-10 min-h-[80vh] text-center">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 cursor-pointer">
        Our Plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl pb-2 mt-4 font-semibold bg-linear-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10">
        Choose the plan that's right for you
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            className="bg-white drop-shadow-sm border rounded-lg px-8 py-10 text-gray-700 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img className="h-4 w-4 sm:h-6 sm:w-6" src={mainIcon} alt="Icon" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /
              {item.credits} credits
            </p>
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
