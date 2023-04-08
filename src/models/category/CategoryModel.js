import CategorySchema from "./CategorySchema.js";



export const readCategories = () => {
  return CategorySchema.find();
};

//@_id must be a string
export const getCategoryById = (_id) => {
  return CategorySchema.findById(_id);
};



