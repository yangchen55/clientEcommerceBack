import express from 'express'
import clientPromise from '../config/dbConfig.js'

console.log("dghh")
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






export default router