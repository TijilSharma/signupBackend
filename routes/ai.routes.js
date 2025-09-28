import {Router} from 'express';
import {authMiddleware} from "../middlewares/confirmjwtToken.js";
import {aiChat} from "../controllers/aiChat.controller.js";

const router = Router();

router.post('/finance/:id', authMiddleware, aiChat);
export default router;