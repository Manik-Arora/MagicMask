import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import BgSlider from "../components/BgSlider";
import Testimonials from "../components/Testimonials";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Steps />
      <BgSlider />
      <Testimonials />
      <Upload />
    </div>
  );
};

export default Home;
