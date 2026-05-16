import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  plan: {
    type: String,
    required: true,
    enum: ["Basic", "Advanced", "Business"],
  },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  date: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
