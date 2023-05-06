import clientPromise from "../../config/dbConfig.js";
import UserSchema from "./UserSchema.js"

export const createNewUser = (obj) => {
    return UserSchema(obj).save();

}

export const updateUser = (filter, obj) => {
    return UserSchema.findOneAndUpdate(filter, obj, { new: true });
};

// find a user, @filter must be an obj
export const findUser = (filter) => {
    return UserSchema.findOne(filter);
};

export const updateProfile1 = ({ _id, rest }) => {
    return UserSchema.findByIdAndUpdate(_id, rest, { new: true });
};

export const getUser = async () => {
    const db = await clientPromise.db("admin_users")
    return await db.find()

}