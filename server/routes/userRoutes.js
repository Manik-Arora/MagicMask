import express from "express";
import { clearWebhooks } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clearWebhooks);

export default userRouter;
