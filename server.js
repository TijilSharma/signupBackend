import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './connectToMongo.js';
import authRoutes from './routes/auth.routes.js';
import paymentRoutes from "./routes/payment.routes.js";
import {transactionController} from "./controllers/transaction.controller.js";
import historyRoutes from "./routes/history.routes.js";

dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions',paymentRoutes);
app.use('/api/callback', historyRoutes);


app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});