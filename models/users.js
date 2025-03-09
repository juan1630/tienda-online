const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true },
    lastName: {
      type: String,
      required: [true, "lastname is required"],
      trim: true,
    },
    isActive: { type: String, default: true },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "mail is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("user", userSchema);
