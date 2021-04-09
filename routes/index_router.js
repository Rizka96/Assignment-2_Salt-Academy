const router = require("express").Router();
const userRouters = require("./user_router");
const marketRouters = require("./market_router");
const farmRouters = require("./farm_router");
const barrackRouters = require("./barrack_router");
const auth = require("../middlewares/auth_Jwt");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRouters);
router.use(auth.authentication);
router.use("/markets", marketRouters);
router.use("/farms", farmRouters);
router.use("/barracks", barrackRouters);
router.use(errorHandler);

module.exports = router;
