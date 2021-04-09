const mongoose = require("mongoose");
const Market = require("../models/Market");
const Farm = require("../models/Farm");
const Barrack = require("../models/Barrack");
const cron = require("node-cron");

const connectDB = () => {
  const pathURI = process.env.DB_HOST;
  // console.log(pathURI)
  const connectionOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  mongoose.connect(pathURI, connectionOption);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    const task = cron.schedule(
      "*/1 * * * *",
      () => {
        Market.updateMany({ golds: { $lt: 20 } }, { $inc: { golds: 1 } })
          .then((_) => {})
          .catch((_) => {});
        Farm.updateMany({ foods: { $lt: 20 } }, { $inc: { foods: 1 } })
          .then((_) => {})
          .catch((_) => {});
        Barrack.updateMany({ soldiers: { $lt: 20 } }, { $inc: { soldiers: 1 } })
          .then((_) => {})
          .catch((_) => {});
        // console.log("123");
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );
    task.start();

    // console.log("Database clashofVillages connected!");
  });
};

module.exports = connectDB;
