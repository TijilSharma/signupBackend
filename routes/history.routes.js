import {Router} from "express";
import {getTransaction} from "../controllers/history.controller.js";

const router = Router();
router.get('/history/:id',getTransaction);

export default router;