import { Router } from "express";
import { DebugController } from "../controllers/debugController";

const debugRouter = Router();
const controller: DebugController = new DebugController();

debugRouter.get("/", controller.index);
debugRouter.post("/", controller.store);

export default debugRouter;
