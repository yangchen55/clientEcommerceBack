import express from "express";
import {
  getAllProducts,
  getSelectedProduct,
} from "../models/product/ProductMode.js";


const router = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const imgFolderPath = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation error check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName);
  },
});

const upload = multer({ storage });

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id, "i reached product Router")

    const products = _id ? await getSelectedProduct({ parentCat: _id }) : await getAllProducts();
    console.log(products, "i chekcing product router result")
    res.json({
      status: "success",
      message: "product lsit",
      products,
    });
  } catch (error) {
    next(error);
  }
});


export default router;
