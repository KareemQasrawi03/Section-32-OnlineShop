const express = require("express");
const ordersController = require("../controllers/orders.controllers");
const router = express.Router();

router.get("/", ordersController.getOrder);
router.post("/", ordersController.addOrder); // /orders

module.exports = router;
