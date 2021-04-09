const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "noname",
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    resources: {
      foods: {
        type: Number,
        min: 0,
        max: 1000,
        default: 100,
      },
      soldiers: {
        type: Number,
        min: 0,
        max: 500,
        default: 0,
      },
      golds: {
        type: Number,
        min: 0,
        max: 1000,
        default: 100,
      },
      medals: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    market_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Market",
      },
    ],
    farm_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Farm",
      },
    ],
    barrack_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Barrack",
        max: 30,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_ad" } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
