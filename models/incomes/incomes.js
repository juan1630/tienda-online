const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users"},
    createdDate: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


module.exports = mongoose.model('icome', incomeSchema);