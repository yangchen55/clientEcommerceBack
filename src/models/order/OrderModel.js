import { Types } from "mongoose";
import OrderSchema from "./OrderSchema.js";

export const createNewOrder = (obj) => {
    return OrderSchema(obj).save();

}
export const getOrderListModel = (filter) => {
    return OrderSchema.find({ userId: filter })
}

