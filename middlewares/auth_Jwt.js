const jwt = require("jsonwebtoken");
const User = require("../models/User");

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }
    jwt.verify(access_token, process.env.secretKey, (err, decoded) => {
      // console.log(err)
      if (err) {
        throw { name: "Not_Found" };
      }
      // console.log(decoded);
      req.userId = decoded.id;
      next();
    });
  }
  //untuk authorization user
  static authorization(req, res, next) {
    const userId = req.params.userId;
    // console.log(req.userId);
    User.findById(req.userId)
      .then((result) => {
        if (result.id === userId) {
          next();
        } else {
          throw { name: "Forbidden_Access" };
        }
      })
      .catch(next);
  }
  // static marketAuthorization(req, res, next) {
  //   const { id } = req.params;
  //   // console.log(id);
  //   User.findById(req.userId)
  //     .then((result) => {
  //       console.log(result.market_id);
  //       if (result.market_id === id) {
  //         next();
  //       } else {
  //         throw { name: "Forbidden_Access" };
  //       }
  //     })
  //     .catch(next);
  // }
}

module.exports = authJwt;
