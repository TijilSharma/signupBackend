import {Router} from "express";
import {getTransaction} from "../controllers/history.controller.js";
import {authMiddleware} from "../middlewares/confirmjwtToken.js";

const router = Router();
router.get('/history/:id',authMiddleware,getTransaction);

export default router;