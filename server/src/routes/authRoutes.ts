import {Router} from "express";
import { login, postUser } from "../controllers/userController";

const router = Router();
router.post("/oauth", postUser);
router.post("/login", login);

export default router;