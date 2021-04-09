const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema(
  {
    name: {
      type: String,
      default: "noname",
    },
    golds: {
      type: Number,
      min: 0,
      max: 20,
      default: 0,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_ad" } }
);

const Market = mongoose.model("Market", marketSchema);
module.exports = Market;
