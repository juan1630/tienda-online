const express = require("express");
const user = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.post("/login", async (req, resp) => {
  try {
    const { body } = req;
    const userFound = await user.findOne({ email: body.email });
    if (userFound) {
      const comparedPasword = bcrypt.compareSync(
        body.password,
        userFound.password
      );

      if (comparedPasword) {
        const token = jwt.sign(
          {
            _id: userFound._id,
            mail: userFound.email,
          },
          process.env.SECRET,
          { expiresIn: "3h" }
        );
        return resp.status(200).json({ ok: true, token, id: userFound._id });
      }
    } else {
      return resp
        .status(400)
        .json({ ok: false, message: "User was not found" });
    }
  } catch (error) {
    console.log(error);
    return resp.status(400).json({ ok: false, error });
  }
});

module.exports = app;
