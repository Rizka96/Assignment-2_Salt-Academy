const express = require("express");
const MarketController = require("../controllers/Market_Controller");
const marketRouter = express.Router();
const auth = require("../middlewares/auth_Jwt");


marketRouter.post("/create/:userId", auth.authorization, MarketController.createMarket);
marketRouter.get("/collect/:id/:userId", auth.authorization,MarketController.collectGold);
marketRouter.get("/listMarket/:userId", auth.authorization, MarketController.listMarket)
marketRouter.get("/:userId", auth.authorization, MarketController.findAllMarket);
marketRouter.put("/:userId/:id", auth.authorization, MarketController.updatedMarket);
marketRouter.delete("/:userId/:id", auth.authorization,MarketController.deleteMarket);

module.exports = marketRouter;
