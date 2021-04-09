const Barrack = require("../models/Barrack");
const User = require("../models/User");

class BarrackController {
  static async createBarrack(req, res) {
    const user = await User.findById(req.userId);
    if (user.resources.golds >= 30 && user.resources.foods >= 30) {
      if (user.barrack_id.length < 30) {
        try {
          let createBarrack = await Barrack.create({
            user_id: req.userId,
            name: req.body.name,
            foods: req.body.foods,
          });
          await User.findByIdAndUpdate(
            req.userId,
            { $inc: { "resources.golds": -30, "resources.foods": -30 } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            req.userId,
            { $push: { barrack_id: createBarrack.id } },
            { new: true }
          );
          res.status(200).json({
            message: "Data Barrack Successfully Created",
            data: createBarrack,
          });
        } catch (err) {
          throw { name: "Fail_Created" };
        }
      } else {
        throw { name: "Barrak_Failed" };
      }
    } else {
      throw { name: "Fail_Created" };
    }
  }
  static async listBarrack(req, res, next) {
    try {
      let listData = await User.findById(req.userId).populate("barrack_id");
      res
        .status(201)
        .json({ message: "List Data Barrack Success", data: listData });
    } catch {
      throw { name: "Not_Found" };
    }
  }
  static async findAllBarrack(req, res, next) {
    try {
      const result = await Barrack.find();
      if (result.length > 0) {
        res
          .status(200)
          .json({ message: "Find All Data Barrack", data: result });
      } else {
        throw { name: "Not_Found" };
      }
    } catch {
      throw { name: "Not_Found" };
    }
  }
  static async collectSoldier(req, res, next) {
    const barrack = await Barrack.findById(req.params.id);
    const user = await User.findById(req.userId);
    const generateSoldier = await barrack.soldiers;
    const resources = await user.resources.soldiers;
    let collect;
    let reset;
    let limit;
    try {
      collect = await User.findByIdAndUpdate(
        req.userId,
        { $inc: { "resources.soldiers": generateSoldier } },
        { new: true }
      );
      reset = await Barrack.findByIdAndUpdate(
        req.params.id,
        { soldiers: 0 },
        { new: true }
      );
      if (resources > 500) {
        limit = await User.findByIdAndUpdate(
          req.userId,
          { soldiers: 500 },
          { new: true }
        );
      }
      res.status(200).json({ message: "Resources collected", data: collect });
    } catch (err) {
      next(err);
    }
  }
  static async updatedBarrack(req, res, next) {
    try {
      const { name } = req.body;
      let update = await Barrack.findOneAndUpdate(
        { _id: req.params.id, user_id: req.userId },
        { name },
        { new: true }
      );
      console.log(update);
      res.status(200).json({ message: "Barrack Update Success", data: update });
    } catch {
      next(err);
    }
  }
  static async deleteBarrack(req, res, next) {
    try {
      await Barrack.findByIdAndDelete(req.params.id);
      let update = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { barrack_id: req.params.id } },
        { new: true }
      );
      res.status(200).json({ message: "Delete Barrack Success", data: update });
    } catch {
      next(err);
    }
  }
}

module.exports = BarrackController;
