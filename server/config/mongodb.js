import mongoose from "mongoose";
import { setServers } from "node:dns";
setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/MagicMask`);
};

export default connectDB;
