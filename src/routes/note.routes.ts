import { Router } from "express";
import { NoteController } from "../controllers/noteController";

const noteRouter = Router();
const controller: NoteController = new NoteController();

noteRouter.get("/", controller.index);
noteRouter.post("/", controller.store);
noteRouter.get("/week", controller.currentWeek);
noteRouter.get("/weeks", controller.getAllWeeks);
noteRouter.get("/weeks/:id", controller.getWeekById);

export default noteRouter;
