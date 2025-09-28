import Transaction from "../models/transaction.model.js";

export const getTransaction = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const items = await Transaction.find({payee:id}).populate('vendor','vendor');
        const amountsByVendor = {};
        items.forEach(item => {
            const vendorName = item.vendor ? item.vendor.vendor:'Unknown';
            amountsByVendor[vendorName] = (amountsByVendor[vendorName] || 0) + item.amount;
        });
        return res.json(amountsByVendor);
    }
    catch(err){
        res.status(400).send({error:err});
    }
}
