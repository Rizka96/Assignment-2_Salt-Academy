const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmSchema = new Schema(
  {
    name: {
      type: String,
      default: "noname",
    },
    foods: {
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

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
