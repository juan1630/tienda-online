const express = require("express");
const Ppr = require("../../models/PPR/pprModel");
const validateToken = require("../../middlewares/validations/validateToken");
const app = express();

app.post("/ppr", validateToken, async function (req, resp) {
  const { body } = req;

  try {
    if (body.amount > 0) {
      const newPpr = new Ppr(body);
      const pprSaved = await newPpr.save();

      if (pprSaved) {
        return resp.status(201).json({
          ok: true,
          message: "PPR saved",
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

app.post("/ppr/:user", validateToken, async function (req, resp) {
  try {
    const { user } = req.params;
    const pprFound = await Ppr.find({ user });
    if (pprFound) {
      return resp.status(200).json({
        ok: true,
        message: "PPR encontrados",
        data: pprFound,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, error });
  }
});
module.exports = app;
