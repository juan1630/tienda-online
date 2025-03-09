const express = require("express");

const app = express();

app.use(require("./users/user"));
app.use(require("./login/login"));
app.use(require("./incomes/incomes"));
module.exports = app;
