import express from 'express'
import Stripe from "stripe"
import clientPromise from '../config/dbConfig.js'
const router = express.Router()
let db
let client
let payments


async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db()
        payments = await db.collection('payment_methods')
        db && console.log('Mongo db connected!')
    } catch (error) {
        throw new Error('Failed to connect to db')
    }
}


router.get('/', async (req, res, next) => {
    await init()
    try {
        const paymentMethods = await payments.find({}).toArray()
        res.json({
            status: "success",
            message: "get all payment list ",
            paymentMethods
        });
    } catch (error) {
        next(error)
    }
})





router.post('/create-payment-intent', async (req, res) => {
    const secret = process.env.SECRET_KEY
    const stripe = new Stripe(secret)
    const { amount, currency, paymentMethodType } = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: [paymentMethodType],
        })
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        })
    }
})

export default router