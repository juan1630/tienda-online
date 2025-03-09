const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users"}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


module.exports = mongoose.model('expenses', expensesSchema);