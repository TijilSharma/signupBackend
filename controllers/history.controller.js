import Transaction from "../models/transaction.model.js";

export const getTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await Transaction.find({ payee: id })
            .populate('vendor', 'vendor');  // Populate vendor name only

        const result = items.map(item => ({
            transactionId: item._id,
            vendorName: item.vendor ? item.vendor.vendor : 'Unknown',
            amount: item.amount,
            order: item.order,
            // assuming 'order' field contains orders object/map
        }));

        res.json(result);
    } catch (err) {
        res.status(400).send({ error: err.message || err });
    }
};

