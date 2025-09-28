import {Router} from 'express';
import {authMiddleware} from "../middlewares/confirmjwtToken.js";
import {getChart, getChartLine} from "../controllers/chart.controller.js";

const router = Router();
router.get('/pie/:id',authMiddleware,getChart);
router.get('/line/:id',getChartLine);

export default router;