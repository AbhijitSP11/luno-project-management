import { Router } from "express";
import { getTeams } from "../controllers/teamController";
import jwtCheck from "../../middleware/auth"

const router = Router();
router.use(jwtCheck);

router.get("/", getTeams);

export default router;