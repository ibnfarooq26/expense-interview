const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const sumCost = (expenses) => {
  let totalcost = 0;
  expenses.forEach((item) => {
    totalcost = totalcost + item?.cost;
  });
  return totalcost;
};

const addPercentageCost = (expenses) => {
  const totalCost = sumCost(expenses);
  const _expenses = expenses.map((item) => {
    const percentageCost = (item.cost / totalCost) * 100;
    const { _id, category, title, cost, createdAt } = item;
    const expense = {
      id: _id.toString(),
      category,
      title,
      cost,
      percentageCost,
      date: createdAt.toISOString(),
    };
    return expense;
  });

  return _expenses;
};
const createCsvFile = async (expenses) => {
  const csvWriter = createCsvWriter({
    path: "./monthlyReport.csv",
    header: [
      { id: "id", title: "ID" },
      { id: "category", title: "CATEGORY" },
      { id: "title", title: "TITLE" },
      { id: "cost", title: "COST" },
      { id: "date", title: "DATE" },
    ],
  });
  await csvWriter.writeRecords(expenses);
};

const createCategoryCsvFile = async ({ ent, trp, grc, shp, other }) => {
  const csvWriter = createCsvWriter({
    path: "./categoryReport.csv",
    header: [
      { id: "categoryName", title: "CATEGORYNAME" },
      { id: "percentageCost", title: "PERCENTAGECOST" },
    ],
  });
  const data = [
    { categoryName: "Entertainment", percentageCost: ent },
    { categoryName: "Transport", percentageCost: trp },
    { categoryName: "Groceries", percentageCost: grc },
    { categoryName: "Shopping", percentageCost: shp },
    { categoryName: "other", percentageCost: other },
  ];
  await csvWriter.writeRecords(data);
  return data;
};

const filterExpensesBymonth = (expenses, from, to) => {
  const fromDates = getDates(from);
  const toDates = getDates(to);
  const monthlyExpense = expenses.filter((item) => {
    return isthisMonth(item, fromDates, toDates);
  });
  return monthlyExpense;
};

const isthisMonth = (expense, fromDates, toDates) => {
  const { YY: fromYY, MM: fromMM, DD: fromDD } = fromDates;
  const { YY: toYY, MM: toMM, DD: toDD } = toDates;
  const expenseDate = expense.date.split("T")[0].split("-");
  const expenseDateYY = parseInt(expenseDate[0]);
  const expenseDateMM = parseInt(expenseDate[1]);
  const expenseDateDD = parseInt(expenseDate[2]);
  if (fromYY <= expenseDateYY <= toYY) {
    if (expenseDateYY == fromYY) {
      if (expenseDateMM < fromMM) {
        return false;
      }
      if (expenseDateMM == fromMM) {
        if (expenseDateDD < fromDD) {
          return false;
        } else return true;
      } else return true;
    }
    if (expenseDateYY == toYY) {
      if (expenseDateMM > toMM) {
        return false;
      }
      if (expenseDateMM < toMM) {
        return true;
      }
      if (expenseDateMM == toMM) {
        if (expenseDateDD > toDD) {
          return false;
        } else return true;
      }
    }
  } else return false;
};

const getDates = (dt) => {
  const date = new Date(dt).toISOString().split("T")[0].split("-");
  const YY = parseInt(date[0]);
  const MM = parseInt(date[1]);
  const DD = parseInt(date[2]);
  return { YY, MM, DD };
};

module.exports = {
  sumCost,
  addPercentageCost,
  createCsvFile,
  filterExpensesBymonth,
  createCategoryCsvFile,
};
