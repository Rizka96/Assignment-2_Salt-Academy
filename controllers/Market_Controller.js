const Market = require("../models/Market");
const User = require("../models/User");

class MarketController {
  static async createMarket(req, res) {
    const user = await User.findById(req.userId);
    // console.log(user);
    if (user.resources.golds >= 30 && user.resources.foods >= 10) {
      try {
        let createMarket = await Market.create({
          user_id: req.userId,
          name: req.body.name,
          golds: req.body.golds,
        });
        await User.findByIdAndUpdate(
          req.userId,
          { $inc: { "resources.golds": -30, "resources.foods": -10 } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.userId,
          { $push: { market_id: createMarket.id } },
          { new: true }
        );
        res.status(200).json({
          message: "Data Market Successfully Created",
          data: createMarket,
        });
      } catch {
        throw { name: "Fail_Created" };
      }
    } else {
      throw { name: "Fail_Created" };
    }
  }
  static async listMarket(req, res) {
    try {
      let listData = await User.findById(req.userId).populate("market_id");
      res
        .status(201)
        .json({ message: "List Data Market Success", data: listData });
    } catch {
      throw { name: "Not_Found" };
    }
  }
  static async findAllMarket(req, res, next) {
    try {
      const result = await Market.find();
      if (result.length > 0) {
        res.status(200).json({ message: "Find All Data Market", data: result });
      } else {
        res.status(404).json({ message: "Page not found" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async collectGold(req, res, next) {
    const market = await Market.findById(req.params.id);
    const user = await User.findById(req.userId);
    const generateGold = await market.golds;
    const resources = await user.resources.golds;
    let collect;
    try {
      collect = await User.findByIdAndUpdate(
        req.userId,
        { $inc: { "resources.golds": generateGold } },
        { new: true }
      );
      reset = await Market.findByIdAndUpdate(
        req.params.id,
        { golds: 0 },
        { new: true }
      );
      if (resources > 1000) {
        limit = await User.findByIdAndUpdate(
          req.userId,
          { golds: 1000 },
          { new: true }
        );
      }
      res.status(200).json({ message: "Resources collected", data: collect });
    } catch (err) {
      next(err);
    }
  }
  static async updatedMarket(req, res, next) {
    try {
      const { name } = req.body;
      // const user = await User.findById(req.userId);
      let update = await Market.findOneAndUpdate(
        { _id: req.params.id, user_id: req.userId },
        { name },
        { new: true }
      );
      console.log(update);
      res.status(200).json({ message: "Market Update Success", data: update });
    } catch {
      next(err);
    }
  }
  static async deleteMarket(req, res, next) {
    try {
      await Market.findByIdAndDelete(req.params.id);
      let update = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { market_id: req.params.id } },
        { new: true }
      );
      res.status(200).json({ message: "Delete Market Success", data: update });
    } catch {
      next(err);
    }
  }
}

module.exports = MarketController;
