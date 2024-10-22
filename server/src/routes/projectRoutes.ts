import {Router} from "express";
import { createProject, getProjectById, getProjects } from "../controllers/projectController";
import jwtCheck from "../../middleware/auth"

const router = Router();
router.use(jwtCheck);

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);

export default router;