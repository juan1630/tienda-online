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
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // getMonth() devuelve de 0 a 11

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Último día del mes

  try {
    const { user } = req.params;
    const incomesFound = await incomes.find({
      user,
      createdDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
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
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // getMonth() devuelve de 0 a 11

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Último día del mes

    const { user } = req.params;

    const ExpensesFound = await expenses.find({
      user,
      createdDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

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
