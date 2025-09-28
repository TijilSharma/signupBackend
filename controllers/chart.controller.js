import Transaction from "../models/transaction.model.js";

export const getChart = async (req, res) => {
    const { id } = req.params;
    try {
        const items = await Transaction.find({ payee: id })
            .populate('vendor', 'vendor');  // Populate vendor name only

        // Aggregate sums by vendor name
        const aggregation = {};
        items.forEach(item => {
            const vendorName = item.vendor ? item.vendor.vendor : 'Unknown';
            if (!aggregation[vendorName]) {
                aggregation[vendorName] = 0;
            }
            aggregation[vendorName] += item.amount;
        });

        // Convert aggregation object into array suitable for pie chart
        const result = Object.entries(aggregation).map(([vendorName, totalAmount]) => ({
            vendorName,
            amount: totalAmount,
        }));

        res.json(result);
    } catch (err) {
        res.status(400).send({ error: err.message || err });
    }
};


export const getChartLine = async (req, res) => {
    const { id } = req.params;
    try {
        const items = await Transaction.find({ payee: id }).sort({ createdAt: 1 });

        // Group amounts by date (rounded to nearest 5-day increment)
        const grouped = {};

        items.forEach(item => {
            const date = new Date(item.createdAt);
            // Round day to nearest multiple of 5 (1-5 => 5, 6-10 => 10, etc.)
            const day = date.getDate();
            const roundedDay = Math.ceil(day / 5) * 5;

            const label = `${date.getMonth() + 1}/${roundedDay}`; // e.g. "9/5", "9/10"

            if (grouped[label]) {
                grouped[label] += item.amount;
            } else {
                grouped[label] = item.amount;
            }
        });

        // Convert to array sorted by date
        const sortedLabels = Object.keys(grouped).sort((a, b) => {
            const [aMonth, aDay] = a.split('/').map(Number);
            const [bMonth, bDay] = b.split('/').map(Number);
            if(aMonth === bMonth) return aDay - bDay;
            return aMonth - bMonth;
        });

        const result = sortedLabels.map(label => ({
            value: grouped[label],
            label
        }));

        res.json(result);
    } catch (err) {
        res.status(400).send({ error: err.message || err });
    }
};

