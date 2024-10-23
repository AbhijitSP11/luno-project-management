import {Router} from "express";
import { postUser } from "../controllers/userController";

const router = Router();
router.post("/oauth", postUser);

export default router;