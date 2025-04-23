import { Router } from "express";
import { UserController } from "../controllers/userController";

const controller: UserController = new UserController();

const userRouter = Router();
userRouter.post("/", controller.store);
userRouter.get("/:id", controller.show);

export default userRouter;
