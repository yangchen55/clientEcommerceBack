import ProductSchema from "./ProductSchema.js";
import { Types } from 'mongoose';



export const getAllProducts = () => {
  return ProductSchema.find();
};

export const getSingleProduct = (filter) => {
  return ProductSchema.findOne(filter);
};


export const getSelectedProduct = (filter) => {
  if (filter.hasOwnProperty('parentCat')) {
    // If it exists, create a new ObjectId instance from the '_id' value
    filter.parentCat = new Types.ObjectId(filter.parentCat);
  }
  return ProductSchema.find(filter);
};
// export const geProductById = (_id) => {
//   return ProductSchema.findById(_id);
// };





