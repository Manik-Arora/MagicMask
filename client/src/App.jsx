import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer position="bottom-right"></ToastContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
