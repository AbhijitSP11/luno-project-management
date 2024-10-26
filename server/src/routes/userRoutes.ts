import { Router } from "express";
import { getAuthUser, getUsers, postUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.get("/", getUsers);
router.post("/create", postUser);
router.get("/me",authMiddleware, getAuthUser);
  

export default router;
