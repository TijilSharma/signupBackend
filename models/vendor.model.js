import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    vendor: String,
    upi_id:String,
    items:{String:Number}
},{ timestamps: true });

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;