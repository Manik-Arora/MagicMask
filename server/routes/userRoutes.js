import express from "express";
import {
  clearWebhooks,
  paymentRazorpay,
  userCredits,
  verifyRazorpayPayment,
} from "../controllers/UserController.js";
import { authUser } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clearWebhooks);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/purchase", authUser, paymentRazorpay);
userRouter.post("/verify-purchase", verifyRazorpayPayment);

export default userRouter;
