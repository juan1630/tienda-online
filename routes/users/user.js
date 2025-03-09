const express = require("express");
const user = require("../../models/users");
const bcrypt = require("bcrypt");
const validateId =  require('../../middlewares/validations/validateId');
const app = express();

app.post("/users", async (req, resp) => {
  try {
    const { body } = req;
    console.log(body);

    const hashedPassword = bcrypt.hashSync(body.password, 10);

    const newUser = new user({
      name: body.name,
      lastName: body.lastName,
      password: hashedPassword,
      email: body.email,
    });

    const userSaved = await newUser.save();

    if (userSaved) {
      userSaved.password = "";
      return resp.status(200).json({
        ok: true,
        message: "New user created",
        userSaved,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(400).json({ ok: false, error });
  }
});

app.put("/user/:id", validateId,async (req, resp) => {
  try {
    const { id } = req.params;

    const userUpdated = await user.findByIdAndUpdate(id, req.body);
    if (userUpdated) {
      return resp.status(200).json({ ok: true, message: "User updated" });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ ok: false, error });
  }
});

const findUserById = async (id = "") => {
  if (id.length > 0) {
    try {
      const userFound = await user.findById(id);
      return userFound;
    } catch (error) {
      console.log(error);
    }
  } else {
    return "User not found";
  }
};

module.exports = app;
