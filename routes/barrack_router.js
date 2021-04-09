const express = require("express");
const BarrackController = require("../controllers/Barrack_Controller");
const auth = require("../middlewares/auth_Jwt");
const barrackRouter = express.Router();


barrackRouter.post("/create/:userId", auth.authorization, BarrackController.createBarrack);
barrackRouter.get("/collect/:id/:userId", auth.authorization,BarrackController.collectSoldier);
barrackRouter.get("/listBarrack/:userId", auth.authorization, BarrackController.listBarrack)
barrackRouter.get("/:userId", auth.authorization, BarrackController.findAllBarrack);
barrackRouter.put("/:userId/:id", auth.authorization, BarrackController.updatedBarrack);
barrackRouter.delete("/:userId/:id", auth.authorization,BarrackController.deleteBarrack);

module.exports = barrackRouter;
