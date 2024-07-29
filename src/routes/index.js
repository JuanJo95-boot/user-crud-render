const userRouter = require('./user.router')
const express = require('express');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter);

module.exports = router;