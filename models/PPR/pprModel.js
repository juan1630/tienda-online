const mongoose = require("mongoose");

const pprSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
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


module.exports = mongoose.model('ppr', pprSchema);