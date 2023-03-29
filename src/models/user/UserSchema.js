import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        // index: 1,
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationCode: {
        type: String,
    },
    refreshJWT: {
        type: String,
    },
},
    {
        timestamps: true,

    })
export default mongoose.model("Client_user", userSchema)