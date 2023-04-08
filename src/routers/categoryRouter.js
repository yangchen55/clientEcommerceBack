import express from "express";
import {
  readCategories,
} from "../models/category/CategoryModel.js";

const router = express.Router();

// read category
router.get("/", async (req, res, next) => {
  try {
    const categories = await readCategories();

    res.json({
      status: "success",
      message: "Here is the cat lists",
      categories
    });
  } catch (error) {
    next(error);
  }
});




export default router;
