const express = require("express");
const {
  getExpenses,
  createExpense,
  getExpense,
  createMonthlyReport,
  createCategoryReport,
} = require("./expense.routes");
const router = express.Router();

router.get("/expense", getExpenses);
router.post("/expense", createExpense);
router.get("/expense/:id", getExpense);
router.post("/createReport", createMonthlyReport);
router.post("/categoryReport", createCategoryReport);

module.exports = router;
