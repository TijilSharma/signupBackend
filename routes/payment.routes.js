import {Router} from "express";
import {authMiddleware} from "../middlewares/confirmjwtToken.js";

const router = Router();
router.post('/payment/:id', authMiddleware, transactionController);
