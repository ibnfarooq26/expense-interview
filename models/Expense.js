const mongoose = require("mongoose");

const { Schema } = mongoose;
const ExpenseSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["entertainment", "transport", "groceries", "shopping", "other"],
      default: "other",
    },

    title: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  { timestamps: true }
);

//Creating Model
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
