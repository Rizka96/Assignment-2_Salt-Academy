const Farm = require("../models/Farm");
const User = require("../models/User");

class FarmController {
  static async createFarm(req, res) {
    const user = await User.findById(req.userId);
    // console.log(user)
    if (user.resources.golds >= 10 && user.resources.foods >= 30) {
      try {
        let createFarm = await Farm.create({
          user_id: req.userId,
          name: req.body.name,
          foods: req.body.foods,
        });
        // console.log(createFarm)
        await User.findByIdAndUpdate(
          req.userId,
          { $inc: { "resources.golds": -10, "resources.foods": -30 } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.userId,
          { $push: { farm_id: createFarm.id } },
          { new: true }
        );
        res.status(200).json({
          message: "Data Farm Successfully Created",
          data: createFarm,
        });
      } catch {
        throw { name: "Fail_Created" };
      }
    } else {
      throw { name: "Fail_Created" };
    }
  }
  static async listFarm(req, res, next) {
    try {
      let listData = await User.findById(req.userId).populate("farm_id");
      res
        .status(201)
        .json({ message: "List Data Farm Success", data: listData });
    } catch {
      throw { name: "Not_Found" };
    }
  }
  static async findAllFarm(req, res) {
    try {
      const result = await Farm.find();
      if (result.length > 0) {
        res.status(200).json({ message: "Find All Data Farm", data: result });
      } else {
        throw { name: "Not_Found" };
      }
    } catch {
      throw { name: "Not_Found" };
    }
  }
  static async collectFood(req, res, next) {
    const farm = await Farm.findById(req.params.id);
    const user = await User.findById(req.userId);
    const generateFood = await farm.foods;
    const resources = await user.resources.foods;
    let collect;
    let reset;
    let limit;
    try {
      collect = await User.findByIdAndUpdate(
        req.userId,
        { $inc: { "resources.foods": generateFood } },
        { new: true }
      );
      reset = await Farm.findByIdAndUpdate(
        req.params.id,
        { foods: 0 },
        { new: true }
      );
      if (resources > 1000) {
        limit = await User.findByIdAndUpdate(
          req.userId,
          { foods: 1000 },
          { new: true }
        );
      }
      res.status(200).json({ message: "Resources collected", data: collect });
    } catch (err) {
      next(err);
    }
  }
  static async updatedFarm(req, res, next) {
    try {
      const { name } = req.body;
      let update = await Farm.findOneAndUpdate(
        { _id: req.params.id, user_id: req.userId },
        { name },
        { new: true }
      );
      console.log(update);
      res.status(200).json({ message: "Farm Update Success", data: update });
    } catch {
      next(err);
    }
  }
  static async deleteFarm(req, res, next) {
    try {
      await Farm.findByIdAndDelete(req.params.id);
      let update = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { farm_id: req.params.id } },
        { new: true }
      );
      res.status(200).json({ message: "Delete Farm Success", data: update });
    } catch {
      next(err);
    }
  }
  //
}

module.exports = FarmController;
