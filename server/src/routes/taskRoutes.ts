import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";
import jwtCheck from "../../middleware/auth"

const router = Router();
router.use(jwtCheck);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;