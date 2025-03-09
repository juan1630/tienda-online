const express = require("express");
const incomes = require("../../models/incomes/incomes");
const expenses = require("../../models/expenses/expenses");
const validateToken = require("../../middlewares/validations/validateToken");
const app = express();

app.post("/income", validateToken, async function (req, resp) {
  const { body } = req;

  try {
    if (body.amount > 0 && body.category.length > 2) {
      const newIncome = new incomes(body);
      const incomeSaved = await newIncome.save();

      if (incomeSaved) {
        return resp.status(201).json({
          ok: true,
          message: "income saved",
        });
      } else {
        return resp.status(500).json({
          ok: false,
          message: "ocurrio un error",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, message: error });
  }
});

app.post("/income/:user", validateToken, async function (req, resp) {
  try {
    const { user } = req.params;
    const incomesFound = await incomes.find({ user });
    if (incomesFound) {
      return resp.status(200).json({
        ok: true,
        message: "Ingresos encontrados",
        ingresos: incomesFound,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, error });
  }
});

app.post("/expenses", validateToken, async function (req, resp) {
  const { body } = req;
  try {
    if (body.amount > 0 && body.category.length > 2) {
      const newExpenses = new expenses(body);
      const expenesesSaved = await newExpenses.save();

      if (expenesesSaved) {
        return resp.status(201).json({
          ok: true,
          message: "expenses saved",
        });
      } else {
        return resp.status(500).json({
          ok: false,
          message: "ocurrio un error",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, message: error });
  }
});

app.post("/expenses/:user", validateToken, async (req, resp) => {
  try {
    const { user } = req.params;

    const ExpensesFound = await expenses.find({ user });
    if (ExpensesFound) {
      return resp.status(200).json({
        ok: true,
        message: "Egresos encontrados",
        data: ExpensesFound,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, message: error });
  }
});

module.exports = app;
