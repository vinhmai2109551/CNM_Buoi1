const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.get("/", controller.get);
router.get("/:id", controller.getOne);

module.exports = router;