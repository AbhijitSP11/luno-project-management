import express from 'express';
import { groqResponse } from '../controllers/groqController';
import jwtCheck from "../../middleware/auth"

const router = express.Router();
router.use(jwtCheck);

router.post('/chat', groqResponse);

export default router;