const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const barrackSchema = new Schema(
  {
    name: {
      type: String,
      default: "noname",
    },
    soldiers: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_ad" } }
);

const Barrack = mongoose.model("Barrack", barrackSchema);
module.exports = Barrack;
