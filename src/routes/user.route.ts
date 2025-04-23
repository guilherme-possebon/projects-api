import { Router } from "express";
import { UserController } from "../controllers/userController";

const controller: UserController = new UserController();

const userRouter = Router();
userRouter.get("/", controller.index);
userRouter.post("/", controller.store);
userRouter.get("/:id", controller.show);
userRouter.put("/:id", controller.update);
userRouter.delete("/:id", controller.destroy);

export default userRouter;
