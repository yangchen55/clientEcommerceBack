import dotenv from "dotenv"
dotenv.config();
import express from "express";
const app = express()

import morgan from "morgan";
import cors from "cors"
import path from "path"

const PORT = process.env.PORT || 8000;

// database connection 
import { dbConnect } from "./src/config/dbConfig.js"
dbConnect()
// server static files 
const __dirname = path.resolve();
// /Users/Hp / Desktop / bootcamp - project / ecommercePlatform / clientCMS / api


// middlecare 
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "/public")));

import userRouter from "./src/routers/userRouter.js"
import productRotuer from "./src/routers/productRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";


app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRotuer);
app.use("/api/v1/category", categoryRouter);


app.use("/", (req, res, next) => {
    const error = {
        message: "You dont have promission here",
    };
    next(error);
})


//global error handler
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.errorCode || 404;
    res.status(statusCode).json({
        status: "error",
        message: error.message,
    });
});

app.listen(PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Server running at http://localhost:${PORT}`);
});