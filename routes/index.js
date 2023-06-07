const express = require("express");
const router = express.Router();
const clientsRouter = require("./clients");

router.use("/clients", clientsRouter);

module.exports = router;
