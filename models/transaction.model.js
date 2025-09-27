import mongoose, {Schema} from "mongoose";
const transactionSchema = new Schema({
    payee:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    amount:{type:Number},
    vendor:{type:mongoose.Schema.Types.ObjectId, ref:"Vendor"},
    order:{type:{String:Number},default:0},

},{ timestamps: true });
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;