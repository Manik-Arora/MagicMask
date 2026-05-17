import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/userModel.js";
import { response } from "express";

const removeBgImage = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const user = await User.findOne({ clerkId });
    console.log(clerkId);

    console.log("Data");
    console.log(user);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.creditBalance == 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          "X-Api-Key": process.env.BG_REMOVER_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    console.log("User: " + user._id);

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Background Removed",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { removeBgImage };
