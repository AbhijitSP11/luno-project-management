import {Router} from "express";
import { search } from "../controllers/searchController";
import jwtCheck from "../../middleware/auth"

const router = Router();
router.use(jwtCheck);
router.get("/", search);

export default router;