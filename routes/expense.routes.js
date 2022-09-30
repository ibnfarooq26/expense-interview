const {
  addPercentageCost,
  createCsvFile,
  filterExpensesBymonth,
  sumCost,
  createCategoryCsvFile,
} = require("../library/utils");
const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).json({ success: true, expenses });
};

const createExpense = async (req, res) => {
  try {
    const { category, title, cost } = req.body;

    if (
      category == "entertainment" ||
      category == "transport" ||
      category == "groceries" ||
      category == "shopping" ||
      category == "other"
    ) {
      if (cost == NaN) {
        res
          .status(400)
          .json({ success: false, message: "cost must be valid number" });
        return;
      }
      const expense = await Expense.create({ category, title, cost });
      if (!expense) {
        res
          .status(500)
          .json({ success: false, message: "failed to create expense" });
        return;
      }
      res.status(200).json({ success: true, message: expense });
    } else
      res
        .status(400)
        .json({ success: false, message: "category must be valid" });
  } catch (error) {
    console.log("error in creating expense: ", error);
  }
};

const getExpense = async (req, res) => {
  const id = req.params.id;
  const expense = await Expense.findById(id);
  if (!expense) {
    res.status(400).json({ success: false, message: "no such data" });
  }

  res.status(200).json({ success: true, expense });
};

const createMonthlyReport = async (req, res) => {
  const { from, to } = req.body;
  const expenses = await Expense.find();
  const _expenses = addPercentageCost(expenses);
  const __expenses = filterExpensesBymonth(_expenses, from, to);
  await createCsvFile(__expenses);
  res.status(200).json({ success: true, __expenses });
};
const createCategoryReport = async (req, res) => {
  const { from, to } = req.body;
  let entExpenses = [];
  let trpExpenses = [];
  let grcExpenses = [];
  let shoppingExpenses = [];
  let otherExpenses = [];

  const expenses = await Expense.find();
  const _expenses = addPercentageCost(expenses);
  const __expenses = filterExpensesBymonth(_expenses, from, to); // last month expenses
  __expenses.map((item) => {
    if (item.category == "entertainment") entExpenses.push(item);
    if (item.category == "transport") trpExpenses.push(item);
    if (item.category == "groceries") grcExpenses.push(item);
    if (item.category == "shopping") shoppingExpenses.push(item);
    if (item.category == "other") otherExpenses.push(item);
  });
  const total = sumCost(__expenses);
  const ent = (sumCost(entExpenses) / total) * 100;
  const trp = (sumCost(trpExpenses) / total) * 100;
  const grc = (sumCost(grcExpenses) / total) * 100;
  const shp = (sumCost(shoppingExpenses) / total) * 100;
  const other = (sumCost(otherExpenses) / total) * 100;

  const report = await createCategoryCsvFile({
    ent,
    trp,
    grc,
    shp,
    other,
  });
  res.status(200).json({ success: true, report });
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  createMonthlyReport,
  createCategoryReport,
};
