import { Webhook } from "svix";
import User from "../models/userModel.js";
import razorpay from "razorpay";
import Transaction from "../models/transactionModel.js";

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
    return res.json({
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

// Razerpay gateway initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { planId } = req.body;
    console.log(clerkId);
    console.log(planId);

    const userData = await User.find({ clerkId });
    if (!userData) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        break;
    }

    date = Date.now();

    const newTransaction = await Transaction.create({
      clerkId,
      plan,
      amount,
      credits,
      date,
    });

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Payment failed",
        });
      }

      res.json({
        success: true,
        message: order,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Function to verify razorpay payment
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status == "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({
          success: false,
          message: "Payment Failed",
        });
      }

      // Add credits for user
      const userData = await User.findOne({
        clerkId: transactionData.clerkId,
      });
      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findOneAndUpdate(userData._id, { creditBalance });

      await Transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({
        success: true,
        message: "Credits added",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { clearWebhooks, userCredits, paymentRazorpay, verifyRazorpayPayment };
