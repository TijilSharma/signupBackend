import router from "../routes/auth.routes.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Transaction from "../models/transaction.model.js";

export const transactionController = async (req, res) => {
    try {
        const { payee, amount ,vendor, order } = req.body;

        try{
            const id = await User.findOne({username: payee});
            const vendorDoc = await Vendor.findOne({vendor: vendor});
            const newPayment = new Transaction({
                payee:id._id, amount, vendor:vendorDoc._id, order
            })
            await newPayment.save();
            res.status(200).json(newPayment);
        }
        catch(err){
            res.status(401).send({error:err});
        }


    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}