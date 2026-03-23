const express = require("express");
const router = express.Router();

const subjectRoute = require("./subject.route");

router.use("/", subjectRoute);

module.exports = router;