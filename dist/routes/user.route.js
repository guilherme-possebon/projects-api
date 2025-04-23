"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const controller = new userController_1.UserController();
const userRouter = (0, express_1.Router)();
userRouter.post("/", controller.store);
userRouter.get("/:id", controller.show);
exports.default = userRouter;
