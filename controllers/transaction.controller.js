import router from "../routes/auth.routes.js";
import User from "../models/user.model.js";
import Vendor from "../models/Vendor.model.js";
import Transaction from "../models/transaction.model.js";

export const transactionController = async (req, res) => {
    try {
        const { payee, amount ,vendor } = req.body;
        const id = User.findOne({username:payee});
        const vendorId = Vendor.findOne({name:vendor});

        const newPayment = new Transaction({
            id,amount,vendorId,
        })
        await newPayment.save();
        res.status(200).json(newPayment);

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}