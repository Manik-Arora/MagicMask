import React, { useContext } from "react";
import { plans } from "../assets/assets";
import mainIcon from "../assets/main.png";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Pricing = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const token = await getToken();
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-purchase`,
            response,
            {
              headers: { token },
            },
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,

        { planId },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        initPay(data.message);
      }
    } catch (error) {
      console.log("Mayeb" + error);
      toast.error(error.message);
    }
  };

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
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
