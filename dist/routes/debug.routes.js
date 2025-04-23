"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const debugController_1 = require("../controllers/debugController");
const debugRouter = (0, express_1.Router)();
const controller = new debugController_1.DebugController();
debugRouter.get("/", controller.index);
debugRouter.post("/", controller.store);
exports.default = debugRouter;
