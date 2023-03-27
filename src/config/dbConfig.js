import mongoose from "mongoose";
export const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(process.env.MONGO_CLIENT)

        conn?.connections
            ? console.log("DB connected")
            : console.log("unable to connect mongo")
    } catch (error) {
        console.log("error")

    }

}
