const express = require("express");
const FarmController = require("../controllers/Farm_Controller");
const auth = require("../middlewares/auth_Jwt");
const farmRouter = express.Router();


farmRouter.post("/create/:userId", auth.authorization, FarmController.createFarm);
farmRouter.get("/collect/:id/:userId", auth.authorization,FarmController.collectFood);
farmRouter.get("/listFarm/:userId", auth.authorization, FarmController.listFarm)
farmRouter.get("/:userId", auth.authorization, FarmController.findAllFarm);
farmRouter.put("/:userId/:id", auth.authorization, FarmController.updatedFarm);
farmRouter.delete("/:userId/:id", auth.authorization,FarmController.deleteFarm);

module.exports = farmRouter;
