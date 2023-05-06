import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    addressline: { type: String, required: true },
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    posscode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cart: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        shopQty: { type: String, required: true },
        qty: { type: Number, required: true },
        // sum: { type: Number, required: true },
    }]
},

    {
        timestamps: true,
    }


);
export default mongoose.model("Order", orderSchema);


