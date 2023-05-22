import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
});

const ExpenseModel = new mongoose.model("expenses", ExpenseSchema);

export default ExpenseModel;
