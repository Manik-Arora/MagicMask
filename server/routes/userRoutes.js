import express from "express";
import { clearWebhooks, userCredits } from "../controllers/UserController.js";
import { authUser } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clearWebhooks);
userRouter.get("/credits", authUser, userCredits);

export default userRouter;
