import { Router } from "express";
import { DebugController } from "./controllers/debugController";
import { NoteController } from "./controllers/noteController";
import { UserController } from "./controllers/userController";

const router = Router();

const debugController: DebugController = new DebugController();
const noteController: NoteController = new NoteController();
const userController: UserController = new UserController();

router.get("/", debugController.index);
router.post("/", debugController.store);

router.get("/", noteController.index);
router.post("/", noteController.store);
router.get("/week", noteController.currentWeek);
router.get("/weeks", noteController.getAllWeeks);
router.get("/weeks/:id", noteController.getWeekById);

router.post("/", userController.store);
router.get("/:id", userController.show);
