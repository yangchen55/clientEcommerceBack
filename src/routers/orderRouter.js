import express from "express"
import { createNewOrder } from "../models/order/OrderModel.js";

const router = express.Router()

router.post("/add", async (req, res, next) => {
    try {
        const order = await createNewOrder(req.body)

        order._id ?
            res.json({
                status: "success",
                message: "here is list",
                order
            })
            :
            res.json({
                status: "error",
                message: "sorry"
            })
            ;



    } catch (error) {
        next(error)

    }
})

export default router;