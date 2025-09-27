import {Router} from "express";
import {authMiddleware} from "../middlewares/confirmjwtToken.js";
import {transactionController} from "../controllers/transaction.controller.js";

const router = Router();
router.post('/payment/pay',authMiddleware,transactionController);
export default router;
