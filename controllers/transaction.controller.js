import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Transaction from "../models/transaction.model.js";

export const transactionController = async (req, res) => {
    try {
        const { payee, amount ,vendor, order } = req.body;

        try{

            const vendorDoc = await Vendor.findOne({vendor: vendor});

            const newPayment = new Transaction({
                payee:payee, amount, vendor:vendorDoc._id, order
            })
            await newPayment.save();
            res.status(200).json(newPayment);
        }
        catch(err){
            console.error('Transaction save error:', err);
        res.status(400).json({ error: err.message || err },{vendor});
        }


    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}