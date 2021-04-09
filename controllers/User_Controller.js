const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let validator = require("email-validator");

class UserController {
  static createUser(req, res, next) {
    const emailValidate = validator.validate(req.body.email); // true
    if (emailValidate == true) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        resources: {
          foods: req.body.foods,
          soldiers: req.body.soldiers,
          golds: req.body.golds,
          medals: req.body.medals,
        },
      });
      newUser
        .save()
        .then((savedUser) => {
          res.status(201).json({
            message: "Created User Data Success",
            data: savedUser,
          });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      throw { name: "Email_Fail" };
    }
  }
  static loginUser(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return next({ name: "Email_and_Password" });
        }
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          result.password
        );
        if (!passwordIsValid) {
          return next({ name: "Email_and_Password" });
        }
        let token = jwt.sign({ id: result.id }, process.env.secretKey);
        res.status(200).json({
          message: "Login Success",
          data: result,
          AccessToken: token,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  static async findIdUser(req, res, next) {
    try {
      const { userId } = req.params;
      let result = await User.findById(userId);
      // console.log(result);
      res.status(200).json({ message: "User Data Found", data: result });
    } catch (err) {
      next(err);
    }
  }
  static async updatedUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { name, email } = req.body;
      const updateData = { name, email };
      for (let key in updateData) {
        if (!updateData[key]) {
          delete updateData[key];
        }
      }
      let update = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      res.status(200).json({ message: "User Update Success", data: update });
    } catch {
      next(err);
    }
  }

  static async attackPlayer(req, res, next) {
    const soldierAttack = req.body.soldiers;
    const arr = [];
    const enemyId = req.params.enemyId;

    try{
      const playerA = await User.findById(req.userId);
      const playerB = await User.findById(enemyId);
      for (let i = 0; i < 3; i++) {
        arr.push(
          Math.random() < soldierAttack / (playerB.resources.soldiers + 1)
        );
      }
      // console.log(arr.length);
      const successAttack = arr.filter((el) => el).length >= 2 ? true : false;
      // console.log(successAttack);
      if (
        playerA.resources.soldiers >= soldierAttack &&
        playerB.resources.soldiers >= 50
      ) {
        await User.findByIdAndUpdate(req.userId, {
          $inc: { "resources.soldiers": -soldierAttack },
        });
        if (successAttack) {
          const goldsEnemy = Math.floor(playerB.resources.golds / 2);
          const foodsEnemy = Math.floor(playerB.resources.foods / 2);
          // console.log("Winner");
          await User.findByIdAndUpdate(
            req.userId,
            {
              $inc: {
                "resources.medals": +5,
                "resources.golds": +goldsEnemy,
                "resources.foods": +foodsEnemy,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            enemyId,
            {
              $set: { "resources.soldiers": 0 },
            },
            { new: true }
          );
          res.status(200).json({
            message: "You Winner, you get",
            data: { foods: foodsEnemy, golds: goldsEnemy, medal: 5 },
          });
        } else {
          // console.log("Lost");
          const lostMedals = Math.floor(playerA.resources.medals / 2);
          await User.findByIdAndUpdate(
            req.userId,
            { $set: { "resources.medals": lostMedals } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            enemyId,
            { $inc: { "resources.medals": +2 } },
            { new: true }
          );
          res.status(200).json({
            message: "You Loser, you're medals is",
            data: { medal: lostMedals },
          });
        }
      } else {
        throw { name: "Invade_Attack" };
      }
    }catch (err){
      next(err)
    }

   
  }
}

module.exports = UserController;
