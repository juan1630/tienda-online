const mongoose = require("mongoose");

const pprSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users"}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


module.exports = mongoose.model('ppr', pprSchema);