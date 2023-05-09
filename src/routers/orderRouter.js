import express from "express"
import { createNewOrder, getOrderListModel } from "../models/order/OrderModel.js";

const router = express.Router()

router.get("/:userId?", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orderList = await getOrderListModel(userId)
        res.json({
            status: "success",
            message: "here are all order list",
            orderList
        })
    } catch (error) {
        next(error)



    }
})



router.post("/add", async (req, res, next) => {
    try {
        const order = await createNewOrder(req.body)
        order._id ?
            res.json({
                status: "success",
                message: "here is the order list",
                order
            }) :
            res.json({
                status: "error",
                message: "cannot retrieve order list"
            });

    } catch (error) {
        next(error)

    }
})


export default router;