import { Webhook } from "svix";
import User from "../models/userModel.js";

// API Controller to manager Cleark user with DB
const clearWebhooks = async (req, res) => {
  try {
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await webHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json();
        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  fetch user available credits data
const userCredits = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const userData = await User.findOne({ clerkId });
    console.log("hihi");

    console.log(userData);

    res.json({
      success: true,
      credit: userData.creditBalance,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { clearWebhooks, userCredits };
