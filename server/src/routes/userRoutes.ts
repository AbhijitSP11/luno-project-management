import { Router } from "express";
import { getAuthUser, getUser, getUsers, postUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.get("/me",authMiddleware, getAuthUser);
  

export default router;
