import OrderSchema from "./OrderSchema.js";

export const createNewOrder = (obj) => {
    return OrderSchema(obj).save();

}