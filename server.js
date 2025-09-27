import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './connectToMongo.js';
import authRoutes from './routes/auth.routes.js';
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions',paymentRoutes);
app.get('/upi-callback', (req, res) => {
    const { txnId, txnRef, Status, responseCode, approvalRefNo } = req.query;

    console.log('Transaction callback received:', req.query);

    if (Status === 'SUCCESS' && responseCode === '00') {
        // Payment successful
        // Update your database / mark order as paid
        res.send('Payment Successful');
    } else {
        // Payment failed
        res.send('Payment Failed');
    }
});


app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});